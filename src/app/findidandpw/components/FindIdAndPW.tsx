'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./FindIdAndPW.module.css";

/* 아이디/비밀번호 찾기 폼 */
const FindIdAndPWForm = () => {
    const [userName, setUserName] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [userId, setUserId] = useState("");


    return (
        <>
            <header className={styles.header}>아이디/비밀번호 찾기</header>
            <form className={styles.Form}>
                <div className={styles.Container}>
                    


                </div>
            </form>

        </>
    )
};

export default FindIdAndPWForm;