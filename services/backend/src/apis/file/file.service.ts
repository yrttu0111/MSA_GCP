import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { getToday } from 'src/commons/libraries/utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [file,file]

    // const myfile = files[0];

    const storage = new Storage({
      projectId: process.env.GCP_PROJECTID,
      keyFilename: process.env.GCP_KEYFILE,
    }).bucket('test-jinta-storage');

    // 구글 스토리지에 파일 업로드
    // await new Promise((resolve, reject) => {
    //   myfile
    //     .createReadStream()
    //     .pipe(storage.createWriteStream)
    //     .on('finish', () => {
    //       resolve('성공');
    //     })
    //     .on('error', () => {
    //       reject('실패');
    //     });
    // });

    const urls = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          const fname = `${getToday()}/${uuidv4()}/origin/${el.filename}`;
          console.log(`fname: ${fname}`);
          el.createReadStream()
            .pipe(storage.file(fname).createWriteStream())
            .on('finish', () => {
              resolve(`test-jinta-storage/${fname}`);
            })
            .on('error', () => {
              reject('실패');
            });
        });
      }),
    );

    return urls;
  }
}
