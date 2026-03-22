import { listProductBy } from "@/api/product";
import { useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";

const BestSeller = () => {
  const [data, setData] = useState([]);

  const handleData = () => {
    listProductBy("sold", "desc", 4)
      .then((res) => {
        // console.log(res)
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);
  useEffect(() => {
    handleData();
  }, []);
  return (
    <div className="flex flex-wrap justify-center gap-3.5 mt-3">
      { 
        Array.isArray(data) &&
          data.map((item, index) => 
            <ProductCard key={index} item={item} />
          )
      }
    </div>
  );
};
export default BestSeller;
