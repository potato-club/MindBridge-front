'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './BottomNav.module.css';
import Image from 'next/image'; // Image 컴포넌트는 next/image에서 가져와야 합니다.

const navLinks = [
  // 경로와 오타를 수정한 최종 버전입니다.
  { name: '메인', path: '/', img: '/images/board/house.png', activeImg: '/images/board/house-active.png' },

  { name: '게시판', path: '/board/all', img: '/images/board/board.png', activeImg: '/images/board/board-active.png' },

  { name: '채팅', path: '/chat', img: '/images/board/chat.png', activeImg: '/images/board/chat-active.png' },

  { name: '마일리지', path: '/mileage', img: '/images/board/miles.png', activeImg: '/images/board/miles-active.png' },

  { name: '마이', path: '/my', img: '/images/board/my.png', activeImg: '/images/board/my-active.png' },
];

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        {navLinks.map((link) => {
          const isActive = (pathname.startsWith(link.path) && link.path !== '/') || pathname === link.path;

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