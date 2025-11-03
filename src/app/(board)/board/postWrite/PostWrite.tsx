'use client';

import React from "react";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from './PostWrite.module.css';
import { categories } from "@/app/(main)/board/mockData";
import Image from "next/image";

const PostWrite = () => {
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
     
     <div className={styles.dropBox}>

    </div>

</>      
 
    );
    
    };

export default PostWrite;