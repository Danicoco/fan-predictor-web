import { Table } from "antd";
import Layout from "../../components/Layout";
import { leaderboardColumn } from "../../components/columns/leaderboard";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchLeaderboard, getSingleContest } from "../../server/contest";
import { IContest } from "../../type";

const Leaderboard = () => {
  const { competition, contest } = useParams();

  const { data: constestData } = useQuery<IContest>(["contest-single", contest], () =>
    getSingleContest(contest as string)
  );
  const { data, isLoading } = useQuery(
    ["leaderboard", competition, contest],
    () => fetchLeaderboard(competition as string, contest as string)
  );

  return (
    <Layout>
      <div className="flex justify-between">
        <h3 className="text-[22px] leading-[28px] font-bold mb-10">
          {constestData?.title} Leaderboard
        </h3>
      </div>

      <p className="mb-5">{constestData?.description}</p>

      <Table
        columns={leaderboardColumn(Number(constestData?.amount) > 0 ? false : true)}
        dataSource={data || []}
        loading={isLoading}
        pagination={false}
      />
    </Layout>
  );
};

export default Leaderboard;
