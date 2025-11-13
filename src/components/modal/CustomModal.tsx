'use client';

import React from 'react';
import styles from './CustomModal.module.css';

interface CustomModalProps {
  message: string;
  onClose: () => void;
  isVisible: boolean;

  isConfirmModal: boolean;
  onConfirm: () => void; 
}

const CustomModal: React.FC<CustomModalProps> = ({ 
    message, 
    onClose, 
    isVisible,
    isConfirmModal,
    onConfirm   
}) => {
  if (!isVisible) return null;

  return (

    <div className={styles.modalBackdrop} onClick={onClose}>


      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        

        <p className={styles.modalMessage}>{message}</p>

   {isConfirmModal && (
    <p className={styles.modalSubMessage}>
        {message === "작성 중인 글을 취소하시겠습니까?" 
            ? "작성한 내용은 저장되지 않고 모두 사라집니다."
            : "업로드되어 다른 사용자에게 공개됩니다."
        }
    </p>
)}

        <div className={styles.buttonContainer}>
          {isConfirmModal ? (
     
            <>
              <button className={`${styles.modalButton} ${styles.cancelButton}`} onClick={onClose}>
                취소
              </button>
              <button className={styles.modalButton} onClick={onConfirm}>
                확인
              </button>
            </>
          ) : (

            <button className={styles.modalButton} onClick={onClose}>
              확인
            </button>
          )}
        </div>

      </div>
 
    </div>
  ); 
};

export default CustomModal;