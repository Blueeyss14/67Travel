import { useState } from "react";
import colors from "../../res/colors";

const PrimaryButton = ({ type, text = "Primary Button", width, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      type={type}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? colors.primaryHover : colors.primary,
      }}
      className={`group relative ${width} flex justify-center py-2 px-4 border border-transparent rounded-lg text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
