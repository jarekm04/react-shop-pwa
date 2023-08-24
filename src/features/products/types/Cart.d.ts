import { ProductDocumentTypes } from "./Product";

export interface CartItemTypes extends ProductDocumentTypes {
  quantity: number;
}

export type CartTypes = CartItemTypes[];
