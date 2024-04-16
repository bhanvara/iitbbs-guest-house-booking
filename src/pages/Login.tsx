import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!validateEmail(username)) {
          alert("Please enter a valid email");
          return;
        }
        
      
        // handle the sign in logic here after submission for student
        
        console.log('Student Username:', username);
        console.log('Student Password:', password);

        //To clear
        setUsername("");
        setPassword("");
        
    
        // After successful signup navigate to student dashboard page
    
        navigate('/');
      };

      //To check for valid email
      const validateEmail = (email:any) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
      };

    return (      
        <div className="w-full max-w-sm p-6 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="mx-auto font-inter text-4xl text-gray-700 text-left">
                {/* <img className="h-auto w-1/4" src={Logo} alt="" /> */}
                Sign in
                <p className="mt-2 font-inter text-sm">Sign in to IIT BBS Guest House Booking Portal</p>
            </div>

            <form className="mt-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block text-sm text-gray-800 dark:text-gray-200">Email Address</label>
                    <input 
                        type="text" 
                        placeholder='Email' 
                        required 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); }}
                    />
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                        
                    </div>

                    
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => { setPassword(e.target.value); }}
                            required
                        />
                        <i
                            onClick={handleClickShowPassword}
                            className={"absolute inset-y-0 right-0 pr-3 mt-2 cursor-pointer " + (showPassword ? 'block' : 'hidden')}
                        >
                            <Visibility fontSize="small"/>
                        </i>
                        <i
                            onClick={handleClickShowPassword}
                            className={"absolute inset-y-0 right-0 pr-3 mt-2 cursor-pointer " + (!showPassword ? 'block' : 'hidden')}
                        >
                            <VisibilityOff fontSize="small" />
                              </i>
                    </div>
                            
                    
                    <div className="w-full text-right">
                        <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline"><LockOpenIcon style={{color: '#2e5caf', width: '0.88rem'}} /> Forget Password?</a>
                    </div>
                </div>

                <div className="mt-6">
                    <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-custom-blue rounded-lg hover:bg-dark-custom-blue focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Sign in
                    </button>
                </div>
            </form>

            <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                <div className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
                    or login with Google
                </div>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
                <button type="button" className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-gray-400 border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-700 group">
                <img className="h-5 mr-2 opacity-25 group-hover:opacity-100" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="" />

                    <span className="hidden mx-2 sm:inline">Sign in with Google</span>
                </button>

                
            </div>

            <p className="mt-8 text-xs font-light text-center text-gray-400"> Don't have an account? <a href="#" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Create One</a></p>
        </div>

    );
}        

export default Login;



