'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
import styles from './PopularPost.module.css'; 
import { Post } from '../mockData';

type PopularPostsProps = {
  posts: Post[];
};

const PopularPosts: React.FC<PopularPostsProps> = ({ posts }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePostClick = (post_id: number) => {
    router.push(`/board/postDetail/${post_id}`); 
  };
  
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const newIndex = parseInt(entry.target.getAttribute('data-index') || '0', 10);
        setCurrentIndex(newIndex);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: carouselRef.current,
      rootMargin: '0px',
      threshold: 0.5,
    });

    slideRefs.current.forEach(slide => {
      if (slide) observer.observe(slide);
    });

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
        <Image src="/images/board/fire.png" alt="불꽃 아이콘" width={24} height={24}/>
        <p>주간 인기 게시물</p>
      </div>
      
      <div className={styles.container}>
        <div className={styles.carousel} ref={carouselRef}>
          <div className={styles.slideContainer}>
            {posts.map((post, index) => (
              <div 
                key={post.post_id} 
                className={styles.slide} 
                onClick={() => handlePostClick(post.post_id)}
                ref={el => slideRefs.current[index] = el}
                data-index={index}
              >
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postWriter}>
                  <span>{post.user_id}</span>
                  <div className={styles.postStats}>
    
                    <Image src="/images/board/show.png" alt="조회수" width={16} height={8}/>
                    <p>{post.view_count}</p>
                    <Image src="/images/board/like.png" alt="좋아요" width={16} height={16}/>
                    <p>{post.like_count}</p>
                    <Image src="/images/board/comment.png" alt="댓글" width={16} height={16}/>
                    <p>{post.comment_count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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