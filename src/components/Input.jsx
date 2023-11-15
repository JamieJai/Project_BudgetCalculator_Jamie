import React, { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, ...props }, ref) {
  return (
    <p className="flex flex-col flex-1">
      <label className="mb-2">{label}</label>
      <input
        ref={ref}
        className="p-2 bg-transparent border-0 border-b border-gray-400 focus:border-black outline-none"
        {...props}
      />
    </p>
  );
});

export default Input;
