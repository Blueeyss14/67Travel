import colors from "../../res/colors";

const OutlineButton = ({
  text = "Primary",
  color = colors.primary,
  size = "px-6 py-2",
  margin = "m-0",
  textSize = "text-base",
}) => {
  return (
    <button
      className={`${size} ${textSize} ${margin} rounded-lg cursor-pointer border`}
      style={{ borderColor: color, color: color, backgroundColor: "transparent" }}
    >
      {text}
    </button>
  );
};

export default OutlineButton;
