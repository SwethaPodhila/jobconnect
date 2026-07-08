import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    if (!visible) return null;

    return (
        <button
            type="button"
            className="btn btn-primary jc-scroll-top"
            aria-label="Scroll to top"
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
        >
            <i className="bi bi-arrow-up"></i>
        </button>
    );
}