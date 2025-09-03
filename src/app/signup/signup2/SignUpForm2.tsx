'use client';

import { useEffect } from "react";
import styles from "../components/SignUpForm.module.css";
import { useRouter } from "next/navigation";

const genderOptions = [
    { value: 'male', label: '남성' },
    { value: 'female', label: '여성'},
    { value: 'none' , label: '비공개'}

];

const SignUpForm2 = () => {
    return (
        <>
            <header className={styles.title}>회원가입</header>
            <form>
                <div className={styles.wrapper_main}>
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>닉네임</p>
                        <div className={styles.inpuBoxWrapper}>
                            <input type="text" className={styles.buttonOBox} placeholder="닉네임을 입력해주세요."></input>
                            <button className={styles.doubleButton}>중복 확인</button>
                    </div>
                </div>
            

                    <label className={styles.xButton}>
                        <p className={styles.bodyText}>성별</p>
                        <input type="radio" className={styles.radioBox} placeholder="비밀번호를 입력해주세요."></input>
                        </label>
                    

                
                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>나이</p>
                        <input type="text" className={styles.buttonXBox} placeholder="비밀번호를 다시 입력해주세요."></input>
                        </div>
                    
                

                <div className={styles.bottomButtonBox}>
                    <button type="button" className={styles.nextButton}>가입하기</button>
                </div>
            </div>
            </form>
        </>
    );
}



export default SignUpForm2;