import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './models/track.model';
import { Model, ObjectId } from 'mongoose';
import { GetTracksDto } from './dto/get-tracks.dto';

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>) {}

    async create(createTrackDto: CreateTrackDto, audio: string, picture: string): Promise<Track> {
        const track = await this.trackModel.create({
            ...createTrackDto,
            audio,
            picture,
            listens: 0,
        });
        return track;
    }

    async findAll(query: GetTracksDto): Promise<Track[]> {
        const filter: any = {};

        const offset = query.offset ? query.offset : 0;
        const limit = query.limit ? query.limit : 10;

        if (query.name) filter.name = { ['$regex']: new RegExp(query.name, 'i') };

        if (query.artist) filter.artist = { ['$regex']: new RegExp(query.artist, 'i') };

        if (query.text) filter.text = { ['$regex']: new RegExp(query.text, 'i') };

        const tracks = await this.trackModel
            .find(filter)
            .skip(+offset)
            .limit(+limit);
        return tracks;
    }

    async findOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }

    async remove(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }
}
