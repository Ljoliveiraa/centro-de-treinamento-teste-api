import { Module } from '@nestjs/common';
import { FileRepositoryService } from './providers/file-repository.service';

@Module({
  providers: [FileRepositoryService],
})
export class FilesModule {}
