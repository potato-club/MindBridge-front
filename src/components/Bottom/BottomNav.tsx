'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './BottomNav.module.css';

// 네비게이션 링크 데이터
const navLinks = [
  { name: '메인', path: '/main', img: '/images/board/house.png', activeImg: '/images/board/house-active.png' },
  { name: '게시판', path: '/board/all', img: '/images/board/board.png', activeImg: '/images/board/board-active.png' },
  { name: '채팅', path: '/chat', img: '/images/board/chat.png', activeImg: '/images/board/chat-active.png' },
  { name: '마일리지', path: '/mileage', img: '/images/board/miles.png', activeImg: '/images/board/miles-active.png' },
  { name: '마이', path: '/mypage', img: '/images/board/my.png', activeImg: '/images/board/my-active.png' },
];

// 이 컴포넌트를 숨길 페이지 경로 목록
const HIDE_NAV_PATHS = ['/signup', '/signup2', '/board/postDetail/', '/login'];

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 1. 현재 경로가 숨겨야 할 경로인지 확인합니다.
  // '/signup/step2' 같은 하위 경로도 확인하기 위해 startsWith를 사용합니다.
  const shouldHideNav = HIDE_NAV_PATHS.some(path => pathname.startsWith(path));

  // 2. 숨겨야 하는 페이지라면 아무것도 표시하지 않습니다 (null).
  if (shouldHideNav) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        {navLinks.map((link) => {
          // 현재 경로가 해당 링크의 경로로 시작하는지 확인하여 활성화 상태를 결정합니다.
          // 단, 메인('/') 경로는 정확히 일치할 때만 활성화합니다.
          const isActive = (link.path !== '/' && pathname.startsWith(link.path)) || pathname === link.path;

          return (
            <button
              key={link.name}
              type="button"
              onClick={() => router.push(link.path)}
              className={styles.navBtn}
            >
              <Image
                src={isActive ? link.activeImg : link.img}
                alt={link.name}
                width={28}
                height={28}
                priority // LCP(Largest Contentful Paint) 성능 최적화를 위해 주요 이미지에 priority 속성 추가
              />
              <span
                className={`${styles.navText} ${isActive ? styles.navTextActive : ''}`}
              >
                {link.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;