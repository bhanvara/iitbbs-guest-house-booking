import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

interface SignUpProps {
  isStudent: boolean;
}


function SignUp({isStudent}: SignUpProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // added new state for confirmPassword
  
  let navigate = useNavigate(); //hook for navigation

  const handleStudentSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // add validation to check if password and confirm password match 
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // handle the sign up logic here after submission for student
    
    console.log('Student Username:', username);
    console.log('Student Password:', password);
    //To clear
    setUsername("");
    setPassword("");
    setConfirmPassword(""); // also clear confirmPassword

    // After successful signup navigate to student dashboard page

    navigate('/');
  };

  const handleFacultySubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // add validation to check if password and confirm password match 
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // handle the sign up logic here after submission for faculty
    
    console.log('Faculty Username:', username);
    console.log('Faculty Password:', password);
    //To clear
    setUsername("");
    setPassword("");
    setConfirmPassword(""); // also clear confirmPassword

    // After successful signup navigate to faculty dashboard page
    navigate('/');
  };
  
  
  return (
    <div>
      {isStudent ? 
        <form onSubmit={handleStudentSubmit} className='signup-form'>
          {/* <h2>Student Sign Up</h2> */}
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
          <label>
            Confirm Password:
            <input type='password' value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} required/>
          </label>
          <input type='submit' value='Sign Up' />
        </form>
        :
        <form onSubmit={handleFacultySubmit} className='signup-form'>
          {/* <h2>Faculty Sign Up</h2> */}
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
          <label>
            Confirm Password:
            <input type='password' value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} required/>
          </label>
          <input type='submit' value='Sign Up' />
        </form>
      }
    </div>
  );
}

export default SignUp;
