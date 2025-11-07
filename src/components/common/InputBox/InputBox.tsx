'use client';

import React from 'react';
import styles from './InputBox.module.css';

interface InputBoxProps {
    label: string; 
    type: 'string' | 'password' | 'number';
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    disabled?: boolean;
    
    
    buttonText?: string; 
    onButtonClick?: (e: React.MouseEvent) => void;
    isButtonDisabled?: boolean;
    
  
    errorMessage?: string; 
    successMessage?: string; 

    bodyText?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    autoComplete = 'off',
    disabled = false,
    buttonText,
    onButtonClick,
    isButtonDisabled = false,
    errorMessage,
    successMessage,
    bodyText,
}) => {
   
    const wrapperClass = buttonText ? styles.oButton : styles.xButton;
    const inputClass = buttonText ? styles.buttonOBox : styles.buttonXBox;

    return (
        <div className={wrapperClass}>
            
            <p className={styles.bodyText}>{label}</p>
            
            
            <div className={buttonText ? styles.inputBoxWrapper : undefined}>
                
               
                <input 
                    type={type} 
                    name={name} 
                    className={inputClass} 
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    disabled={disabled}
                />
                
              
                {buttonText && (
                    <button 
                        className={styles.doubleButton}
                        onClick={onButtonClick}
                        type="button"
                        disabled={isButtonDisabled}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
            
         
            {errorMessage && (
                <div style={{ color: 'red' }} className={styles.message}>
                    {errorMessage}
                </div>
            )}
            {!errorMessage && successMessage && (
                <div style={{ color: 'green' }} className={styles.message}>
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default InputBox;
