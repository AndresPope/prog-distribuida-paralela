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
import { InfractionsService } from './infractions.service';
import { CreateInfractionDto } from './dto/create-infraction.dto';
import { UpdateInfractionDto } from './dto/update-infraction.dto';

@Controller('infractions')
export class InfractionsController {
  constructor(private readonly infractionsService: InfractionsService) {}

  @Post()
  async create(@Body() createInfractionDto: CreateInfractionDto) {
    try {
      return await this.infractionsService.create(createInfractionDto);
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
    return this.infractionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infractionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInfractionDto: UpdateInfractionDto,
  ) {
    return this.infractionsService.update(+id, updateInfractionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.infractionsService.remove(id);
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
