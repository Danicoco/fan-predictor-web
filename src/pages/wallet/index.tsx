import { Table } from "antd";
import Layout from "../../components/Layout";
import Button from "../../library/Button";
import { walletColumn } from "../../components/columns/wallet-column";
import { currencyFormatter } from "../../utils/shared";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getTransactions,
  getWallet,
  verifyTransaction,
} from "../../server/wallet";
import Loading from "../../components/Loading";
import useAppStore from "../../utils/appStore";
import FundAccountModal from "../../components/modals/FundAccount";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Wallet = () => {
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const reference = params.get("reference");
  const { data, isLoading } = useQuery("wallet", getWallet);
  const { data: transData, isFetching } = useQuery(
    "transactions",
    getTransactions
  );

  const mutation = useMutation(verifyTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("wallet");
      window.location.href = "/wallet";
    },
  });

  useEffect(() => {
    if (reference) {
      mutation.mutate({ reference });
    }
  }, [reference]);

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="border-[1px] rounded-2xl bg-blue-800 p-5">
            <p className="text-white text-lg">Wallet</p>
            <p className="text-center text-white text-3xl p-7">
              {currencyFormatter(data?.balance || 0, data?.currency || "NGN")}
            </p>
          </div>

          <div className="flex gap-10 mt-10 px-5">
            <Button
              onClick={() =>
                useAppStore.setState({
                  modal: { open: true, type: "fundAccount" },
                })
              }
            >
              Fund Account
            </Button>
            <Button color="danger">Withdraw</Button>
          </div>

          <Table
            className="mt-10"
            loading={isFetching}
            columns={walletColumn}
            dataSource={transData?.docs || []}
          />
        </div>
      )}

      <FundAccountModal />
    </Layout>
  );
};

export default Wallet;
