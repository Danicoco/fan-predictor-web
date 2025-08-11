import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Button from "../../library/Button";
import { useQuery } from "react-query";
import { fetchContest } from "../../server/contest";
import { IContest } from "../../type";
import { currencyFormatter } from "../../utils/shared";
import Loading from "../../components/Loading";
import Input from "../../library/Input";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";

const Challenges = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<IContest[]>(["contest", search], () =>
    fetchContest(search)
  );

  const debouncedSearch = useCallback(
    debounce((val: string) => {
      setSearch(val);
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const onSearch = (val: string) => {
    debouncedSearch(val);
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <h3 className="text-[22px] leading-[28px] font-bold mb-10">Contests</h3>
        <div className="flex gap-3">
          <Button
            size="small"
            color="orange"
            onClick={() => navigate("/create-contest")}
            className="w-[120px]"
          >
            Create Contest
          </Button>
        </div>
      </div>

      <div className="my-7">
        <Input
          value={search}
          placeholder="Search by name or invitation code"
          className="h-[50px]"
          onChange={(val) => onSearch(val.target.value)}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-10">
            {data?.map((contest) => (
              <div className="rounded-3xl p-5 bg-white">
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl">{contest.title}</h2>
                    <p className="text-xs italic">
                      {contest.amount
                        ? `Join with ${currencyFormatter(
                            contest.amount,
                            "NGN"
                          )}`
                        : "Join for free"}
                    </p>
                  </div>

                  {contest.isCreator ? (
                    <Button
                      size="small"
                      color="danger"
                      className="sm:w-[90px] w-[65px]"
                    >
                      View
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      color="danger"
                      className="sm:w-[90px] w-[65px]"
                    >
                      Join
                    </Button>
                  )}
                </div>
                <p className="mt-4">
                  {contest.description ||
                    "No description provided for this contest."}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Challenges;
