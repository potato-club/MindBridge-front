'use client';

import { useState } from "react";
import axios from "axios";
import styles from "./PWReset.module.css";
import { useRouter } from "next/navigation";

const PWResetForm = () => {

    const router = useRouter();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifyMessage, setVerifyMessage] = useState(""); // 인증 결과 메시지

    const isFormVaild = 
    newPassword !== "" && 
    confirmPassword !== "" && 
    newPassword == confirmPassword;

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // if (!newPassword || !confirmPassword) {
        //     setVerifyMessage("비밀번호를 모두 입력해주세요.");
        //     // window.location.reload();
        //     return;
        // }

        if (newPassword !== confirmPassword) {
            setVerifyMessage("비밀번호가 일치하지 않습니다.");
            return;
        }
        
        // 여기에서 API요청을 해야 한다고?
        try {
            const response = await axios.post("백엔드주소", {
                password: newPassword,
            });

            if (response.status === 200) {
                alert("✅ 비밀번호가 성공적으로 변경되었습니다!");
                // 잠시 후 로그인 페이지로 이동
                setTimeout(() => router.push("/login"), 1000);
            } else {
                alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
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

                <h1><strong>비밀번호 변경</strong></h1>
            </header>

            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.Container}>
                        {/* 새 비밀번호 */}

                        <div className={styles.Password}>
                            <p>새 비밀번호</p>
                            <div className={styles.newPassword}>
                                <input 
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="새 비밀번호를 입력하세요."
                                required
                                />
                            </div> 
                        </div>

                        {/* 새 비밀번호 확인 */}
                        <div className={styles.Password}>
                            <p>새 비밀번호 확인</p>
                            <div className={styles.PasswordCheck}>
                                <input 
                                type="text"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="비밀번호를 다시 입력하세요."
                                />
                                <button
                                type="submit"
                                className={styles.sendButton}
                                // onClick={handleSendCode}
                                >
                                    변경확인
                                </button>
                            </div>
                            {/* 결과 메시지 */}
                            {verifyMessage && (
                                <p className={styles.VerifyMessage}>{verifyMessage}</p>
                            )}
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
