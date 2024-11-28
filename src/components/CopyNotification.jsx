import React, { useEffect, useState } from 'react';

const CopyNotification = ({ message, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); 
      setTimeout(onClose, 600); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`fixed bottom-4 left-10 transform p-4 bg-green-50 text-green-800 rounded-lg shadow-xl flex items-center border border-green-300
        ${show ? 'animate-fadeInScale' : 'animate-fadeOutScale'}`}
    >
      <span className="mr-2 text-green-600 text-xl">✔️</span> 
      <p className="text-center text-lg font-medium">{message}</p>
    </div>
  );
};

export default CopyNotification;
