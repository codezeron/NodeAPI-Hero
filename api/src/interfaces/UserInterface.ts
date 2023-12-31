interface ICreate {
    name: string;
    email: string;
    password: string;
}

interface IUpdate {
    name: string;
    oldPassword: string;
    newPassword: string;
    avatar_url?: UploadFile;
    user_id:string;
}

interface UploadFile{
    fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}