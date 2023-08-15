import classes from './profile-form.module.css';
import { useRef } from 'react';

function ProfileForm(props) {

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    props.onChangePassword(
      {
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      }
    )
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref = {newPasswordRef} type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref = {oldPasswordRef} type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      <div style={{color: props.message === 'Not authentificated!' || props.message === 'User not found' || props.message === 'Invalid password!' ? 'red' : 'green' }}>{props.message}</div>
    </form>
  );
}

export default ProfileForm;
