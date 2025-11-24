'use client';

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react"; 
import styles from './PostDetail.module.css';
import Modal from '@/components/modal/CustomModal';
import axios from "axios";
import { Post } from '@/types/post';
import { categories } from "@/data/postData";


// 🚨 [새 타입 정의]: 댓글 데이터 타입 (임시 정의)
interface Comment {
    id: string;
    postId: string;
    userId: string;
    nickname: string;
    content: string;
    isAnonymous: boolean;
    createdAt: string;
}


const initialPost: Post = { 
    url: '', id: '0', userId: '', anonymous: false, nickname: '데이터 로딩 중...', 
    category: '', title: '게시물을 불러오는 중입니다.', 
    contents: '잠시만 기다려 주세요.', 
    likeCount: 0, viewCount: 0, commentCount: 0, 
    createdAt: new Date().toISOString() as any, updatedAt: new Date().toISOString() as any 
};

const initialComments: Comment[] = []; 


const PostDetail = () => {
    const router = useRouter(); 
    const params = useParams();

    const category = params.category as string;
    const postId = params.post_id as string;


    const [postData, setPostData] = useState<Post>(initialPost); 
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    
    const [comments, setComments] = useState<Comment[]>(initialComments); 

    const [likeCount, setLikeCount] = useState(initialPost.likeCount); 
    const [isLiked, setIsLiked] = useState(false); 
    const [commentInput, setCommentInput] = useState<string>(''); 


    const [modalMessage, setModalMessage] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


    const incrementViewCount = useCallback(async (): Promise<void> => {
        if (!postId || postId === '0') return;
        try {
            // await axios.patch(`/api/posts/${postId}/view`); 
        } catch (error) {
            console.error("Failed to increment view count:", error);
        }
    }, [postId]);


    const fetchComments = useCallback(async (): Promise<void> => {
        if (!postId || postId === '0') return;

        try {
          
            /*
            const response = await axios.get<Comment[]>(`/api/posts/${postId}/comments`);
            const fetchedComments = response.data;
            */
            

            const allMockCommentsString = localStorage.getItem('MOCK_COMMENTS') || '[]';
            const allMockComments: Comment[] = JSON.parse(allMockCommentsString);
            
            const postComments = allMockComments.filter(c => c.postId === postId);
            
            await new Promise(resolve => setTimeout(resolve, 300)); 
            
            setComments(postComments);

        } catch (error) {
            console.error("Failed to fetch comments (Mock):", error);
            setComments([]);
        }
    }, [postId]);



    const fetchPost = useCallback(async (): Promise<void> => {
        if (!postId || postId === '0') {
            setPostData({ ...initialPost, title: '잘못된 접근', contents: '게시글 ID가 유효하지 않습니다.' });
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        
        try {
         
            /*
            const response = await axios.get<Post>(`/api/posts/${postId}`);
            const fetchedData = response.data;
            */


            const storedPostsString = localStorage.getItem('MOCK_POSTS');
            const storedPosts: Post[] = storedPostsString ? JSON.parse(storedPostsString) : [];
            
            const foundPost = storedPosts.find(p => p.id === postId);

            if (foundPost) {
                await new Promise(resolve => setTimeout(resolve, 300));
                
                setPostData(foundPost);
                setLikeCount(foundPost.likeCount);
                
                incrementViewCount();
                fetchComments(); 
            } else {
                 throw new Error("게시물을 찾을 수 없습니다.");
            }
            
        } catch (error: any) {
            console.error("Failed to fetch post details (Mock):", error);

            setPostData({ 
                ...initialPost, 
                title: '게시물을 찾을 수 없습니다.', 
                contents: '존재하지 않거나 삭제된 게시물입니다.' 
            });
        } finally {
            setIsLoading(false);
        }
    }, [postId, incrementViewCount, fetchComments]); 



    useEffect(() => {
        if (postId) {
            fetchPost();
        }
    }, [postId, fetchPost]);



    const currentPost: Post = postData;
    

    const currentCategoryKey = category; 
    const currentCategory = categories.find(cat => cat.category === currentCategoryKey);
    const categoryName = currentCategory ? currentCategory.name : '게시판';


    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };


    const handleGoBack = () => {
        router.back();
    };
    

    const handleLikeClick = async () => {
        if (isLoading || postId === '0') {
            showAlertModal("게시글 정보를 불러오는 중입니다.");
            return;
        }

        const willBeLiked = !isLiked;
        const countChange = willBeLiked ? 1 : -1; 
        

        setIsLiked(willBeLiked); 
        setLikeCount(prevCount => prevCount + countChange);

        try {
                  
            /*
            await axios.post(`/api/posts/${postId}/like`, 
                { isLiked: willBeLiked });
            */
            
        
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
            console.error("좋아요 상태 업데이트 실패:", error);
            showAlertModal("좋아요 상태 업데이트에 실패했습니다.");


            setIsLiked(!willBeLiked);
            setLikeCount(prevCount => prevCount - countChange);
        }
    };


    const showAlertModal = (message: string) => {
        setModalMessage(message);
        setIsModalVisible(true);
    };

    const handleCommentSubmit = async (): Promise<void> => {
        if (!commentInput.trim()) {
            showAlertModal("댓글 내용을 입력해주세요");
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            showAlertModal("로그인이 필요합니다");
            router.push('/login');
            return;
        }

        const commentData = {
            content: commentInput,
            isAnonymous: false,
        };

        try {
   
            /*
            await axios.post(
                `/api/posts/${postId}/comments`, 
                commentData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            */
            
   
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const allMockCommentsString = localStorage.getItem('MOCK_COMMENTS') || '[]';
            const allMockComments: Comment[] = JSON.parse(allMockCommentsString);

            const newComment: Comment = {
                id: Date.now().toString() + Math.floor(Math.random() * 1000), 
                postId: postId,
                userId: 'user_mock',
                nickname: '테스트유저', 
                content: commentInput,
                isAnonymous: commentData.isAnonymous,
                createdAt: new Date().toISOString(),
            };

            allMockComments.push(newComment); 
            localStorage.setItem('MOCK_COMMENTS', JSON.stringify(allMockComments)); 
            
            showAlertModal("댓글이 성공적으로 작성되었습니다.");
            setCommentInput(''); 


            setComments(prev => [...prev, newComment]); 
            setPostData(prev => ({ 
                ...prev, 
                commentCount: prev.commentCount + 1 
            }));
            
        } catch (error) {
            console.error("댓글 작성 실패:", error);
            showAlertModal("댓글 작성에 실패했습니다.");
            
        }
    };


    if (isLoading) {
        return (
            <div className={styles.page} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2>게시글 로딩 중...</h2>
            </div>
        );
    }



    return(
    <>
        <div className={styles.page}> 
             
             <div className={styles.top}>
                    <div className={styles.top_left}>
                        <button 
                            type="button" 
                            className={styles.backButton} 
                            onClick={handleGoBack}
                        />
                      
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
            
        
            <div className={styles.body_top}> 
                <div className={styles.profile}>
                    <div className={styles.photo}>{currentPost.url ? (
                <Image
                    src={currentPost.url}
                    alt={`${currentPost.nickname}님의 프로필 사진`}
                    width={40} 
                    height={40} 
                    className={styles.profileImage} 
                />
            ) : (
             
                <Image
                    src="/images/board/basicProfile.png"
                    alt="기본 프로필"
                    width={40}
                    height={40}
                />
            )}</div>
                    <div className={styles.author_wrapper}>
           
                        <div className={styles.nickname}>{currentPost.nickname}</div>
                        <div className={styles.date}>{formatDate(currentPost.createdAt)}</div>
                    </div>
            
                    <div className={styles.view_count}>
                        <Image src="/images/board/Show.png" alt="조회수" width={16} height={16} /> 
                        <span>{currentPost.viewCount}</span> 
                    </div>
                </div>
                
            </div>

       
            <div className={styles.body}>
                <div className={styles.title}>{currentPost.title}</div>
                <div className={styles.content}>
                    {currentPost.contents}
                </div>

                <div className={styles.body_bottom}>

                      <button 
                        className={styles.likeButton}
                        onClick={handleLikeClick} 
                    >
                       
                        <Image 
                            src={isLiked ? '/images/board/like_filled.png' : '/images/board/like.png'} 
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
                        댓글 {currentPost.commentCount}
                    </span>
                </div>

        
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className={styles.comment_detail}>
                            <div className={styles.author_detail}>
            
                                <div className={styles.profile_comment}>
                                    <Image
                                        src="/images/board/basicProfile.png"
                                        alt="댓글 작성자 프로필"
                                        width={30} 
                                        height={30}
                                        className={styles.profileImage}
                                    />
                                </div>

                                <div className={styles.author_comment}>
                                    <div className={styles.nickname_comment}>{comment.isAnonymous ? '익명' : comment.nickname}</div>
                                    <div className={styles.date_comment}>{formatDate(comment.createdAt)}</div>
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
                                {comment.content}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noComments}>
                        <p>작성된 댓글이 없습니다.</p>
                    </div>
                )}
            </div>
            

            <form className={styles.comment_input_box} 
                onSubmit={(e) => {
                    e.preventDefault(); 
                    handleCommentSubmit();
                }}
            >
                <input 
                    type="text" 
                    placeholder="댓글을 입력해주세요." 
                    className={styles.comment_input}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                 
                />

                <Image
                    src="/images/board/send.png"
                    alt="전송"
                    width={24}
                    height={24}
                    style={{ cursor: 'pointer' }}
                  
                    onClick={handleCommentSubmit} 
                />
            </form>

        </div> 

        <Modal 
            message={modalMessage}
            onClose={() => setIsModalVisible(false)} 
            isVisible={isModalVisible}
            isConfirmModal={false} 
            onConfirm={() => setIsModalVisible(false)} 
        />
    
    </>
    );
};

export default PostDetail;