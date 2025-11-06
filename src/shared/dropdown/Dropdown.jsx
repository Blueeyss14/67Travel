import { useState, useRef, useEffect } from 'react';

const Dropdown = ({ 
  trigger, 
  children, 
  position = "bottom-left",
  className = "",
  onOpen,
  onClose 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const positions = {
    "bottom-left": "left-0 top-full mt-2",
    "bottom-right": "right-0 top-full mt-2",
    "top-left": "left-0 bottom-full mb-2",
    "top-right": "right-0 bottom-full mb-2"
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div
          onClick={handleItemClick}
          className={` overflow-hidden overflow-y-auto
          absolute z-9999 w-full max-h-[300px] 
           bg-white 
          border border-gray-200 
          rounded-2xl shadow-lg 
          backdrop-blur-sm 
          animate-in fade-in-0 zoom-in-95
          ${positions[position]}
        `}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
