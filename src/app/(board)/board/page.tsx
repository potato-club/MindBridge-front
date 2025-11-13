'use client';

import Board from "./Board";
import styles from "../components/board/Board.module.css";
import BottomNav from "@/components/Bottom/BottomNav";

const BoardList =() => {
    return 
     <div>
      <Board />
      <BottomNav />
    </div>
    
};

export default BoardList;