'use client';

import { useState } from "react";
import React from "react";
import { useSignupContext } from "@/app/context/SignupContext";
import styles from "./SignUpForm.module.css";
import { useRouter } from "next/navigation";
import InputBox from "@/components/common/InputBox";

const SignUpForm = () => {

    const [loginid, setLoginId] = useState('');
    const [loginIdError, setLoginIdError] = useState('');
    const [isLoginIdChecked, setIsLoginIdChecked] = useState(false);
    const [isLoginIdDuplicate, setLoginIdDuplicate] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    const [username, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    // 전화번호 인증 관련 상태
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [verificationError, setVerificationError] = useState<string>('');
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

    const router = useRouter();
    const {dispatch} = useSignupContext();

    // 아이디 유효성 검사
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLoginId(value);
        setIsLoginIdChecked(false);

        if (!/^[a-zA-Z0-9]*$/.test(value)) {
            setLoginIdError('아이디는 영문, 숫자만 사용할 수 있습니다.');
        } else if (value.length < 4 || value.length > 16) {
            setLoginIdError('아이디는 4자 이상 16자 이하로 입력해주세요.');
        } else {
            setLoginIdError('');
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
        if (loginIdError || !loginid) return;

        // 실제 중복 검사 API 호출 필요
        try {
            const res = await fetch('/api/check-duplicate');
            // const data = await res.json(); // 실제 사용 시 주석 해제
            setIsLoginIdChecked(true);
            setLoginIdDuplicate(false); // 실제 사용 시 data.isDuplicate로 변경
        } catch (err) {
            setLoginIdError('중복 검사 중 오류 발생');
        }
    };

    // 전화번호 인증요청
    const handleSendCode = async (e: React.MouseEvent) => {
        e.preventDefault();
        setVerificationError('');

        if (isCodeSent && !window.confirm("인증번호를 재전송하시겠습니까?")) {
            return;
        }

        try {
            const res = await fetch('/api/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phonenumber }),
            });
            if (res.ok) {
                setIsCodeSent(true);
                setVerificationCode(''); 
                setVerificationError('');
                alert(isCodeSent ? '인증번호가 재전송되었습니다.' : '인증번호가 발송되었습니다.');
            } else {
                setVerificationError('인증번호 발송에 실패했습니다.');
            }
        } catch {
            setVerificationError('인증번호 발송 중 오류 발생');
        }
    };

    // 인증번호 확인
    const handleVerifyCode = async (e: React.MouseEvent<Element>) => {
        e.preventDefault();
        setVerificationError('');

        if (!verificationCode) { 
            setVerificationError('인증번호를 입력해주세요.');
            return;
        }

        try {
            const res = await fetch('/api/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phonenumber, code: verificationCode }),
            });
            if (res.ok) {
                setIsPhoneVerified(true);
                alert('전화번호 인증이 완료되었습니다!');
            } else {
                const errorData = await res.json();
                setVerificationError(errorData.message || '인증번호가 올바르지 않습니다.');
            }
        } catch {
            setVerificationError('인증 확인 중 오류 발생');
        }
    };

    const buttonText = isCodeSent ? '재전송' : '인증 요청';
    const buttonClass = isCodeSent ? styles.resendButton : styles.sendButton;

    const handleNext = () => {
        if (!isLoginIdChecked || isLoginIdDuplicate || loginIdError) {
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

        dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: {
                loginid,
                password,
                username,
                phonenumber,
                verified: isPhoneVerified,
            }
        });

        router.push('/signup2');
    };

    return (
        
         
       <>
            <form className={styles.wrapper_main}>
                <InputBox
                label="아이디"
                type="text"
                name="userid"
                placeholder="아이디를 입력해주세요."
                value={loginid}
                onChange={handleUserIdChange}
                buttonText="중복 확인"
                onButtonClick={handleCheckDuplicate}
                isButtonDisabled={!!loginIdError || !loginid}
                errorMessage={loginIdError}
                successMessage={isLoginIdChecked && !isLoginIdDuplicate && !loginIdError ? '사용 가능한 아이디입니다.' : undefined}
            />

            
            <InputBox
                label="비밀번호"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={handlePasswordChange}
                errorMessage={passwordError}
            />
            
          
            <InputBox
                label="비밀번호 확인"
                type="password"
                name="passwordCheck"
                placeholder="비밀번호를 다시 입력해주세요."
                value={passwordCheck}
                onChange={handlePasswordCheckChange}
                errorMessage={passwordCheckError}
            />
            
           
            <InputBox
                label="이름"
                type="text"
                name="name"
                placeholder="이름을 입력해주세요."
                value={username}
                onChange={e => setName(e.target.value)}
            />

         
            <InputBox
                label="전화번호"
                type="number"
                name="phonenumber"
                placeholder="전화번호를 입력해주세요."
                value={phonenumber}
                onChange={e => setPhoneNumber(e.target.value)}
                disabled={isPhoneVerified}

                buttonText={isCodeSent ? "재전송" : "인증요청"}
                onButtonClick={handleSendCode}

                isButtonDisabled={!phonenumber || isPhoneVerified}
            />

            <InputBox
                label="인증번호"
                type="number"
                name="authCode"
                placeholder="인증번호를 입력해주세요."
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}

                disabled={!isCodeSent || isPhoneVerified}

                buttonText="인증확인"
                onButtonClick={handleVerifyCode}
                isButtonDisabled={!verificationCode || isPhoneVerified}
                errorMessage={verificationError}
                successMessage={isPhoneVerified ? '인증 완료' : undefined}
            />
   

            <div className={styles.bottomButtonBox}>
                <button type="button" 
                        onClick={handleNext} 
                        className={styles.nextButton}>다음으로</button>
            </div>
             </form>
        </>
        
    );
};

export default SignUpForm;