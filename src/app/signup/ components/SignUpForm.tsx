'use client';
import React,{useEffect} from "react";
import styles from "./SignUpForm.module.css";




const SignUpForm = () => {
    return (
        <>
            <header className={styles.title}>회원가입</header>
            <form>
                <div className={styles.wrapper_main}>
                    <div>
                        <p className={styles.bodyText}>아이디</p>
                        <div className={styles.inpuBoxWrapper}>
                            <input type="text" className={styles.idBox} placeholder="아이디를 입력해주세요."></input>
                            <button className={styles.doubleButton}>중복 확인</button>
                    </div>
                </div>
            </div>

                <div className={styles.wrapper_main}>
                    <div>
                        <p className={styles.bodyText}>비밀번호</p>
                        <input type="text" className={styles.passwordBox} placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                    </div>

                <div className={styles.wrapper_main}>
                    <div>
                        <p className={styles.bodyText}>비밀번호 확인</p>
                        <input type="text" className={styles.passwordBox} placeholder="비밀번호를 다시 입력해주세요."></input>
                        </div>
                    </div>
                    
                <div className={styles.wrapper_main}>
                    <div>
                        <p className={styles.bodyText}>이름</p>
                        <input type="text" className={styles.passwordBox} placeholder="이름을 입력해주세요."></input>
                        </div>
                    </div>

                 <div className={styles.wrapper_main}>
                    <div>
                        <p className={styles.bodyText}>전화번호</p>
                        <input type="text" className={styles.idBox} placeholder="전화번호를 입력해주세요."></input>
                        <button className={styles.doubleButton}>인증요청</button>
                        </div>
                </div>

                <div className={styles.wrapper_main}>
                    <div>
                        <p className={styles.bodyText}>인증번호</p>
                        <input type="text" className={styles.idBox} placeholder="인증번호를 입력해주세요."></input>
                        <button className={styles.doubleButton}>인증확인</button>
                        </div>
                </div>

                <div className={styles.wrapper_main}>
                    <button className={styles.nextButton}>다음으로</button>
                </div>
                
            </form>
        </>
    );
};

export default SignUpForm;