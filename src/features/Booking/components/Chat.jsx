import { Assets } from "../../../res/assets";
import { chatData } from "../data/chatData";
import colors from "../../../res/colors";

const Chat = ({ isOpen, openChat }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute bg-white w-[30%] h-[90%] z-999 top-0 shadow-[1px_1px_50px_rgba(0,0,0,0.1)] flex flex-col rounded-l-2xl overflow-hidden pointer-events-auto ${
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
      <div className="w-full flex-1 overflow-hidden overflow-y-auto flex flex-col justify-end ">
        {chatData.map((item) => (
          <div
            className={`w-full flex px-5 py-3  ${
              !item.isUser ? "justify-start" : "justify-end"
            }`}
          >
            {/* LAYOUT ADMIN PROFILE */}
            {!item.isUser && (
              <div className="flex justify-center items-center gap-3">
                {/* PROFILE */}
                <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                  <img src={item.profile} />
                </div>
                <div className="bg-white p-3 rounded-2xl shadow text-[0.9rem]">
                  <p className="font-bold">{item.role}</p>
                  <p>{item.message}</p>
                </div>
              </div>
            )}
            {/* LAYOUT USER PROFILE */}
            {item.isUser && (
              <div className="flex justify-center items-center gap-3">
                {/* PROFILE */}
                <div className="bg-white p-3 rounded-2xl shadow text-[0.9rem]">
                  <p className="font-bold">{item.role}</p>
                  <p>{item.message}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                  <img src={item.profile} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-20 justify-center items-center flex shadow-[1px_1px_10px_rgba(0,0,0,0.1)] box-border px-5">
        <div className="flex justify-center items-center w-full gap-3">
          <input
            style={{ backgroundColor: colors.secondary }}
            type="text"
            placeholder="Send a message"
            className={`p-3 w-full outline-none border rounded-[20px]`}
          />
            <img src={Assets.SendIcon} className="ml-1 w-8 h-8 cursor-pointer"/>

        </div>
      </div>
    </div>
  );
};

export default Chat;
