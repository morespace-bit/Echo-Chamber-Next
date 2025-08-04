import { useQuery } from "@tanstack/react-query";
import { getAPIWithToken } from "../http/api";

export function useVerify() {
  // the function which does the api call
  const api = getAPIWithToken();
  async function verify() {
    const res = await api.get("/api/verify");
    return res.data;
  }

  const { data, isSuccess, isLoading, isError, isFetching } = useQuery({
    queryKey: ["verify"],
    queryFn: verify,
    retry: false,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    isFetching,
  };
}
