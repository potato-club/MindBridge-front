'use client';

import { useEffect, useState } from "react";
import styles from "./SignUpForm.module.css";
import { useRouter } from "next/navigation";

const SignUpForm = () => {

    const [userid, setUserId] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [isUserIdChecked, setIsUserIdChecked] = useState(false);
    const [isUserIdDuplicate, setIsUserIdDuplicate] = useState(false);

    const [password, setpassword] = useState('');
    const [username, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    const router = useRouter();

    //아이디 유효성 검사
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserId(value);
        setIsUserIdChecked(false); // 아이디가 변경되면 중복 확인 상태 초기화

        //영문,숫자만 허용, 한글불가
        if (!/^[a-zA-Z0-9]*$/.test(value)) {
            setUserIdError('아이디는 영문, 숫자만 사용할 수 있습니다.');
        } else if (value.length < 4 || value.length > 16) {
            setUserIdError('아이디는 4자 이상 16자 이하로 입력해주세요.');
        } else {
            setUserIdError('');
        }
    };

    //중복 검사
    const handleCheckDuplicate = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (userIdError || !userid) return;

        //여기서 실제 중복 검사 API 호출
        try {
            const res = await fetch('/api/check-duplicate');
            // const data = await res.json(); // 실제 사용 시 주석 해제
            setIsUserIdChecked(true);
            setIsUserIdDuplicate(false); // 실제 사용 시 data.isDuplicate로 변경
        } catch (err) {
            setUserIdError('중복 검사 중 오류 발생');
        }
    };

    const handleNext = () => {
        if (!isUserIdChecked || isUserIdDuplicate || userIdError) {
            alert('아이디가 중복되어 사용 할 수 없습니다.');
            return;
        }
        router.push('/signup2');
    };

    return (
        <>
            <form>
                <div className={styles.wrapper_main}>
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>아이디</p>
                        <div className={styles.inputBoxWrapper}>
                            <input 
                                   type="text" 
                                   name="userid" 
                                   className={styles.buttonOBox} 
                                   placeholder="아이디를 입력해주세요."
                                   value={userid}
                                   onChange={handleUserIdChange}
                                   autoComplete="off"
                            />
                            <button 
                                className={styles.doubleButton}
                                onClick={handleCheckDuplicate}
                                type="button"
                                disabled={!!userIdError || !userid}
                            >중복 확인</button>
                        </div>
                        {userIdError && <div style={{ color: 'red', marginTop: '5px', fontSize: 10 }}>{userIdError}</div>}
                        {isUserIdChecked && !isUserIdDuplicate && !userIdError && ( <div style={{ color: 'green', marginTop: '5px', fontSize: 10 }}>사용 가능한 아이디입니다.</div> )}
                        {isUserIdChecked && isUserIdDuplicate && !userIdError && ( <div style={{ color: 'red', marginTop: '5px', fontSize: 10 }}>이미 사용 중인 아이디입니다.</div> )}
                    </div>
            

                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>비밀번호</p>
                        <input type="text" 
                               name="password" 
                               className={styles.buttonXBox} 
                               placeholder="비밀번호를 입력해주세요."
                        />
                    </div>
                    

                
                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>비밀번호 확인</p>
                        <input type="text" 
                               name="password" 
                               className={styles.buttonXBox} 
                               placeholder="비밀번호를 다시 입력해주세요."
                        />
                    </div>
                    
                    
                
                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>이름</p>
                        <input type="text" 
                               name="name" 
                               className={styles.buttonXBox} 
                               placeholder="이름을 입력해주세요."
                        />
                    </div>
                    

                 
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>전화번호</p>
                        <input type="text" 
                               name="phonenumber"
                               className={styles.buttonOBox}
                               placeholder="전화번호를 입력해주세요."
                        />
                        <button className={styles.doubleButton}>인증요청</button>
                    </div>
                

                
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>인증번호</p>
                        <input type="text" 
                               className={styles.buttonOBox} 
                               placeholder="인증번호를 입력해주세요."
                        />
                        <button className={styles.doubleButton}>인증확인</button>
                    </div>
                

                <div className={styles.bottomButtonBox}>
                    <button type="button" 
                            onClick={handleNext} 
                            className={styles.nextButton}>다음으로</button>
                </div>
            </div>
            </form>
        </>
    );
};

export default SignUpForm;