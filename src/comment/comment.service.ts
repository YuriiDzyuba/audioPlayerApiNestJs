import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../track/models/track.model';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './models/comment.model';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    ) {}
    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(createCommentDto.trackId);
        const comment = await this.commentModel.create({ ...createCommentDto });
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }

    findAll() {
        return `This action returns all comment`;
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
