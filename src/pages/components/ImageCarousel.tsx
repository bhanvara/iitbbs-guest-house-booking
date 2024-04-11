
import React, { useEffect, useRef, useState } from 'react';

const slides = [
  {img: 'https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/shr/10-12-18.jpg', alt: 'Slide 1'},
  {img: 'https://www.iitbbs.ac.in/guesth-photos/go-pan-2.jpg', alt: 'Slide 2'},
  {img: 'https://www.iitbbs.ac.in/cst/images/campus/MHR.jpg', alt: 'Slide 3'}
];

export default function CarouselComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<number | null>(null);

  const slideRight = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  }

  const slideLeft = () => {
    const nextSlide = currentSlide - 1;
    if (nextSlide < 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(nextSlide);
    }
  }

  const startAutoSlide = () => {
    slideInterval.current = window.setInterval(slideRight, 2000); // adjust time as needed
  };

  const stopAutoSlide = () => {
    if (slideInterval.current !== null) {
      window.clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    return () => {
      startAutoSlide();
      if(slideInterval.current !== null) {
        window.clearInterval(slideInterval.current); // Cleanup interval upon component unmount
      }
    }
  }, []);

  return (
    <div className="relative overflow-hidden rounded-md w-full bg-cover h-full" onMouseEnter={startAutoSlide} 
    onMouseLeave={stopAutoSlide}>
        {currentSlide>0 && <button onClick={slideLeft} 
                className="z-10 absolute left-0 transform translate-y-28 bg-gray-400 text-white font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out">{'<'}</button>
        }
        <div className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => {
                return (
                    <div 
                        key={index}
                        className={`h-64 w-full bg-center bg-no-repeat bg-cover`}
                        style={{backgroundImage: `url(${slide.img})`, minWidth: '100%'}}
                    >
                    </div>
                )
            })}
        </div>

        {currentSlide<2 && <button onClick={slideRight} 
                className="absolute right-0 top-0 transform translate-y-28 bg-gray-400 text-white font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out">{'>'}</button>
        }
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
            {slides.map((_, index) => {
                return (
                    <div 
                        key={index}
                        className={`p-1 border-solid border-2 bg-gray-800 m-1 
                                    ${currentSlide === index ? 'opacity-100' : 'opacity-50'} 
                                    rounded-full cursor-pointer transition duration-500 ease-in-out`}
                        onClick={() => setCurrentSlide(index)}
                    >
                    </div>
                )
            })}
        </div>
    </div>

  );
}
