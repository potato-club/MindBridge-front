'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";


/* API 음,,, 백엔드랑 연동해야함 
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",

            /* 로그인 폼에서 입력한 값을 받아옴 
            credentials: {
                userId: { label: "userId", type: "text" },
                userPassword: { label: "userPassword", type: "password" },
            },  

            /* 로그인 처리 
            async authorize(credentials, req) {
                /* DB 연동 음,,,,, 왓 이즈 백엔드API요청,,,ㅜㅜ

                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
});    

export {handle as GET, handler as POST};
*/


/* 로그인 폼 */
const LoginForm = () => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const router = useRouter();

    const handleCudmit = async (e) => {
        e.prevenDefault();

        const result = await signIn("credentials", {
            redirect: false,
            userId, 
            userPassword,
        });

        if (result.ok) {
            router.push("/메인페이지"); /* 메인페이지 경로로 변경해야한다ㅡ,,, */
        } else {
            alert("로그인 실패");
            router.push("/Login");
        }
    };

    return (
        <>
            <header className={styles.header}>로그인</header>
            <form>
                <div className={styles.Container}>

                    {/* 어플명 or 로고 + 설명 */}
                    <div className={styles.LogoAndAppName}>
                        <h2 className={styles.AppName}>MindBridge</h2>
                        <p className={styles.AppDescription}>당신의 마음을 이어주는 다리</p>
                    </div>

                    {/* 아이디 */}
                    <div className={styles.UserId}>
                        <input type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="아이디를 입력해주세요." 
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className={styles.UserPassword}>
                        <input type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="비밀번호 입력해주세요." 
                        />
                    </div> 

                    

                    {/* 로그인 버튼 */}
                    <div className={styles.LoginButton}>
                        <button type="submit">
                            <p className={styles.LoginButtonText}>로그인</p>
                        </button>
                    </div> 

                    {/* 하단 영역 */}
                    <div className={styles.LoginFooter}>
                        {/* 아이디/비밀번호 찾기 */}
                        <div className={styles.FindIdAndPassword}>
                            아이디/비밀번호 찾기
                        </div>

                        {/* 회원가입 */}
                        <div className={styles.SignUp}>
                            회원가입
                        </div>
                    </div>

                    

                </div>
            </form>
        </>
    );

};

export default LoginForm;
