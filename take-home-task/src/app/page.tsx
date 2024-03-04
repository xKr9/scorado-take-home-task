"use client";
import React, { useState } from "react";
import SudokuBoard from "@/components/sudoku-board/sudoku-board";
import style from "./style.module.scss";

export default function Home() {
  const [inital, setInitial] = useState(
    new Array(9).fill(new Array(9).fill(0))
  );
  return (
    <main className={style.main}>
      <h1 className={style.title}>Sudoku Solver</h1>
      <SudokuBoard initial={inital} />
    </main>
  );
}
