import React, { useState, useEffect } from "react";

export default function Search({ fetchSuggestions }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    }

    useEffect(() => {
        if (!query) {
            setSuggestions([]);
            return;
        }
        const controller = new AbortController();
        setLoading(true);

        const timeout = setTimeout(() => {
            fetchSuggestions(query, controller.signal)
                .then((results) => setSuggestions(results))
                .finally(() => setLoading(false))
        }, 500)

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [query, fetchSuggestions])

    return (
        <div className="w-full bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Search
                </h1>
                
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="w-full p-3 text-base mb-4 border border-gray-300 dark:border-gray-600 
                             rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             placeholder-gray-500 dark:placeholder-gray-400 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                             focus:border-transparent transition-colors duration-200"
                />
                
                {loading && (
                    <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 dark:border-blue-400"></div>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading...</span>
                    </div>
                )}
                
                <ul className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-3 border-b border-gray-200 dark:border-gray-700 
                                     cursor-pointer bg-gray-50 dark:bg-gray-800
                                     hover:bg-gray-100 dark:hover:bg-gray-700 
                                     text-gray-900 dark:text-white
                                     transition-colors duration-150 rounded"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
                
                {query && suggestions.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No suggestions found
                    </div>
                )}
            </div>
        </div>
    );
}