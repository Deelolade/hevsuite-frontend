import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';

const FireModal = ({ title, message, confirmText, onClose, onConfirm }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleConfirm = () => {
    onConfirm?.(); // Execute callback if provided
    onClose();
  };

  return (
    <div
      style={{ zIndex: 100000000 }}
      className='fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50'
    >
      <div className='bg-white p-6 rounded shadow-lg  md:w-[400px] w-[90%] relative'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl'>{title}</h2>
          <button
            onClick={() => onClose()}
            className='text-gray-400 hover:text-gray-600'
          >
            ✕
          </button>
        </div>
        <p className='text-gray-600 mb-6'>{message}</p>
        <div className='flex justify-end gap-3'>
          <button
            onClick={() => onClose(false)}
            className='px-6 py-2 border rounded-lg hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90'
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export const showModal = ({ title, text, message, confirmText, onConfirm }) => {
  const modalRoot = document.createElement('div');
  document.body.appendChild(modalRoot);
  const root = createRoot(modalRoot);

  const close = () => {
    root.unmount();
    document.body.removeChild(modalRoot);
  };

  root.render(
    <FireModal
      title={title}
      message={message ? message : text}
      onClose={close}
      onConfirm={onConfirm}
      confirmText={confirmText}
    />
  );
};
