import { v4 as uuid } from 'uuid';

export const fileNamer = (req: Express.Request, files: Express.Multer.File, callback: Function) => {
  if (!files) return callback(new Error('File is empty'), false);

  const fileExtension: string = files.mimetype.split('/')[1];
  const fileName: string = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};