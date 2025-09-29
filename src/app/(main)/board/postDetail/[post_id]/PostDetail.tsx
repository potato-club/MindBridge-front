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
                className ={styles.body}>
                    <div className={styles.profile}>
                        <span className={styles.nickname}>닉네임</span>

                    </div>



              </div>
    </div>
        
    </>
);
};

export default PostDetail;
