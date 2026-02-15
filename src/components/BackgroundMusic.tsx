import { useRef } from "react";

const BackgroundMusic = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const BASE_URL = "https://www.youtube.com/embed/fRh_vgS2dFE?autoplay=1&loop=1&playlist=fRh_vgS2dFE&controls=0&enablejsapi=1";



    return (
        <iframe
            ref={iframeRef}
            src={BASE_URL}
            allow="autoplay; encrypted-media"
            className="fixed bottom-0 left-0 w-[1px] h-[1px] opacity-[0.01] pointer-events-none -z-50"
            title="background music"
        />
    );
};

export default BackgroundMusic;
