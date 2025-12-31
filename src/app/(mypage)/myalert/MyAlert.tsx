'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import styles from "./MyAlert.module.css";

import MyBottomForm from "../mybottom/page";

const MyAlertForm = () => {
    const router = useRouter();

    const [commentAlert, setCommentAlert] = useState(false);
    const [likeAlert, setLikeAlert] = useState(false);
    const [chatAlert, setChatAlert] = useState(true);

    return (
        <>
            <form className={styles.Form}>
                <header className={styles.header}>
                    <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => router.push('./mypage')}
                    >
                        &lt;
                    </button>
                    <h1><strong>알림 설정</strong></h1>
                </header>

                <div className={styles.Container}>

                    <div className={styles.row}>
                        <span>댓글</span>
                        <label className={styles.switch}>
                            <input
                            type="checkbox"
                            checked={commentAlert}
                            onChange={() => setCommentAlert(!commentAlert)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.row}>
                        <span>좋아요</span>
                        <label className={styles.switch}>
                            <input
                            type="checkbox"
                            checked={likeAlert}
                            onChange={() => setLikeAlert(!likeAlert)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.row}>
                        <span>채팅</span>
                        <label className={styles.switch}>
                            <input
                            type="checkbox"
                            checked={chatAlert}
                            onChange={() => setChatAlert(!chatAlert)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.myBottom}>
                        {<MyBottomForm />}
                    </div>

                </div>
            </form>
        </>
    );

};

export default MyAlertForm;