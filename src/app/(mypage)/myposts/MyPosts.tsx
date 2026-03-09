'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./MyPosts.styles";
import MyBottomForm from "../mybottom/page";

interface Post {
    post_id: string;
    title: string;
    content: string;
    nickname: string;
    created_at: string;
    view_count: number;
    like_count: number;
    comment_count: number;
    openMenu?: boolean;
}

const MyPostsForm = () => {

    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${month}.${day}`;
    };

    // API 호출 (나중에 사용)
    // useEffect(() => {
    //     const fetchMYPosts = async () =>{
    //         try {
    //             // 백 주소 삽입
    //             const res = await axios.get('/api/my-posts');
    //             console.log('API 응답:', res.data);

    //             setPosts(res.data?.posts ?? []);
    //         } catch (error) {
    //             console.log("오류 메세지:", error);
    //         }
    //     };
    //     fetchMYPosts();
    // });

    useEffect(() => {
        const mockPosts: Post[] = [
            {
                post_id: "1",
                title: "프로젝트가 너무 어려워요",
                content: "지금 하는 프로젝트가 너무 어려워요ㅜㅜㅜㅜㅜ",
                created_at: "02-01",
                nickname:"",
                view_count: 1,
                like_count: 8,
                comment_count: 4,
            },
            {
                post_id: "2",
                title: "프로젝트가 너무 어려어요",
                content: "지금 하는 프로젝트가 너무 어려워요.",
                created_at: "02-02",
                nickname:"",
                view_count: 210,
                like_count: 15,
                comment_count: 6,
            },
        ];

        setPosts(mockPosts);
    }, []);

    const displayPosts = posts.slice().reverse(); // 최신 글이 위로 오도록 순서 변경


    const handlePostClick = (postId: string) => {
        router.push(`/board/postDetail/${postId}`);
    };

    return (
        <>
            <S.Form>
                
            <S.Header>
                <S.BackButton
                type="button"
                onClick={() => router.push("/mypage")}
                >
                    &lt;
                </S.BackButton>
                    <S.HeaderTitle>
                        <strong>내가 쓴 글</strong>
                    </S.HeaderTitle>
            </S.Header>

                <S.Container>
                    {/* 내가 쓴 글 목록이 여기에 표시됩니다. */}

                    <S.PostsList>

                        {displayPosts.length > 0 ? (
                            displayPosts.map((post) => (

                                <S.PostItem
                                    key={post.post_id}
                                    onClick={() => handlePostClick(post.post_id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <S.MoreWrapper>
                                        <S.MoreButton
                                        type="button"
                                        onClick={(e) =>  {
                                            e.stopPropagation();
                                            setPosts(prev =>
                                                prev.map(p =>
                                                    p.post_id === post.post_id
                                                    ? { ...p, openMenu: !p.openMenu }
                                                    : { ...p, openMenu: false }
                                                )
                                            )
                                        }}
                                        >
                                        ⋮
                                        
                                        </S.MoreButton>

                                        {/* {post.openMenu && (
                                            <div className={styles.moreMenu}>
                                                <div className={styles.menuItem}>수정하기</div>
                                                <div className={styles.menuItem}>삭제하기</div>
                                                <div className={styles.menuItem}>닫기</div>
                                            </div>
                                        )} */}
                                    </S.MoreWrapper>
                                    


                                    <S.PostTitle>
                                        {post.title}
                                    </S.PostTitle>
                                    
                                    <S.PostContent>
                                        {post.content}
                                    </S.PostContent>
    
                                    <S.PostMeta>

                                        {/* 날짜 */}
                                        <span>
                                            {formatDate(post.created_at)}
                                        </span>

                                        <S.PostStats>

                                            <Image src="/images/board/show.png" alt="" width={16} height={8}/> 
                                            <p>{post.view_count}</p>

                                            <Image src="/images/board/like.png" alt="" width={16} height={8}/> 
                                            <p>{post.like_count}</p>

                                            <Image src="/images/board/comment.png" alt="" width={16} height={8}/> 
                                            <p>{post.comment_count}</p>
                                        </S.PostStats>
                                    </S.PostMeta>
                                </S.PostItem>

                            ))
                        ) : (
                            <p>작성한 글이 없습니다.</p>
                        )}
                    </S.PostsList>

                    {/* <div className={styles.myBottom}>
                        {<MyBottomForm />}
                    </div> */}
                </S.Container>
            </S.Form>
        </>
    );
};

export default MyPostsForm;