import { useState, useEffect } from "react";
import FilledButton from "../../../shared/buttons/FilledButton";
import OutlineButton from "../../../shared/buttons/OutlineButton";
import { Assets } from "../../../res/assets";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight / 4;
      setScrolled(window.scrollY > triggerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [{ name: "Explore" }, { name: "Contact" }];

  return (
    <div
      className={`z-999 flex justify-center items-center w-full fixed transition-colors duration-300 ${
        scrolled ? "backdrop-blur-[20px] bg-black/20" : "bg-transparent"
      }`}
    >
      <div className="w-[90%] flex justify-between items-center p-5 text-white">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-[1.2rem]">67Travel</h1>
          <img src={Assets.PlaneIcon} className="w-10 h-10 whitee-filter" />
        </div>
        <div className="flex items-center">
          <div className="flex gap-8 mr-10">
            {items.map((item, index) => (
              <a key={index} href="">
                {item.name}
              </a>
            ))}
          </div>
          <div
            onClick={() => document.getElementById("fileInput").click()}
            className="w-9 h-9 rounded-full overflow-hidden cursor-pointer"
          >
            <img
              src="images/image1.jpg"
              className="w-full h-full object-cover"
            />
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          {/* <div className="flex gap-3">
            <OutlineButton text="Regist" color="white" />
            <FilledButton text="Login" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
