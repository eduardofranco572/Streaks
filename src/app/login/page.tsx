import React, { Suspense } from 'react';
import LoginComponent from '@/components/login-component';

const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <LoginComponent />
    </Suspense>
  );
};

export default LoginPage;
