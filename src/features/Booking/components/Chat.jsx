import { Assets } from "../../../res/assets";

const Chat = ({ isOpen, openChat }) => {
  return (
    <div
      className={`absolute bg-white w-[30%] h-full z-999 top-0 shadow-[1px_1px_50px_rgba(0,0,0,0.1)]  ${
        !isOpen ? "-right-200" : "right-0"
      } transition-all duration-300`}
    >
      <div
        onClick={openChat}
        className="flex items-center gap-5 box-border p-5 pointer-events-auto cursor-pointer shadow-[1px_1px_1px_rgba(0,0,0,0.1)]"
      >
        <img
          src={Assets.LeftArrowIcon}
          className="w-5 h-5 pointer-events-auto"
        />
        <h1 className="font-bold text-[1.2rem]">Mimin</h1>
      </div>
    </div>
  );
};

export default Chat;
