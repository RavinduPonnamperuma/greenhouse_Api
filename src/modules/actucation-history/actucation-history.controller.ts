import {Controller} from '@nestjs/common';
import {ActucationHistoryService} from './actucation-history.service';

@Controller('actucation-history')
export class ActucationHistoryController {
  constructor(private readonly actucationHistoryService: ActucationHistoryService) {}
}
