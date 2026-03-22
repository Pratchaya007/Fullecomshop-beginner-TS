import { useEcomStore } from "@/stores/ecom-store";
import { TiShoppingCart } from "react-icons/ti";
import { motion } from "motion/react"

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: {
    url: string;
    public_id: string;
  }[];
}
interface ProductCardProps {
  item: Product;
}

const ProductCard = ({ item }: ProductCardProps) => {
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart)
  // console.log(actionAddToCart)
  // console.log(item);
  // console.log(item.images[0].url)
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
    <div className="border rounded-md shadow-md p-2 w-44">
      <div>
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0].url} alt="images" className=" rounded-md w-full h-26 object-cover hover:scale-110 hover:duration-200" />
        ) : (
          <div className="w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
            No Image
          </div>
        )}
        {/* <img src={item.images[0].url} alt="" /> */}
      </div>

      <div className="py-2">
        {/* truncate กันข้อความยาวในการป้อนข้อมูล */}
        <p className="text-md truncate">{item.title}</p>
        <p className="text-sm text-gray-500 truncate">{item.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-extralight">{item.price}</span>
        <button className=" hover:bg-blue-400 rounded shadow-2xl hover:scale-110" onClick={() => actionAddToCart(item)}>
          <TiShoppingCart className="text-blue-500 text-lg hover:text-white" />
        </button>
      </div>
    </div>
    </motion.div>
  );
};
export default ProductCard;
