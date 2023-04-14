import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { CreateCompletionDto } from './dto/create-completion.dto';
import axios from 'axios';
/* 옷을 추천 해주는 ai 챗봇
curl 방식을 변형해 axios 로 변경해 만든 방식과
nodejs 에서 제공하는 openai 라이브러리를 사용한 방식이 있습니다.
둘다 같은 기능이긴하지만 위에 node 는 참고용으로 만들고 아래 axios 방식으로 
사용하중입니다
*/

@Injectable()
export class ChatGPTService {
  private readonly openai: OpenAIApi;
  
  async chatgpt({ createCompletionDto }) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
    const {ask} = createCompletionDto
    console.log(ask);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: ask}],
    });
    console.log(completion.data.choices[0].message);
    const message= completion.data.choices[0].message.content;
    return message;
  }
  

  //옷을 추천해주는 ai 챗봇 axios 
  async chatgptAxios({ createCompletionDto }) {
    const token = process.env.OPENAI_API_KEY;
    try {
    const {ask} = createCompletionDto
    const headers = {
    'Authorization': `Bearer ${token}`,
     "Content-Type": "application/json"
    };
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content":ask },
        {"role": "system", "content": `당신은 스타일을 추천해 주는 챗봇 챗또 입니다.
        당신은 세계에서 가장 유명한 스타일러이며 
        날씨에 맞는 옷을 추천해주거나 채형에 맞는 옷 과 옷 잘입는 방법등을 추천해줍니다`}]
      }
      
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: headers,
      data: data
    }
  
      
      );
    console.log(response.data.choices[0].message.content);
    const message= response.data.choices[0].message.content;
    const who = response.data.choices[0].message.role;
    const result = `${who} : ${message}`
    return result;
  } catch (e) {
    throw new Error(e);
  }
}
}