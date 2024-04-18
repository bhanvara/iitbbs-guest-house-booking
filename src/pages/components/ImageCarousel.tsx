
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../functions/windowSize';





interface CarouselProps{
  hostelLabel:string,
}


export default function ImageCarousel({hostelLabel}:CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const slideInterval = useRef<null | NodeJS.Timeout>(null);
  const [autoSlide, setAutoSlide] = useState(false);
  const slidesCount=3;
  const width=useWindowSize();
  
  
  type Slide = {
    img: string;
    alt: string;
  };
  

  const MHRslides: Slide[] = [
    {img: 'https://www.iitbbs.ac.in/cst/images/campus/MHR.jpg', alt: 'Slide 1'},
    {img: 'https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/mhr/mhr1.jpg', alt: 'Slide 2'},
    {img: 'https://qph.cf2.quoracdn.net/main-qimg-5a7221c792e65aed514c20e8a6c92a43-lq', alt: 'Slide 3'}
  ];
  const GHRslides: Slide[] = [
    {img: 'https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/GH-2/29-02-20.jpg', alt: 'Slide 1'},
    {img: 'https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/GH-2/31-01-20.jpg', alt: 'Slide 2'},
    {img: 'https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/GH-2/13-05-20.jpg', alt: 'Slide 3'}
  ];
  const SHRslides: Slide[] = [
    {img: 'https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/shr/10-12-18.jpg', alt: 'Slide 1'},
    {img: 'https://www.iitbbs.ac.in/cst/images/campus/SHR.jpg', alt: 'Slide 2'},
    {img: 'https://qph.cf2.quoracdn.net/main-qimg-8ec806edc7d61149f1f76ce43020749c-lq', alt: 'Slide 3'}
  ];
  const RHRslides: Slide[] = [
    {img: 'https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/BH-3/rhr-02042022.jpg', alt: 'Slide 1'},
    {img: 'https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/BH-3/01-02-22.jpg', alt: 'Slide 2'},
    {img: 'https://images.odishatv.in/uploadimage/library/16_9/16_9_2/IMAGE_1629457320.jpg', alt: 'Slide 3'}
  ];
  const BHRslides: Slide[] = [
    {img: 'https://qph.cf2.quoracdn.net/main-qimg-c567835e20b175cac5168f9473ad157e', alt: 'Slide 1'},
    {img: 'https://vishalgeetgupta.files.wordpress.com/2020/03/dsc_1043-02-01-1.jpeg', alt: 'Slide 2'},
    {img: 'https://qph.cf2.quoracdn.net/main-qimg-bdd4f0b6b179fb0b9d857dea2f0e7fb3', alt: 'Slide 3'}
  ];
  const GHslides: Slide[] = [
    {img: 'https://www.iitbbs.ac.in/guesth-photos/go-pan-2.jpg', alt: 'Slide 1'},
    {img: 'https://www.iitbbs.ac.in/gh/img/bg8.jpg', alt: 'Slide 2'},
    {img: 'https://www.iitbbs.ac.in/gh/img/bg2.jpg', alt: 'Slide 3'}
  ];

  const instituteSlides: Slide[] = [
    {img: 'https://www.iitbbs.ac.in/cst/images/campus/MAIN%20GATE.jpg', alt: 'Slide 1'},
    {img: 'https://www.oracleiitbbs.in/assets/img/gallery/image_10.jpg', alt: 'Slide 2'},
    {img: 'https://new.iitbbs.ac.in/wp-content/uploads/2024/04/slide-2.jpg', alt: 'Slide 3'}
  ];
  
  
  type ImageLinks = {
    [key: string]: Slide[] | undefined;
  };
  
  const imageLinks: ImageLinks = {
    MHR: MHRslides,
    GHR: GHRslides,
    SHR: SHRslides,
    RHR: RHRslides,
    GH: GHslides,
    BHR: BHRslides,
    institute: instituteSlides,

  };
  


  const startStopSlide = () => {
    if (autoSlide) {
      // Start the interval
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          return (prevSlide + 1) % 3;
        });
      }, 2000);
    } else {
      // Stop the interval
      if (slideInterval.current !== null) {
        clearInterval(slideInterval.current);
      }
    }
  };

  useEffect(() => {
    startStopSlide();
    return () => {
      if (slideInterval.current !== null) {
        clearInterval(slideInterval.current);
      }
    };
  }, [autoSlide]);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 640) {
            setAutoSlide(true);
        } 
    }

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Bind the event listener on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener once the component unmounts
    return () => window.removeEventListener('resize', handleResize);
}); // Empty array ensures that effect is only run on mount and unmount

  
  



  const slideRight = () => {
    setCurrentSlide((currentSlide + 1) % slidesCount);
  }

  const slideLeft = () => {
    const nextSlide = currentSlide - 1;
    if (nextSlide < 0) {
      setCurrentSlide(slidesCount - 1);
    } else {
      setCurrentSlide(nextSlide);
    }
  }

  

  

  return (
    <div className="relative overflow-hidden rounded-xl hover:rounded-sm w-full bg-cover h-full transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl hover:border-2" 
    onMouseEnter={() => {
        setShowButton(true);
      }}
      onMouseLeave={() => {

        setShowButton(false);
      }}
      
    >
        {currentSlide>0 && <button onClick={slideLeft} 
        onMouseEnter={()=>setAutoSlide(false)}
        
        style={{opacity: showButton ?'60%':0}}
                className={`ml-1 z-10 absolute left-0 transform ${hostelLabel === 'institute' ? 'translate-y-48' : 'translate-y-28'} bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out flex flex-row justify-between items-center`}>{'<'}</button>
        }
        <div className="flex transition-transform duration-500 ease-in-out" 
            onMouseEnter={()=>{setAutoSlide(true)}}
            onMouseLeave={()=>{setAutoSlide(false)}}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {imageLinks[hostelLabel]?.map((slide, index) => {
                return (
                    <div 
                        key={index}
                        className={`h-64 w-full bg-center bg-no-repeat bg-cover hover:shadow-xl`}
                        style={{backgroundImage: `url(${slide.img})`, minWidth: '100%',minHeight:hostelLabel==='institute' ? '400px':''}}
                        
                    >
                    </div>
                )
            })}
        </div>

        {currentSlide<2 && <button onClick={slideRight} 
                onMouseEnter={()=>setAutoSlide(false)}
                style={{opacity: showButton ?'60%':0}}
                className={`absolute right-0 top-0 transform ${hostelLabel === 'institute' ? 'translate-y-48' : 'translate-y-28'} bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out`}>
                {'>'}
                </button>
        }
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
            {imageLinks[hostelLabel]?.map((_, index) => {
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
