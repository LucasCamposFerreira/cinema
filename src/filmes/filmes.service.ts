import { Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilmesService {
  constructor(private prisma: PrismaService) {}

  // Função auxiliar para converter "dd/mm/yyyy" para um objeto Date do JS
  private converterDataBrasileira(dataStr: string): Date {
    const [dia, mes, ano] = dataStr.split('/');
    // Formata internamente para o padrão ISO UTC que o banco aceita
    return new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`);
  }

  create(createFilmeDto: CreateFilmeDto) {
    // Separa as datas do resto dos dados
    const { dataInicioExibicao, dataFinalExibicao, ...dados } = createFilmeDto;

    return this.prisma.filme.create({
      data: {
        ...dados,
        // Chama a função para converter apenas as duas datas antes de salvar
        dataInicioExibicao: this.converterDataBrasileira(dataInicioExibicao),
        dataFinalExibicao: this.converterDataBrasileira(dataFinalExibicao),
      },
    });
  }

  findAll() {
    return this.prisma.filme.findMany();
  }

  findOne(id: number) {
    return this.prisma.filme.findUnique({ where: { id } });
  }

  update(id: number, updateFilmeDto: UpdateFilmeDto) {
    // Se o usuário estiver atualizando a data, precisamos converter também
    const dadosAtualizados: any = { ...updateFilmeDto };

    if (updateFilmeDto.dataInicioExibicao) {
      dadosAtualizados.dataInicioExibicao = this.converterDataBrasileira(updateFilmeDto.dataInicioExibicao);
    }
    if (updateFilmeDto.dataFinalExibicao) {
      dadosAtualizados.dataFinalExibicao = this.converterDataBrasileira(updateFilmeDto.dataFinalExibicao);
    }

    return this.prisma.filme.update({
      where: { id },
      data: dadosAtualizados,
    });
  }

  remove(id: number) {
    return this.prisma.filme.delete({ where: { id } });
  }
}