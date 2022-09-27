import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

const UPLOADS = 'uploads';

@Injectable()
export class FileService {
  async saveFile(file: Express.Multer.File) {
    const uploadFolder = `${path}/${UPLOADS}/`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${Date.now() + '-' + file.originalname}`, file.buffer);
    return `/${UPLOADS}/${Date.now() + '-' +  file.originalname}`;
  }
}
