import FilledButton from "../buttons/FilledButton";

const PromotionCard = ({
  width = "w-full",
  title = "Title",
  subTitle = "Subtitle",
  textButton = "Card",
  imageUrl = ''
}) => {
  return (
    <div
      className={`${width} shadow-2xl h-50 rounded-2xl bg-white overflow-hidden p-5 flex gap-5 pointer-events-auto`}
    >
      <div className="w-[40%] h-full bg-gray-500 rounded-2xl overflow-hidden">
        <img src={imageUrl} className="object-cover w-full h-full opacity-50 cursor-pointer hover:rotate-12 hover:scale-150 transition-all duration-400" />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden justify-between">
        <h1 className="text-2xl font-semibold line-clamp-1">{title}</h1>
        <h2 className="text-[1rem] mb-2 line-clamp-1">{subTitle}</h2>
        <p className="text-[0.9rem] line-clamp-2 mb-2">Description bla bla bal blabalallblsdfbdsf sjdfsdjfkb dfnjskdfsk djakfksjdf </p>
        <div className="w-full flex justify-end">
            <FilledButton text={textButton} size="py-2 px-8"/>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
