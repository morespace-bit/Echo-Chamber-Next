import { getAPIWithToken } from "../http/api";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const api = getAPIWithToken();
  async function getProfile() {
    const res = await api.get("api/getProfile");
    return res.data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  const obj = {
    userData: data?.data,
    isLoading,
    error,
  };

  return obj;
}
