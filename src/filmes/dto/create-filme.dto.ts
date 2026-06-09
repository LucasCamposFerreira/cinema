import { IsString, IsInt, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
import { GeneroFilme } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  sinopse!: string;

  @IsString()
  @IsNotEmpty()
  classificacao!: string;

  @IsInt()
  duracao!: number;

  @IsString()
  @IsNotEmpty()
  elenco!: string;

  @IsEnum(GeneroFilme)
  genero!: GeneroFilme;

  @ApiProperty({ example: '01/01/2026', description: 'Data no formato dd/mm/yyyy' })
  @IsString()
  @IsNotEmpty()
  dataInicioExibicao!: string;

  @ApiProperty({ example: '01/02/2026', description: 'Data no formato dd/mm/yyyy' })
  @IsString()
  @IsNotEmpty()
  dataFinalExibicao!: string;
  @IsInt()
  cinemaId!: number;
}