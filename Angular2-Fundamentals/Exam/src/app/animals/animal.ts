export interface Animal {
  id: number;
  name: string;
  age: number;
  color: string;
  type: string;/* (type can be Cat, Dog, Bunny, Exotic or Other)*/
  price: number;
  image: string;/* URL*/ 
  breed?: string; 
}
