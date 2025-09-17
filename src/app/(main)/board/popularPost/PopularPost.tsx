'use client';

// useEffect, useCallback을 추가로 import 합니다.
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
import styles from '../popularPost/PopularPost.module.css'; 
import { Post } from './post';

type PopularPostsProps = {
  posts: Post[];
};

const PopularPosts: React.FC<PopularPostsProps> = ({ posts }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 각 슬라이드 DOM 요소를 추적하기 위한 ref
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePostClick = (postId: number) => {
    router.push(`/board/post/${postId}`); 
  };
  
  // Intersection Observer 콜백 함수
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      // isIntersecting이 true이면 화면에 보이는 슬라이드임
      if (entry.isIntersecting) {
        // data-index 속성에서 현재 슬라이드의 인덱스를 읽어옴
        const newIndex = parseInt(entry.target.getAttribute('data-index') || '0', 10);
        setCurrentIndex(newIndex);
      }
    });
  }, []);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: carouselRef.current, // 스크롤이 일어나는 부모 요소
      rootMargin: '0px',
      threshold: 0.5, // 슬라이드가 50% 이상 보일 때 감지
    });

    // 각 슬라이드에 대해 observer 등록
    slideRefs.current.forEach(slide => {
      if (slide) observer.observe(slide);
    });

    // 컴포넌트가 언마운트될 때 observer 정리
    return () => {
      slideRefs.current.forEach(slide => {
        if (slide) observer.unobserve(slide);
      });
    };
  }, [posts, handleIntersection]);


  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Image src="/images/main/fire.png" alt="불꽃 아이콘" width={24} height={24}/>
        <p>주간 인기 게시물</p>
      </div>
      
      {/* --- 회색 박스 영역 시작 --- */}
      <div className={styles.container}>
        <div className={styles.carousel} ref={carouselRef}>
          <div className={styles.slideContainer}>
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className={styles.slide} 
                onClick={() => handlePostClick(post.id)}
                // 각 슬라이드 DOM 요소를 ref 배열에 저장하고, 인덱스를 data 속성으로 추가
                ref={el => slideRefs.current[index] = el}
                data-index={index}
              >
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postWriter}>
                  <span>{post.author}</span>
                  <div className={styles.postStats}>
                    <Image src="/images/main/show.png" alt="조회수" width={16} height={8}/>
                    <p>{post.views}</p>
                    <Image src="/images/main/like.png" alt="좋아요" width={16} height={16}/>
                    <p>{post.likes}</p>
                    <Image src="/images/main/comment.png" alt="댓글" width={16} height={16}/>
                    <p>{post.comments}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* --- 회색 박스 영역 끝 --- */}

      {/* --- 점(dot) 부분을 박스 밖으로 이동 --- */}
      <div className={styles.dotsContainer}>
        {posts.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => {
              if (carouselRef.current) {
                const slideWidth = carouselRef.current.offsetWidth;
                carouselRef.current.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;