import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { mkdir, writeFile, access } from 'fs/promises';
import * as path from 'path';

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'picture',
}

@Injectable()
export class FileService {
    async createFile(type: FileType, file): Promise<string> {
        try {
            const fileName = this.getUniqueFileName(file.originalname);
            const filePath = path.join(__dirname, '..', 'static', type);

            try {
                await access(filePath);
            } catch {
                await mkdir(filePath, { recursive: true });
            }

            await writeFile(path.join(filePath, fileName), file.buffer);

            return `${type}/${fileName}`;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getUniqueFileName(originalName: string): string {
        const fileNameArr = originalName.split('.');
        const fileExt = fileNameArr.pop();
        const fileName = fileNameArr[0];

        return (
            slugify(fileName + '-' + Math.random().toString(36), {
                lower: true,
                remove: /[*+~.()'"!:@]/g,
            }) +
            '.' +
            fileExt
        );
    }
}
