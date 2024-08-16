export interface IFileRepo {
  upload(file: Buffer, mimetype: string, path: string): Promise<string>;
  remove(key: string): Promise<void>;
}
