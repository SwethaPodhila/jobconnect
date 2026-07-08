import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "jobconnect-bookmarks";

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);

            if (stored) {
                setBookmarks(JSON.parse(stored));
            }
        } catch {
            // Ignore corrupted storage
        }
    }, []);

    const toggleBookmark = useCallback((jobId) => {
        setBookmarks((prev) => {
            const next = prev.includes(jobId)
                ? prev.filter((id) => id !== jobId)
                : [...prev, jobId];

            try {
                window.localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(next)
                );
            } catch {
                // Storage unavailable
            }

            return next;
        });
    }, []);

    const isBookmarked = useCallback(
        (jobId) => bookmarks.includes(jobId),
        [bookmarks]
    );

    return {
        bookmarks,
        toggleBookmark,
        isBookmarked,
    };
}