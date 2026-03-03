'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./PWReset.module.css";

const PWResetForm = () => {

    const router = useRouter();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isFormVaild = newPassword !== "" && confirmPassword !== "" && newPassword == confirmPassword;

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (!isFormVaild) return;

        if (!isFormVaild) {
            alert("비밀번호를 모두 입력해주세요.");
            // window.location.reload();
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        
        // 여기에서 API요청을 해야 한다고?
        try {
            const response = await axios.post("백엔드주소", {
                password: newPassword,
            });

            if (response.status === 200) {
                alert("비밀번호가 변경되었습니다.");
                router.push("/login");
            } else {
                alert("비밀번호 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        };
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
                    <div className={styles.ButtonWrapper}>
                        <button
                            type="submit"
                            className={styles.submitButton}
                        >
                            비밀번호 변경
                        </button>
                    </div>
                    

                    {/* 확인버튼(로그인 창으로 넘어감.) */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={() => router.push("/pwcheck")}
                        disabled={!isFormVaild}
                    >
                        비밀번호 변경
                    </button>

                </div>
            </form>
        </>
    );
};

export default PWResetForm;
