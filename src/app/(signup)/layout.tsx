// app/signup/layout.tsx
'use client';
import SignUpForm from "./signup/SignUpForm";
import styles from "./signup/SignUpForm.module.css";


// layout 컴포넌트는 children prop을 필수로 가집니다.
export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.title}>회원가입</header>
      
      {/* children은 page.tsx의 내용물이 렌더링될 자리입니다. */}
      <main>{children}</main> 
    </>
  );
}
