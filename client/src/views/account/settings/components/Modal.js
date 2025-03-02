// import React from "react";
// import { IoClose } from "react-icons/io5";

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
//         <button onClick={onClose} className="absolute right-4 top-4">
//           <IoClose size={24} />
//         </button>
//         <h2 className="text-2xl font-medium mb-6">{title}</h2>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4"
        >
          <IoClose size={20} className="sm:w-6 sm:h-6" />
        </button>
        {title && (
          <h2 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
