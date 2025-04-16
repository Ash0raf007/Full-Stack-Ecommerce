"use client";
import React from "react";

type ButtonProps = {
  name: string;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button = ({ name, onClick, className, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className}  cursor-pointer `}
      type={type}
    >
      {name}
    </button>
  );
};

export default Button;