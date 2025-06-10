import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import posts from "../../configs/all-posts";

const SocialMediaPostSection = () => {
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
                        Social Media Posts
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
                    {posts.map((item, index) => (
                        <SwiperSlide key={index} className="hover:z-50">
                            <div
                                className="hover:scale-125 transition-all duration-300 hover:z-50"
                                onMouseEnter={() => handleVideoHover(true)}
                                onMouseLeave={() => handleVideoHover(false)}
                            >
                                <img src={item} alt="image" className="w-full h-full" />
                            </div>
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

export default SocialMediaPostSection;
