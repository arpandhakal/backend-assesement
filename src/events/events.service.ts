import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class EventsService {
    constructor(private eventEmitter:EventEmitter2){}
    async sendNotification(username:string){
        this.eventEmitter.emit('sendnotification',username);
    }
    @OnEvent('sendnotification')
    async notificationHandler(username:string){
        console.log(username);
    }

}
