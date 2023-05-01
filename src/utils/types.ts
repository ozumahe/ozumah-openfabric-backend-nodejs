import mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
  user: any;
}
