import { useEffect,useState } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: 1500,
      height: 1500,
    });
  
    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  
      // Add event listener on mount
      window.addEventListener('resize', handleResize);
  
      // Call the function right away so that we have the size immediately
      handleResize();
  
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures effect is only run on mount and unmount
  
    return windowSize;
};



export default useWindowSize;