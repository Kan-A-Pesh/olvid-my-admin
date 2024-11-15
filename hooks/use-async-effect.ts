import React from "react";

export function useAsyncEffect(callback: () => Promise<void>, deps?: React.DependencyList, onUnmount?: () => void) {
    React.useEffect(() => {
        callback();

        return () => {
            if (onUnmount) {
                onUnmount();
            }
        };
    }, deps);
}
