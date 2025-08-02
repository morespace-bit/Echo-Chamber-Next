import { useQuery } from "@tanstack/react-query";
import { API_WITH_TOKEN } from "../http/api";

export function useVerify() {
  // the function which does the api call
  async function verify() {
    const res = await API_WITH_TOKEN.get("/api/verify");
    return res.data;
  }

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["verify"],
    queryFn: verify,
  });

  if (isLoading) return null;
  if (isError) return false;
  if (isSuccess) return true;
}
