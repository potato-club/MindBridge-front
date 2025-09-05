'use client';

import { useEffect, useState, useRef } from "react";
import styles from "../signup/SignUpForm.module.css";
import { useRouter } from "next/navigation";

// ==================================================================
// ▼▼▼ 드롭다운 UI와 기능을 담당하는 컴포넌트를 이 파일 안에 정의합니다. ▼▼▼
// ==================================================================
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
        <span className={`${styles.arrowIcon} ${isOpen ? styles.open : ''}`}></span>
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
// ==================================================================
// ▲▲▲ 여기까지가 커스텀 드롭다운 컴포넌트입니다. ▲▲▲
// ==================================================================


const genderOptions = [
    { value: 'male', label: '  남성' },
    { value: 'female', label: '  여성'},
    { value: 'none' , label: '  비공개'}
];

const SignUpForm2 = () => {
    const [birth, setBirth] = useState<string | number>('');
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("제출 데이터:", { email, nickname, gender, age: birth });
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
                    {/* 이메일 입력란 */}
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>이메일</p>
                        <div className={styles.inpuBoxWrapper}>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.buttonOBox}
                                placeholder="이메일을 입력해주세요."
                            />
                        </div>
                    </div>

                    {/* 닉네임 섹션 */}
                    <div className={styles.oButton}>
                        <p className={styles.bodyText}>닉네임</p>
                        <div className={styles.inpuBoxWrapper}>
                            <input
                                type="text"
                                name="nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className={styles.buttonOBox}
                                placeholder="닉네임을 입력해주세요."
                            />
                            <button type="button" className={styles.doubleButton}>중복 확인</button>
                        </div>
                    </div>

                    {/* 성별 섹션 */}
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

                    {/* 출생년도 드롭다운 */}
                    <div className={styles.xButton}>
                        <p className={styles.bodyText}>나이</p>
                        <CustomDropdown
                            options={yearOptions}
                            value={birth}
                            onChange={(selectedValue) => setBirth(selectedValue)}
                            placeholder="태어난 년도를 선택해주세요."
                        />
                    </div>

                    {/* 가입하기 버튼 */}
                    <div className={styles.bottomButtonBox2}>
                        <button type="submit" className={styles.nextButton}>가입하기</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SignUpForm2;