'use client';

import { useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";



/* 로그인 폼 */
const LoginForm = () => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // 백엔드 API 로그인 요청이랄까...
            const response = await fetch("백엔드 주소?",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId, password: userPassword }),
        }); 

        if (!response.ok) {
            throw new Error("로그인 실패"); 
        }

            const data = await response.json();
            const accessToken = data.accessToken;

            // 로컬 스토리지에 토큰 저장(아마도,,)
            localStorage.setItem("accessToken", accessToken);

            router.push("/Main"); // 메인페이지 연동해야함.
        } catch (err) {
            console.error(err);
            alert("아이디와 비밀번호를 확인해주세요.");
        }
    };

    return (
        <>
            <header className={styles.header}>로그인</header>
            <form className={styles.Form} onSubmit={handleSubmit}>
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
                            placeholder="아이디 입력" 
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className={styles.UserPassword}>
                        <input type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="비밀번호 입력" 
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
                        {/* 페이지 이동 구현 중 */}
                        <div className={styles.FindIdAndPassword}>
                            <button type="button"
                            onClick={() => router.push("/find")}> 
                                아이디/비밀번호 찾기
                            </button>
                        </div>

                        {/* 회원가입 */}
                        <div className={styles.SignUp}>
                            <button type="button"
                            onClick={() => router.push("/signup")}>회원가입</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );

};

export default LoginForm;
