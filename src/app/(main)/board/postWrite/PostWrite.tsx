'use client';

import React from "react";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from './PostWrite.module.css';
import { categories } from "@/app/(main)/board/mockData";

const PostWrite = () => {
    return(
    <div className={styles.header}>
        
        <p>글쓰기</p>
     </div>
    );
    
    };

export default PostWrite;