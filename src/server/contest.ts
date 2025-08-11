import { IContest } from "../type";
import { instance, next } from "./base";

export const createContext = async (values: Partial<IContest>) => {
  const { data } = await instance()
    .post("/v1/contest", values)
    .catch((e) => next(e));
  return data?.data;
};

export const fetchContest = async (search: string) => {
  const { data } = await instance()
    .get("/v1/contest", { params: { search } })
    .catch((e) => next(e));
  return data?.data?.docs;
};
