import FilledButton from "../../../shared/buttons/FilledButton";

const Navbar = () => {
  const items = [
    {
      name: "Item1",
    },
    {
      name: "Item2",
    },
    {
      name: "Item3",
    },
    {
      name: "Item4",
    },
  ];
  return (
    <div className="w-full flex justify-between p-5">
      <h1>Logo</h1>
      <div className="flex gap-10">
        {items.map((item) => (
          <a key={item.id} href="">
            {item.name}
          </a>
        ))}
      </div>
      <FilledButton text="Login" />
    </div>
  );
};

export default Navbar;
