import { Injectable } from '@nestjs/common';
import { Pool, PoolClient, QueryResult } from 'pg';

@Injectable()
export class pgservice {
  private pool: Pool;

  constructor() {
    // Configuración de la pool de PostgreSQL
    this.pool = new Pool({
      user: 'root',
      host: 'localhost',
      database: 'products',
      password: 'root',
      port: 5432, // Puerto por defecto de PostgreSQL
    });
  }

  async query(queryText: string, params?: any[]): Promise<QueryResult> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();
      const result = await client.query(queryText, params);
      return result;
    } catch (error: unknown) {
      // Cambié 'error' a 'unknown'
      if (error instanceof Error) {
        // Comprobamos si 'error' es una instancia de Error
        throw new Error(`Query failed: ${error.message}`);
      }
      throw new Error('An unknown error occurred during the query');
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
