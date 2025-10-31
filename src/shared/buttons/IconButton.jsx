import { Assets } from "../../res/assets";
import colors from "../../res/colors";

const IconButton = ({
    text = 'button',
    icon = `${Assets.CalendarIcon}`,
    rounded = 'rounded-[10px]',
    buttonColor = colors.secondary,
    onClick
}) => {
  return (
    <div
    onClick={onClick}
    style={{backgroundColor : `${buttonColor}`}}
    className={`${rounded} h-full flex justify-center items-center border-r border-gray-400/50 px-3 hover:shadow-[inset_2px_2px_10px_rgba(0,0,0,0.50)] transition-all duration-200 cursor-pointer gap-2 `}>
      <img src={icon} className="w-5 h-5" />
      <h1>{text}</h1>
    </div>
  );
};

export default IconButton;
