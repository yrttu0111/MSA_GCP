import { Module } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';
import { ChatGPTResolver } from './chat-gpt.resolver';

@Module({
  controllers: [],
  providers: [ChatGPTService, ChatGPTResolver],
})
export class ChatGPTModule {}