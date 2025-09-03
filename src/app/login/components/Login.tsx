'use client';

import { useEffect } from "React";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";




const LoginForm = () => {
    const router = useRouter();
}

export default function LoginPage() {
    return (
        <div className="Container">
            <div className="Login-Page">
                <h1>로그인 페이지</h1>
                <form>
                    <LogoAndAppName />
                    <UserIdInput />
                    <PasswordInput />
                    <LoginButton />
                </form>
                <FindIdOrPassword />
                <SignUp />
            </div>
        </div>
    );
}

/* 로고 + 앱 이름 컴포넌트 */
const LogoAndAppName = () => {
    return (
        <div className="LogoAndAppName">
            <h2 className="App-Name">MindBridge</h2>
        </div>
    );
}

/* 아이디 */
const UserIdInput = () => {
    return (
        <div className="User-ID">
            <label htmlFor='user-id'>아이디</label>
            <input type="text" id="user-id" name="user-id" placeholder="아이디를 입력하세요" />
        </div>
    )
}

/* 비밀번호 */
const PasswordInput = () => {
    return (
        <div className="Password">
            <label htmlFor='password'>비밀번호</label>
            <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" />
        </div>
    )
}   

/* 로그인 버튼 */
const LoginButton = () => {
    return (
        <div className="Login-Button">
            <button type="submit">로그인</button>
        </div>
    )
}   

/* 비밀번호/아이디 찾기 */
const FindIdOrPassword = () => {
    return (
        <div className="Find-id-Password">
            <a href="/find-id">아이디 찾기</a>
            <a href="/find-password">비밀번호 찾기</a>
        </div>
    )
}

/* 회원가입 */
const SignUp = () => {
    return (
        <div className="Sign-Up">
            <a href="/sign-up">회원가입</a>
        </div>
    )
}   
