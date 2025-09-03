'use client';

import { useEffect } from "react";
import styles from "./SignUpForm.module.css";
import { useRouter } from "next/navigation";




const SignUpForm = () => {
    const router = useRouter();


    const handleNext = () => {
        router.push('/signup/signup2');
    }
    

    return (
        <>
            <header className={styles.title}>회원가입</header>
            <form>
                <div className={styles.wrapper_main}>
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>아이디</p>
                        <div className={styles.inpuBoxWrapper}>
                            <input type="text" className={styles.buttonOBox} placeholder="아이디를 입력해주세요."></input>
                            <button className={styles.doubleButton}>중복 확인</button>
                    </div>
                </div>
            

                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>비밀번호</p>
                        <input type="text" className={styles.buttonXBox} placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                    

                
                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>비밀번호 확인</p>
                        <input type="text" className={styles.buttonXBox} placeholder="비밀번호를 다시 입력해주세요."></input>
                        </div>
                    
                    
                
                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>이름</p>
                        <input type="text" className={styles.buttonXBox} placeholder="이름을 입력해주세요."></input>
                        </div>
                    

                 
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>전화번호</p>
                        <input type="text" className={styles.buttonOBox} placeholder="전화번호를 입력해주세요."></input>
                        <button className={styles.doubleButton}>인증요청</button>
                        </div>
                

                
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>인증번호</p>
                        <input type="text" className={styles.buttonOBox} placeholder="인증번호를 입력해주세요."></input>
                        <button className={styles.doubleButton}>인증확인</button>
                        </div>
                

                <div className={styles.bottomButtonBox}>
                    <button type="button" onClick={handleNext} className={styles.nextButton}>다음으로</button>
                </div>
            </div>
            </form>
        </>
    );
};

export default SignUpForm;