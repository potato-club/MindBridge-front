'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./FindPW.module.css";

/* 비밀번호 찾기 폼 */
const FindPWForm = () => {
    
    const [userID, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userVerificationCode, setUserVerificationCode] = useState("");

    const router = useRouter();


    return (
        <>
            <header className={styles.header}>
                <h1>비밀번호 찾기 페이지</h1>
            </header>
            <form className={styles.Form}>
                <div className={styles.Container}>

                    {/* 아이디 입력 */}
                    <div className={styles.UserId}>
                        <input type="text"
                        value={userID}
                        placeholder="아이디를 입력하세요." />
                    </div>

                    {/* 이름 입력 */}
                    <div className={styles.UserName}>
                        <input type="text"
                        value={userName}
                        placeholder="이름을 입력하세요" />
                    </div>

                    {/* 나이 버튼 (여자, 남자, 비공개 */}
                    <div className={styles.UserAge}>
                        <button className={styles.Male}>남성</button>
                        <button className={styles.Female}>여성</button>
                        <button className={styles.None}>비공개</button>
                    </div>

                    {/* 전화번호 + 인증번호 버튼 + 토큰 발급 받아야함.*/}
                    
                    <div className={styles.userPhoneNumber}>
                        <input type="number"
                        value={userPhoneNumber}
                        placeholder="전화번호를 입력하세요." />
                        <button className="VerificationCode">인증번호</button>
                    </div>

                    {/* 인증번호 */}
                    <div className={styles.UserVerificationCode}>
                        <input type="text"
                        value={userVerificationCode}
                        placeholder="인증번호를 입력하세요." />
                    </div>
            
                </div>
            </form>
        </>
    )
};

export default FindPWForm;