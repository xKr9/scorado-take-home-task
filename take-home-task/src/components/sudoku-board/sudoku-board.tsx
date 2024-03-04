"use client";

import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import z from "zod";
import { useForm } from "react-hook-form";
import { solveSudoku } from "@/utils/SudokuSolver";

type Props = {
  initial: number[][];
};

export default function SudokuBoard({ initial }: Props) {
  const [board, setBoard] = React.useState<number[][]>(initial);
  return (
    <>
      <button
        onClick={() => {
          const solved = solveSudoku(board);
          if (!solved) {
            alert("This sudoku is not solvable");
            return;
          }
          setBoard(solved);
        }}
      >
        Solve
      </button>
      <table>
        <tbody>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={(row + 1) % 3 === 0 ? styles.bottomBorder : ""}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, columnIndex) => {
                  return (
                    <td
                      key={rowIndex + columnIndex}
                      className={(col + 1) % 3 === 0 ? styles.rightBorder : ""}
                    >
                      <SudokuSquare
                        disabled={initial[row][col] !== 0}
                        value={board[row][col]}
                        onChange={(value) => {
                          const newBoard = board;
                          newBoard[rowIndex][columnIndex] = value;
                          setBoard(newBoard);
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const SudokuSquare = ({
  value,
  onChange,
  disabled,
}: {
  disabled: boolean;
  value: number;
  onChange: (value: number) => void;
}) => {
  const { register, setValue } = useForm({});
  const numberValid = z.coerce.number().min(1).max(9);

  useEffect(() => {
    setValue("value", value === 0 ? null : value);
  }, [value]);

  return (
    <input
      type="text"
      disabled={disabled}
      className={`${styles.sudokuSquare} 
    ${disabled && styles.disabled}`}
      {...register("value", {
        min: 1,
        max: 9,
        valueAsNumber: true,
        onChange: (e) => {
          if (e.target.value === "") {
            setValue("value", null);
            return;
          }
          try {
            numberValid.parse(e.target.value);
            onChange(parseInt(e.target.value, 10));
            setValue("value", parseInt(e.target.value, 10));
          } catch (error) {
            setValue("value", null);
          }
        },
      })}
    />
  );
};
