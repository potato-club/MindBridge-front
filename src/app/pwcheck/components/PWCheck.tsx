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
            <header className={styles.header}>
                <h1>비밀번호</h1>
            </header>
            <form className={styles.Form}>    
                <div className={styles.Container}>

                    {/* 확인 이미지 삽압 */}
                    <div className={styles.img}>확인</div>

                    {/* 문구 */}
                    <div className={styles.ResultText}>
                    {/* {username && (
                        <p className={styles.ResultText}>
                            <strong>{username}</strong>님의 비밀번호가 {"<br>"}
                            변경 되었습니다.
                        </p>
                    )} */}
                        <p>
                            미나미 님의 비밀번호가{" "}
                            변경되었습니다.
                        </p>
                    </div>

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