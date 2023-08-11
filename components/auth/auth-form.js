import { useState, useEffect } from 'react';
import classes from './auth-form.module.css';
import { useRef } from 'react';
import { signIn } from 'next-auth/react';

const createUser =  async (email, password) => {
 const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
   
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
   const  timer = setTimeout(() => setMessage(''), 3000);
   return () => clearTimeout(timer);
  }, [message])

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (event) => { 
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
      })
      
      if (!result.error) {
        setMessage('You successfully logIn!')
      } else {
        setMessage(result.error)
      }
    } else {
      try {
       const result = await createUser(enteredEmail, enteredPassword);
       setMessage(result.message)
      } catch (error) {
        setMessage(error.message)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        <div>{message}</div>
      </form>
    </section>
  );
}

export default AuthForm;
