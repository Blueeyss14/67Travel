import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import { useUserChat } from "../hook/useUserChat";
import { useState } from "react";

const Chat = ({ isOpen, openChat }) => {
  const { messages, sendUserMessage, loading } = useUserChat();
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendUserMessage(inputText.trim());
    setInputText("");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`[@media(max-width:1050px)]:w-full absolute bg-white w-[40%] h-[90%] z-999 top-0 shadow-[1px_1px_50px_rgba(0,0,0,0.1)] flex flex-col rounded-l-2xl overflow-hidden pointer-events-auto ${
        !isOpen ? "-right-[100vw]" : "right-0"
      } transition-all duration-300`}
    >
      <div
        onClick={openChat}
        className="flex items-center gap-5 box-border p-5 pointer-events-auto cursor-pointer shadow-[1px_1px_1px_rgba(0,0,0,0.1)]"
      >
        <img
          src={Assets.LeftArrowIcon}
          className="w-4 h-4 pointer-events-auto blue-filter"
        />
        <h1
          style={{ color: colors.primary }}
          className="font-bold text-[1.2rem]"
        >
          Admin
        </h1>
      </div>

      <div className="w-full flex-1 overflow-hidden overflow-y-auto flex flex-col justify-end bg-blue-200/10">
        {loading && (
          <div className="h-full  from-gray-50 to-white p-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
                <p className="mt-4 text-gray-500">Memuat Pesan</p>
              </div>
            </div>
          </div>
        )}
        {messages.map((item, index) => (
          <div
            key={index}
            className={`w-full flex px-5 py-3 ${
              !item.isUser ? "justify-start" : "justify-end"
            }`}
          >
            {!item.isUser && (
              <div className="flex justify-center items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                  <img src={item.profile} className="w-full h-full object-cover" />
                </div>
                <div className="bg-white p-3 rounded-2xl shadow text-[0.9rem]">
                  <p style={{ color: colors.hytam }} className="font-bold">
                    {item.role}
                  </p>
                  <p style={{ color: colors.hytam }}>{item.message}</p>
                </div>
              </div>
            )}

            {item.isUser && (
              <div className="flex justify-center items-center gap-3">
                <div className="bg-white p-3 rounded-2xl shadow text-[0.9rem]">
                  <p style={{ color: colors.hytam }} className="font-bold">
                    {item.role}
                  </p>
                  <p style={{ color: colors.hytam }}>{item.message}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                  <img src={item.profile} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full h-20 justify-center items-center flex shadow-[1px_1px_10px_rgba(0,0,0,0.1)] box-border px-5">
        <div className="flex justify-center items-center w-full gap-3">
          <input
            style={{
              backgroundColor: colors.secondary,
              borderColor: colors.primary,
              color: colors.hytam,
            }}
            type="text"
            placeholder="Send a message"
            className="p-3 w-full outline-none border rounded-[20px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <img
            src={Assets.SendIcon}
            className="ml-1 w-8 h-8 cursor-pointer blue-filter"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
