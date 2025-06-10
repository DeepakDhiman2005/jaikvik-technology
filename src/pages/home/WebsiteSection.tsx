import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import websites from "../../configs/all-websites";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import WebsiteCard from "../../components/cards/WebsiteCard";

const WebsiteSection = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);

    // When swiper changes slide, update active index and start scroll again
    const onSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
        setIsAutoSliding(true);
    };

    // Called from WebsiteCard after scroll transition end
    const handleScrollComplete = () => {
        if (isAutoSliding) {
            let timer = setInterval(() => {
                swiperRef.current?.slideNext();
                clearInterval(timer);
            }, 200);
        }
    };

    // Stop autoplay and scroll on arrow click
    const handleArrowClick = (direction: "prev" | "next") => {
        setIsAutoSliding(false);
        if (direction === "prev") swiperRef.current?.slidePrev();
        else swiperRef.current?.slideNext();
    };

    return (
        <div className="overflow-hidden my-4 min-h-[300px] relative">
            <div className="websiteHeading mb-4">
                <h2 className="uppercase text-gray-200 text-xl inline-block relative">
                    <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
                        Website
                    </a>
                </h2>
            </div>
            <div className="w-full group relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={15}
                    slidesPerView={2.5}
                    loop
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setActiveIndex(swiper.realIndex);
                    }}
                    onSlideChange={onSlideChange}
                    className="mySwiper"
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    autoplay={false} // we control slide manually after scroll
                >
                    {websites.map((website, index) => (
                        <SwiperSlide key={index}>
                            <WebsiteCard
                                index={index}
                                website={website}
                                scrollActive={index === activeIndex}
                                onScrollComplete={handleScrollComplete}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Arrows */}
                <ArrowLeft onClick={() => handleArrowClick("prev")} />
                <ArrowRight onClick={() => handleArrowClick("next")} />
            </div>
        </div>
    );
};

export default WebsiteSection;
