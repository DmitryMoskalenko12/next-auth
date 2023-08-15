import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

function UserProfile() {
  const [message, setMessage] = useState('');

/*   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   getSession().then(session => {
    if (!session) {
      window.location.href = '/auth'
    } else {
      setIsLoading(false)
    }
   })
  },[])

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>
  }
 */

  useEffect(() => {
    const  timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  },[message])

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }

    });

    const data = await response.json();

    setMessage(data.message)
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword = {changePasswordHandler} message = {message}/>
    </section>
  );
}

export default UserProfile;
