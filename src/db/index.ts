import Dexie, { Table } from "dexie";
import { ProductDocumentTypes } from "@features/products/types/Product";

class CartDB extends Dexie {
  cart!: Table<ProductDocumentTypes>;

  constructor() {
    super("cartDB");
    this.version(2).stores({
      cart: "_id, __v, description, name, price, quantity",
    });
  }
}

export const db = new CartDB();
