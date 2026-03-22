import { useEcomStore } from "@/stores/ecom-store";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity,
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct,
  );
  const GetTotalPrice = useEcomStore((state) => state.GetTotalPrice);
  // console.log(carts);

  return (
    <div >
      <h1>ตะกร้าสินค้า</h1>
      {/* Border */}
      <div className="border p-2">
        {/* card */}
        {carts.map((item, index) => (
          <div key={index} className="bg-white p-2">
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

                <div className="flex flex-col ">
                  <span className="font-extralight">{item.title}</span>
                  <span className="font-extralight text-sm">
                    {item.description}
                  </span>
                </div>
              </div>
              {/* Right */}
              <div>
                <IoTrashBin
                  className="text-2xl text-red-400"
                  onClick={() => actionRemoveProduct(item.id)}
                />
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex justify-between mt-5">
              <div className="flex items-center gap-3 p-1 border shadow">
                <div className="bg-gray-200 px-2">
                  <button
                    onClick={() =>
                      actionUpdateQuantity(item.id, item.count - 1)
                    }
                  >
                    -
                  </button>
                </div>
                <div>
                  <p className="font-extralight">{item.count}</p>
                </div>
                <div className="bg-gray-200 px-2">
                  <button
                    onClick={() =>
                      actionUpdateQuantity(item.id, item.count + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div>{item.price * item.count}</div>
            </div>
          </div>
        ))}

        {/* Total */}
        <div>
          <div className="flex justify-between items-center mt-5">
            <h1>Total :</h1>
            <p>{GetTotalPrice()}</p>
          </div>
          <hr className="mt-2" />
          <div className="bg-green-400 mt-5 rounded-md hover:scale-105 hover:duration-150">
            <Link to={'/cart'}>
              <p className="text-center p-1 text-white active:bg-green-300 active:rounded-md">
                ดำเนินการชำระเงิน
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartCard;
