import { useState, useEffect } from "react";
import API from "../utils/API";
const useAddPeople = (searchText) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            if (!searchText || searchText.length < 2) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await API.get(`/groupId/members?q=${searchText}`);
                setSearchResults(response.data || []);
            } catch (err) {
                setError(err);
                console.error("Error fetching members:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMembers();
    }, [searchText]);

    return { searchResults, isLoading, error };
};

export default useAddPeople;
