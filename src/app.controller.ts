import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Res, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from "path";
import * as fs from 'fs';

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
}
const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image file are allowed!'), false);
  }
  callback(null, true);
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadImage(@UploadedFile() fileImg ){
    // verify token in header and access to post
    const res = {
      filename: fileImg.filename,
    }
    return res;
  }
  @Get('/files/:imgpath')
  getImage(@Param('imgpath') imgpath: string, @Res() res ){
    return res.sendFile(imgpath, {root: './files'})
  }
  @Delete('/files/:imgpath')
  delImg(@Param('imgpath') imgpath: string){
    fs.unlinkSync(`./files/${imgpath}`);
    return "Deleted!";
  }

}
