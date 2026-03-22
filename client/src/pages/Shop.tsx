import CartCard from "@/components/card/CartCard";
import ProductCard from "@/components/card/ProductCard";
import SeachCart from "@/components/card/SeachCart";
import { useEcomStore } from "@/stores/ecom-store";
import { useEffect } from "react";

const Shop = () => {
  const getproduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.product)

  useEffect(()=>{
    getproduct()
  },[])
  

  return (
    <div className="flex">
      {/* searchBar */}
      <div className="w-1/4 bg-gray-100 h-screen p-4">
      <SeachCart/>
      </div>
      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p>สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-5">
          {/* Product Card */}
          {
            products.map((item , index) => 
              <ProductCard key={index} item={item}/>
            )
          }
          
          {/* Product Card */}
        </div>
      </div>
      {/* Cart */}
      <div className="w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto">
          <CartCard/>
      </div>
    </div>
  );
};
export default Shop;
