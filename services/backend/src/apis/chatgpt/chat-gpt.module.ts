import { Module } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';
import { ChatGPTController } from './chat-gpt.controller';
import { ChatGPTResolver } from './chat-gpt.resolver';

@Module({
  controllers: [ChatGPTController],
  providers: [ChatGPTService, ChatGPTResolver],
})
export class ChatGPTModule {}