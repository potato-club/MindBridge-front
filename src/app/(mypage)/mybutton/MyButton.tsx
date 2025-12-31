'use client';

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./HamburgerMenu.module.css";

export default function MyButton({
    onEdit,
    onDelete
}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleHambergerClick = () => {

        // 페이지 별로 동작 다르게 하기
        if (pathname === '/login') return;

        setOpen(!open);
    };

    return (
        <div className={styles.wrapper}>
            {/* 햄버거 버튼 */}
            <button
            type="button"
            className={styles.button}
            onClick={handleHambergerClick}
            >
                ☰
            </button>

            {/* 메뉴 */}
            {open && (
                <div className={styles.menu}>
                    {onEdit && (
                        <button onClick={onEdit}>
                            수정하기
                        </button>
                    )}

                    {onDelete && (
                        <button
                        className={styles.delete}
                        onClick={onDelete}
                        >
                            삭제하기
                        </button>
                    )}

                    <button onClick={() => setOpen(false)}>
                        닫기
                    </button>
                </div>
            )}
        </div>
    )
}



