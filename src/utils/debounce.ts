import {useState} from "react";

function useDebounce(callback: Function, delay: number) {
    const [timer, setTimer] = useState<number>();

    return function (...args: any[]) {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            callback(...args);
        }, delay);
        // @ts-ignore
        setTimer(newTimer);
    };
}

export default useDebounce