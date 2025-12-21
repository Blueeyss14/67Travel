import { Assets } from "../../../res/assets";

const PromotionPage = () => {
  return (
    <div className="w-full h-100 mt-60 overflow-hidden">
      <div className="w-full h-full relative">
        <img
          src="images/promotion.jpg"
          className="w-full h-full object-cover absolute"
        />

        <div className="bg-black/10 w-full h-full absolute flex flex-col justify-center items-center">
          <h1 className="text-white font-semibold text-3xl mt-10 text-center [@media(max-width:870px)]:text-[1.5rem]">
            Dapatkan info terbaru seputar perjalanan di:
          </h1>
          <div className="flex items-center">
            <img src={Assets.PlaneIcon} className="w-40 whitee-filter [@media(max-width:870px)]:w-20" />
            <h1 className="text-white font-bold text-[3rem] [@media(max-width:870px)]:text-[1.5rem]">67Travel</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionPage;
