"use client";

import React from "react";
import styles from "./styles.module.scss";
import z from "zod";
import { useForm } from "react-hook-form";

type Props = {
  values: number[][];
};

export default function SudokuBoard({ values }: Props) {
  const [board, setBoard] = React.useState(values);

  console.log(board);
  return (
    <div>
      {values.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((value, columnIndex) => (
            <SudokuSquare
              key={columnIndex}
              value={value}
              onChange={(e) => {
                const newBoard = [...board];
                newBoard[rowIndex][columnIndex] = e;
                setBoard(newBoard);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const SudokuSquare = ({
  value,
  onChange,
  correctPosition,
}: {
  correctPosition: boolean;
  value: number | null;
  onChange: (value: number | null) => void;
}) => {
  const { register, setValue } = useForm({
    defaultValues: {
      value,
    },
  });
  const numberValid = z.coerce.number().min(1).max(9);
  return (
    <input
      type="text"
      disabled={correctPosition}
      className={`${styles.sudokuSquare} ${
        correctPosition && styles.correctPostion
      }`}
      {...register("value", {
        min: 1,
        max: 9,
        valueAsNumber: true,
        onChange: (e) => {
          if (e.target.value === "") {
            onChange(null);
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
