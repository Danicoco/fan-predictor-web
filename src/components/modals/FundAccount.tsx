import { Modal } from "antd";
import useAppStore from "../../utils/appStore";
import Input from "../../library/Input";
import { useState } from "react";
import Button from "../../library/Button";
import { useMutation } from "react-query";
import { initializeNowPayment } from "../../server/wallet";

const FundAccountModal = () => {
  // const customer = getCustomerDetails();
  const modalOpen = useAppStore((state) => state.modal);

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation(initializeNowPayment, {
    onSuccess: (data) => {
      console.log(data);
      window.open(data.invoice_url, '_blank');
    },
    onError: (e: Error) => {
      setError(e.message);
    },
  });

  const onFinish = () => {
    setError("");
    if (Number(amount) < 11) {
      setError("Minimum deposit is $20");
      return;
    }
    if (Number(amount) > 303477) {
      setError("Maximum deposit is $303,477");
      return;
    }
    mutation.mutate({ amount });
  };

  return (
    <Modal
      title="Fund Account"
      open={modalOpen.open && modalOpen.type === "fundAccount"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <p className="text-red-600 text-center italic">{error}</p>
      <p className="text-left font-bold">Enter amount</p>
      <p className="text-left">Minimum Deposit: $20</p>
      <p className="text-left">Maximum Deposit: $303,477</p>
      <div className="flex flex-col justify-center items-center mt-3">
        <Input
        prefix={<span>USD</span>}
          type="number"
          value={amount}
          onChange={(val) => setAmount(val.target.value)}
        />

        <Button className="mt-8" onClick={onFinish} loading={mutation.isLoading}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default FundAccountModal;
