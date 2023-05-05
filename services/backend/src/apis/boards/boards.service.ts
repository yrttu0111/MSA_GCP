import { BoardCategory } from 'src/apis/boardCategory/entities/boardCategory.entity';
import { Board } from './entities/board.entity';

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(BoardCategory)
    private readonly boardCategoryRepository: Repository<BoardCategory>,
    @InjectRepository(BoardTag)
    private readonly boardTagRepository: Repository<BoardTag>,
  ) {}
  async findAll() {
    const result = await this.boardRepository.find({
      //삭제되지 않은 글 + 공개된 글만
      where:{ status: "PUBLIC" },
      relations: [
      'boardCategory',
       'boardTags',
        'user'
      ],
      order: { number: 'DESC' },
    });
    console.log(result)
    return result;
  }
  findOne({number}) {
    const result = this.boardRepository.findOne({
      where: { number: number },
      relations: [
      'boardCategory',
      'boardTags',
      'user'
    ],
    });

    return result;
  }
  findOneMY({user}){
    const result = this.boardRepository.find({
      where: { user: user },
      relations: [
      'boardCategory',
      'boardTags',
      'user'
    ],
    });
    return result;
  }
  


  async create({ createBoardInput, user }) {
    const { boardCategoryId, boardTags, ...board } = createBoardInput;
    const result2 = []
    for (let i = 0; i < boardTags.length; i++) {
      const tagname = boardTags[i].replace('#', ''); //태그에 # 제거
      //이미 등록된 태그인지 확인
      const prevTag = await this.boardTagRepository.findOne({
        name: tagname,
      });
      if (prevTag) {
        result2.push(prevTag);
        
      } else {
        const newTag = await this.boardTagRepository.save({ name: tagname });
        result2.push(newTag);
      }
    }
    const result = await this.boardRepository.save({
      ...board,
      boardCategory: { id: boardCategoryId },
      boardTags: result2,
      user: {id: user.id},
    });
    return result;
  }
  async update({  updateBoardInput, number, user }) {
    //모든 값을 내보내기 위해 안하면 바뀐값만 리턴됨
    const myBoard = await this.findOne({number});
    if(myBoard.user.id !== user.id){
      // 내가 쓴 글만 수정가능
      throw new JsonWebTokenError("권한이 없습니다.")
    }
    const newProduct = {
      ...myBoard, // 수정되지 않은 다른값까지 모두 객체로 리턴
      id: number,
      ...updateBoardInput,
    }; //같은 값이 있으면 위에 건 덮어씌워짐 ->수정한것만 저장됨
    return this.boardRepository.save(newProduct);
  }
  async delete({ number }) {
    // soft delete - deleteAt 컬럼에 삭제된 날짜가 들어감 실제 삭제 아님
    const result = await this.boardRepository.softDelete({ number: number });
    return result.affected ? true : false;
    
  }
}
