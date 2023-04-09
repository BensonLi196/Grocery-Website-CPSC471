import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
    {
      color: '#F5A623',
      caption: 'Conveniently shop with our Shopping List feature!',
    },
    {
      color: '#4A90E2',
      caption: 'Browse items with ease!',
    },
    {
      color: '#BD10E0',
      caption: 'Register and Login to start creating lists!',
    },
    {
        color: 'lightgreen',
        caption: 'Check out our discounts!',
    }
  ];
  
  function Slideshow() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    const slideStyle = {
        height: '350px',
        width: '55%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
        padding: '20px',
        margin: '0 auto'
      };
      
      const captionStyle = {
        height: '400px',
        width: '100%',
        padding: '20px',
        textAlign: 'center',
        fontSize: '56px',
        fontFamily: 'Roboto',
        borderRadius: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      };
  
    return (
      <div style={{ maxWidth: 'fit', margin: '0 auto', textAlign: 'center' }}>
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.color} style={{ ...slideStyle, backgroundColor: slide.color }}>
              <div style={{ ...captionStyle, backgroundColor: slide.color }}>{slide.caption}</div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
  
  export default Slideshow;