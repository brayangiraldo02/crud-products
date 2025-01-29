import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { pgservice } from 'src/postgres/pg-service';

@Module({
  controllers: [StorageController],
  providers: [StorageService, pgservice],
})
export class StorageModule { }
