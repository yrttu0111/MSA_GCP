import { FileService } from './file.service';
import { FileUpload } from 'graphql-upload';
export declare class FileResolver {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(files: FileUpload[]): Promise<unknown[]>;
}
