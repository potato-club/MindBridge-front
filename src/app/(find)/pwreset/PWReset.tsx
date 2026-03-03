'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as S from "./PWReset.styles";

const PWResetForm = () => {

    const router = useRouter();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifyMessage, setVerifyMessage] = useState(""); // 인증 결과 메시지

    const isFormVaild = 
    newPassword !== "" && 
    confirmPassword !== "" && 
    newPassword == confirmPassword;

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // if (!newPassword || !confirmPassword) {
        //     setVerifyMessage("비밀번호를 모두 입력해주세요.");
        //     // window.location.reload();
        //     return;
        // }

        if (newPassword !== confirmPassword) {
            setVerifyMessage("비밀번호가 일치하지 않습니다.");
            return;
        }
        
        // 여기에서 API요청을 해야 한다고?
        try {
            const response = await axios.post("백엔드주소", {
                password: newPassword,
            });

            if (response.status === 200) {
                alert("✅ 비밀번호가 성공적으로 변경되었습니다!");
                // 잠시 후 로그인 페이지로 이동
                setTimeout(() => router.push("/login"), 1000);
            } else {
                alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };


    return (
        <>
            <S.Header>
                <S.BackButton
                    type="button"
                    onClick={() => router.push("/findpw")}
                >
                    &lt;
                </S.BackButton>

                <h1><strong>비밀번호 변경</strong></h1>
            </S.Header>

            <S.Form onSubmit={handleSubmit}>
                <S.Container>
                        {/* 새 비밀번호 */}

                        <S.Password>
                            <p>새 비밀번호</p>
                            <S.NewPassword>
                                <S.Input 
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="새 비밀번호를 입력해주세요."
                                required
                                />
                            </S.NewPassword> 
                        </S.Password>

                        {/* 새 비밀번호 확인 */}
                        <S.Password>
                            <p>새 비밀번호 확인</p>
                            <S.PasswordCheck>
                                <S.Input 
                                type="text"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="새 비밀번호를 다시 입력해주세요."
                                />
                                <S.SendButton
                                type="submit"
                                // onClick={handleSendCode}
                                >
                                    변경확인
                                </S.SendButton>
                            </S.PasswordCheck>
                            {/* 결과 메시지 */}
                            {verifyMessage && (
                                <S.VerifyMessage>{verifyMessage}</S.VerifyMessage>
                            )}
                        </S.Password>
                    

                    
                    

                    {/* 확인버튼(로그인 창으로 넘어감.) */}
                    <S.SubmitButton
                        type="submit"
                        onClick={() => router.push("/pwcheck")}
                        disabled={!isFormVaild}
                    >
                        비밀번호 변경
                    </S.SubmitButton>

                </S.Container>
            </S.Form>
        </>
    );
};

export default PWResetForm;
