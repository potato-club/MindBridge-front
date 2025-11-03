'use client'; 


import React from 'react'; 
import { SignupProvider } from '@/app/context/SignupContext'; 
import styles from "./signup/SignUpForm.module.css";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.title}>회원가입</header>
      
      <main>
        <SignupProvider> 
          {children} 
        </SignupProvider>
      </main> 
    </>
  );
}