'use client';

import { useState } from "react";
import styles from "./MyDelete.module.css";
import { useRouter } from "next/navigation";

/* 회원탈퇴 폼 */
const MyDeleteForm = () => {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleWithDraw = async () => {
        alert("회원 탈퇴가 완료되었습니다.");
        setOpen(false);
        router.push("/메인페이지"); // 탈퇴 후 탈퇴 메인 페이지로 이동
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setOpen(true);
    };  

    


    return (
        <>
        <header className={styles.header}>
            <button
                type="button"
                className={styles.backButton}
                onClick={() => router.push("/mypage")}
            >
                &lt;
            </button>
            <h1><strong>회원탈퇴</strong></h1>
        </header>
        <form className={styles.Form} onSubmit={handleSubmit}>
            <div className={styles.Container}> 

                {/* 회원탈퇴 안내문구 */}
                <div className={styles.InfoText}>
                    <h1 dangerouslySetInnerHTML={{
                        __html: `회원 탈퇴 안내`
                    }}>
                    </h1>

                    <p className={styles.Text}
                    dangerouslySetInnerHTML={{
                        __html: `탈퇴를 진행하면 회원님의 모든 계정 정보, 활동 기록, 저장된 
                        데이터가 완전히 삭제됩니다. 삭제된 정보는 복구가 불가능하니 신중하게 
                        결정해 주세요. <br /><br />`
                    }}>
                    </p>

                    <p className={styles.Text}
                    dangerouslySetInnerHTML={{
                        __html: `일부 서비스 이용 기록은 내부 정책에 따라 일정 기간 동안 
                        보관될 수 있으며, 탈퇴 후에는 확인하거나 복구할 수 없습니다.<br /><br />`
                    
                    }}>
                    </p>

                    <p className={styles.Text}
                    dangerouslySetInnerHTML={{
                        __html: `탈퇴 후 동일한 계정으로 재가입하더라도 이전에 사용했던 
                        정보나 기록은 복원되지 않습니다. 필요한 데이터가 있다면 미리 
                        다운로드하시길 권장드립니다.<br /><br />`}}>
                    </p>
                    
                    <h2 className={styles.Warning}>
                        {`⚠️ 회원 탈퇴는 즉시 처리되어 복구가 불가합니다.`}
                    </h2>                   
                </div>




                {/* 탈퇴 버튼 */}
                <div className={styles.DeleteButtonContainer}>
                    <button type="submit" className={styles.DeleteButton}>
                        탈퇴하기
                    </button>
                </div>  
            </div>
        </form>


            {/* 🔸 모달 (open === true일 때만 표시) */}
            {open && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <h2>계정을 탈퇴하시겠습니까?</h2>
                        <p>탈퇴하면 계정과 데이터가 모두 삭제됩니다.</p>
                        <div className={styles.buttons}>
                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={() => setOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className={styles.confirmBtn}
                                onClick={handleWithDraw}
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

export default MyDeleteForm;