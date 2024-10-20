import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <button onClick={onClose} className="text-right text-gray-500">
          Fechar
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
