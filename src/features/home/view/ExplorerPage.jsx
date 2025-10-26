import colors from "../../../res/colors";
import Card from "../../../shared/components/Card";
import { carouselImageData } from "../data/carouselImageData";

const ExplorerPage = () => {
  return (
    <div className="w-full mt-60 flex flex-col justify-center items-center">
      <h1 style={{ color: colors.primary }} className="font-bold text-5xl">
        Explore Your World
      </h1>
      <div className="w-full px-10 grid grid-cols-3 gap-8 mt-15 mb-20">
        {carouselImageData.map((img, index) => (
          <Card
            key={index}
            width="w-[calc(1/3 - 5)]"
            imageUrl={img.bg}
            title={img.label}
            subTitle={img.owner}
            description={img.description}
            textButton="Visit"
          />
        ))}
      </div>
    </div>
  );
};

export default ExplorerPage;
