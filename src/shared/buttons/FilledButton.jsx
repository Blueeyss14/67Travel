import colors from "../../res/colors";

const FilledButton = ({
  text = "Primary",
  color = colors.primary,
  textColor = "text-white",
  size = "px-6 py-2",
  margin = "m-0",
  textSize = "text-base",
}) => {
  return (
    <button
      style={{ backgroundColor: color, color: textColor }}
      className={`${color} ${textColor} ${size} ${textSize} ${margin} rounded-lg cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default FilledButton;
