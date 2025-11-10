

'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image'; // next/image 모듈에서 Image 컴포넌트를 가져옵니다.
import styles from '@/app/(board)/board/Board.module.css';

// 부모 컴포넌트로부터 받을 props의 타입을 정의합니다.
type SearchboxProps = {
  onSearch: (searchTerm: string) => void;
};

const Searchbox: React.FC<SearchboxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSearch}>
        <Image
          src="/images/board/search.png" 
          alt="검색 아이콘"
          width={20}
          height={20}
        />
      <input
        type="text"
        className={styles.searchInput}
        placeholder="검색어를 입력해주세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className={styles.searchButton}>
        {/* SVG 대신 직접 준비하신 돋보기 이미지를 사용합니다. */}
        {/* src 경로를 이미지 파일의 실제 경로에 맞게 수정해주세요. */}
      
      </button>
    </form>
  );
};

export default Searchbox;