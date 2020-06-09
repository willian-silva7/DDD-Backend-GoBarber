import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: '', // region of amazon S3 cloud
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    });

    await this.client.putObject({
      Bucket: 'app-gobarber', // or the name of your bucket
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
    }).promise;

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: '',
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
