import { Controller, Get, Query } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';

@Controller('chat')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  
}