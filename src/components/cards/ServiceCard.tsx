import type React from "react"
import type serviceInterface from "../../interfaces/serviceInterface";

interface ServerCardInterface extends serviceInterface {
    handleHover: (value: boolean) => void;
}

const ServiceCard: React.FC<ServerCardInterface> = ({
    handleHover,
    badge = '',
    description = '',
    // galleryImgs = '',
    // link = '',
    mainImg = '',
    title = '',
}) => {
    return <>
        <div
            className="group/card h-[300px] rounded-lg relative transition-all overflow-hidden duration-300 z-[10000000]"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
            {
                badge && badge !== '' ?
                    <div className="absolute top-0 opacity-0 group-hover/card:top-2 group-hover/card:opacity-100 transition-all duration-300 px-3 py-1 text-sm right-2 rounded-2xl text-white font-semibold bg-main-red">
                        {badge}
                    </div>: null
            }
            <div className="flex absolute bg-gradient-to-t from-black/80 to-black/20 text-neutral-100 backdrop-blur-[1px] transition-all duration-300 -bottom-4 opacity-0 group-hover/card:opacity-100 group-hover/card:bottom-0 pl-2 py-4 space-y-1 left-0 flex-col justify-start items-start">
                <h2 className="font-bold text-lg">{title}</h2>
                <p className="leading-4">{description}</p>
            </div>
            <img src={mainImg as string} alt="image" className="w-full h-full" />
        </div>
    </>
}

export default ServiceCard