'use client';

import { useEffect, useState, useRef } from "react";
import styles from "../signup/SignUpForm.module.css";
import { useRouter } from "next/navigation";
import InputBox from "@/components/common/InputBox";

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
    { value: 'male', label: '  남성' },
    { value: 'female', label: '  여성'},
    { value: 'none' , label: '  비공개'}
];

const SignUpForm2 = () => {
    const [birth, setBirth] = useState<string | number>('');
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
    const [gender, setGender] = useState('');

    const router = useRouter();


    const handleBirthChange = (selectedValue: string | number) => {
        setBirth(selectedValue);
    }
    // 닉네임 유효성 검사
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNickname(value);
        setIsNicknameChecked(false);

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
            // 실제 API 주소로 변경 필요
            const res = await fetch(`/api/check-nickname?nickname=${encodeURIComponent(nickname)}`);
            const data = await res.json();
            setIsNicknameChecked(true);
            setIsNicknameDuplicate(data.isDuplicate); // 백엔드 응답에 맞게 수정
        } catch {
            setNicknameError('중복 확인 중 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (nicknameError || !nickname || !isNicknameChecked || isNicknameDuplicate) {
            alert('닉네임을 올바르게 입력하고 중복 확인을 해주세요.');
            return;
        }
        if (!gender) {
            alert('성별을 선택해주세요.');
            return;
        }
        if (!birth) {
            alert('출생년도를 선택해주세요.');
            return;
        }

        // 실제 회원가입 API 호출
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    nickname,
                    gender,
                    birth,
                }),
            });
            if (res.ok) {
                alert('회원가입이 완료되었습니다!');
            } else {
                const data = await res.json();
                alert(data.message || '회원가입에 실패했습니다.');
            }
        } catch {
            alert('회원가입 요청 중 오류가 발생했습니다.');
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
                                type="text"
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

                    <div className={styles.customDropdownBox}>
                        <p className={styles.bodyText}>나이</p>
                        <CustomDropdown
                          options={yearOptions}
                          value={birth}
                          onChange={handleBirthChange} 
                          placeholder="태어난 년도를 선택해주세요."
                      />
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