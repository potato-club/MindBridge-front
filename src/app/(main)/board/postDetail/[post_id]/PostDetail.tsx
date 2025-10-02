'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useParams} from "next/navigation";
import styles from './PostDetail.module.css';
import { categories, allPosts, getPopularPosts } from '../../mockData'; 



const PostDetail = () => {



    const params = useParams();
    const category = params.category; 
    const postId = params.post_id;

       useEffect(() => {
        if (category && postId) {
            const fetchPost = async () => {
                // API 서버에 category 정보를 함께 보내서 필터링된 데이터를 요청
                const response = await fetch(`http://your.api.server/posts?category=${category}&id=${postId}`);
                const data = await response.json();
            };
            fetchPost();
        }
    }, [category, postId]);



    
    const currentCategoryKey = params.category; 
    
    // ✨ 1. URL 카테고리 키에 해당하는 객체를 categories 배열에서 찾습니다.
    const currentCategory = categories.find(cat => cat.category === currentCategoryKey);
    
    // ✨ 2. 찾은 객체에서 name을 사용합니다.
    const categoryName = currentCategory ? currentCategory.name : '게시판';


    return(
    <>
<div className={styles.page}> 
     <div 
        className={styles.top}>
            <Image 
                src="/images/board/back.png" 
                alt="뒤로가기 아이콘" 
                width={24} 
                height={14} 
                style={{ cursor: 'pointer' }}
            />
            <h2>{categoryName}</h2>

            <Image
                src="/images/board/hambugger.png"
                alt="햄버거버튼"
                width={5}
                height={10}
                style={{ cursor: 'pointer' }}
            />  

    </div>

    <div 
        className={styles.pageWrapper}>


              <div 
                className ={styles.body_top}>
                    <div className={styles.profile}>
                        <div className={styles.photo}></div>
                        <div className={styles.nickname}>홍길동
                            <div className={styles.date}>2023.08.21</div>
                        </div>
                    </div>

        <div className={styles.body}>
            <div className={styles.title}>게시글 제목</div>
            <div className={styles.content}>
                게시글 내용게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용
            </div>

            <div className={styles.body_bottom}>
            <button className={styles.likeButton}>
                <Image 
                    src='/images/board/like.png'
                    alt='좋아요 아이콘'
                    width={20}
                    height={18}
                />
                <p className={styles.likeCount}>12</p>
            </button>

            <button className={styles.bookmark}>
                <Image 
                    src='/images/board/Bookmark.png'
                    alt='북마크 아이콘'
                    width={23}
                    height={20}
                />
            </button>
            </div>
        </div>

              </div>
    </div>
    <hr className={styles.hr}></hr>

    <div className={styles.commentPage}>
        <div className={styles.comment_top}>
            <span className={styles.comment_count}>
                댓글 1
            </span>
        </div>

        <div className={styles.comment_detail}>

        </div>
        
    </div>

</div>       
        
    </>
);
};

export default PostDetail;