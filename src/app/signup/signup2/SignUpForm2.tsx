'use client';

import { useEffect,useState } from "react";
import styles from "../signup/SignUpForm.module.css";
import { useRouter } from "next/navigation";

const genderOptions = [
    { value: 'male', label: '  남성' },
    { value: 'female', label: '  여성'},
    { value: 'none' , label: '  비공개'}

];

    const SignUpForm2 = () => {

        const [nickname, setNickname] = useState('');
        const [gender, setGender] = useState('');
        const [age, setAge] = useState('');

        const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지
        console.log("제출 데이터:", { nickname, gender, age });
        // 여기에 서버로 데이터를 전송하는 로직을 추가합니다.
    };

        return (
            <>
                <header className={styles.title}>회원가입</header>
                <form onSubmit={handleSubmit}>
                    <div className={styles.wrapper_main}>
                        <div className={styles.oButton}>
                            <p className={styles.bodyText}>닉네임</p>
                            <div className={styles.inpuBoxWrapper}>
                                <input type="text"
                                    name="nickname"
                                    value={nickname}
                                    className={styles.buttonOBox} 
                                    placeholder="닉네임을 입력해주세요.">
                                </input>
                                <button className={styles.doubleButton}>중복 확인</button>
                            </div>
                        </div>
                

                  <div className={styles.xButton}>
                        <p className={styles.bodyText}>성별</p>
                        <div className={styles.xButton}>
                            {genderOptions.map((option) => (
                                <label key={option.value} 
                                       className={styles.radioBox}>
                                    <input 
                                        type="radio" 
                                        name="gender"
                                        value={option.value}
                                        checked={gender === option.value}
                                        onChange={(e) => setGender(e.target.value)}
                                        className={styles.radioBox}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                        

                    
                        <div className={styles.xButton}>
                            <p className={styles.bodyText}>나이</p>
                            <input type="text" 
                            className={styles.buttonXBox}
                            placeholder="비밀번호를 다시 입력해주세요.">
                        </input>
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