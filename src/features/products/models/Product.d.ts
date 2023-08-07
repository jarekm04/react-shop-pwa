export interface ProductTypes {
  name: string;
  price: number;
  description: string;
}

export interface ProductDocumentTypes extends ProductTypes {
  _id: string;
  __v: number;
  
}