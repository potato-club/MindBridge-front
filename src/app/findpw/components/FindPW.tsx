'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./FindPW.module.css";

/* 비밀번호 찾기 폼 */
const FindPWForm = () => {
    
    const [userID, setUserId] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userNumber, setUserNumber] = useState("");

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
            
                </div>
            </form>
        </>
    )
};

export default FindPWForm;