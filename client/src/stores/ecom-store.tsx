import { listCategory } from "@/api/Categorys";
import { listProduct, searchFilters } from "@/api/product";
import axios, { type AxiosResponse } from "axios";
import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import _ from "lodash";

interface login {
  email: string;
  password: string;
}

interface ImageItem {
  asset_id: string;
  public_id: string;
  url: string;
  secure_url: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  updatedAt: string;
  count: number;
  images: ImageItem[];
}

interface Categorys {
  id: number;
  name: string;
}

interface EcomState {
  user: unknown;
  token: string | null;
  categories: Categorys[];
  product: Product[]; //ช่วยให้เวลาเรา map ข้อมูลที่แม่นขึ้น
  carts: Product[];

  actionLogin: (data: login) => Promise<AxiosResponse>;
  getCategory: () => Promise<void>;
  getProduct: (count?: number) => Promise<void>;
  actionSearchFilters: (arg: unknown) => Promise<void>;
  actionAddToCart: (product: Product) => void;
  actionUpdateQuantity: (productId: number, newQuantity: number) => void;
  actionRemoveProduct: (productId: number) => void;
  GetTotalPrice: () => number;
  clearCart: () => void;
  logout: () => void;

  //setToken: (token: string) => void แบบไม่มี async fn ธรรมดา
}

const ecomStore: StateCreator<EcomState> = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  product: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      product: [],
      carts: [],
    });
  },

  //ทำงานให้เพื่อน unqie เพื่อให้ไม่สามารถเลือกซ้ำกันได้
  actionAddToCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    //step uniqe lodash
    const uniqe = _.unionWith(updateCart, _.isEqual);
    // console.log('click add in zustand',updateCart)//เราเลือกได้หมดซ้ำก็เลือกได้
    // console.log('uniqe',uniqe)//ถ้าแปลงเป็น uniqe แล้วจะไม่สามารถเลือกซ้ำได้

    set({ carts: uniqe });
  },
  //เพิ่มลบในจำนวนของตัวเลือกตะกร้า
  actionUpdateQuantity: (productId, newQuantity) => {
    console.log("Update clickkk", productId, newQuantity);
    set((state) => ({
      //การเข้าถึงข้อมูล
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) } //ตั้งค่าต่ำสุดคือ 1
          : item,
      ),
    }));
  },
  // ลบสินค้าในตะกร้า
  actionRemoveProduct: (productId) => {
    // console.log('Remove card',productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  GetTotalPrice: () => {
    // console.log('')
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  actionLogin: async (data: login) => {
    const res = await axios.post("http://localhost:3000/auth/login", data);
    // console.log(res.data.token)
    set({
      // เหมือนกับเราส่งข้อมูลมาให้เข้าล๊อค
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  //get category
  getCategory: async () => {
    try {
      const res = await listCategory();
      console.log(res);
      set({ categories: res.data.data });
    } catch (err) {
      console.log(err);
    }
  },
  //Get Product
  getProduct: async (count: number = 20) => {
    try {
      const res = await listProduct(count);
      set({ product: res.data.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ product: res.data.data });
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => {
    set({ carts: [] });
  },
});
const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage), //persist and createJSONStorage บันทึกลงใน local
};

export const useEcomStore = create(persist(ecomStore, usePersist));
