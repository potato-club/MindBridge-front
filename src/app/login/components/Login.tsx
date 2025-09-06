'use client';

import { useEffect, useState} from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";



const LoginForm = () => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const router = useRouter();


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
                            id="userId"
                            name="userId"
                            placeholder="아이디를 입력해주세요." 
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className={styles.UserPassword}>
                        <input type="password"
                            id="userPassword"
                            name="userPassword"
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
