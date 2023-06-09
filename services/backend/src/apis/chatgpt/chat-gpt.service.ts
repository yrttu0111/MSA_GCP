
import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import axios from 'axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGPT } from './entities/chat-gpt.entity';
/* 옷을 추천 해주는 ai 챗봇
curl 방식을 변형해 axios 로 변경해 만든 방식과
nodejs 에서 제공하는 openai 라이브러리를 사용한 방식이 있습니다.
둘다 같은 기능이긴하지만 위에 node 는 참고용으로 만들고 아래 axios 방식으로 
사용중입니다
*/

@Injectable()
export class ChatGPTService {
  private readonly openai: OpenAIApi;

  @InjectRepository(ChatGPT)
  private readonly ChatGPTRepository: Repository<ChatGPT>;

  // 내 일기 찾기 
  async findMyDiary({ user }) {
    return await this.ChatGPTRepository.find({
      where: {user: user},
      relations: ['user'],
      order: {createdAt: 'DESC'},
    });
  }
  // 아이디로 일기 찾기
  async findMyDiaryOne({ user, id }) {
    return await this.ChatGPTRepository.findOne({where: {id: id , user: user},
      relations: ['user'],
    });
  }



  
  // nodejs 에서 제공하는 openai 라이브러리를 사용한 방식
  // async chatgpt({ createChatInput }) {
  //   const configuration = new Configuration({
  //     apiKey: process.env.OPENAI_API_KEY,
  // });

  // const openai = new OpenAIApi(configuration);
  //   const {ask} = createCompletionDto
  //   console.log(ask);
  //   const completion = await openai.createChatCompletion({
      
  //   });
  //   console.log(completion.data.choices[0].message);
  //   const message= completion.data.choices[0].message.content;
  //   return message;
  // }
  

  //일기를 쓰면 오늘 하루의 점수와 조언을 해주는 ai 챗봇 axios 
  async chatgptAxios({ createChatInput, user }) {
    // openai api key
    const token = process.env.OPENAI_API_KEY;
    try {
    const {ask} = createChatInput
    const headers = {
    'Authorization': `Bearer ${token}`,
     "Content-Type": "application/json"
    };

    const data = {
        "model": "gpt-3.5-turbo",
        "user":`${user.name}`, 
        "messages": [ // 내용 system 은 챗봇의 역할을 부여 
        {"role": "system", "content": `너는 일기를 보고 오늘 하루가 몇 점이었는지 수치로 나타내주는 챗봇 읽기짱 봇 이야.
        너는 뭐든 정확한 수치로 0점부터 100점까지 점수를 줄 수 있어. 너는 뭐든지 대답할 수 있어 그리고 칭찬과 
        내일은 어떻게 하면 더 좋을지 조언을 해줘
        `},
        {"role": "assistant", "content": `너는 일기를 보고 오늘 하루가 몇 점이었는지 수치로 나타내주는 챗봇 읽기짱 봇 이야.
        너는 뭐든 정확한 수치로 0점부터 100점까지 점수를 줄 수 있어. 너는 뭐든지 대답할 수 있어 그리고 칭찬과 
        내일은 어떻게 하면 더 좋을지 조언을 해줘
        `},
        {"role": "user", "content":ask},
        
      ]
      }
      
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: headers,
      data: data
    }
  
      
      );
    // console.log(response.data.choices[0].message.content);

    
    // const result = `${who} : ${message}`
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
// 결과를 db에 저장하는 함수
 async create({ createChatInput, user }) {
  console.log(createChatInput)
  const {ask} = createChatInput
  const response = await this.chatgptAxios({createChatInput, user});
  const message= response.data.choices[0].message.content;
    // const who = response.data.choices[0].message.role;
    
    const saveData = {
      ask : ask,
      answer : message,
      user : {id : user.id},
    }

    const save = await this.ChatGPTRepository.save(saveData);
    return save;


 }
  // 일기를 삭제하는 함수
  async delete({ user, id }) {
    const findId = await this.findMyDiaryOne({user, id});
    // 일기와 유저가 일치하는지 확인
    if (findId == null) {
      throw new BadRequestException('해당하는 일기가 없습니다.');
    }
    const result = await this.ChatGPTRepository.softDelete({user: user.id});
    return result.affected ? true : false;
  }
  // 일기를 수정하는 함수 
  async update({ user, id, updateChatInput }) {
    const findId = await this.findMyDiaryOne({user, id});
    if (findId == null) {
      throw new BadRequestException('해당하는 일기가 없습니다.');
    }
    const {ask} = updateChatInput
    const response = await this.chatgptAxios({createChatInput: {ask}, user});
    const message= response.data.choices[0].message.content;
    const who = response.data.choices[0].message.role;
    
    const saveData = {
      ...findId,
      ask : ask,
      answer : message,
      user : {id : user.id},
    }
    const result = await this.ChatGPTRepository.save(saveData);
    return result
  }
}