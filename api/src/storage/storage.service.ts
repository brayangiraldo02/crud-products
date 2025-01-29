import { Injectable } from '@nestjs/common';
import { pgservice } from 'src/postgres/pg-service';
import { Storage } from './interface/storage.inteface';
import { get_storage_dto, create_storage_dto } from './dto';
import { update_storage_dto } from './dto/update_storage_dto';

@Injectable()
export class StorageService {
  constructor(private readonly pg_service: pgservice) {}

  async get_storages(): Promise<get_storage_dto[]> {
    try {
      const query = 'SELECT * FROM storage WHERE status = true';
      const result = (await this.pg_service.query(query)) as {
        rows: Storage[];
      };

      const storagesDto: get_storage_dto[] = result.rows.map((storage) => {
        return {
          id: storage.id,
          name: storage.name,
          description: storage.description,
          price: storage.price,
          stock: storage.stock,
        };
      });

      return storagesDto;
    } catch (error) {
      console.error('Error fetching storage:', error);
      return [];
    }
  }

  async get_storages_by_id(id: number): Promise<get_storage_dto | null> {
    try {
      const query = `SELECT * FROM storage WHERE id = $1 AND status = true`;
      const result = (await this.pg_service.query(query, [id])) as {
        rows: Storage[];
      };

      if (result.rows.length === 0) {
        return null;
      }

      const storageDto: get_storage_dto = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        description: result.rows[0].description,
        price: result.rows[0].price,
        stock: result.rows[0].stock,
      };
      return storageDto;
    } catch (error) {
      console.error('Error fetching storage by id:', error);
      return null;
    }
  }

  async create_storage(
    storage: create_storage_dto,
  ): Promise<get_storage_dto | null> {
    try {
      const query = `INSERT INTO storage (name, description, price, stock) VALUES(
        '${storage.name}',
        '${storage.description}',
        ${storage.price},
        ${storage.stock}) RETURNING * `;
      const result = (await this.pg_service.query(query)) as {
        rows: Storage[];
      };
      const storageDto: get_storage_dto = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        description: result.rows[0].description,
        price: result.rows[0].price,
        stock: result.rows[0].stock,
      };
      return storageDto;
    } catch (error) {
      console.error('Error creating storage:', error);
      return null;
    }
  }

  async update_storage(
    id: number,
    storage: update_storage_dto,
  ): Promise<get_storage_dto | null> {
    try {
      let query = `UPDATE storage SET `;
      if (storage.name) {
        query += `name = '${storage.name}', `;
      }
      if (storage.description) {
        query += `description = '${storage.description}', `;
      }
      if (storage.price) {
        query += `price = ${storage.price}, `;
      }
      if (storage.stock) {
        query += `stock = ${storage.stock}, `;
      }
      query = query.slice(0, -2);
      query += ` WHERE id = ${id} RETURNING * `;
      const result = (await this.pg_service.query(query)) as {
        rows: Storage[];
      };
      if (result.rows.length === 0) {
        return null;
      }
      const storageDto: get_storage_dto = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        description: result.rows[0].description,
        price: result.rows[0].price,
        stock: result.rows[0].stock,
      };
      return storageDto;
    } catch (error) {
      console.error('Error updating storage:', error);
      return null;
    }
  }

  async verify_delete(id: number): Promise<boolean> {
    try {
      const query = `SELECT status FROM storage WHERE id = $1`;
      const result = (await this.pg_service.query(query, [id])) as {
        rows: { status: boolean }[];
      };

      if (result.rows.length === 0) {
        return false;
      }

      return result.rows[0].status === false;
    } catch (error) {
      console.error('Error verifying delete:', error);
      return false;
    }
  }

  async delete_storage(id: number): Promise<boolean> {
    try {
      const query = `UPDATE storage SET status = false WHERE id = ${id} RETURNING * `;
      const result = (await this.pg_service.query(query)) as {
        rows: Storage[];
      };

      if (result.rows.length === 0) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting storage:', error);
      return false;
    }
  }
}
