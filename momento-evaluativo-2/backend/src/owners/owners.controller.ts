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
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    try {
      return await this.ownersService.create(createOwnerDto);
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
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownersService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.ownersService.remove(id);
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

  @Get(':ownerId/infractions')
  getAllInfractions(@Param('ownerId') ownerId: string) {
    return this.ownersService.getAllInfractions({ ownerId });
  }

  @Get(':ownerId/vehicles')
  getAllVehicles(@Param('ownerId') ownerId: string) {
    return this.ownersService.getAllVehicles({ ownerId });
  }
}
