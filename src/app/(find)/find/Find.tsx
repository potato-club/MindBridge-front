'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import FindIdForm from "@/app/(find)/findid/FindId";
import FindPWForm from "@/app/(find)/findpw/FindPW";
import * as S from "./Find.styles";  



const FindForm = () => {

    // 첫 화면 아이디로 설정해둠.
    const [activeTab, setActiveTab] = useState<"id" | "password">("id");

    const router = useRouter();


    return (
        <>
            <S.Header>
                <S.BackButton
                    type="button"
                    // 메인 페이지 연동 후 수정
                    onClick={() => router.push("/Main")}
                >
                    &lt;
                </S.BackButton>
                <S.HeaderTitle>
                    <strong>아이디/비밀번호 찾기</strong>
                </S.HeaderTitle>
            </S.Header>

            <S.Form>
                <S.Container>

                    {/* 탭 */}
                    <S.TabWrapper>

                        <S.Tab
                            type="button"
                            active={activeTab === "id"}
                            onClick={() => setActiveTab("id")}
                        >
                        아이디 찾기
                        </S.Tab>

                        <S.Tab
                            type="button"
                            active={activeTab === "password"}
                            onClick={() => setActiveTab("password")}
                        >
                        비밀번호 찾기
                        </S.Tab>
                    </S.TabWrapper>

                    {/* 탭 콘텐츠 */}
                    <S.ContentWrapper>
                        {activeTab === "id" ? <FindIdForm /> : <FindPWForm />}
                    </S.ContentWrapper>
                </S.Container>
            </S.Form>
        </>
    );
};

export default FindForm;