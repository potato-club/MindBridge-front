'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./FindId.module.css";

/* 아이디/비밀번호 찾기 폼 */
const FindIdForm = () => {
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
        const [userVerificationCode, setUserVerificationCode] = useState("");


    const router = useRouter();

    const handleSendCode = (e: React.FormEvent) => {
        e.preventDefault();
        alert("인증번호가 발송되었습니다.");
        // api 구현(백엔드 요청)해야 함!
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    // const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`이름: ${userName}, 전화번호: ${userPhoneNumber}, 인증번호: ${userVerificationCode}`)
    }

    return (
        <>
            <header className={styles.header}>
                <h1>아이디 찾기 페이지</h1>
            </header>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.Container}>
                
                    {/* 이름입력 */}
                    <div className={styles.UserName}>
                        <input type="text" 
                        value={userName}
                        placeholder="이름을 입력해주세요."/>
                    </div>

                    {/* 휴대폰 번호 + 인증번호 발송 버튼*/}
                    <div className={styles.UserPhoneNumber}>
                        <input type="tel"
                        value={userPhoneNumber}
                        placeholder="휴대폰 번호를 입력해주세요." />
                        <button 
                        type="button"
                        className={styles.sendButton}
                        onClick={handleSendCode}
                        >
                            인증번호 발송
                        </button>
                    </div>
                    
                    {/* 인증번호 입력 */}
                    <div className={styles.UserVerificationCode}>
                        <input type="number"
                            value={userVerificationCode}
                            onChange={(e) => setUserVerificationCode(e.target.value)}
                            placeholder="인증번호를 입력해주세요." 
                        />
                    </div>

                    {/* 제출 버튼 */}
                    <button type="submit" className={styles.submitButton}>
                        아이디 찾기
                    </button>
                </div>
            </form>
        </>
    )
};

export default FindIdForm;