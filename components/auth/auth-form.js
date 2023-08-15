import { useState, useEffect } from 'react';
import classes from './auth-form.module.css';
import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import cn from 'classnames';

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

  const router = useRouter();

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
        router.replace('/profile')
        setMessage('')
        setMessage('You successfully logIn!')
      } else {
         setMessage('')
        setMessage('Could not log you in!')
      }
    } else {
      try {
       const result = await createUser(enteredEmail, enteredPassword);
       setMessage('')
       setMessage(result.message)
      } catch (error) {
       setMessage('')
       setMessage(error.message)
       console.log(error)
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
        <div style = {{color:  (message === 'Could not log you in!' || message === 'User exists already!' || message === 'Invalid input - password should also be at least 7 characters long.') ? 'red' : 'green'}}>{message}</div>
      </form>
    </section>
  );
}

export default AuthForm;
