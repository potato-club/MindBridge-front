'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./MyPage.module.css";

import MyBottomForm from "@/app/(mypage)/mybottom/MyBottom";



const MyPageForm = () => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("마일리지를 획득해 보세요.")

        setOpen(true);
    };

    return (
        <>
            <header className={styles.header}>마이페이지</header>
            <form className={styles.Form}>
                <div className={styles.Container}>

                    <div className={styles.UserInfo}>
                        <p className={styles.UserProfilePic}>프로필사진</p>
                        <h2 className={styles.UserName}>홍길동</h2>
                    </div>

                    <div 
                    className={styles.UserMileage}
                    onClick={() => setOpen(true)}
                    >
                        마일리지
                    </div>

                    <div className={styles.UserActions}>
                        <div className={styles.UserActionItem}>
                            내가 쓴 글
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick = {() => router.push('./myposts')}

                            >
                                &gt;
                            </button>
                        </div>

                        <div className={styles.UserActionItem}>
                            북마크
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick = {() => router.push('./mybooks')}
                            >
                                &gt;
                            </button>
                        </div>
                        
                        <div className={styles.UserActionItem}>

                            좋아요
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick = {() => router.push('./mylikes')}
                            >
                                &gt;
                            </button>
                        </div>

                        <div className={styles.UserActionItem}>

                            알림 설정
                            <button
                                type="button"
                                className={styles.backButton}
                            >
                                &gt;
                            </button>
                        </div>
                        
                        <div className={styles.UserActionItem}>

                            회원 탈퇴
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick = {() => router.push('./mydelete')}
                            >
                                &gt;
                            </button>                        
                        </div>

                        <div className={styles.Logout}>
                            로그아웃
                            
                        </div>
                    </div>

                    <div className={styles.myBottom}>
                        {<MyBottomForm />}
                    </div>
                </div>
            </form>


                        {/* 🔸 모달 (open === true일 때만 표시) */}
            {open && (
                <div 
                className={styles.overlay}
                // onClick={() => setOpen(false)}
                >
                    <div 
                    className={styles.modal}
                    // onClick={(e) => e.stopPropagation()}
                    >
                        <h2>마일리지 획득 방법</h2>

                        <h4>1. 채팅 고민 해결 참여</h4>
                        <p>고민을 나누고 해결에 참여해보세요</p>

                        <h4>2. 게시글, 댓글 좋아요 달성</h4>
                        <p>작성한 게시글, 댓글의 일정 수 이상의 좋아요를 받아보세요</p>

                        <h4>3. 주간 인기 게시글 선정</h4>
                        <p>한 주 동안 가장 많은 관심을 받은 게시글로 선정되어 보세요</p>

                        <h4>4. 하루 한 번 랜덤 돌리기</h4>
                        <p>---------</p>

                        <div className={styles.buttons}>
                            <button
                                type="button"
                                className={styles.confirmBtn}
                                onClick={() => setOpen(false)}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};

export default MyPageForm;