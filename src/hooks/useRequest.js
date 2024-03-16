import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { axiosInstance } from "../axios/instance";
import { toast } from "sonner";

export const useRequest = ({ search, page, limit }) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const searchTerm = useDebounce(search, 800);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axiosInstance.get(
        `/request?search=${searchTerm}&page=${page}&limit=${limit}`
      );
      setData(result.data);
    } catch (error) {
      console.log({ error });
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, page, limit]);

  const createRequest = useCallback(
    async (data, { onSuccess }) => {
      try {
        setIsLoading(true);
        const result = await axiosInstance.post("/request", data);
        toast.success(result.data.message);
        await fetchData();
        onSuccess && onSuccess();
      } catch (error) {
        console.log("Something is wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData]
  );

  const updateRequest = useCallback(
    async ({ id, ...data }, { onSuccess }) => {
      try {
        setIsLoading(true);
        const result = await axiosInstance.patch(`/request/${id}`, data);
        toast.success(result.data.message);
        await fetchData();
        onSuccess && onSuccess();
      } catch (error) {
        console.log("Something is wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData]
  );

  const deleteRequest = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const result = await axiosInstance.delete(`/request/${id}`);
        toast.success(result.data.message);
        await fetchData();
      } catch (error) {
        console.log("Something is wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, createRequest, updateRequest, deleteRequest };
};
