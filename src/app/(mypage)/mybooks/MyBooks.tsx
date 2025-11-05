'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyBooks.module.css";

interface Post {
    post_id: string;
    title: string;
    content: string;
    nickname: string;
    created_at: string;
    view_count: number;
    like_count: number;
    comment_count: number;
}

const MyBooksForm = () => {

    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchMyBooks = async () => {
            try {
                const res = await axios.get("/api/my-posts");
                setPosts(res.data.posts || []);
            } catch (error) {
                console.error("북마크한 글 불러오기 실패:", error);
            }
        };
        fetchMyBooks();
    }, []);

    const displayPosts = posts.slice().reverse(); // 최신 글이 위로 오도록 순서 변경


    const handlePostClick = (postId: string) => {
        router.push(`/board/postDetail/${postId}`);
    };

    return (
        <>
            <form className={styles.Form}>
            <header className={styles.header}>북마크한 글</header>
                <div className={styles.Container}>
                    {/* 내가 쓴 글 목록이 여기에 표시됩니다. */}
                    <div className={styles.PostsList}>

                        {/* 맵함수 */}
                        {displayPosts.length > 0 ? (
                            displayPosts.map((post) => (

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
                                        <span>
                                            {new Date(post.created_at)
                                            .toLocaleDateString('ko-KR')
                                            .slice(0, -1)}
                                        </span>
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
                            ))
                        ) : (
                            <p className={styles.Message}>북마크한 글이 없습니다.</p>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
};

export default MyBooksForm;