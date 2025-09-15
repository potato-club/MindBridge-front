'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./FindId.module.css";

/* 아이디/비밀번호 찾기 폼 */
const FindIdForm = () => {
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userVerificationCode, setUserVerificationCode] = useState("");
    const [userId, setUserId] = useState("");


    const router = useRouter();

    const handleSendCode = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // api 구현(백엔드 요청)해야 함!
        try {
            const res = await fetch("/api/send-code", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({ phone: userPhoneNumber }),
            });

            if (res.ok) {
                alert("인증번호가 발송되었습니다.");
            } else {
                alert("개인정보가 틀렸습니다.");
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
            const res = await fetch("/api/find-id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: userName, 
                    phone: userPhoneNumber,
                    code: userVerificationCode,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setUserId(data.userId);
                alert(`당신의 아이디는 ${data.userId} 입니다.`);
                router.push("/login");
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
                    <div className={styles.UserName}>
                        <input 
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="이름을 입력해주세요."
                        />
                    </div>

                    {/* 휴대폰 번호 + 인증번호 발송 버튼*/}
                    <div className={styles.UserPhoneNumber}>
                        <input 
                        type="tel"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={userPhoneNumber}
                        onChange={(e) => setUserPhoneNumber(e.target.value)}
                        placeholder="휴대폰 번호를 입력해주세요." 
                        />

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
                        <input 
                            type="number"
                            inputMode="numeric"
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
    );
};

export default FindIdForm;