import { useQuery } from "@tanstack/react-query";
import API from "../utils/API";

const searchUsers = async (searchText) => {
    if (!searchText || searchText.length < 2) return [];
    const { data } = await API.get(`/users/search?q=${searchText}`);
    return data;
};

const useUsers = (searchText) => {
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: searchText.length > 1 ? ['searchUsers', searchText] : ['searchUsers'],
        queryFn: () => searchUsers(searchText),
        enabled: searchText.length > 1,
    });

    return { users, isLoading, error };
};

export default useUsers;
