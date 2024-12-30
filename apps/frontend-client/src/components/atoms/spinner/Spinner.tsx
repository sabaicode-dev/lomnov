import React, { ReactNode } from 'react';

interface SpinnerProps {
  children?: ReactNode; // If the Spinner might include children (optional)
  className?: string;  // Optional additional CSS classes
}

const Spinner: React.FC<SpinnerProps> = ({ children, className }) => {
  return (
    <div className={`flex justify-center items-center ${className ?? ''}`}>
      <div className="w-8 h-8 border-4 border-t-olive-green border-gray-300 rounded-full animate-spin"></div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default Spinner;
