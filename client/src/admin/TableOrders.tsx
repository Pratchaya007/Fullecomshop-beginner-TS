import { changeOrderStatus, getOrdersAdmin } from "@/api/admin";
import type { orderControl } from "@/components/card/HistoryCart";
import { useEcomStore } from "@/stores/ecom-store";
import { numberFormat } from "@/utils/number";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { dateFormat } from "@/utils/dateformat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState<orderControl[]>([]);

  const handleGetOrder = (token: string) => {
    getOrdersAdmin(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const  handleOcChangeOrderStatus = ( token:string, orderId:number ,orderStatus:string ) => {
    console.log(orderId, orderStatus)
    changeOrderStatus(token,orderId,orderStatus)
    .then((res) => {
      console.log(res)
      toast.success('Update Status Success!!')
      handleGetOrder(token)
    })
    .catch((err) =>{
      console.log(err)
    })
  }


  useEffect(() => {
    if (token) {
      handleGetOrder(token);
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-sm border rounded-2xl p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">
    Orders Management
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      {/* HEAD */}
      <thead>
        <tr className="text-left text-gray-500 border-b">
          <th className="py-3 px-2">#</th>
          <th className="py-3 px-2">User</th>
          <th className="py-3 px-2">Date Time</th>
          <th className="py-3 px-2">Products</th>
          <th className="py-3 px-2 text-right">Total</th>
          <th className="py-3 px-2 text-center">Status</th>
          <th className="py-3 px-2 text-center">Manage</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {orders?.map((item, index) => (
          <tr
            key={index}
            className="border-b last:border-0 hover:bg-gray-50 transition"
          >
            {/* INDEX */}
            <td className="py-4 px-2 font-medium text-gray-700">
              {index + 1}
            </td>

            {/* USER */}
            <td className="py-4 px-2">
              <p className="font-medium text-gray-800">
                {item.orderedBy.email}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-45">
                {item.orderedBy.address}
              </p>
            </td>

            <td>
              {/* {moment(item.createdAt).format('L')} */}
              {dateFormat(item.createdAt)}
            </td>  

            {/* PRODUCTS */}
            <td className="py-4 px-2 space-y-1">
              {item.products?.map((product, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <p className="text-gray-700 truncate max-w-45">
                    {product.product.title}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {product.count} × ฿
                    {product.product.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </td>

            {/* TOTAL */}
            <td className="py-4 px-2 text-right font-semibold text-gray-800">
              ฿{numberFormat(item.cartTotal)}
            </td>

            {/* STATUS */}
            <td className="py-4 px-2 text-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  item.orderStatus === "Completed"
                    ? "bg-green-100 text-green-600"
                    : item.orderStatus === "Processing"
                    ? "bg-blue-100 text-blue-600"
                    : item.orderStatus === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.orderStatus}
              </span>
            </td>

            {/* ACTION */}
            <td className="py-4 px-2 text-center">
              <select
                value={item.orderStatus}
                onChange={(e) =>
                  handleOcChangeOrderStatus(
                    token!,
                    item.id,
                    e.target.value
                  )
                }
                className="text-xs border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Not Process</option>
                <option>Processing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};
export default TableOrders;
