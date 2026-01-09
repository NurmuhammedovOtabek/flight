import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { Flight } from '../flight/entities/flight.entity';
import { BulkAssignFlightDto } from './dto/blukUpdate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.flightId) {
      const flight = await this.flightRepo.findOne({
        where: { id: createUserDto.flightId },
      });
      if (!flight) {
        throw new NotFoundException(
          `Flight with id ${createUserDto.flightId} not found`,
        );
      }
    }

    return await this.userRepo.save(createUserDto);
  }

  async findAll() {
    const f = await this.userRepo.find({ relations: ['flight'] });
    if (f.length === 0) {
      throw new NotFoundException('User not found');
    }
    return f;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['flight'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (dto.flightId) {
      const flight = await this.flightRepo.findOne({
        where: { id: dto.flightId },
      });
      if (!flight) {
        throw new NotFoundException(`Flight with id ${dto.flightId} not found`);
      }
    }

    return await this.userRepo.save({ ...dto, id });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
    return { data: 'user deleted' };
  }

  async bulkUpdate(dto: BulkAssignFlightDto) {
    const { flightId, userIds } = dto;

     const flight = await this.flightRepo.findOneBy({ id: flightId });
     if (!flight) {
       throw new NotFoundException('Flight not found');
     }

     const users = await this.userRepo.findBy({
       id: In(userIds),
     });

     if (users.length !== userIds.length) {
       throw new BadRequestException('Some users not found');
     }

    const payload = users.map((user) => ({
      id: user.id,
      flight: { id: flight.id },
    }));

    return this.userRepo.save(payload);
  }
}
