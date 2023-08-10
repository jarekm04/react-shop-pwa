import Dexie from "dexie";
import { useEffect } from "react";

class IDBManager extends Dexie {
  constructor(databaseName: string, version: number, stores: Record<string, string>) {
    super(databaseName);
    this.version(version).stores(stores);
  }
}

export function initializeIDB(databaseName: string, version: number, stores: Record<string, string>) {
  return new IDBManager(databaseName, version, stores);
}

export const useIDB = (dbManager: Dexie) => {
  async function init() {
    try {
      await dbManager.open();
      console.log("Database opened successfully");
    } catch (error) {
      console.error("Error opening database:", error);
    }
  }
  useEffect(() => {
    init();
  }, []);

  return {
    addRecord: async <T>(tableName: string, record: T): Promise<void> => {
      try {
        const table = dbManager.table(tableName);
        await table.add(record);
      } catch (error) {
        console.error("Error adding record:", error);
      }
    },
    updateRecord: async <T>(tableName: string, id: number, updates: Partial<T>): Promise<void> => {
      try {
        const table = dbManager.table(tableName);
        await table.update(id, updates);
      } catch (error) {
        console.error("Error updating record:", error);
      }
    },
    deleteRecord: async (tableName: string, id: number): Promise<void> => {
      try {
        const table = dbManager.table(tableName);
        await table.delete(id);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    },
    getTable: <T>(tableName: string): Dexie.Table<T, number> => {
      return dbManager.table(tableName);
    },
  };
};