import { getUserCart, saveAddress } from "@/api/user";
import { useEcomStore } from "@/stores/ecom-store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface UserItem {
  count: number
  product: {
    price: number
    title: string
  }
}
const SummaryCard = () => {
  const [user, setUser] = useState<UserItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const token = useEcomStore((state) => state.token);

  const [ address , setAddress ] = useState('')
  const [ addressSaved , setAddressSaved] = useState(false)

  const navigate = useNavigate();

  
  const handleGetUserCart = async (token: string) => {
    await getUserCart(token!)
      .then((res) => {
        // console.log(res);
        setUser(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
    handleGetUserCart(token);
  }
  }, [token]);

  const handleSaveAddress = () => {
    // console.log(address)
    saveAddress(token!,address)
    .then((res) => {
      console.log(res)
      toast.success("Save The address information")
      setAddressSaved(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleGotoPayment = () => {
    if(!addressSaved) {
      return toast.warning("Please enter your address..")
    }
    navigate('/user/payment');
  }

  // console.log(user);
  return (
    <div className="mx-auto ">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left */}
        <div className="">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-x-4 ">
            <h1 className="mb-3">ที่อยู่ในการจัดส่ง</h1>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-2 rounded-md bg-white "
              placeholder="กรุณากรอกที่อยู่ของคุณ"
              required
            ></textarea>
            <button className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 hover:scale-105 hover:duration-200 mt-4" onClick={handleSaveAddress}>
              Save Address
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="md:w-2/4 ">
          <div className="bg-white p-4 rounded-md border shadow-md space-x-4">
            <p className="font-bold mb-4">คำสั่งซื้อของคุณ</p>

            {user.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <p>{item.product.title}</p>
                  <p className="">{item.product.price}</p>
                </div>
                <div className="flex gap-1">
                  <h1 className="text-[12px] text-gray-400">จำนวน: {item.count}</h1>
                  <h2 className="text-[12px] text-gray-400"> x {item.product.price}</h2>
                </div>
              </div>
            ))}

            <hr className="my-4" />
            <div>
              <div className="flex justify-between mb-2">
                <p>ค่าจัดส่ง:</p>
                <p>$0.00</p>
              </div>
              <div className="flex justify-between">
                <p>ค่าส่วนลด:</p>
                <p>$0.00</p>
              </div>
            </div>
            <hr className="my-3 " />
            <div className="flex justify-between sm:pr-3.5 md:pr-0">
              <h1>ยอดรวมสุทธิ:</h1>
              <p>{cartTotal} THB</p>
            </div>
            <div className="text-center bg-red-500 py-2 rounded-lg mt-4" >
              <button className="text-white"  onClick={handleGotoPayment} >ดำเนินการชำระเงิน</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SummaryCard;
