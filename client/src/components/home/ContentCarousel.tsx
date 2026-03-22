import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles crate find .d.ts 
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
// import required modules
import {Autoplay, Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";

interface images {
  download_url: string
}

const ContentCarousel = () => {
  const [dateimage, setDateimage] = useState<images[]>([]);

  const hdlGetImage = async () => {
    await axios
      .get(`https://picsum.photos/v2/list?page=1&limit=15`)
      .then((res) => {
        // console.log(res);
        setDateimage(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    hdlGetImage();
  }, []);

  // console.log(dateimage);

  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Pagination,Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 object-cover rounded-md"
      >
        {dateimage?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item.download_url} alt="img"  />
            </SwiperSlide>
          );
        })}
      </Swiper>

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
        {dateimage?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item.download_url} alt="img"  />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default ContentCarousel;
