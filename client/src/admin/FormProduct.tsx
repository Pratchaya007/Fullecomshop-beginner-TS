import { createProduct, deleteProduct } from "@/api/product";
import { useEcomStore } from "@/stores/ecom-store";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router";
import { numberFormat } from "@/utils/number";

interface ImageItem {
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
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: 0,
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.product);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
    images: [],
  });
  // console.log(products);

  useEffect(() => {
    if (token) {
      getCategory();
      getProduct(50);
    }
  }, [token]);

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
      const res = await createProduct(token!, form);
      setForm(initialState);
      getProduct();
      toast.success(`create ${res.data.data.title} To succeed `);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    //Parameter จะรับค่าตามลำดับ fn(a,b,c)
    if (window.confirm("คุณต้องการลบข้อมูลใช่ไหม")) {
      try {
        const res = await deleteProduct(token!, id);
        toast.success("Delete succeed ");
        getProduct()
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold text-gray-700 border-b pb-2">
          เพิ่มข้อมูลสินค้า
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">ชื่อสินค้า</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.title}
              onChange={handleOcChange}
              placeholder="title"
              name="title"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">รายละเอียด</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.description}
              onChange={handleOcChange}
              placeholder="description"
              name="description"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">ราคา</label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.price}
              onChange={handleOcChange}
              placeholder="price"
              name="price"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">จำนวนสินค้า</label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.quantity}
              onChange={handleOcChange}
              placeholder="quantity"
              name="quantity"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-gray-600">หมวดหมู่สินค้า</label>
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Upload image */}
        <div>
          <label className="text-sm text-gray-600">รูปสินค้า</label>
          <Uploadfile form={form} setForm={setForm} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
        >
          เพิ่มสินค้า
        </button>
      </form>
      <div className="max-w-6xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          รายการสินค้า
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">No.</th>
                <th className="px-4 py-3">รูปภาพ</th>
                <th className="px-4 py-3">ชื่อสินค้า</th>
                <th className="px-4 py-3">รายละเอียด</th>
                <th className="px-4 py-3">ราคา</th>
                <th className="px-4 py-3">จำนวน</th>
                <th className="px-4 py-3">ขายแล้ว</th>
                <th className="px-4 py-3">อัปเดทล่าสุด</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.id}</td>

                  <td className="px-4 py-3">
                    {item.images.length > 0 ? (
                      <img
                        src={item.images[0]?.url}
                        className="w-14 h-14 object-cover rounded-lg shadow"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 text-xs text-gray-500 rounded-md">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3 font-medium">{item.title}</td>

                  <td className="px-4 py-3 text-gray-600">
                    {item.description}
                  </td>

                  <td className="px-4 py-3 font-medium text-blue-600">
                    ฿{numberFormat(item.price) }
                  </td>

                  <td className="px-4 py-3">{item.quantity}</td>

                  <td className="px-4 py-3">{item.sold}</td>

                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      <Link
                        to={`/admin/product/${item.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default FormProduct;
