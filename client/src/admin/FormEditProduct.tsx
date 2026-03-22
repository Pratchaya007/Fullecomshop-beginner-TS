import { readProduct, updateProduct } from "@/api/product";
import { useEcomStore } from "@/stores/ecom-store";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Uploadfile from "./Uploadfile";
import { useNavigate, useParams } from "react-router";

export interface ImageItem {
  asset_id: string;
  public_id: string;
  url: string;
  secure_url: string;
}

export interface ProductForm {
  title: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  images: ImageItem[];
}

const initialState: ProductForm = {
  title: "iphone 11 ",
  description: "desc",
  price: 10000,
  quantity: 4,
  categoryId: 5,
  images: [],
};

const FormEditProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState<ProductForm>(initialState);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getCategory();
      fetchProduct(token, Number(id), form);
    }
  }, [token]);

  const fetchProduct = async (token: string, id: number, form: ProductForm) => {
    try {
      const res = await readProduct(token, id, form);
      setForm(res.data.data);
      console.log("res from backend", res);
    } catch (err) {
      console.log("err fetch data", err);
    }
  };

  console.log(form);
  // const handleOcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.name, e.target.value);
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleOcChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token!, Number(id), form);
      toast.success(`Eidt  ${res.data.message} To succeed `);
      // console.log(res.data);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">
        แก้ไขสินค้า
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">ชื่อสินค้า</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={form.title}
              onChange={handleOcChange}
              placeholder="title"
              name="title"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">รายละเอียด</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={form.description}
              onChange={handleOcChange}
              placeholder="description"
              name="description"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">ราคา</label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={form.price}
              onChange={handleOcChange}
              placeholder="price"
              name="price"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">จำนวนสินค้า</label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={form.quantity}
              onChange={handleOcChange}
              placeholder="quantity"
              name="quantity"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-gray-600 mb-1">หมวดหมู่สินค้า</label>
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              name="categoryId"
              onChange={handleOcChange}
              required
              value={form.categoryId}
            >
              <option value="" disabled>
                Please Select
              </option>

              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Upload Image */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">รูปสินค้า</label>

          <div className="border rounded-lg p-4 bg-gray-50">
            <Uploadfile form={form} setForm={setForm} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
        >
          บันทึกการแก้ไขสินค้า
        </button>
      </form>
    </div>
  );
};
export default FormEditProduct;
