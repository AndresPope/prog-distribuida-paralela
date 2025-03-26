import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    try {
      return await this.vehiclesService.create(createVehicleDto);
    } catch (e) {
      const err = e as Error;
      throw new HttpException(
        {
          error: String(err?.message),
        },
        400,
        {
          cause: e,
        },
      );
    }
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.vehiclesService.remove(id);
    } catch (e) {
      const err = e as Error;
      throw new HttpException(
        {
          error: String(err?.message),
        },
        400,
        {
          cause: e,
        },
      );
    }
  }
}
