import { Module } from '@nestjs/common';
import { EventsService } from './events.service';

@Module({
    exports:[EventsService],
    providers: [EventsService]
})
export class EventsModule {}
