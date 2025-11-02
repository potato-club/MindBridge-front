'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./MyPage.module.css";


const MyPageForm = () => {
    const router = useRouter();

    return (
        <>
            <header className={styles.header}>마이페이지</header>
            <form className={styles.Form}>
                <div className={styles.Container}>

                    <div className={styles.UserInfo}>
                        <p className={styles.UserProfilePic}>프로필사진</p>
                        <h2 className={styles.UserName}>홍길동</h2>
                    </div>

                    <div className={styles.UserMileage}>마일리지</div>

                    <div className={styles.UserActions}>
                        <div className={styles.UserActionItem}>
                            내가 작성한 글
                            <button
                                type="button"
                                className={styles.backButton}
                            >
                                &gt;
                            </button>
                        </div>

                        <div className={styles.UserActionItem}>
                            북마크
                            <button
                                type="button"
                                className={styles.backButton}
                            >
                                &gt;
                            </button>
                        </div>
                        
                        <div className={styles.UserActionItem}>

                            좋아요한 글
                            
                            <button
                                type="button"
                                className={styles.backButton}
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

                    <div>하단바</div>
                </div>
            </form>
        </>

    );
};

export default MyPageForm;