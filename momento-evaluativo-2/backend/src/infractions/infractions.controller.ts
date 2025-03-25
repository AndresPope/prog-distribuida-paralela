import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfractionsService } from './infractions.service';
import { CreateInfractionDto } from './dto/create-infraction.dto';
import { UpdateInfractionDto } from './dto/update-infraction.dto';

@Controller('infractions')
export class InfractionsController {
  constructor(private readonly infractionsService: InfractionsService) {}

  @Post()
  create(@Body() createInfractionDto: CreateInfractionDto) {
    return this.infractionsService.create(createInfractionDto);
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
  update(@Param('id') id: string, @Body() updateInfractionDto: UpdateInfractionDto) {
    return this.infractionsService.update(+id, updateInfractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infractionsService.remove(+id);
  }
}
