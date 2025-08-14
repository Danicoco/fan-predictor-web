import { Form } from "antd";
import { useMutation, useQueryClient } from "react-query";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import useAppStore from "../../utils/appStore";
import { joinContext } from "../../server/contest";

const JoinContestForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(joinContext, {
    onSuccess: () => {
      queryClient.invalidateQueries("contest");
      useAppStore.setState({ modal: { open: false, type: "" } })
    },
  });

  const onFinish = (values: { invitationCode: string }) => {
    mutation.mutateAsync(values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      {mutation.error instanceof Error && (
        <div className="my-3 text-center">
          <ServerError message={mutation.error.message} />
        </div>
      )}
      <Form.Item name="invitationCode" label={<p className="font-bold">Enter Invite Code</p>}>
        <Input color="outline" placeholder="Type here" />
      </Form.Item>

      <Button
        color="default"
        className="flex items-center justify-center"
        htmlType="submit"
        loading={mutation.isLoading}
      >
        {mutation.isLoading ? (
          <p className="animate-pulse">Submiting...</p>
        ) : (
          <p>Join Contest</p>
        )}
      </Button>
    </Form>
  );
};

export default JoinContestForm;
