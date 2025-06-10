import React, { useRef, useState } from 'react';

const HeroSection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [showMuted, setShowMuted] = useState<boolean>(false);

    const handleMouseEnter = async () => {
        try {
            if (videoRef.current) {
                videoRef.current.muted = false;
                await videoRef.current.play().catch((error) => {
                    console.error('Video play failed:', error);
                    setShowMuted(true);
                    if (videoRef.current) {
                        videoRef.current.muted = true;
                        videoRef.current.play().catch((err) => console.error('Fallback play failed:', err));
                    }
                });
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setShowMuted(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            setShowMuted(false);
        }
    };

    const handleClick = () => {
        if (videoRef.current) {
            const isMuted = videoRef.current.muted;
            videoRef.current.muted = !isMuted;
            setShowMuted(false); // Show button when muted, hide when unmuted
            if (videoRef.current.paused) {
                videoRef.current.play().catch((error) => console.error('Play on click failed:', error));
            }
        }
    };

    return (
        <section className="overflow-hidden w-full px-2.5">
            <div className="flex flex-wrap w-full justify-center">
                <div className="w-full lg:w-1/4 md:w-1/2 px-4">
                    <div className="flex justify-center items-center relative h-full max-md:hidden">
                        <img
                            src="https://jaikvik.in/lab/new-post-video/img/new-cricle-image.png"
                            alt=""
                            className="w-full animate-[spin_15s_linear_infinite]"
                        />
                        <img
                            src="https://jaikvik.in/lab/new-post-video/img/rotate-3.png"
                            alt=""
                            className="absolute w-[900px] mr-7 max-w-none"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-3/4 md:w-1/2 px-4 cursor-pointer">
                    <div
                        className="w-full relative"
                        id="heroBanner"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                    >
                        {/* Mute/Unmute Button */}
                        <div
                            className={`absolute top-1/2 left-1/2 z-50 transition-all duration-300 rounded-md bg-purple-600 text-white py-2 px-4 transform -translate-x-1/2 -translate-y-1/2 ${
                                showMuted ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            {videoRef.current?.muted ? 'Unmute Video' : 'Mute Video'}
                        </div>

                        <video
                            id="heroVideo"
                            ref={videoRef} // Re-enable the ref
                            autoPlay
                            muted
                            loop
                            className="w-full transition-opacity duration-300"
                        >
                            <source
                                src="https://jaikvik.in/lab/new-post-video/img/home-banner/Jaikvin Technology Video 5.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;