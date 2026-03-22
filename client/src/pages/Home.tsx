import BestSeller from "@/components/home/BestSeller"
import ContentCarousel from "@/components/home/ContentCarousel"
import NewProduct from "@/components/home/NewProduct"

const Home = () => {
  

  return (
    <div className=" xl:max-w-5xl lg:max-w-4xl md:max-w-xl max-w-xl mx-auto px-5 py-3">
      <ContentCarousel/>

      <p className="text-2xl font-bold text-red-400 animate-pulse text-center mt-2">สินค้าขายดีประจำเดือน !!</p>
      <BestSeller/>

      <p className="text-2xl font-bold text-green-400 animate-pulse text-center mt-2">สินค้าใหม่วันนี้ !!</p>
      <NewProduct/>
    </div>
    
  )
}
export default Home