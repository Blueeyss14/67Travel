import { useState } from "react";
import colors from "../../res/colors";

const FilledButton = ({
  text = "Primary",
  color = colors.primary,
  hoverColor = "#60a5fa",
  textColor = "white",
  size = "px-6 py-2",
  margin = "m-0",
  textSize = "text-base",
  onClick,
}) => {
  const [isHover, setIsHover] = useState(false);

  const glowColor = "#55bbdd";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        backgroundColor: isHover ? hoverColor : color,
        color: textColor,
        transition: "background-color 0.2s ease-in-out",
        boxShadow: `0 0 10px ${glowColor}33, 0 0 20px ${glowColor}22`,
      }}
      className={`${size} ${textSize} ${margin} rounded-lg cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default FilledButton;
