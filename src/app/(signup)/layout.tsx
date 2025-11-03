// app/signup/layout.tsx

'use client'; 
// Context와 State Hook을 사용하므로 'use client'가 필요합니다.

import React from 'react'; // React.ReactNode 사용을 위해 필요합니다.
import { SignupProvider } from '@/app/context/SignupContext'; // 👈 Context Provider import
import styles from "./signup/SignUpForm.module.css";
// import SignUpForm from "./signup/SignUpForm"; // 👈 SignUpForm은 Layout에 필요 없으므로 삭제

// layout 컴포넌트는 children prop을 필수로 가집니다.
export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.title}>회원가입</header>
      
      {/* 👈 여기서 SignupProvider가 children(회원가입 페이지)을 감쌉니다. */}
      <main>
        <SignupProvider> 
          {children} 
        </SignupProvider>
      </main> 
    </>
  );
}