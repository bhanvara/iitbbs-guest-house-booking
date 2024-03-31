import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './Login.css'

interface LoginProps {
  isStudent: boolean;
}


function Login({isStudent}: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // let history = useHistory(); //hook for navigation

  const handleStudentSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // handle the login logic here after submission for student
    
    console.log('Student Username:', username);
    console.log('Student Password:', password);
    //To clear
    setUsername("");
    setPassword("");

    // After successful verification navigate to student dashboard page
    // history.push('/student-dashboard');
  };

  const handleFacultySubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // handle the login logic here after submission for faculty
    
    console.log('Faculty Username:', username);
    console.log('Faculty Password:', password);
    //To clear
    setUsername("");
    setPassword("");

    // After successful verification navigate to faculty dashboard page
    // history.push('/faculty-dashboard');
  };
  
  
  return (
    <div>
      {isStudent ? 
        <form onSubmit={handleStudentSubmit} className='login-form'>
          {/* <h2>Student Login</h2> */}
          <label>
            Username:
            <input type='text' value={username} 
              onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type='password' value={password}
              onChange={(e) => setPassword(e.target.value)} required/>
          </label>
          <input type='submit' value='Log In' />
        </form>
        :
        <form onSubmit={handleFacultySubmit} className='login-form'>
          {/* <h2>Faculty Login</h2> */}
          <label>
            Username:
            <input type='text' value={username} 
              onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type='password' value={password}
              onChange={(e) => setPassword(e.target.value)} required/>
          </label>
          <input type='submit' value='Log In' />
        </form>
      }
    </div>
  );
}

export default Login;
