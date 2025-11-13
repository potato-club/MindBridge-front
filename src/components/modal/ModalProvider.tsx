// components/modal/ModalProvider.tsx

'use client';

import React, { useState } from 'react';
import CustomModal from './CustomModal'; 
import { ModalContext } from '@/app/context/ModalContext'; 

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmCallback, setConfirmCallback] = useState<(() => void) | undefined>(undefined);



  const openModal = (message: string, onConfirm?: () => void) => {
    setModalMessage(message);
    setConfirmCallback(() => onConfirm);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage('');
  };

  const handleConfirm = () => {
    if (confirmCallback) {
        confirmCallback(); 
    }
    closeModal();
    setConfirmCallback(undefined);
  };
  
  const contextValue = {
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      
      <CustomModal 
        message={modalMessage}
        onClose={closeModal} 
        onConfirm={handleConfirm} 
        isVisible={isModalVisible}
        isConfirmModal={!!confirmCallback} 
      />
    </ModalContext.Provider>
  );
};