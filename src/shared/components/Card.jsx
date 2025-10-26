import FilledButton from "../buttons/FilledButton";

const Card = ({
  width = "w-full",
  height = "h-150",
  title = "Title",
  subTitle = "SubTitle",
  textButton = "Card",
  imageUrl = "",
  description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt alias quaerat amet vitae aperiam? Earum, quae, itaque eaque adipisci hic molestiae quibusdam dignissimos omnis deleniti placeat nesciuntinventore deserunt doloremque?",
}) => {
  return (
    <div
      className={`${width} ${height} shadow-2xl p-5 rounded-2xl flex flex-col`}
    >
      <div className="w-full h-[60%] bg-gray-400 rounded-2xl overflow-hidden">
        <img
          src={imageUrl}
          className="w-full h-full object-cover hover:rotate-12 hover:scale-150 transition-all duration-400 cursor-pointer opacity-65"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between p-2">
        <div>
          <h1 className="text-2xl font-semibold my-1 line-clamp-1">{title}</h1>
          <h2 className="text-[1rem] mb-2 line-clamp-1">{subTitle}</h2>
        </div>
        <div className="flex-1">
          <p className="text-[0.9rem] mb-4 text-justify line-clamp-4">{description}</p>
        </div>

        <div className="flex justify-end">
          <FilledButton text={textButton} />
        </div>
      </div>
    </div>
  );
};

export default Card;
