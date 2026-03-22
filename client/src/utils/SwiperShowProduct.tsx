import { Swiper } from "swiper/react";
// Import Swiper styles crate find .d.ts 
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
// import required modules
import {Autoplay, Navigation, Pagination } from "swiper/modules";


const SwiperShowProduct = () => {
  return (
    <Swiper
        slidesPerView={5}
        spaceBetween={10}
        navigation={true}
        pagination={true}
        modules={[Pagination,Autoplay,Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper  object-cover rounded-md mt-2"
      >
      {/* {children} */}
      </Swiper>
  )
}
export default SwiperShowProduct