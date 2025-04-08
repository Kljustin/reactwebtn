import React from 'react';
import Slider from 'react-slick';
import './BannerChay.css';

const ImageCarousel = () => {
  const settings = {
    dots: true,            // Hiển thị dấu chấm chuyển slide
    infinite: true,        // Lặp lại vô hạn
    speed: 500,            // Thời gian chuyển slide (ms)
    slidesToShow: 1,       // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1,     // Số lượng slide lướt mỗi lần
    autoplay: true,        // Tự động chạy
    autoplaySpeed: 3000,   // Tốc độ tự động chạy (ms)
  };

  return (
    <div className="carousel-container" style={{ width: '97%', margin: 'auto' }}>
      <Slider {...settings}>
        <div>
          <img src="/images/slide1.jpg" alt="Slide 1" className='img_sl img-fluid'/>
        </div>
        <div>
          <img src="/images/slide2.jpg" alt="Slide 2" className='img_sl img-fluid'/>
        </div>
        <div>
          <img src="/images/slide3.jpg" alt="Slide 3" className='img_sl img-fluid'/>
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;