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

    /* 인증번호 확인 */
    const handleVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // api요청
    try {
        const res = await fetch("/api/veify-code", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify
        ({
            phone: userPhoneNumber,
            code: userVerificationCode,
        });
            const res = await fetch("/api/verify-code", {
            }),
      });
      if (res.ok) {
        alert("인증이 완료되었습니다 ✅");
      } else {
        alert("인증번호가 올바르지 않습니다 ❌");
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
                // IDCheck 페이지로 userId 전달.
                router.push(`/IDCheck?userId=${encodeURIComponent(data.userId)}`);
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
                        <p>이름</p>
                        <input 
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="이름을 입력해주세요."
                        />
                    </div>

                    {/* 전화번호 + 인증번호 발송 버튼*/}
                    <div className={styles.UserPhoneNumber}>
                        <p>전화번호</p>
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
                            인증요청
                        </button>
                    </div>
                    
                    {/* 인증번호 입력 */}
                    <div className={styles.UserVerificationCode}>
                        <p>인증번호</p>
                        <input 
                            type="text"
                            inputMode="numeric"
                            value={userVerificationCode}
                            onChange={(e) => setUserVerificationCode(e.target.value)}
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