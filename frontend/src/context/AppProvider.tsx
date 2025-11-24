import React, { useState } from "react";
import { type SearchFilter, type AppContextType, AppContext } from "./AppContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState<boolean>(false);

  const value: AppContextType = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};