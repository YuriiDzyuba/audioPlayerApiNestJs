import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './models/track.model';
import { CommentModule } from '../comment/comment.module';
import { FileModule } from '../file/file.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        CommentModule, FileModule
    ],
    controllers: [TrackController],
    providers: [TrackService],
    exports: [TrackService],
})
export class TrackModule {}
