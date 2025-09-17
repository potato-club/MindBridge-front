'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from './Board.module.css';
import Searchbox from "../components/Searchbox";
import PopularPosts from "./popularPost/PopularPost"; 
import { Post } from "./popularPost/post";

// ❗️요청하신 8개 카테고리 목록으로 수정
const categories = [
  { id: 'all', name: '전체' },
  { id: 'free', name: '자유' },
  { id: 'love', name: '연애' },
  { id: 'studies', name: '공부' },
  { id: 'friends', name: '친구' },
  { id: 'family', name: '가정사' },
  { id: 'politics', name: '정치/경제' },
  { id: 'current_affairs', name: '시사/이슈' }
];


// API 연동 전 사용할 가짜(mock) 데이터 (author, content 추가)
const allPosts: Post[] = [
    { id: 4, title: '감자 샀는데 고구마가 왔다', author: '홍길동', likes: 36, views: 1, comments: 14, createdAt: '2025-09-16', content: '분명 감자를 주문했는데...'},
    { id: 1, title: '프로젝트가 너무 어려워요', author: '홍길동', likes: 0, views: 1, comments: 1, createdAt: '2025.09.15', content: '지금 하는 프로젝트가 너무 어려워요ㅠㅠㅠㅠ'},
    { id: 2, title: '프로젝트가 너무 쉬워용', author: '홍길동', likes: 0, views: 1, comments: 1, createdAt: '2025.09.15', content: '지금 하는 프로젝트가 너무 쉬워용'},
    { id: 3, title: '프로젝트가 너무 쉬워용', author: '홍길동', likes: 0, views: 1, comments: 1, createdAt: '2025.09.15', content: '지금 하는 프로젝트가 너무 쉬워용'},
    { id: 5, title: '리액트 질문 있습니다', author: '김코딩', likes: 60, views: 150, comments: 5, createdAt: '2025-09-14' },
    { id: 6, title: '자바스크립트 꿀팁', author: '박해커', likes: 60, views: 150, comments: 5, createdAt: '2025-09-13' },
];

// 인기 게시물 3개를 계산하는 함수
const getPopularPosts = (posts: Post[]): Post[] => {
  const popularPost = posts.find(p => p.id === 4);
  const otherPosts = posts.filter(p => p.id !== 4);
  
  const sortedOtherPosts = otherPosts
    .sort((a, b) => {
      const scoreA = a.likes + a.views + a.comments;
      const scoreB = b.likes + b.views + a.comments;
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 2);

    return popularPost ? [popularPost, ...sortedOtherPosts] : sortedOtherPosts;
};


const Board = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string>('all');
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);

  useEffect(() => {
    const topPosts = getPopularPosts(allPosts);
    setPopularPosts(topPosts);
  }, []);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const currentCategory = pathSegments[pathSegments.length - 1];
    const categoryExists = categories.some(cat => cat.id === currentCategory);
    
    if (categoryExists) {
      setSelected(currentCategory);
    } else {
      setSelected('all');
    }
  }, [pathname, router]);

  const handleCategoryClick = (id: string) => {
    router.push(`/board/${id}`);
  };

  const handleSearchSubmit = (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    console.log("검색어:", searchTerm);
    router.push(`/search?query=${searchTerm}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>게시판</h1>

      <Searchbox onSearch={handleSearchSubmit} />

      <div className={styles.categoryContainer}>
        <ul className={styles.categoryList}>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={`${styles.categoryItem} ${selected === cat.id ? styles.active : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      <PopularPosts posts={popularPosts} />

      <div className={styles.postList}>
        {allPosts.map(post => (
          <div key={post.id} className={styles.postItem}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postContent}>{post.content}</p>
            <div className={styles.postMeta}>
              <span>{post.author}</span>
              <span>{post.createdAt}</span>
              <div className={styles.postStats}>
               
                  <Image src="/images/main/show.png" alt="조회수" width={16} height={8}/> <p>{post.views}</p>
                
                  <Image src="/images/main/like.png" alt="조회수" width={1} height={8}/> 
                  <p>{post.likes}</p>
                
                  <Image src="/images/main/comment.png" alt="조회수" width={16} height={8}/> 
                  <p>{post.comments}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.fab} onClick={() => router.push('/write')}>
        + 글쓰기
      </button>
    </div>
  );
};

export default Board;