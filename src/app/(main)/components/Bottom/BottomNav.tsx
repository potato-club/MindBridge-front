'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './BottomNav.module.css';
import Image from 'next/image';

const navLinks = [
  { name: '메인', path: '/', img: '/images/main/main.png', activeImg: '/icons/home-active.png' },

  { name: '게시판', path: '/board/all', img: '/images/main/board.png', activeImg: '/images/main/board.png' },

  { name: '채팅', path: '/chat', img: '/images/main/chat.png', activeImg: '/images/main/chat-active.png' },

  { name: '마일리지', path: '/', img: '/images/main/myPage.png', activeImg: '/iamges/main/myPage-active.png' },

  { name: '마이', path: '/', img: '/images/main/myPage.png', activeImg: '/iamges/main/myPage-active.png' },
];

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        {navLinks.map((link) => {
          const isActive =
            link.path === '/'
              ? pathname === '/'
              : pathname.startsWith(link.path);

          return (
            <button
              key={link.name}
              type="button"
              onClick={() => router.push(link.path)}
              className={styles.navBtn}
            >
              <Image
                        src="/images/main/house.png" 
                        alt="메인 아이콘"
                        width={20}
                        height={20}
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