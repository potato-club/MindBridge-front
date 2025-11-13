'use client';

import { useSearchParams,useRouter } from "next/navigation";
import styles from "./IDCheck.module.css";

const IDCheckForm = () => {
  const searchParams = useSearchParams();
  
  const router = useRouter();

  // URL에서 가져오기
  const UserName = searchParams.get("username");
  const LoginId = searchParams.get("loginId");

  return (
    <>
      <header className={styles.header}>
        <h1>아이디 확인</h1>
      </header>
      <form className={styles.Form}>
        <div className={styles.Container}>
          {/* 확인 이미지 삽압 */}
          <div className={styles.img}>확</div>

          {/* 문구 */}
          <div className={styles.resultText}>
            {/* {username && userId && (
              <p>
                {UserName} 님의 아이디는{" "}
                <strong>{LoginId}</strong> {" "}입니다.
              </p>
            )} */}
            <p>
              미나미 님의 아이디는{" "}
              <strong>모나미</strong> {" "}입니다.
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

export default IDCheckForm;
