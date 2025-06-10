import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";
import videos from "../../configs/all-videos";

const OurVideosSection = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    const handleVideoHover = (value: boolean) => {
        if (swiperRef.current) {
            if (value) {
                swiperRef.current.autoplay.stop(); // Pause autoplay on hover
            } else {
                swiperRef.current.autoplay.start(); // Resume autoplay when mouse leaves
            }
        }
    };

    return (
        <div className="overflow-hidden h-auto my-4 ">
            <div className="websiteHeading mb-4">
                <h2 className="uppercase text-gray-200 text-xl inline-block relative">
                    <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
                        Our Videos
                    </a>
                </h2>
            </div>
            <div className="w-full group relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={4.5}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    loop
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className="mySwiper !overflow-visible"
                >
                    {videos.map((item, index) => (
                        <SwiperSlide key={index} className="!overflow-visible">
                            <ReelVideoCard
                                src={item as string}
                                onHover={handleVideoHover}
                                aspectRatio="16/9"
                                scale="hover:scale-125"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <ArrowLeft onClick={() => {
                    swiperRef.current?.slidePrev();
                }} />
                <ArrowRight onClick={() => {
                    swiperRef.current?.slideNext();
                }} />
            </div>
            <div className="swiper-pagination top-3 text-right pr-5 -z-10"></div>
        </div>
    );
};

export default OurVideosSection;
