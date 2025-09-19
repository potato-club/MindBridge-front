'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PWReset.module.css";

const PWResetForm = () => {

    const router = useRouter();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        
        // 여기에서 API요청을 해야 한다고?

        alert("비밀번호가 변경되었습니다.");
        router.push("/login");
    };


    return (
        <>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => router.push("/findpw")}
                >
                    &lt;
                </button>

                비밀번호 변경
            </header>

            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.Container}>
                    <div className={styles.PassWord}>
                        {/* 새 비밀번호 */}
                    <div className={styles.PasswordField}>
                        <p className={styles.PasswordLabel}>새 비밀번호</p>

                        <input 
                            className={styles.PasswordInput}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="새 비밀번호를 입력하세요."
                            required
                        />
                    </div>
                    {/* 새 비밀번호 확인 */}
                    <div className={styles.PasswordField}>
                        <p>새 비밀번호 확인</p>

                        <input 
                            className={styles.PasswordInput}
                            type="text"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="비밀번호를 다시 입력하세요."
                        />
                    </div>
                    </div>


                    

                    {/* 확인버튼(로그인 창으로 넘어감.) */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={() => router.push("/pwcheck")}
                    >
                        비밀번호 변경
                    </button>

                </div>
            </form>
        </>
    );
};

export default PWResetForm;
