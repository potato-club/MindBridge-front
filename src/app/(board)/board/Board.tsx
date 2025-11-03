'use client';

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from './Board.module.css';
import Searchbox from "../components/Searchbox";
import PopularPosts from "./popularPost/PopularPost"; 
import { 
    Post, 
    categories,
    allPosts,   
    getPopularPosts 
} from "./mockData";


const POSTS_PER_PAGE = 10; 


const Board = () => {
  const router = useRouter();
  const pathname = usePathname();
  

  const [selected, setSelected] = useState<string>('all');
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);


  useEffect(() => {
    const topPosts = getPopularPosts(allPosts);
    setPopularPosts(topPosts);
  }, []);


  useEffect(() => {
    const pathSegments = pathname.split('/');
    const currentCategory = pathSegments[pathSegments.length - 1];
    
    const categoryExists = categories.some(cat => cat.category === currentCategory); 
    
    if (categoryExists) {
      setSelected(currentCategory);
      setCurrentPage(1);
    } else {
      setSelected('all');
      setCurrentPage(1);
    }
  }, [pathname, router]);



  const filteredPosts = useMemo(() => {
    
    const filtered = selected === 'all'
      ? allPosts
      : allPosts.filter(post => post.category === selected);


    return filtered.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  }, [selected]);


  useEffect(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    
    setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, currentPage]);



  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handleCategoryClick = (category: string) => {
    router.push(`/board/${category}`);
  };

  const handleSearchSubmit = (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    console.log("검색어:", searchTerm);
    router.push(`/search?query=${searchTerm}`);
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };


  const handlePostClick = (postId: string) => {
    router.push(`/board/postDetail/${postId}`);
  };
  

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${i === currentPage ? styles.activePage : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>게시판</h1>

      <Searchbox onSearch={handleSearchSubmit} />

      <div className={styles.categoryContainer}>
        <ul className={styles.categoryList}>
          {categories.map((cat) => (
            <li
              key={cat.category}
              className={`${styles.categoryItem} ${selected === cat.category ? styles.active : ''}`}
              onClick={() => handleCategoryClick(cat.category)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      <PopularPosts posts={popularPosts} />

      <div className={styles.postList}>
        {displayedPosts.map(post => (
        
          <div 
            key={post.post_id} 
            className={styles.postItem}
            onClick={() => handlePostClick(post.post_id)} 
            style={{ cursor: 'pointer' }} 
          >
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postContent}>{post.content}</p>
            <div className={styles.postMeta}>
              <span>{post.nickname}</span>
              <span>{new Date(post.created_at).toLocaleDateString('ko-KR').slice(0, -1)}</span>
              <div className={styles.postStats}>
               
                  <Image src="/images/board/show.png" alt="조회수" width={16} height={8}/> 
                  <p>{post.view_count}</p>
                
                  <Image src="/images/board/like.png" alt="좋아요" width={16} height={8}/> 
                  <p>{post.like_count}</p>
                
                  <Image src="/images/board/comment.png" alt="댓글 수" width={16} height={8}/> 
                  <p>{post.comment_count}</p>
              </div>
            </div>
          </div>
        ))}
        
        {totalPages > 1 && (
            <div className={styles.pagination}>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                >
                    이전
                </button>
                {renderPagination()}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                >
                    다음
                </button>
            </div>
        )}
        
      </div>

      <button className={styles.fab} onClick={() => router.push('/board/postWrite')}>
        + 글쓰기
      </button>
    </div>
  );
};

export default Board;