'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./FindId.module.css";

/* 아이디/비밀번호 찾기 폼 */
const FindIdForm = () => {
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userNumber, setUserNumber] = useState("");

    const router = useRouter();


    return (
        <>
            <header className={styles.header}>
                <h1>아이디 찾기 페이지</h1>
            </header>
            <form className={styles.Form}>
                <div className={styles.Container}>
                
                    {/* 이름입력 */}
                    <div className={styles.UserName}>
                        <input type="text" 
                        value={userName}
                        placeholder="이름을 입력해주세요."/>
                    </div>

                    {/* 휴대폰 번호 + 인증번호 발송 버튼*/}
                    <div className={styles.UserPhoneNumber}>
                        <input type="number"
                        value={userPhoneNumber}
                        placeholder="휴대폰 번호를 입력해주세요." />
                        휴대폰 번호 입력
                        <button className={styles.sendButton}>
                            인증번호 발송
                        </button>
                    </div>
                    
                    {/* 인증번호 입력 */}
                    <div className={styles.UserNumber}>
                        인증번호 입력 
                        <input type="number"
                            value={userNumber}
                            placeholder="인증번호를 입력해주세요." 
                        />
                    </div>
                </div>
            </form>
        </>
    )
};

export default FindIdForm;