import React, { Suspense } from 'react';
import LoginComponent from '@/components/login-component';
import { Riple } from 'react-loading-indicators';

const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={<Riple color="#FFCE04" size="medium" text="" textColor="" />}>
      <LoginComponent />
    </Suspense>
  );
};

export default LoginPage;
