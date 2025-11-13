'use client';

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './PostWrite.module.css';
import { categories } from "@/app/(board)/board/mockData";
import Image from "next/image";
import Modal from "@/components/modal/CustomModal";


const PostWrite = () => {
    
    const availableCategories = categories.filter(
        (cat) => cat.category !== 'all'
    );
    
    const [selected, setSelected] = useState<string>('none');
    const [isOpen, setIsOpen] = useState(false); 
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');


    const [modalMessage, setModalMessage] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | undefined>(undefined);
    const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false); 

    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    
    const router = useRouter();

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = 'auto'; 
            contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
        }
    }, [content]);

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

    const showAlertModal = (message: string) => {
        setModalMessage(message);
        setIsConfirmModal(false);
        setOnConfirmAction(undefined);
        setIsModalVisible(true);
    };

   
    const showConfirmModal = (message: string, confirmAction: () => void) => {
        setModalMessage(message);
        setIsConfirmModal(true);
        setOnConfirmAction(() => confirmAction);
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
        setModalMessage('');
        setIsConfirmModal(false); 
        setOnConfirmAction(undefined); 
    };
    
    const selectedCategoryName = availableCategories.find(c => c.category === selected)?.name || '게시판 선택';


    const handleActualSubmit = () => {
        const postData = {
            category: selected,
            title: title,
            content: content
        };
        
        console.log('--- 최종 제출 데이터 ---:', postData);
   
        router.push(`/board/${selected}`);
    };
    
    const handleActualGoBack = () => {
        window.history.back();
    };

    const handleGoBack = () => {
        const isDirty = title.trim().length > 0 || content.trim().length > 0;

        if (isDirty) {
            showConfirmModal(
                "작성 중인 글을 취소하시겠습니까?", 
                handleActualGoBack
            );
        } else {
            handleActualGoBack();
        }
    };
    
    const handleCategoryClick = (category: string) => {
        setSelected(category); 
        setIsOpen(false);
    };

    const handleSubmit = () => {
        
        if (selected === 'none' || selected === 'all') {
            showAlertModal('게시판 카테고리를 선택해 주세요.'); 
            return; 
        }

        if (!title.trim()) {
            showAlertModal('게시글의 제목을 작성해 주세요.'); 
            return; 
        }

        if (!content.trim()) {
            showAlertModal('게시글 내용을 작성해 주세요.'); 
            return; 
        }

     
        showConfirmModal(
            "글을 업로드하시겠습니까?", 
            handleActualSubmit        
        );
    };


    return(
<>
    <div className={styles.top}>
        <Image 
            src="/images/board/close.png" 
            alt="뒤로가기" 
            width={25} 
            height={25} 
            className={styles.backIcon} 
            onClick={handleGoBack} />
        <div className={styles.title}>글쓰기</div>
        <button 
            className={styles.submitButton} 
            onClick={handleSubmit}
        >
            완료
        </button>
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
                {availableCategories.map((cat) => (
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
        <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput} 
            placeholder="제목" 
        />

        <div className ={styles.body} />
            <textarea 
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={styles.contentInput} 
                placeholder="고민을 입력해보세요" 
            />
    </div>

 <Modal 
        message={modalMessage}
        onClose={closeModal} 
        isVisible={isModalVisible}
        isConfirmModal={isConfirmModal} 
        onConfirm={() => {
            if (onConfirmAction) {
                onConfirmAction();
            }
            closeModal();
        }}
    />
    
</>      
 
    );
    
    };

export default PostWrite;