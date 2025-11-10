'use client';


import React, { useState, useRef, useEffect } from "react"; // 💡 useState, useRef, useEffect 추가
import { useRouter, useParams } from "next/navigation";
import styles from './PostWrite.module.css';
import { categories } from "@/app/(board)/board/mockData";
import Image from "next/image";


const PostWrite = () => {

    const [selected, setSelected] = useState<string>('all');

    const [isOpen, setIsOpen] = useState(false); 

    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    

    const selectedCategoryName = categories.find(c => c.category === selected)?.name || '게시판 선택';
    
  
    const handleCategoryClick = (category: string) => {
        setSelected(category); 
        setIsOpen(false);
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(

<>
    <div className={styles.top}>
        <Image 
            src="/images/board/close.png" 
            alt="뒤로가기" 
            width={25} 
            height={25} 
            className={styles.backIcon} 
            onClick={() => window.history.back()} />
        <div className={styles.title}>글쓰기</div>
        <button className={styles.submitButton}>완료</button>
     </div>
     

     <div className={styles.dropBox} ref={dropdownRef}>

        <div 
            className={styles.dropdownHeader}
            onClick={() => setIsOpen(!isOpen)}
        >
            {selectedCategoryName}
            <Image 
                src="/images/board/downArrow.png" 
                alt="드롭다운 화살표" 
                width={16} 
                height={16} 
                className={`${styles.arrowIcon} ${isOpen ? styles.rotated : ''}`} 
            />
        </div>


        {isOpen && (
            <div className={styles.categoryContainer}>
                <ul className={styles.categoryList}>
                {categories.map((cat) => (
                    <li
                    key={cat.category}
                    className={`${styles.categoryItem} ${selected === cat.category ? styles.active : ''}`}
                    onClick={() => handleCategoryClick(cat.category)}
                    >
                    {cat.name}
                    </li>
                ))}
                </ul>
            </div>
        )}
    </div>

    <div className={styles.inputContainer}>

    </div>
    
</>      
 
    );
    
    };

export default PostWrite;