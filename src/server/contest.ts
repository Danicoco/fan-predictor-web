import { IContest } from "../type";
import { instance, next } from "./base";

export const createContext = async (values: Partial<IContest>) => {
  const { data } = await instance()
    .post("/v1/contest", values)
    .catch((e) => next(e));
  return data?.data;
};

export const joinContext = async (values: { invitationCode: string }) => {
  const { data } = await instance()
    .post("/v1/contest/join", values)
    .catch((e) => next(e));
    
  return data?.data;
};

export const fetchContest = async (search: string) => {
  const { data } = await instance()
    .get("/v1/contest", { params: { search } })
    .catch((e) => next(e));
  return data?.data?.docs;
};

export const getSingleContest = async (id: string) => {
  const { data } = await instance()
    .get(`/v1/contest/single/${id}`)
    .catch((e) => next(e));
  return data?.data;
};


export const fetchLeaderboard = async (competition: string, contest: string) => {
  const { data } = await instance()
    .get("/v1/predictions", { params: { competition, contest } })
    .catch((e) => next(e));
  return data?.data;
};
