import { ProductDocumentTypes } from "./Product";
import { CartTypes } from "./Cart";
import { StatusStateTypes } from "@types/index";

export interface ProductStateTypes extends StatusStateTypes {
  products: ProductDocumentTypes[];
  cart: CartTypes;
}