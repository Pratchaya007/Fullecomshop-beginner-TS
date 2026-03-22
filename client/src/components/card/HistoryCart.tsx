import { getOrder } from "@/api/user";
import { useEcomStore } from "@/stores/ecom-store";
import { useEffect, useState } from "react";

export  interface orderControl {
  id:number
  updatedAt: Date;
  orderStatus: string;
  cartTotal: number;
  createdAt: Date
  orderedBy: {
    email:string
    address:string
  }
  products: {
    count: number
    product: {
      title: string;
      price: number;
      quantity: number;
    };
  }[];
}
const HistoryCart = () => {
  const token = useEcomStore((state) => state.token);
  const [order, setOrder] = useState<orderControl[]>([]);

  const hdlgetOrder = async (token: string) => {
    await getOrder(token!)
      .then((res) => {
        // console.log(res);
        setOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      hdlgetOrder(token);
    }
  }, [token]);

  // console.log(order);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Order History</h1>

      {order?.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border p-5 space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium text-gray-800">
                  {new Date(item.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                {item.orderStatus}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3">Product</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-right">QTY</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {item?.products.map((product, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3 font-medium text-gray-800">
                          {product.product.title}
                        </td>
                        <td className="p-3 text-right">
                          ฿{product.product.price.toLocaleString()}
                        </td>
                        <td className="p-3 text-right">{product.count}</td>
                        <td className="p-3 text-right font-semibold">
                          ฿
                          {(
                            product.count * product.product.price
                          ).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-green-600">
                  ฿{item.cartTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default HistoryCart;
