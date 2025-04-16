import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={rest.id || rest.name}>{label}</label>}
      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />
    </div>
  );
};

export default Input;
