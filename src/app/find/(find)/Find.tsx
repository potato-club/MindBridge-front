'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import FindIdForm from "@/app/findid/components/FindId";
import FindPWForm from "@/app/findpw/components/FindPW";
import styles from "./Find.module.css";



const FindForm = () => {

    // 첫 화면 아이디로 설정해둠.
    const [activeTab, setActiveTab] = useState<"id" | "password">("id");

    const router = useRouter();


    return (
        <>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => router.push("/findpw")}
                >
                    &lt;
                </button>
                <h1><strong>아이디 찾기 / 비밀번호 찾기 페이지</strong></h1>
            </header>
            <form className={styles.Form}>
                <div className={styles.Container}>

                    {/* 탭 */}
                    <div className={styles.tabWrapper}>

                        <button
                            type="button"
                            className={`${styles.tab} ${activeTab === "id" ? styles.active : ""}`}
                            onClick={() => setActiveTab("id")}
                        >
                        아이디 찾기
                        </button>

                        <button
                            type="button"
                            className={`${styles.tab} ${activeTab === "password" ? styles.active : ""}`}
                            onClick={() => setActiveTab("password")}
                        >
                        비밀번호 찾기
                        </button>
                    </div>

                    {/* 탭 콘텐츠 */}
                    <div className={styles.contentWrapper}>
                        {activeTab === "id" ? <FindIdForm /> : <FindPWForm />}
                    </div>
                </div>
            </form>
        </>
    );
};

export default FindForm;