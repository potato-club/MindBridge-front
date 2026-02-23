'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as S from "./FindId.styles";

/* 아이디/비밀번호 찾기 폼 */
const FindIdForm = () => {
    const [username, setUserName] = useState("");
    const [phoneNumber, setUserPhoneNumber] = useState("");
    const [verified, setUserVerified] = useState("");

    const [verifyMessage, setVerifyMessage] = useState(""); // 인증 결과 메시지

    const router = useRouter();

    /* 인증번호 발송 */
    const handleSendCode = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // api 구현(백엔드 요청)해야 함!
        try {
            const res = await axios.post("/api/send-code", {
                username,
                phoneNumber,
            });


            // 백엔드 성공 가정(수정 필요)
            if (res.data.success) {
                alert("인증번호가 발송되었습니다.");
            } else {
                alert("개인정보가 틀렸습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    /* 인증번호 확인 */
    const handleVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // api요청
    try {
        const res = await axios.post("/api/verify-code", {
            phoneNumber,
            verified,
            
        });

        /* 백엔드 성공 가정(수정 필요) */
        if (res.data.success) {
            setVerifyMessage("");
            alert("인증이 완료되었습니다.");
        } else {
            setVerifyMessage("인증번호를 확인해주세요!");
        }

    } catch (error) {
        console.error(error);
        alert("서버 오류가 발생했습니다.");
    
    }
};

    
    /* 아이디 찾기 */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/find-id", {
                username,
                phoneNumber,
                verified,
            });

            /* 백엔드 성공 가정(수정 필요) */
            if (res.data.userId) {
                // IDCheck 페이지로 userId 전달.
                router.push(`/IDCheck?userId=${encodeURIComponent(res.data.userId)}`);
            } else {
                alert("아이디 찾기에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
        // 백엔드 요청 API구현
    };

    return (
        <>
            <S.Header>
                <h1>아이디 찾기 페이지</h1>
            </S.Header>
            <S.Form onSubmit={handleSubmit}>
                <S.Container>
                    {/* 이름입력 */}
                    <S.User>
                        <p>이름</p>
                        <S.UserName>
                            <S.Input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="이름을 입력해주세요."
                            />
                        </S.UserName>
                    </S.User>
                        

                    {/* 전화번호 + 인증번호 발송 버튼*/}
                    <S.User>
                        <p>전화번호</p>
                        <S.UserRow>
                            <S.Input 
                            type="tel"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={phoneNumber}
                            onChange={(e) => setUserPhoneNumber(e.target.value)}
                            placeholder="휴대폰 번호를 입력해주세요." 
                            
                            />
                            <S.SendButton
                            type="button"
                            onClick={handleSendCode}
                            >
                                인증요청
                            </S.SendButton>
                        </S.UserRow>
                    </S.User>

                                        {/* 전화번호 + 인증번호 발송 버튼*/}
                    <S.User>
                        <p>인증번호</p>
                        <S.UserRow>
                            <S.Input 
                                type="text"
                                inputMode="numeric"
                                value={verified}
                                onChange={(e) => setUserVerified(e.target.value)}
                                placeholder="인증번호를 입력해주세요." 
                            />
                            <S.SendButton
                            type="button"
                            onClick={handleVerifyCode}
                            >
                                인증확인
                            </S.SendButton>
                        </S.UserRow>

                            {/* 결과 메시지 */}
                        {verifyMessage && (
                            <S.VerifyMessage>{verifyMessage}</S.VerifyMessage>
                        )}
                    </S.User>    


                    
                    {/* 제출 버튼 */}
                    <S.SubmitButton>
                        아이디 찾기
                    </S.SubmitButton>
                </S.Container>
            </S.Form>
        </>
    );
};

export default FindIdForm;