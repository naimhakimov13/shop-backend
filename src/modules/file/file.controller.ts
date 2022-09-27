import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('uploads')
export class FileController {

  @Get(':name')
  showImg(@Param('name') name: string, @Res() response: Response) {
    return response.sendFile(name, {root: './uploads'});
  }
}
