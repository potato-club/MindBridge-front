// 'use client' 지시어는 Next.js 환경에서 유지되어야 합니다.
'use client';

// Next.js 모듈 및 React 훅
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from './PostDetail.module.css';
import { Post, categories, allPosts } from '@/app/(main)/board/mockData'; 


const PostDetail = () => {
    const router = useRouter(); 
    const params = useParams();
    const category = params.category as string;
    const postId = params.post_id as string;

    // 🚨 1. postId에 맞는 게시물 찾기
    const post = allPosts.find(p => p.post_id === postId);

    // 게시물이 없을 경우 (404)를 가정하여 빈 객체로 임시 처리
    const currentPost: Post = post || { 
        post_id: '0', user_id: '', anonymous: false, nickname: '데이터 없음', 
        category: '', board_id: '', title: '게시물을 찾을 수 없습니다.', 
        content: '존재하지 않거나 삭제된 게시물입니다.', 
        like_count: 0, view_count: 0, comment_count: 0, 
        created_at: new Date().toISOString() as any, updated_at: new Date().toISOString() as any 
    };
    
    // ==========================================================
    // ⭐️ 좋아요 기능 추가: State 정의 및 초기화
    // ==========================================================
    // 1. 현재 게시물의 좋아요 수를 상태로 관리합니다.
    const [likeCount, setLikeCount] = useState(currentPost.like_count);
    // 2. 현재 사용자의 좋아요 여부를 상태로 관리합니다. (초기값은 false로 가정)
    const [isLiked, setIsLiked] = useState(false); 
    // ==========================================================


    useEffect(() => {
        if (category && postId) {
            const fetchPost = async () => {
                // 실제 API 호출 로직은 여기에 들어갑니다.
                console.log(`Fetching post detail for: ${category}/${postId}`);
            };
            fetchPost();
        }
    }, [category, postId]);

    const currentCategoryKey = category; 
    const currentCategory = categories.find(cat => cat.category === currentCategoryKey);
    const categoryName = currentCategory ? currentCategory.name : '게시판';

    // 시간 형식 변환 함수 (임시)
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    // 뒤로가기 핸들러
    const handleGoBack = () => {
        router.back();
    };
    
    // ==========================================================
    // ⭐️ 좋아요 버튼 클릭 핸들러
    // ==========================================================
     const handleLikeClick = () => {
        
        // 1. 다음 상태를 예측하여 변화량 계산
        const willBeLiked = !isLiked;
        // 좋아요를 누른다면 +1, 취소한다면 -1
        const countChange = willBeLiked ? 1 : -1; 

        // 2. isLiked 상태 업데이트
        setIsLiked(willBeLiked); 

        // 3. likeCount 상태 업데이트 (이전 상태를 기반으로 안전하게 계산)
        setLikeCount(prevCount => {
            const newCount = prevCount + countChange;

            // Mock Data 업데이트 시뮬레이션
            const postIndex = allPosts.findIndex(p => p.post_id === postId);
            if (postIndex !== -1) {
                allPosts[postIndex].like_count = newCount; 
            }
            
            return newCount;
        });
        
            
            // 실제 API 호출: 
            // const action = newIsLiked ? 'like' : 'unlike';
            // fetch(`http://your.api.server/posts/${postId}/${action}`, { method: 'POST' });
    };
    // ==========================================================


    return(
    <>
        {/* styles.page: 전체 페이지를 감싸는 최상위 부모 */}
        <div className={styles.page}> 
             
             {/* 1. 상단 헤더 (.top) */}
             <div 
                className={styles.top}>
                    {/* 뒤로가기 버튼 및 카테고리 이름 (중앙 정렬) */}
                    <div className={styles.top_left}>
                        <button 
                            type="button" 
                            className={styles.backButton} 
                            onClick={handleGoBack}
                        ></button>
                      
                    </div>
                    
                    {/* 중앙 타이틀 */}
                    <div className={styles.center_title}>
                         {categoryName}
                    </div>

                    {/* 더보기 버튼 */}
                    <Image
                        src="/images/board/hambugger.png"
                        alt="햄버거버튼"
                        width={4}
                        height={20}
                        style={{ cursor: 'pointer' }}
                    />  
            </div>

            {/* 2. 게시글 작성자 정보 (.body_top) */}
            <div className ={styles.body_top}>
                <div className={styles.profile}>
                    <div className={styles.photo}></div>
                    <div className={styles.author_wrapper}>
                        {/* 🚨 데이터 연결 */}
                        <div className={styles.nickname}>{currentPost.nickname}</div>
                        <div className={styles.date}>{formatDate(currentPost.created_at as any)}</div>
                    </div>
                    {/* 조회수 아이콘 (디자인 반영) */}
                    <div className={styles.view_count}>
                        <Image src="/images/board/Show.png" alt="조회수" width={16} height={16} /> 
                        <span>{currentPost.view_count}</span>
                    </div>
                </div>
                
            </div>

            {/* 3. 게시글 본문 및 좋아요/북마크 (.body) */}
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
                        {/* ⭐️ 좋아요 아이콘 다시 추가 */}
                        <Image 
                            src={isLiked ? '/images/board/like.png' : '/images/board/like.png'}
                            alt='좋아요 아이콘'
                            width={20} // 적절한 크기 설정
                            height={18} // 적절한 크기 설정
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

            {/* 4. 구분선 (<hr>) */}
            <hr className={styles.hr}></hr>

            {/* 5. 댓글 영역 (.commentPage) */}
            <div className={styles.commentPage}>
                <div className={styles.comment_top}>
                    {/* 🚨 데이터 연결 (임시로 1로 고정하지 않고 실제 데이터 반영) */}
                    <span className={styles.comment_count}>
                        댓글 {currentPost.comment_count}
                    </span>
                </div>

                {/* 첫 번째 댓글 (하드코딩된 댓글 데이터) */}
                {/* 실제로는 댓글 배열을 map으로 반복해야 합니다. */}
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
            
            {/* 6. 댓글 입력창 (디자인 하단 고정 영역) */}
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
