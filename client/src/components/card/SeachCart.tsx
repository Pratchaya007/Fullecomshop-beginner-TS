import { useEcomStore } from "@/stores/ecom-store";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SeachCart = () => {
  const products = useEcomStore((state) => state.product);

  //Search Text ✅
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionSearchFilter = useEcomStore((state) => state.actionSearchFilters);

  //Search Category ✅
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  // console.log(categories)

  const [text, setText] = useState("");
  const [datacate, setDataCate] = useState<string[]>([]);
  const [price, setPrice] = useState([10, 100]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory()
  },[])

  //Step 1 Search Text
  useEffect(() => {
    const delay = setTimeout(() => {
      // actionSearchFilter({query:text})
      // console.log("text:", text)

      if (text) {
        actionSearchFilter({ query: text });
      } else {
        // console.log("get all")
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);
  //Step 2 Search by Category
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    const incheck = e.target.value; //ค่าที่เราเลือก
    const inState = [...datacate]; //[] array ว่าง
    const findcheck = inState.indexOf(incheck); // ถ้าไม่เจอจะ จะเก็บ -1 ถ้าเจอจะเก็บเป็นลำดับ index

    if (findcheck === -1) {
      inState.push(incheck);
    } else {
      inState.splice(findcheck, 1);
    }
    setDataCate(inState);

    if (inState.length > 0) {
      actionSearchFilter({ category: inState });
    } else {
      getProduct();
    }
  };
  // console.log(datacate); //['6', '5', '4', '3'] ทำให้เป็นแบบนี้เวลาเราเลือก
  //Step 3 Search by Price rc-slider
  useEffect(() => {
    actionSearchFilter({ price });
  }, [ok]);

  const handlePrice = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrice(value);
    } else {
      setPrice([value]);
    }

    setTimeout(() => {
      setOk((prev) => !prev);
    }, 300);
  };

  // console.log(categories)

  return (
    <div >
      {/* search text */}
      <div className="flex flex-col">
        <h1 className="text-md font-bold mb-4">ค้นหาสินค้า</h1>
        <input
          type="text"
          className="border rounded-md px-2"
          placeholder="ค้นหาสินค้า...."
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {products.length === 0 && text ? (
        <div className="text-center w-full mt-4 text-red-500">
          <p className="text-sm font-semibold">ไม่พบสินค้า</p>
          <p className="text-[10px]">ไม่พบสินค้า "{text}"</p>
        </div>
      ) : (
        ""
      )}
      {/* search cotegory */}
      <div className="mt-3">
        <h1 className="font-extralight text-sm">หมวดหมู่สินค้า</h1>
        <div className="mt-3">
          {categories.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input type="checkbox" value={item.id} onChange={handleCheck} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Search by price */}
      <div className="mt-5">
        <h1>ค้นหาราคา</h1>
        <div>
          <div className="flex justify-between mt-3">
            <span className="text-sm">Min: {price[0]}</span>
            <span className="text-sm">Max: {price[1]}</span>
          </div>
          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={500}
            defaultValue={[100, 400]}
          />
        </div>
      </div>
    </div>
  );
};
export default SeachCart;
