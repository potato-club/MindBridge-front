'use client';

import { useState } from "react";
import axios from "axios";
import styles from "./FindId.module.css";
import { useRouter } from "next/navigation";

/* 아이디/비밀번호 찾기 폼 */
const FindIdForm = () => {
    const [username, setUserName] = useState("");
    const [phonenumber, setUserPhoneNumber] = useState("");
    const [verified, setUserVerified] = useState("");

    const [verifyMessage, setVerifyMessage] = useState(""); // 인증 결과 메시지

    const router = useRouter();

    /* 인증번호 발송 */
    const handleSendCode = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // api 구현(백엔드 요청)해야 함!
        try {
            const res = await axios.post("/api/send-code", {
                username,
                phonenumber,
            });


            // 백엔드 성공 가정(수정 필요)
            if (res.data.success) {
                alert("인증번호가 발송되었습니다.");
            } else {
                alert("개인정보가 틀렸습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    /* 인증번호 확인 */
    const handleVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // api요청
    try {
        const res = await axios.post("/api/verify-code", {
            phonenumber,
            verified,
            
        });

        /* 백엔드 성공 가정(수정 필요) */
        if (res.data.success) {
            setVerifyMessage("");
            alert("인증이 완료되었습니다.");
        } else {
            setVerifyMessage("인증번호를 확인해주세요!");
        }

    } catch (error) {
        console.error(error);
        alert("서버 오류가 발생했습니다.");
    
    }
};

    
    /* 아이디 찾기 */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/find-id", {
                username,
                phonenumber,
                verified,
            });

            /* 백엔드 성공 가정(수정 필요) */
            if (res.data.userId) {
                // IDCheck 페이지로 userId 전달.
                router.push(`/IDCheck?userId=${encodeURIComponent(res.data.userId)}`);
            } else {
                alert("아이디 찾기에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
        // 백엔드 요청 API구현
    };

    return (
        <>
            <header className={styles.header}>
                <h1>아이디 찾기 페이지</h1>
            </header>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.Container}>
                
                    {/* 이름입력 */}
                    <div className={styles.User}>
                        <p>이름</p>
                        <div className={styles.UserName}>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="이름을 입력해주세요."
                            />
                        </div>
                    </div>
                        

                    {/* 전화번호 + 인증번호 발송 버튼*/}
                    <div className={styles.User}>
                        <p>전화번호</p>
                        <div className={styles.UserRow}>
                            <input 
                            type="tel"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={phonenumber}
                            onChange={(e) => setUserPhoneNumber(e.target.value)}
                            placeholder="휴대폰 번호를 입력해주세요." 
                            
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

                                        {/* 전화번호 + 인증번호 발송 버튼*/}
                    <div className={styles.User}>
                        <p>인증번호</p>
                        <div className={styles.UserRow}>
                            <input 
                                type="text"
                                inputMode="numeric"
                                value={verified}
                                onChange={(e) => setUserVerified(e.target.value)}
                                placeholder="인증번호를 입력해주세요." 
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
                        아이디 찾기
                    </button>
                </div>
            </form>
        </>
    );
};

export default FindIdForm;