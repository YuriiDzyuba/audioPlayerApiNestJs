import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { FileService, FileType } from '../file/file.service';
import { GetTracksDto } from './dto/get-tracks.dto';

@Controller('track')
export class TrackController {
    constructor(
        private readonly trackService: TrackService,
        private readonly fileService: FileService,
    ) {}

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'picture', maxCount: 1 },
            { name: 'audio', maxCount: 1 },
        ]),
    )
    async create(@UploadedFiles() files, @Body() createTrackDto: CreateTrackDto) {
        const audioPath = await this.fileService.createFile(FileType.AUDIO, files.audio[0]);
        const picturePath = await this.fileService.createFile(FileType.IMAGE, files.picture[0]);
        return this.trackService.create(createTrackDto, audioPath, picturePath);
    }

    @Get()
    findAll(@Query() query: GetTracksDto) {
        return this.trackService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: ObjectId) {
        return this.trackService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: ObjectId) {
        return this.trackService.remove(id);
    }
}
