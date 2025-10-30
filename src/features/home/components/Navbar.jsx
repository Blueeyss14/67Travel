import { useState, useEffect } from "react";
import FilledButton from "../../../shared/buttons/FilledButton";
import OutlineButton from "../../../shared/buttons/OutlineButton";

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
        <h1>Logo Kita</h1>
        <div className="flex items-center">
          <div className="flex gap-8 mr-10">
            {items.map((item, index) => (
              <a key={index} href="">
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            <OutlineButton text="Regist" color="white" />
            <FilledButton text="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
