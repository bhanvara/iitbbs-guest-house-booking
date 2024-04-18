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
    <div className="flex flex-col sm:p-8 font-inter relative bg-gray-100 mb-16 sm:mb-0" >
    
     
    

    <div className="flex flex-col sm:flex-row justify-between items-center sm:text-md text-sm ">
        
        <div className="flex flex-col w-full items-center">
            <h2 className="sm:text-3xl mb-1 text-xl mt-1">PORTALS</h2>
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
                <p className="mr-2">Email: </p>
                <a href="mailto:office.gh@iitbbs.ac.in" className="underline">office.gh@iitbbs.ac.in</a>
                
                <a href="mailto:example@office.gh@iitbbs.ac.in" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400">
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
            
            <a href="https://www.facebook.com/iitbbs/" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </a>
            <a href="https://twitter.com/iitbbs?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
            </svg>
            </a>
            <a href="https://www.linkedin.com/school/indian-institute-of-technology-bhubaneswar/" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400 transition-colors duration-100">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/>
            </svg>
            </a>


          </div>
            </div>
        </div>
        
    </div>
        <hr></hr>
        <div className="flex flex-col mt-8 items-center">
            <p className="text-center">Copyright © 2024, All Rights Reserved, IIT Bhubaneswar</p>
        </div>
    </div>
  );
};