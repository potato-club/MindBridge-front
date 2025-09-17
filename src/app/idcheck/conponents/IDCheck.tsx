"use client";

import { useSearchParams, useRouter } from "next/navigation";

const IDCheckPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 userId 가져오기
  const userId = searchParams.get("userId");

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>아이디 확인</h1>
      {userId ? (
        <>
          <p>고객님의 아이디는 <strong>{userId}</strong> 입니다.</p>
          <button onClick={() => router.push("/login")}>로그인하러 가기</button>
        </>
      ) : (
        <p>아이디 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default IDCheckPage;
