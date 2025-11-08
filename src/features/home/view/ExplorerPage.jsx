import colors from "../../../res/colors";
import Card from "../../../shared/components/Card";
import { carouselImageData } from "../data/carouselImageData";

const ExplorerPage = () => {
  return (
    <div className="w-full mt-60 [@media(max-width:800px)]:mt-40 flex flex-col justify-center items-center">
      <h1 style={{ color: colors.primary }} className="font-bold text-5xl text-center [@media(max-width:800px)]:text-[2rem]">
        Explore Your World
      </h1>
      <div className="w-full px-10 grid grid-cols-3 [@media(max-width:1288px)]:grid-cols-2 [@media(max-width:800px)]:grid-cols-1 gap-8 mt-15 mb-20">
        {carouselImageData.map((img, index) => (
          <Card
            key={index}
            width=""
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
