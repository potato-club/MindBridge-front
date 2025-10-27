// app/template.tsx

'use client'; // usePathname을 사용하려면 'use client'가 필요합니다.

import BottomNav from "../components/Bottom/BottomNav";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* 페이지 컨텐츠 */}
      <main style={{ flexGrow: 1 }}>
        {children} 
      </main>
      
      {/* 경로 변경 시 재렌더링되며 숨김 로직이 동작하는 BottomNav */}
      <BottomNav />
    </div>
  );
}