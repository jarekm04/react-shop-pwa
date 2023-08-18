import Dexie from "dexie";

class IDBManager {
  private db: Dexie;

  constructor(databaseName: string, version: number, stores: Record<string, string>) {
    this.db = new Dexie(databaseName);
    this.db.version(version).stores(stores);
  }

  async openDatabase(): Promise<void> {
    try {
      await this.db.open();
    } catch (error) {
      console.log(`Opening IDB error: ${error}`);
    }
  }

  getTable<T>(tableName: string): Dexie.Table<T, number> {
    return this.db.table(tableName);
  }

  async addRecord<T>(tableName: string, record: T): Promise<number | void> {
    try {
      const table = this.getTable<T>(tableName);
      return table.add(record);
    } catch (error) {
      console.log(`Adding to IDB error: ${error}`);
    }
  }

  async updateRecord<T>(tableName: string, id: number, updates: Partial<T>): Promise<void> {
    try {
      const table = this.getTable<T>(tableName);
      await table.update(id, updates);
    } catch (error) {
      console.log(`Updating in IDB error: ${error}`);
    }
  }

  async deleteRecord<T>(tableName: string, id: number): Promise<void> {
    try {
      const table = this.getTable<T>(tableName);
      await table.delete(id);
    } catch (error) {
      console.log(`Deleting from IDB error: ${error}`);
    }
  }
}

export default IDBManager;
