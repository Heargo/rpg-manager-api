import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Patch,
  Body,
  Inject,
  UseGuards,
  Request,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CharacterBusiness } from '../business/character.business';
import {
  CharacterDto,
  CharacterPreviewDto,
  CreateUpdateCharacterDto,
} from '../dto/character.dto';
import { CharacterMapper } from '../mapper/character.mapper';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('characters')
@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharacterController {
  constructor(
    @Inject(CharacterBusiness)
    private readonly characterBusiness: CharacterBusiness,
  ) {}

  // GET characters?gameId=...
  @Get()
  async list(@Query('gameId') gameId: string): Promise<CharacterPreviewDto[]> {
    const chars = await this.characterBusiness.listByGame(gameId);
    return chars.map(CharacterMapper.toPreviewDto);
  }

  // GET character/:gameid/:id
  @Get(':gameid/:id')
  async getOne(
    @Param('gameid') gameId: string,
    @Param('id') id: string,
  ): Promise<CharacterDto> {
    const char = await this.characterBusiness.getFull(gameId, id);
    return CharacterMapper.toDto(char);
  }

  // POST character
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateUpdateCharacterDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }), // max size is 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Request() req,
  ): Promise<CharacterDto> {
    const char = await this.characterBusiness.create(req.user, dto, image);
    return CharacterMapper.toDto(char);
  }

  // UPDATE character/:id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateUpdateCharacterDto,
    @Request() req,
  ): Promise<CharacterDto> {
    const char = await this.characterBusiness.update(id, req.user, dto);
    return CharacterMapper.toDto(char);
  }
}
