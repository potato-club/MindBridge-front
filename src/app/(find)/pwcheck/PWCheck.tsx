'use client';

import { useSearchParams, useRouter } from "next/navigation";
import * as S from "./PWCheck.styles";

const PWCheckForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // URL에서 가져오기
    const userName = searchParams.get("username");

    return (
        <>
            <S.Header>
                <h1>비밀번호</h1>
            </S.Header>
            <S.Form>    
                <S.Container>

                    {/* 확인 이미지 삽압 */}
                    <S.IMG>확</S.IMG>

                    {/* 문구 */}
                    <S.ResulText>
                    {/* {username && (
                        <p className={styles.ResultText}>
                            <strong>{userName}</strong>님의 비밀번호가 {"<br>"}
                            변경 되었습니다.
                        </p>
                    )} */}
                        <p>
                            미나미 님의 비밀번호가{" "}
                            변경되었습니다.
                        </p>
                    </S.ResulText>

                    {/* 확인버튼(로그인 창으로 넘어감.) */}
                    <S.SubmitButton
                        type="button"
                        onClick={() => router.push("/login")}
                    >
                        확인
                    </S.SubmitButton>
                </S.Container>
            </S.Form>
        </>
    );
};

export default PWCheckForm;