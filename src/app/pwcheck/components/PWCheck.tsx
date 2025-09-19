'use client';

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./PWCheck.module.css";

const PWCheckForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // URL에서 가져오기
    const username = searchParams.get("userName");

    return (
        <>
            <header className={styles.header}>비밀번호 확인</header>
            <form className={styles.Form}>    
                <div className={styles.Container}>

                    

                    {/* 문구 */}
                    {username && (
                        <p className={styles.ResultText}>
                            <strong>{username}</strong>님의 비밀번호가 {"<br>"}
                            변경 되었습니다.
                        </p>
                    )}

                    {/* 확인버튼(로그인 창으로 넘어감.) */}
                    <button
                        type="button"
                        className={styles.submitButton}
                        onClick={() => router.push("/login")}
                    >
                        확인
                    </button>
                </div>
            </form>
        </>
    );
};

export default PWCheckForm;