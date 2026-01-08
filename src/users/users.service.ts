import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Flight } from '../flight/entities/flight.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const flight = await this.flightRepo.findOne({
      where: { id: createUserDto.flightId },
    });

    if (!flight) {
      throw new NotFoundException(
        `Flight with id ${createUserDto.flightId} not found`,
      );
    }

    const user = this.userRepo.create({
      name: createUserDto.name,
      age: createUserDto.age,
      country: createUserDto.country,
      flight: flight, // relation
    });

    return this.userRepo.save(user);
  }

  async findAll() {
    const f = await this.userRepo.find({ relations: ['flight'] });  
    if(f.length === 0){
      throw new NotFoundException('hali malumot mavjud emas')
    }
    return f
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

    if (dto.flightId != user.flight.id) {
      const flight = await this.flightRepo.findOne({
        where: { id: dto.flightId },
      });
      if (!flight) {
        throw new NotFoundException(
          `Flight with id ${dto.flightId} not found`,
        );
      }
      user.flight = flight;
    }

   this.userRepo.update({id},dto);
   return await this.findOne(id)
  }

  async remove(id: number) {
 const user = await this.findOne(id);
 await this.userRepo.remove(user);  }
}
