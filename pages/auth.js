import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
    if (session) {
      router.replace('/')
    } else {
      setIsLoading(false);
    }
  })
  },[router])

  if (isLoading) {
    return <p className='loading'>Loading...</p>
  }

  return <AuthForm />;
}

export default AuthPage;