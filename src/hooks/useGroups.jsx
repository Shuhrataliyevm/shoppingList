import { useQuery } from "@tanstack/react-query";
import API from "../utils/API";

const searchGroup = async (searchText) => {
    if(!searchText || searchText.length < 2) return [];
    const { data } = await API.get(`/groups/search?q=${searchText}`);
    return data;
}

const useGroups = (searchText) => {
    const { data: groups =[],
        isLoading: groupsLoading,
        error: groupsError,
    } = useQuery({
        queryKey: searchText.length>1?['search',searchText]:['search'],
        queryFn: () => searchGroup(searchText),
        enabled:searchText.length>1,
    });

    return { groups, groupsLoading, groupsError };
}
export default useGroups;