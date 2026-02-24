import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useListingState = (itemsPerPage = 32) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to page 1 on search change
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync with URL
  useEffect(() => {
    const newParams = new URLSearchParams();

    if (debouncedSearch) newParams.set("q", debouncedSearch);
    if (currentPage > 1) newParams.set("page", currentPage);
    if (sort) newParams.set("sort", sort);

    // Add filters to URL
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          newParams.set(key, value.join(","));
        } else {
          newParams.set(key, value);
        }
      }
    });

    setSearchParams(newParams);
  }, [debouncedSearch, currentPage, sort, filters, setSearchParams]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((filterKey, filterValue) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: filterValue,
    }));
    setCurrentPage(1); // Reset to page 1 on filter change
  }, []);

  const handleSortChange = useCallback((sortValue) => {
    setSort(sortValue);
    setCurrentPage(1); // Reset to page 1 on sort change
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return {
    searchQuery,
    debouncedSearch,
    currentPage,
    filters,
    sort,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    itemsPerPage,
    setFilters,
    setSearchQuery,
    setSort,
    setCurrentPage,
  };
};

export default useListingState;
