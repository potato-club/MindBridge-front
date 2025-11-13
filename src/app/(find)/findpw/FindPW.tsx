'use client';

import { useState} from "react";
import axios from "axios";
import styles from "./FindPW.module.css";
import { useRouter } from "next/navigation";

/* 비밀번호 찾기 폼 */
const FindPWForm = () => {
    
    const [loginId, setLoginId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [userVerificationCode, setUserVerificationCode] = useState("");
    const [verifyMessage, setVerifyMessage] = useState(""); // 인증 결과 메시지

    const router = useRouter();

    /* 인증번호 */
    const handleSendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // 백엔드 api요청.(인증번호 요청)
        try {
            const res = await axios.post("/api/send-code", {
                loginId,
                phoneNumber,
            });

            /* 백엔드 성공 가정(수정 필요) */
            if (res.data.success) {
                alert("인증번호가 발송되었습니다.");
            } else {
                alert("입력하신 정보가 올바르지 않습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    /* 인증확인 */
    const handleVerifyCode = async () => {
        try {
                const res = await axios.post("/api/verify-code", {
                    phoneNumber, 
                    code: userVerificationCode,
                });
                
                /* 백엔드 성공 가정(수정 필요) */
                if (res.data.success) {
                    setVerifyMessage("인증이 완료되었습니다.");
                } else {
                    setVerifyMessage("인증번호가 올바르지 않습니다.");
                }
            } catch (error) {
                console.error(error);
                alert("서버 오류가 발생했습니다.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 백엔드 api요쳥(인증번호 확인)

        try {
            const res = await axios.post("/api/find-password", {
                loginId,
                phoneNumber,
                code: userVerificationCode,
                
            });

            if (res.data.success) {
                router.push("/PWReset");
            } else {
                alert("정보가 올바르지 않거나 인증에 실패했습니다.");
            } 
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
    };



    return (
        <>
            <header className={styles.header}>
                <h1>비밀번호 찾기 페이지</h1>
            </header>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.Container}>

                    {/* 아이디 입력 */}
                    <div className={styles.User}>
                        <p>아이디</p>
                        <div className={styles.UserId}>
                            <input 
                                type="text"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                placeholder="아이디를 입력하세요." 
                                className={styles.UserPhone}

                            />
                        </div>
                        
                    </div>

                    {/* 전화번호 + 인증번호 버튼 + 토큰 발급 받아야함.*/}
                    
                    <div className={styles.User}>
                        <p>전화번호</p>
                        <div className={styles.UserRow}>
                            <input 
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="전화번호를 입력하세요." 
                                className={styles.UserPhone}
                            />

                            <button
                                type="button"
                                className={styles.sendButton}
                                onClick={handleSendCode}
                            >
                                인증요청
                            </button>
                        </div>
                        
                    </div>

                    {/* 인증번호 */}
                    <div className={styles.User}>
                        <p>인증번호</p>
                        <div className={styles.UserRow}>
                            <input 
                                type="text"
                                inputMode="numeric"
                                value={userVerificationCode}
                                onChange={(e) => setUserVerificationCode(e.target.value)}
                                placeholder="인증번호를 입력해주세요." 
                                className={styles.UserPhone}
                            />
                            <button 
                            type="button"
                            className={styles.sendButton}
                            onClick={handleVerifyCode}
                            >
                                인증확인
                            </button>
                        </div>
                        {/* 결과 메시지 */}
                        {verifyMessage && (
                            <p className={styles.VerifyMessage}>{verifyMessage}</p>
                        )}
                    </div> 


                    {/* 제출 버튼 */}
                    <button type="submit" className={styles.submitButton}>
                        다음으로
                    </button>
            
                </div>
            </form>
        </>
    )
};

export default FindPWForm;