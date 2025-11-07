'use client';

import { useEffect, useState, useRef } from "react";
import styles from "../signup/SignUpForm.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import InputBox from "@/components/common/InputBox";
import { useSignupContext, SignupState, Gender} from '@/app/context/SignupContext';
import axios from "axios";

type Option = {
  value: string | number;
  label: string;
};

type CustomDropdownProps = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder: string;
};

const CustomDropdown = ({ options, value, onChange, placeholder }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customDropdown} ref={dropdownRef}>
      <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)}>
        <span className={selectedOption ? styles.selectedValue : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`${styles.arrowDown} ${isOpen ? styles.open : ''}`}></span>
      </div>

      {isOpen && (
        <div className={styles.dropdownOptions}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.optionItem}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const genderOptions = [
    { value: 'MALE', label: '  남성' },
    { value: 'FEMALE', label: '  여성'},
    { value: 'NONE' , label: '  비공개'}
];

const SignUpForm2 = () => {
    const {state: signupState, dispatch} = useSignupContext();

    const [initialYear, initialMonth, initialDay] = signupState.birthDate
      ? signupState.birthDate.split('-')
      : ['', '', ''];


    const monthOptions = Array.from({ length: 12 }, (_, i) => ({
      value: String(i + 1).padStart(2, '0'), 
      label: `${i + 1}월`
    }));

    const dayOptions = Array.from({ length: 31 }, (_, i) => ({
      value: String(i + 1).padStart(2, '0'), 
      label: `${i + 1}일`
    }));



    const [birthYear, setBirthYear] = useState<string | number>(initialYear || '');
    const [birthMonth, setBirthMonth] = useState<string | number>( initialMonth || ''); 
    const [birthDay, setBirthDay] = useState<string | number>( initialDay || '');     


    const [nickname, setNickname] = useState(signupState.nickname || '');
    const [nicknameError, setNicknameError] = useState('');
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

    const [gender, setGender] = useState<string>(signupState.gender || '');

    const router = useRouter();


    // 닉네임 유효성 검사
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNickname(value);

        setIsNicknameChecked(false);
        setIsNicknameDuplicate(false);

        // 한글, 영문, 숫자 2~10자
        if (!/^[가-힣a-zA-Z0-9]{2,10}$/.test(value)) {
            setNicknameError('닉네임은 한글, 영문, 숫자 2~10자여야 합니다.');
        } else {
            setNicknameError('');
        }
    };

    // 닉네임 중복확인
    const handleCheckNickname = async () => {

    if (nicknameError || !nickname) return;

    try {
        const response = await axios.get('/api/auth/check-nickname', {
            params: { nickname } 
        });
        
        const data = response.data; 

        setIsNicknameChecked(true); 
        
        if (data.isDuplicate) {
            setIsNicknameDuplicate(true);
            setNicknameError('이미 사용 중인 닉네임입니다.');
        } else {
            setIsNicknameDuplicate(false);
            setNicknameError(''); 
        }

    } catch (error) {
        setIsNicknameChecked(true); 
        setIsNicknameDuplicate(true); 
        setNicknameError('닉네임 중복 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 409) {
                 setIsNicknameDuplicate(true);
                 setNicknameError(error.response.data.message || '이미 사용 중인 닉네임입니다. (서버 오류 코드 409)');
            } else {
                console.error("닉네임 중복확인 서버 오류:", error.response.data);
            }
        } else {
            console.error("닉네임 중복확인 네트워크 오류:", error);
        }
    }
};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (nicknameError || !nickname || !isNicknameChecked || isNicknameDuplicate) {
            alert('닉네임을 올바르게 입력하고 중복 확인을 해주세요.');
            return;
        }
        if (!gender || gender === 'NONE') {
            alert('성별을 선택해주세요.');
            return;
        }
         if (!birthYear || !birthMonth || !birthDay) {
            alert('출생 년/월/일을 모두 선택해주세요.');
            return;
        }

        const formattedBirthDate = `${birthYear}-${birthMonth}-${birthDay}`;

        dispatch({ 
            type: 'UPDATE_FORM_DATA',
            payload: {
              nickname: nickname,
              birthDate: formattedBirthDate,
              gender: gender as Gender,
            }
        });

        const dataToSend = {

          loginId: signupState.loginId,
          password: signupState.password, 
          username: signupState.username,
          phonenumber: signupState.phonenumber,
          verified: signupState.verified, 

         
          nickname: nickname,
          birthDate: formattedBirthDate, 
          gender: gender,
    };

       
       try {
            const res = await axios.post('/api/auth/signup', dataToSend); 

            if ((res.status === 200 || res.status === 201) && res.data.success === true) {
                alert('회원가입이 완료되었습니다!');

                dispatch({ type: 'RESET_FORM' });
                router.push('/login');
            } 
            else if (res.status === 200 && res.data.success === false) {
              alert(res.data.message || '회원가입 처리 중 오류가 발생했습니다.');
          }
            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data;
                alert(data.message || '회원가입에 실패했습니다. (서버 응답 오류)');
                console.error("회원가입 실패 상세:", data);
            } else {
                alert('회원가입 요청 중 네트워크 오류가 발생했습니다.');
                console.error(error);
            }
        }
    };

    const currentYear = new Date().getFullYear();
    const yearOptions: Option[] = [];
    for (let year = currentYear; year >= currentYear - 100; year--){
        yearOptions.push(
            { value: year, label: `${year}년` }
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.wrapper_main2}>

                
                    <div className={styles.oButton}>
                            <InputBox
                                label="닉네임"
                                type="string"
                                name="nickname"
                                value={nickname}
                                placeholder="닉네임을 입력해주세요."
                                onChange={handleNicknameChange}
                                buttonText="중복 확인"
                                onButtonClick={handleCheckNickname}
                                isButtonDisabled={!!nicknameError || !nickname}
                                errorMessage={nicknameError}
                                successMessage={isNicknameChecked && !isNicknameDuplicate && !nicknameError ? '사용 가능한 닉네임입니다.' : undefined}
                            />
                    </div>

                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>성별</p>
                        <div>
                            {genderOptions.map((option) => (
                                <label key={option.value} className={styles.radioBox}>
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
                <p className={styles.bodyText}>생년월일</p>
                <div className={styles.birthBox}>
                  
                   <div className={styles.customDropdownBox}>
                      <CustomDropdown
                        options={yearOptions}
                        value={birthYear}
                        onChange={setBirthYear} 
                        placeholder="년"
                      />
                  </div>
                  <div className={styles.customDropdownBox}>
                      <CustomDropdown
                        options={monthOptions}
                        value={birthMonth}
                        onChange={setBirthMonth}
                        placeholder="월"
                      />
                  </div><div className={styles.customDropdownBox}>
                      <CustomDropdown
                        options={dayOptions}
                        value={birthDay}
                        onChange={setBirthDay}
                        placeholder="일"
                      />
                  </div>
               </div>
 
                    <div className={styles.bottomButtonBox2}>
                        <button type="submit" className={styles.nextButton}>가입하기</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SignUpForm2;