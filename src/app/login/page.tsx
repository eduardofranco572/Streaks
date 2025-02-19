'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    let email = searchParams.get('email');
    let externalId = searchParams.get('id');

    if (!email || !externalId || email === 'undefined' || externalId === 'undefined') {
      return setProcessing(false);
    }

    localStorage.setItem('email', email);
    localStorage.setItem('externalId', externalId);

    const redirectUrl =
      email === 'contato@thenewscc.com.br' && externalId === '001'
        ? `/dashboard/?id=${externalId}`
        : `/perfil/?id=${externalId}`;

    router.push(redirectUrl);
  }, [searchParams, router]);

  return (
    <div>
      {processing ? (
        <p>Processando login...</p>
      ) : (
        <div className='flex items-center justify-center h-screen w-full'>
          <div className=' flex flex-col items-center border border-[#27272A] rounded-2xl p-4 max-w-[90%] h-auto'>
            <div className="flex items-center flex-col mt-4">
              <img className='w-[26rem]' src="/undraw_warning_qn4r.svg" alt="Erro" />
              <h1 className="text-2xl font-semibold mt-5 text-center">Ops! Entre novamente no link!</h1>
              <p className="text-1xl text-base mt-2 text-gray-400 text-center">Dados insuficientes para acessar a pagina. Por favor, entre no link novamente!</p>
              <Button className='mt-6' asChild variant="default" size="default">
                <a 
                  href="https://thenewscc.beehiiv.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='text-white'
                >
                  Volte para o the news
                </a>
              </Button>
            </div>
          </div>
          
        </div> 
      )}
    </div>
  );
}
