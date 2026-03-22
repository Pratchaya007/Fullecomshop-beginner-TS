import { listProductBy } from "@/api/product";
import { useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";

const NewProduct = () => {
  const [data, setData] = useState([]);

  const handleData = () => {
    listProductBy("updatedAt", "desc", 4)
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
    <div className="flex gap-4 justify-center mt-2">
      { 
        Array.isArray(data) &&
          data.map((item, index) => 
            <ProductCard key={index} item={item} />
          )
      }
    </div>
  );
};
export default NewProduct;
