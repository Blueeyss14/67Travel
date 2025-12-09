import { useState, useEffect } from "react";
import { Assets } from "../../../res/assets";
import BlurBackground from "../../../shared/components/BlurBackground";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight / 4;
      setScrolled(window.scrollY > triggerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const items = [{ name: "Explore" }, { name: "Contact" }];

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
        {/* <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
              <img
                src="images/image1.jpg"
                className="w-full h-full object-cover"
              />
              <input type="file" id="fileInput" style={{ display: "none" }} />
            </div>
            <h1 className="font-medium">Felicia</h1>
          </div> */}
        <div className="flex items-center gap-3">
          <img
          onClick={()=> navigate('/notification-page')}
            src={Assets.NotificationIcon}
            className="w-5 h-5 whitee-filter cursor-pointer"
          />
          <BlurBackground
            onClick={() => setIsOpen(true)}
            rounded="rounded-full"
            className="p-2 cursor-pointer"
            border="border border-white/10"
          >
            <img src={Assets.MoreVertIcon} className="whitee-filter w-4 h-4" />
          </BlurBackground>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
