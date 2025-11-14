'use client';

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from './PostDetail.module.css';
import { Post, categories, allPosts } from '@/app/(board)/board/mockData'; 


const PostDetail = () => {
    const router = useRouter(); 
    const params = useParams();
    const category = params.category as string;
    const postId = params.post_id as string;


    const post = allPosts.find(p => p.post_id === postId);

    const currentPost: Post = post || { 
        post_id: '0', user_id: '', anonymous: false, nickname: '데이터 없음', 
        category: '', board_id: '', title: '게시물을 찾을 수 없습니다.', 
        content: '존재하지 않거나 삭제된 게시물입니다.', 
        like_count: 0, view_count: 0, comment_count: 0, 
        created_at: new Date().toISOString() as any, updated_at: new Date().toISOString() as any 
    };
    
 
    const [likeCount, setLikeCount] = useState(currentPost.like_count);

    const [isLiked, setIsLiked] = useState(false); 

  


    useEffect(() => {
        if (category && postId) {
            const fetchPost = async () => {
                console.log(`Fetching post detail for: ${category}/${postId}`);
            };
            fetchPost();
        }
    }, [category, postId]);

    const currentCategoryKey = category; 
    const currentCategory = categories.find(cat => cat.category === currentCategoryKey);
    const categoryName = currentCategory ? currentCategory.name : '게시판';

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const handleGoBack = () => {
        router.back();
    };
    
     const handleLikeClick = () => {
        
        const willBeLiked = !isLiked;
        const countChange = willBeLiked ? 1 : -1; 

    
        setIsLiked(willBeLiked); 


        setLikeCount(prevCount => {
            const newCount = prevCount + countChange;

            const postIndex = allPosts.findIndex(p => p.post_id === postId);
            if (postIndex !== -1) {
                allPosts[postIndex].like_count = newCount; 
            }
            
            return newCount;
        });
        
       
    };



    return(
    <>
        <div className={styles.page}> 
             
             <div 
                className={styles.top}>
                    <div className={styles.top_left}>
                        <button 
                            type="button" 
                            className={styles.backButton} 
                            onClick={handleGoBack}
                        ></button>
                      
                    </div>
                    
        
                    <div className={styles.center_title}>
                         {categoryName}
                    </div>

    
                    <Image
                        src="/images/board/hambugger.png"
                        alt="햄버거버튼"
                        width={4}
                        height={20}
                        style={{ cursor: 'pointer' }}
                    />  
            </div>

            <div className ={styles.body_top}>
                <div className={styles.profile}>
                    <div className={styles.photo}></div>
                    <div className={styles.author_wrapper}>
           
                        <div className={styles.nickname}>{currentPost.nickname}</div>
                        <div className={styles.date}>{formatDate(currentPost.created_at as any)}</div>
                    </div>
            
                    <div className={styles.view_count}>
                        <Image src="/images/board/Show.png" alt="조회수" width={16} height={16} /> 
                        <span>{currentPost.view_count}</span>
                    </div>
                </div>
                
            </div>

       
            <div className={styles.body}>
                <div className={styles.title}>{currentPost.title}</div>
                <div className={styles.content}>
                    {currentPost.content}
                </div>

                <div className={styles.body_bottom}>

                      <button 
                        className={styles.likeButton}
                        onClick={handleLikeClick} 
                    >
                       
                        <Image 
                            src={isLiked ? '/images/board/like.png' : '/images/board/like.png'}
                            alt='좋아요 아이콘'
                            width={20}
                            height={18} 
                        />
                        <p className={styles.likeCount}>좋아요 {likeCount}</p>
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

            <hr className={styles.hr}></hr>


            <div className={styles.commentPage}>
                <div className={styles.comment_top}>

                    <span className={styles.comment_count}>
                        댓글 {currentPost.comment_count}
                    </span>
                </div>

        
                <div className={styles.comment_detail}>
                    <div className={styles.author_detail}>
                        <div className={styles.profile_comment}></div>

                        <div className={styles.author_comment}>
                            <div className={styles.nickname_comment}>홍길동</div>
                            <div className={styles.date_comment}>09.15  20:00</div>
                        </div>

                        <div className={styles.comment_report}>
                            <Image
                                src="/images/board/hambugger.png"
                                alt="댓글햄버거버튼"
                                width={4}
                                height={20}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className={styles.comment_content}>
                        헐 ㅠㅠ
                    </div>
                </div>
            </div>
            
  
            <div className={styles.comment_input_box}>
                <input 
                    type="text" 
                    placeholder="댓글을 입력해주세요." 
                    className={styles.comment_input}
                />
                <Image
                    src="/images/board/send.png"
                    alt="전송"
                    width={24}
                    height={24}
                    style={{ cursor: 'pointer' }}
                />
            </div>

        </div> 
        
    </>
);
};

export default PostDetail;
