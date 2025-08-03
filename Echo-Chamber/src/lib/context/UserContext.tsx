"use client";

import { useQuery } from "@tanstack/react-query";

import { getAPIWithToken } from "../http/api";
import { createContext, useContext } from "react";

interface IUser {
  id: string;
  username: string;
  profile: string;
}

interface IUserContext {
  userData: IUser;
  isLoading: boolean;
  error: unknown;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const api = getAPIWithToken();
  const getProfile = async () => {
    const res = await api.get("/api/getProfile");
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  return (
    <UserContext.Provider
      value={{
        userData: data?.data ?? null,
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsrContext must be used within a user provider");
  }

  return context;
}
