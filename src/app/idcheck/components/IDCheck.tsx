'use client';

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./IDCheck.module.css";

const IDCheckForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 가져오기
  const username = searchParams.get("userName");
  const userId = searchParams.get("userId");

  return (
    <>
      <header className={styles.header}>아이디 확인</header>
      <form className={styles.Form}>
        <div className={styles.Container}>
          

          {/* 문구 */}
          {username && userId && (
            <p className={styles.ResultText}>
              <strong>{username}</strong>님의 아이디는{" "}
              <strong>{userId}</strong>입니다.
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

export default IDCheckForm;
