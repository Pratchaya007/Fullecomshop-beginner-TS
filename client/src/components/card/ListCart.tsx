import { createUserCart } from "@/api/user";
import { useEcomStore } from "@/stores/ecom-store";
import { FaList } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

function ListCart() {
  const cart = useEcomStore((state) => state.carts);
  const GetTotalPrice = useEcomStore((state) => state.GetTotalPrice);
  const token = useEcomStore((state) => state.token)
  const user = useEcomStore((state) => state.user);
  const navigate = useNavigate();

  // console.log(carts)
  console.log({cart}) //แปลงให้เป็น array ตาม api


  const handleSaveCart = async () => {
    await createUserCart( token! , { cart })
    .then(() => {
      navigate('/checkout')
    })
    .catch((err) => {
      console.log(err)
      toast.warning(err.response.data.message)
    })
  }


  // console.log(user);
  return (
    <div className="bg-gray-100 rounded-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FaList className="text-lg" />
        <p className="text-lg">รายการสินค้า {cart.length} รายการ</p>
      </div>
      {/* List */}
      <div>
        {/* Left */}
        <div>
          {/* card */}
          {cart.map((item, index) => (
            <div key={index} className="bg-white p-2 mt-1.5">
              {/* Row 1 */}
              <div className="flex justify-between items-center">
                {/* Left */}
                <div className="flex gap-2 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt="imgProduct"
                      className="w-16 h-16 rounded-lg"
                    />
                  ) : (
                    <div className="w-25 h-16 bg-gray-200 rounded-md text-center">
                      No Image
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="font-extralight">{item.title}</span>
                    <span className="font-extralight text-sm">
                      {item.price} x {item.count}
                    </span>
                  </div>
                </div>
                <div>
                  <div>{item.price * item.count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right */}
        <div className="bg-white p-2 rounded-md shadow-md mt-2">
          <p>ยอดรวม</p>
          <div className="flex justify-between mt-2">
            <span>รวมสุทธิ</span>
            <span>{GetTotalPrice()}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-3">
            {user ? (
              //disabled={cart.length < 1} มากกว่า 1 ถึงคลิกได้ ❗️
              <button className="bg-green-400  py-1 text-white flex-1 rounded-md hover:scale-101 active:bg-green-300 duration-150" disabled={cart.length < 1}>
                <Link to={""} onClick={handleSaveCart}>
                  <p className="text-center">คำสั่งซื้อ</p>
                </Link>
              </button>
            ) : (
              <div className="bg-blue-400  py-1 text-white flex-1 rounded-md hover:scale-101 active:bg-blue-300 duration-150">
                <Link to={"/login"}>
                  <p className="text-center">Login</p>
                </Link>
              </div>
            )}

            <div className="bg-red-400  py-1 text-white flex-1 rounded-md hover:scale-101 active:bg-red-300 duration-150">
              <Link to={"/shop"}>
                <p className="text-center">แก้ไขรายการ</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListCart;
