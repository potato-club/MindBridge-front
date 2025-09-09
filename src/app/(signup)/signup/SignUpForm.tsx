'use client';

import { useState } from "react";
import styles from "./SignUpForm.module.css";
import { useRouter } from "next/navigation";

const SignUpForm = () => {

    const [userid, setUserId] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [isUserIdChecked, setIsUserIdChecked] = useState(false);
    const [isUserIdDuplicate, setIsUserIdDuplicate] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    const [username, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    // 전화번호 인증 관련 상태
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    const router = useRouter();

    // 아이디 유효성 검사
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserId(value);
        setIsUserIdChecked(false);

        if (!/^[a-zA-Z0-9]*$/.test(value)) {
            setUserIdError('아이디는 영문, 숫자만 사용할 수 있습니다.');
        } else if (value.length < 4 || value.length > 16) {
            setUserIdError('아이디는 4자 이상 16자 이하로 입력해주세요.');
        } else {
            setUserIdError('');
        }
    };

    // 비밀번호 유효성 검사
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

        // 8~20자, 영문/숫자/특수문자 조합
        if (value.length < 8 || value.length > 20) {
            setPasswordError('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
            setPasswordError('비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.');
        } else {
            setPasswordError('');
        }

        // 비밀번호 확인과 일치 여부 검사
        if (passwordCheck && value !== passwordCheck) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordCheckError('');
        }
    };

    // 비밀번호 확인 유효성 검사
    const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordCheck(value);

        if (password && value !== password) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordCheckError('');
        }
    };

    // 아이디 중복 검사
    const handleCheckDuplicate = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (userIdError || !userid) return;

        // 실제 중복 검사 API 호출 필요
        try {
            const res = await fetch('/api/check-duplicate');
            // const data = await res.json(); // 실제 사용 시 주석 해제
            setIsUserIdChecked(true);
            setIsUserIdDuplicate(false); // 실제 사용 시 data.isDuplicate로 변경
        } catch (err) {
            setUserIdError('중복 검사 중 오류 발생');
        }
    };

    // 전화번호 인증요청
    const handleSendCode = async (e: React.MouseEvent) => {
        e.preventDefault();
        setVerificationError('');
        try {
            const res = await fetch('/api/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phonenumber }),
            });
            if (res.ok) {
                setIsCodeSent(true);
            } else {
                setVerificationError('인증번호 발송에 실패했습니다.');
            }
        } catch {
            setVerificationError('인증번호 발송 중 오류 발생');
        }
    };

    // 인증번호 확인
    const handleVerifyCode = async (e: React.MouseEvent) => {
        e.preventDefault();
        setVerificationError('');
        try {
            const res = await fetch('/api/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phonenumber, code: verificationCode }),
            });
            if (res.ok) {
                setIsPhoneVerified(true);
            } else {
                setVerificationError('인증번호가 올바르지 않습니다.');
            }
        } catch {
            setVerificationError('인증 확인 중 오류 발생');
        }
    };

    const handleNext = () => {
        if (!isUserIdChecked || isUserIdDuplicate || userIdError) {
            alert('아이디 중복검사를 완료해주세요.');
            return;
        }
        if (passwordError || !password) {
            alert('비밀번호를 올바르게 입력해주세요.');
            return;
        }
        if (passwordCheckError || !passwordCheck) {
            alert('비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        if (!isPhoneVerified) {
            alert('전화번호 인증을 완료해주세요.');
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
                        <input 
                            type="password" 
                            name="password" 
                            className={styles.buttonXBox} 
                            placeholder="비밀번호를 입력해주세요."
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="off"
                        />
                        {passwordError && <div style={{ color: 'red', marginTop: '5px', fontSize: 10 }}>{passwordError}</div>}
                    </div>
                    
                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>비밀번호 확인</p>
                        <input 
                            type="password" 
                            name="passwordCheck" 
                            className={styles.buttonXBox} 
                            placeholder="비밀번호를 다시 입력해주세요."
                            value={passwordCheck}
                            onChange={handlePasswordCheckChange}
                            autoComplete="off"
                        />
                        {passwordCheckError && <div style={{ color: 'red', marginTop: '5px', fontSize: 10 }}>{passwordCheckError}</div>}
                    </div>
                    
                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>이름</p>
                        <input 
                            type="text" 
                            name="name" 
                            className={styles.buttonXBox} 
                            placeholder="이름을 입력해주세요."
                            value={username}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                 
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>전화번호</p>
                        <input 
                            type="text" 
                            name="phonenumber"
                            className={styles.buttonOBox}
                            placeholder="전화번호를 입력해주세요."
                            value={phonenumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            disabled={isPhoneVerified}
                        />
                        <button
                            className={styles.doubleButton}
                            onClick={handleSendCode}
                            type="button"
                            disabled={!phonenumber || isPhoneVerified}
                        >인증요청</button>
                    </div>
                
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>인증번호</p>
                        <input 
                            type="text" 
                            className={styles.buttonOBox} 
                            placeholder="인증번호를 입력해주세요."
                            value={verificationCode}
                            onChange={e => setVerificationCode(e.target.value)}
                            disabled={isPhoneVerified}
                        />
                        <button
                            className={styles.doubleButton}
                            onClick={handleVerifyCode}
                            type="button"
                            disabled={!verificationCode || isPhoneVerified}
                        >인증확인</button>
                        {verificationError && <div style={{ color: 'red', marginTop: '5px', fontSize: 10 }}>{verificationError}</div>}
                        {isPhoneVerified && <div style={{ color: 'green', marginTop: '5px', fontSize: 10 }}>인증 완료</div>}
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