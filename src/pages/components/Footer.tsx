import { Email, Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import wave from '../../Images/wave2.png'

function Wave(){
    return (
        <svg style={{position: 'absolute', top: 0, zIndex: '-1'}} viewBox="0 0 900 600" width="100%" height="100%" preserveAspectRatio="none">
          <path d="M0 516L21.5 510.8C43 505.7 86 495.3 128.8 487.8C171.7 480.3 214.3 475.7 257.2 479.7C300 483.7 343 496.3 385.8 497.7C428.7 499 471.3 489 514.2 489C557 489 600 499 642.8 496.7C685.7 494.3 728.3 479.7 771.2 474.5C814 469.3 857 473.7 878.5 475.8L900 478L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z" fill="#86aae1" stroke-linecap="round" stroke-linejoin="miter"></path>
        </svg>
    );
}

export const Footer = () => {
  return (
    <div className="flex flex-col p-8 font-inter relative bg-gray-100" >
    
     
    

    <div className="flex flex-col sm:flex-row justify-between items-center sm:text-md text-sm ">
        
        <div className="flex flex-col w-full items-center">
            <h2 className="sm:text-3xl mb-1 text-xl">PORTALS</h2>
            <div className="w-20 border-b-2 border-black mb-4"></div> 
            <div className="flex flex-row justify-between w-3/4 mt-4">
                <div className="flex flex-col justify-between">
                    <a className="text-gray-500 hover:text-black" href="https://new.iitbbs.ac.in/">IIT BBS Official Website</a>
                    <a className="text-gray-500 hover:text-black" href="https://new.iitbbs.ac.in/index.php/home/about-campus/">Campus Life @ IIT BBS</a>
                </div>
                <div className="flex flex-col">
                    <a className="text-gray-500 hover:text-black" href="https://new.iitbbs.ac.in/index.php/home/about/">About IIT BBS</a>
                    <a className="text-gray-500 hover:text-black" href="https://www.google.com/maps/dir/20.1469264,85.6723724/Indian+Institute+Of+Technology+(IIT)+Bhubaneswar,+Argul+-+Jatni+Rd,+Kansapada,+Odisha+752050/@20.1478225,85.6692349,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3a19ac2e52a057f5:0x564b6e83a7504a16!2m2!1d85.6712472!2d20.1483345?entry=ttu">Reach IIT BBS</a>
                </div>
            </div>
            <div className="flex flex-row mt-4 items-center">
                <p className="mr-2">Email</p>
                
                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400">
                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                    </svg>
                </a>

            </div>
        </div>

        

        <div className="flex flex-col w-full items-center mt-4 sm:mt-0">
            <h2 className="sm:text-3xl mb-1 text-xl">ACADEMICS</h2>
            <div className="w-20 border-b-2 border-black mb-4"></div> 
            <div className="flex flex-row  w-3/4 justify-between">
                <div className="flex flex-col justify-between">
                    <a className="text-gray-500 hover:text-black" href="https://new.iitbbs.ac.in/index.php/home/board-of-governors/">Administration IIT BBS</a>
                    <a className="text-gray-500 hover:text-black" href="https://new.iitbbs.ac.in/index.php/home/academics/curriculum-b-tech/">Departments of IIT BBS</a>
                </div>
                <div className="flex flex-col justify-between">
                    <a className="text-gray-500 hover:text-black" href="https://new.iitbbs.ac.in/index.php/faculty-members/">Faculty @ IIT BBS</a>
                    <a className="text-gray-500 hover:text-black" href="https://new.iitbbs.ac.in/index.php/home/career-development-cell/">CDC @ IIT BBS</a>
                </div>
            </div>
            <div className="flex flex-row mt-4 items-center">
                <p>Follow us on</p>
                <div className="flex flex-row">
            
            <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.3 32-32V64.3c0-17.8-14.4-32.3-32-32.3zm-48.2 138.2h-47.2v207h-73.5v-207h-73.5v-66.9h194.2v66.9zm-73.5-74.1c23.2 0 41.9-18.7 41.9-41.9s-18.7-41.9-41.9-41.9-41.9 18.7-41.9 41.9 18.7 41.9 41.9 41.9z"></path>
            </svg>
            </a>


          </div>
            </div>
        </div>
        
    </div>
        <hr></hr>
        <div className="flex flex-col mt-8 items-center">
            <p>Copyright © 2024, All Rights Reserved, IIT Bhubaneswar</p>
        </div>
    </div>
  );
};