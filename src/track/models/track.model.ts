import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Comment } from '../../comment/models/comment.model';

export type TrackDocument = Track & mongoose.Document;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
