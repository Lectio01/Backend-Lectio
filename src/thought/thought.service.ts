import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateThoughtDto } from './dto/create-thought.dto';
import { UpdateThoughtDto } from './dto/update-thought.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ThoughtService {
  constructor(private readonly repository: PrismaService) {}

  async create(createThoughtDto: CreateThoughtDto) {
    const book = await this.getBookById(createThoughtDto.bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return await this.repository.thought.create({
      data: {
        text: createThoughtDto.phrase,
        bookId: book.id,
      },
    });
  }

  async findAll() {
    return await this.repository.thought.findMany();
  }

  async findOne(id: string) {
    return await this.repository.thought.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateThoughtDto: UpdateThoughtDto) {
    const book = await this.getBookById(updateThoughtDto.bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return await this.repository.thought.update({
      where: {
        id,
      },
      data: {
        text: updateThoughtDto.phrase,
        bookId: book.id,
      },
    });
  }

  async remove(id: string) {
    return await this.repository.thought.delete({
      where: { id },
    });
  }

  private async getBookById(id: string) {
    return await this.repository.book.findFirst({
      where: {
        id,
      },
    });
  }
}
