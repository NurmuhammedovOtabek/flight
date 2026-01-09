import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight) private readonly flightRep: Repository<Flight>,
  ) {}

  async create(dto: CreateFlightDto): Promise<Flight> {
    const existing = await this.flightRep.findOne({
      where: { flightNumber: dto.flightNumber },
    });
    if (existing) {
      throw new BadRequestException(
        `Flight with number ${dto.flightNumber} already exists`,
      );
    }
    const flight = await this.flightRep.save(dto);
    return flight;
  }

  async findAll(): Promise<Flight[]> {
    const allF = await this.flightRep.find();
    if (allF.length === 0) {
      throw new NotFoundException('Flight not found');
    }
    return allF;
  }

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightRep.findOneBy({ id });
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    return flight;
  }

  async update(id: number, dto: UpdateFlightDto) {
    const flight = await this.findOne(id);
    
    if (flight.flightNumber != dto.flightNumber) {
      const existing = await this.flightRep.findOne({
        where: { flightNumber: dto.flightNumber },
      });
      if (existing) {
        throw new BadRequestException(
          `Flight with number ${dto.flightNumber} already exists`,
        );
      }
    }
    
    return await this.flightRep.save({id, ...dto})
  }

  async remove(id: number) {
    const flight = await this.findOne(id);
    
    await this.flightRep.remove(flight);
    return { data: 'Flight deleted' };
  }

  
}
