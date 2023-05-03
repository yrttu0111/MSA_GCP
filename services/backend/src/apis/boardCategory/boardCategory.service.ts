import { Repository } from "typeorm";
import { BoardCategory } from "./entities/boardCategory.entity";
import { InjectRepository } from "@nestjs/typeorm";


export class BoardCategoryService{
  constructor(
    @InjectRepository(BoardCategory)
    private readonly BoardCategoryRepository: Repository<BoardCategory>,
  ) {}

  async create({ name }) {
  return await this.BoardCategoryRepository.save({ name });
  }
  async findAll() {
    return await this.BoardCategoryRepository.find();
  }
  async findOne({ name }) {
    return await this.BoardCategoryRepository.findOne({ name });
  }
}