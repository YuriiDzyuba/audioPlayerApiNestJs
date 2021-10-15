import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from './comment/comment.module';
import { AppController } from './app.controller';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/audio-db'),
        ServeStaticModule.forRoot({ rootPath: join(__dirname, 'static') }),
        TrackModule,
        AlbumModule,
        CommentModule,
        FileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
