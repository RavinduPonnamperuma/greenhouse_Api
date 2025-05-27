import { Module } from '@nestjs/common';
import { ActucationHistoryService } from './actucation-history.service';
import { ActucationHistoryController } from './actucation-history.controller';

@Module({
  controllers: [ActucationHistoryController],
  providers: [ActucationHistoryService],
})
export class ActucationHistoryModule {}
