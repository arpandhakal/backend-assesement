import { Module } from "@nestjs/common";


@Module({
providers: [RealtimeService],
exports: [RealtimeService],
})