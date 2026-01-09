import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Flights') 
@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flight' })
  @ApiResponse({ status: 201, description: 'Flight created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  // 🔹 Get all flights
  @Get()
  @ApiOperation({ summary: 'Get all flights' })
  @ApiResponse({ status: 200, description: 'List of flights' })
  findAll() {
    return this.flightService.findAll();
  }

  // 🔹 Get flight by id
  @Get(':id')
  @ApiOperation({ summary: 'Get flight by ID' })
  @ApiResponse({ status: 200, description: 'Flight found' })
  @ApiResponse({ status: 404, description: 'Flight not found' })
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(+id);
  }

  // 🔹 Update flight by id
  @Patch(':id')
  @ApiOperation({ summary: 'Update flight by ID' })
  @ApiResponse({ status: 200, description: 'Flight updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 404, description: 'Flight not found' })
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(+id, updateFlightDto);
  }

  // 🔹 Delete flight by id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete flight by ID' })
  @ApiResponse({ status: 200, description: 'Flight deleted successfully' })
  @ApiResponse({ status: 404, description: 'Flight not found' })
  remove(@Param('id') id: string) {
    return this.flightService.remove(+id);
  }
}
