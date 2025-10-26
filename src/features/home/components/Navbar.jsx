import FilledButton from "../../../shared/buttons/FilledButton";
import OutlineButton from "../../../shared/buttons/OutlineButton";

const Navbar = () => {
  const items = [
    {
      name: "Explore",
    },
    {
      name: "Contact",
    },
  ];
  return (
    <div className="w-full flex justify-between p-5 fixed text-white z-99">
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
  );
};

export default Navbar;
