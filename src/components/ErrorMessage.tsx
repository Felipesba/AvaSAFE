import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-6 text-center">
      <div className="bg-red-50 text-red-800 p-4 rounded-lg inline-block">
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}