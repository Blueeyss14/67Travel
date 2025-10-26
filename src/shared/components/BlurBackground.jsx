const BlurBackground = ({
  children,
  className,
  blur = "backdrop-blur-[20px]",
  background = "bg-white/10",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${background} ${className} ${blur} overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default BlurBackground;