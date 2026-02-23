'use client';

import { useSearchParams,useRouter } from "next/navigation";
import * as S from "./IDCheck.styles";

const IDCheckForm = () => {
  const searchParams = useSearchParams();
  
  const router = useRouter();

  // URL에서 가져오기
  const UserName = searchParams.get("username");
  const LoginId = searchParams.get("loginId");

  return (
    <>
      <S.Header>
        <h1>아이디 확인</h1>
      </S.Header>
      <S.Form>
        <S.Container>
          {/* 확인 이미지 삽압 */}
          <S.IMG>확</S.IMG>

          {/* 문구(백엔드 연동 후 style 수정.) */}
          <S.ResultText>
            {/* {username && userId && (
              <p>
                {UserName} 님의 아이디는{" "}
                <strong>{LoginId}</strong> {" "}입니다.
              </p>
            )} */}
            <p>
              미나미 님의 아이디는{" "}
              <strong>모나미</strong> {" "}입니다.
            </p>
          </S.ResultText>
          
            
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

export default IDCheckForm;
