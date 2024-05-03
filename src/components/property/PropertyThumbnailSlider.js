import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { Divider } from '@chakra-ui/react';


const PropertyThumbnailSlider = ({ photos }) => {
  const [thumbsSwiper,  setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper 
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Navigation, Thumbs, FreeMode]}
        className="mySwiper2"
      >
        {photos.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Divider marginY='1rem' />
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs, FreeMode]}
        className="mySwiper"
      >
        {photos.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default PropertyThumbnailSlider;