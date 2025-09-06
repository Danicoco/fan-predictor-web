import { DatePicker, Form, Select } from "antd";
import Input from "../../library/Input";
import Button from "../../library/Button";
import { useState } from "react";
import dayjs from "dayjs";
// import { currencyFormatter } from "../../utils/shared";
import { useMutation, useQuery } from "react-query";
import { createContext } from "../../server/contest";
import { ICompetition } from "../../type";
import { fetchUserCompetition } from "../../server/matches";

type EventDetails = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: number;
  competition: string;
  winType: {
    first: string;
    second: string;
    third: string;
  };
};

const ContestForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EventDetails>({
    title: "",
    description: "",
    amount: 0,
    startDate: "",
    endDate: "",
    competition: "",
    winType: {
      first: "",
      second: "",
      third: "",
    },
  });

  const { data: competitions } = useQuery<ICompetition[]>(
    "competition",
    fetchUserCompetition
  );

  const mutation = useMutation(createContext, {
    onSuccess: () => {
      // navigate("/contest");
      window.location.href = "/contest"
    },
    onError: (error) => {
      // throw error
      console.log(error);
    },
  });

  const onFinish = () => {
    if (step === 2) {
      if (!formData.startDate && !formData.endDate) {
        return;
      }
    }
    if (step === 3) {
      const first = Number(formData.winType.first);
      const second = Number(formData.winType.second);
      const third = Number(formData.winType.third);

      if (first + second + third > 90) {
        return alert("Total percentage cannot be more than 90%");
      }
      if (first + second + third < 90) {
        return alert("Total percentage cannot be less than 90%");
      }
      mutation.mutate({
        ...formData,
        amount: Number(formData.amount),
        winType: {
          first: Number(formData.winType.first),
          second: Number(formData.winType.second),
          third: Number(formData.winType.third),
        },
      });
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {/* {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )} */}

      {step === 1 && (
        <div>
          <Form.Item
            name="title"
            label={<p className="text-black font-bold">Title</p>}
            rules={[{ required: true, message: "Enter contest title" }]}
          >
            <Input
              value={formData.title}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, title: val.target.value }))
              }
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<p className="text-black font-bold">Description</p>}
            rules={[{ required: true, message: "Enter contest description" }]}
          >
            <Input
            maxLength={150}
              value={formData.description}
              textarea
              color="outline"
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  description: val.target.value,
                }))
              }
            />
          </Form.Item>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="flex flex-col gap-3">
            <Form.Item
              name="competition"
              label={<p className="text-black font-bold">Competition</p>}
              rules={[{ required: false, message: "Enter contest start date" }]}
            >
              <Select
                placeholder="Select Competition"
                className="w-full"
                value={formData.competition}
                onSelect={(val) =>
                  setFormData((prev) => ({ ...prev, competition: val }))
                }
              >
                {competitions?.map((competition) => (
                  <Select.Option key={competition._id} value={competition._id}>
                    {competition.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="startDate"
              label={<p className="text-black font-bold">Start Date</p>}
              rules={[{ required: false, message: "Enter contest start date" }]}
            >
              <DatePicker
                value={
                  formData.startDate ? dayjs(formData.startDate) : undefined
                }
                className="w-full"
                onSelect={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: new Date(val as unknown as string).toISOString(),
                  }))
                }
              />
              <p>Once contest starts, no one else can join</p>
            </Form.Item>

            <Form.Item
              name="endDate"
              label={<p className="text-black font-bold">End Date</p>}
              rules={[{ required: false, message: "Enter contest end date" }]}
            >
              <DatePicker
                value={formData.endDate ? dayjs(formData.endDate) : null}
                className="w-full"
                onSelect={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    endDate: new Date(val as unknown as string).toISOString(),
                  }))
                }
              />
              <p>Result and sharing will take place on the day contest ends</p>
            </Form.Item>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {/* <Form.Item
            name="amount"
            label={<p className="text-black font-bold">Amount (Optional)</p>}
            rules={[{ required: false, message: "Enter amount." }]}
          >
            <Input
              type="number"
              value={formData.amount}
              color="outline"
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, amount: val.target.value }))
              }
            />
            {formData.amount > 0 ? (
              <p>
                Users will pay{" "}
                <span className="font-bold">
                  {currencyFormatter(formData.amount, "NGN")}
                </span>{" "}
                to join your contest
              </p>
            ) : (
              <p>Amount that members will pay to join your contest.</p>
            )}
          </Form.Item> */}

          <div>
            <p className="text-black font-bold">Sharing (Optional)</p>
            <p>
              If members will pay to join your contest, then enter the
              percentage that top three on leaderboard will get from the total
              money in the contest.
            </p>

            <div className="flex gap-3 mt-5">
              <Form.Item
                name="sharing.first"
                label={<p className="text-black">First Winner</p>}
                rules={[
                  { required: true, message: "Enter amount." },
                  // {max: 100, message: "Percentage cannot be more than 100."}
                ]}
              >
                <Input
                  value={formData.winType.first}
                  type="number"
                  color="outline"
                  maxLength={2}
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      winType: { ...prev.winType, first: val.target.value },
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="sharing.second"
                label={<p className="text-black">Second Winner</p>}
                rules={[{ required: false, message: "Enter amount." }]}
              >
                <Input
                  type="number"
                  value={formData.winType.second}
                  color="outline"
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      winType: { ...prev.winType, second: val.target.value },
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="sharing.third"
                label={<p className="text-black">Third Winner</p>}
                rules={[{ required: false, message: "Enter amount." }]}
              >
                <Input
                  type="number"
                  value={formData.winType.third}
                  color="outline"
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      winType: { ...prev.winType, third: val.target.value },
                    }))
                  }
                />
              </Form.Item>
            </div>
            <p className="italic">
              Note: 10% of the total money will go to creator of Predict Contest
            </p>
          </div>
        </>
      )}

      <div className="flex gap-5">
        {step !== 1 && (
          <Button
            block
            className="mt-8"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}

        <Button
          block
          className="mt-8"
          htmlType="submit"
          color="orange"
          loading={step === 3 && mutation.isLoading}
        >
          {step === 3 ? "Create Contest" : "Continue"}
        </Button>
      </div>
    </Form>
  );
};

export default ContestForm;
