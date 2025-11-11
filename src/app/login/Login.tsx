'use client';

import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";



/* 로그인 폼 */
const LoginForm = () => {
    const [userId, setUserId] = useState("");
    const [password, setUserPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // 백엔드 API 로그인 요청이랄까...
            const response = await axios.post("https://your-backend-api/login", {
                userId,
                password,
            });
    
            const accessToken = response.data?.accessToken || response.data?.token;

            if (!accessToken) {
                console.error("로그인 실패: 액세스 토큰이 없습니다.");
                alert("로그인에 실패하였습니다.");
                return;
            }

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("accessToken", accessToken);

            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            alert("로그인에 성공하였습니다.");
            router.push("/"); // 로그인 성공 시 메인 페이지로 이동

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    // 서버가 응답을 보낸 경우 (4xx, 5xx 등)
                    console.error("서버 응답 에러:", err.response.data);

                    if (err.response.status === 401) {
                        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
                    } else if (err.response.status === 404) {
                        alert("해당 사용자가 존재하지 않습니다.");
                    } else {
                        alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                    }
                } else if (err.request) {
                    // 요청이 전송되었으나 서버 응답이 없는 경우
                    console.error("서버 응답 없음:", err.request);
                    alert("서버 응답이 없습니다. 네트워크를 확인해주세요.");
                } else {
                    // 요청 설정 중 에러가 발생한 경우
                    console.error("요청 설정 에러:", err.message);
                    alert("요청 중 문제가 발생했습니다.");
                }
            } else {
                // Axios 외의 예외적인 에러 처리
                console.error("예상치 못한 에러:", err);
                alert("알 수 없는 오류가 발생했습니다.");
            }
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
                            value={password}
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
                    <div className={styles.BtnContainer}>
                        {/* 아이디/비밀번호 찾기 */}
                        {/* 페이지 이동 구현 중 */}
                        <div className={styles.Find}>
                            <button type="button"
                            onClick={() => router.push("/find")}> 
                                아이디/비밀번호 찾기
                            </button>
                        </div>

                        {/* 회원가입 */}
                        <div className={styles.SignUp}>
                            <button type="button"
                            onClick={() => router.push("/회원가입 페이지")}>회원가입</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );

};

export default LoginForm;
