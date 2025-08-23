import { Calendar } from "react-feather";
import { ICompetition, IMatch } from "../../type";
import { Select } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { predict } from "../../server/matches";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

type Props = {
  competitions: ICompetition[];
  competition: number;
  setCompetition: Dispatch<SetStateAction<number>>;
  matches: IMatch[];
  isFetching: boolean;
  groupedMatches: {
    title: string;
    data: IMatch;
  }[];
};

function MatchList({
  competitions,
  competition,
  setCompetition,
  matches,
  groupedMatches,
  isFetching,
}: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation(predict, {
    onSuccess: () => {
      queryClient.invalidateQueries("match");
    },
  });
  return (
    <div className="container">
      <div className="flex border-[1px] border-[#f2f2f2] gap-2 p-[5px] overflow-x-auto w-full text-center">
        {competitions
          ?.sort((a, b) => b.name.localeCompare(a.name))
          ?.map((league, index) => (
            <div
              key={index}
              onClick={() => setCompetition(index)}
              style={{
                backgroundColor:
                  competition === index ? "#FFA500" : "rgba(0, 0, 0, 0.40)",
              }}
              className="text-white border-[0] rounded-[10px] cursor-pointer text-center px-5 py-3 w-[190px] shrink-0"
            >
              {league.name}
            </div>
          ))}
      </div>

      {/* Matches Section */}
      <div style={{ overflowY: "auto" }}>
        {matches?.length ? (
          groupedMatches.map((section: any, secIdx: number) => (
            <div key={secIdx}>
              {/* Section Header */}
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Calendar color="grey" />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {section.title}
                </span>
              </div>

              {/* Match Items */}
              {section.data.map((item: IMatch, index: number) => (
                <div
                  key={index}
                  className="resultCard"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 12,
                    border: "1px solid #eee",
                    margin: "10px 5px",
                    borderRadius: 8,
                  }}
                >
                  {/* Home Team */}
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={item.homeTeam.crest}
                      alt={item.homeTeam.shortName}
                      style={{ width: 50, height: 50 }}
                    />
                    <div
                      style={{ fontSize: 14, color: "#333" }}
                      className="mt-3"
                    >
                      <p className="font-bold">{item.homeTeam.shortName}</p>
                    </div>
                  </div>

                  {/* Prediction */}
                  <div className="flex flex-col justify-center items-center">
                    {item.prediction?.length ? (
                      <p className="sm:text-xs text-[0.55rem]">
                        Predicted on{" "}
                        {format(
                          new Date(item.prediction[0].updatedAt as string),
                          "dd MMM yyyy"
                        )}
                      </p>
                    ) : (
                      ""
                    )}
                    <Select
                      placeholder="Predict Outcome"
                      className="sm:w-[180px] w-[120px]"
                      defaultValue={item.prediction[0]?.outcome}
                      onSelect={(val) =>
                        mutation.mutate({
                          match: item._id,
                          competition: item.competition,
                          outcome: val,
                        })
                      }
                    >
                      <Select.Option value="homeWin">Home Win</Select.Option>
                      <Select.Option value="draw">Draw</Select.Option>
                      <Select.Option value="awayWin">Away Win</Select.Option>
                      <Select.Option value="gg">Both Team Score</Select.Option>
                      <Select.Option value="over1.5">Over 1.5</Select.Option>
                      <Select.Option value="over2.5">Over 2.5</Select.Option>
                      <Select.Option value="over3.5">Over 3.5</Select.Option>
                      <Select.Option value="over4.5">Over 4.5</Select.Option>
                    </Select>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={item.awayTeam.crest}
                      alt={item.awayTeam.shortName}
                      style={{ width: 50, height: 50 }}
                    />
                    <div
                      style={{ fontSize: 14, color: "#333" }}
                      className="mt-3"
                    >
                      <p className="font-bold text-center">
                        {item.awayTeam.shortName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: 25 }}>
            {isFetching ? "Retrieving matches" : "No Match Available"}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchList;
