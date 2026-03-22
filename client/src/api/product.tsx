import type { ProductForm } from "@/admin/FormProduct";
import axios from "axios";

//Routes Product

interface Product {
  title: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
}

export const createProduct = async (token: string, data: Product) => {
  return await axios.post("http://localhost:3000/api/product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  return await axios.get(`http://localhost:3000/api/products/${count}`);
};

export const readProduct = async (token: string, id: number) => {
  return await axios.get(`http://localhost:3000/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token: string, id: number) => {
  return await axios.delete(`http://localhost:3000/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (
  token: string,
  id: number,
  form: ProductForm,
) => {
  return await axios.put(`http://localhost:3000/api/product/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadfile = async (token: string, form: ProductForm) => {
  return await axios.post(
    "http://localhost:3000/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deletefile = async (token: string, public_id: string) => {
  return await axios.post(
    "http://localhost:3000/api/removeimages",
    {
      public_id, //เขียนแบบนี้มันจะส่งข้อมูลล้วนๆเลย ---> image: form เขียนแบบนี้มันจะเป็นแบบ Key
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};


export const searchFilters = async ( arg:unknown ) => {
  return await axios.post(`http://localhost:3000/api/search/filters`,arg);
};

export const listProductBy = async ( sold:string , order:string, limit:number ) => {
  return await axios.post(`http://localhost:3000/api/productby`,{
    sold , order , limit
  });
};
