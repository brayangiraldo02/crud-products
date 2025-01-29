import {
  Controller,
  Body,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { get_storage_dto, create_storage_dto } from './dto';
import { update_storage_dto } from './dto/update_storage_dto';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  @Get()
  @ApiOperation({ summary: 'Get all storage' })
  @ApiResponse({ status: 200, description: 'Return all storage' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async get_storages(): Promise<get_storage_dto[]> {
    const storage = await this.storageService.get_storages();

    return storage;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a storage by ID' })
  @ApiResponse({ status: 200, description: 'Return a storage' })
  @ApiResponse({ status: 404, description: 'storage not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async get_storages_by_id(
    @Param('id') id_string: string,
  ): Promise<get_storage_dto | null> {
    const id = parseInt(id_string);
    const storage = await this.storageService.get_storages_by_id(id);
    if (storage) {
      return storage;
    }
    throw new NotFoundException(`storage with ID ${id} not found`);
  }

  @Post()
  @ApiOperation({ summary: 'Create a storage' })
  @ApiResponse({ status: 201, description: 'storage created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UsePipes(new ValidationPipe())
  async create_storage(
    @Body() storage: create_storage_dto,
  ): Promise<get_storage_dto> {
    try {
      const storage_created = await this.storageService.create_storage(storage);
      if (storage_created) {
        return storage_created;
      }
      throw new Error('Error creating storage');
    } catch {
      throw new Error('Error creating storage');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a storage' })
  @ApiResponse({ status: 200, description: 'Storage updated' })
  @ApiResponse({ status: 404, description: 'storage not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UsePipes(new ValidationPipe())
  async update_storage(
    @Param('id') id_string: string,
    @Body() storage: update_storage_dto,
  ): Promise<get_storage_dto> {
    const id = parseInt(id_string);
    const exist_storage = await this.storageService.get_storages_by_id(id);
    if (!exist_storage) {
      throw new NotFoundException(`Storage with ID ${id} not found`);
    }

    try {
      const updated_storage = await this.storageService.update_storage(
        id,
        storage,
      );
      if (updated_storage) {
        return updated_storage;
      } else {
        throw new NotFoundException(`Storage with ID ${id} not found`);
      }
    } catch {
      throw new BadRequestException('Error updating storage');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a storage' })
  @ApiResponse({ status: 200, description: 'storage deleted' })
  @ApiResponse({ status: 404, description: 'storage not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async delete_storage(
    @Param('id') id_string: string,
  ): Promise<{ message: string }> {
    const id = parseInt(id_string);

    const is_delete = await this.storageService.verify_delete(id);
    if (is_delete) {
      throw new NotFoundException(`storage with ID ${id} is deleted `);
    }

    const deleted = await this.storageService.delete_storage(id);

    if (!deleted) {
      throw new NotFoundException(`storage with ID ${id} not found`);
    }

    return { message: 'storage deleted successfully' };
  }
}
