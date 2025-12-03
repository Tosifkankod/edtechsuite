import { useEffect, useRef, useState } from "react";

function getScrollParent(el: HTMLElement | null) {
    if (!el) return window;
    let element = el.parentElement;
    while (element) {
        const style = window.getComputedStyle(element);
        const canScroll = element.scrollHeight > element.clientHeight;
        if (["auto", "scroll", "overlay"].includes(style.overflowY) && canScroll) {
            return element;
        }
        element = element.parentElement;
    }
    return window;
}

export default function useScrollState(
    ref: React.RefObject<HTMLElement | null>,
    { topOffset = 10 }: { topOffset?: number } = {}
) {
    const [isAtTop, setIsAtTop] = useState<boolean>(true);
    const scrollParentRef = useRef<HTMLElement | Window | null>(null);

    useEffect(() => {
        const node = ref.current;
        const scrollParent = getScrollParent(node || null);
        scrollParentRef.current = scrollParent;

        const handleScroll = () => {
            const current =
                scrollParent === window
                    ? window.scrollY
                    : (scrollParent as HTMLElement).scrollTop;

            setIsAtTop(current <= topOffset);
        };

        const target: HTMLElement | Window = scrollParent;

        // listener
        target.addEventListener("scroll", handleScroll as EventListener, { passive: true });
        handleScroll();

        return () => {
            target.removeEventListener("scroll", handleScroll as EventListener);
        };
    }, [ref, topOffset]);

    return { isAtTop };
}