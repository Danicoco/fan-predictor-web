import { useMutation } from "react-query";
import { Form, Select, Space } from "antd";
import countryCodes from "country-codes-list";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { swapItems } from "../../helper";
import { createAccount } from "../../server/user";
import { isObjectDuplicate, saveCustomerDetails } from "../../utils/shared";

import TermsCondition from "../../pages/onboarding/Terms";
import Input from "../../library/Input";
import Button from "../../library/Button";
import CheckBox from "../../library/Checkbox";

const { Option } = Select;

type Props = {
  agreed: boolean;
  setAgreed: Dispatch<SetStateAction<boolean>>;
};

const RegisterForm = ({ agreed, setAgreed }: Props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [allCountryCodes, setAllCountryCodes] = useState<any[]>([]);

  const mutation = useMutation(createAccount, {
    retry: false,
    onSuccess: (data) => {
      navigate("/verify-account");
      saveCustomerDetails(data.data);
    },
  });

  const onFinish = () => {
    const data = {
      email,
      phoneNumber,
      countryCode,
      password,
      username
    };

    mutation.mutateAsync(data);
  };

  useEffect(() => {
    const uniqueObjects = new Set();

    const all = swapItems(countryCodes.all(), 35, 202);
    const uniqueArray = all.filter((obj) => {
      if (!isObjectDuplicate(uniqueObjects, obj, "countryCallingCode")) {
        uniqueObjects.add(obj);
        return true;
      }
      return false;
    });

    setAllCountryCodes(uniqueArray);
  }, []);
  return (
    <Form layout="vertical" requiredMark={false}>
      {mutation.error instanceof Error && (
        <p className="text-red-600 text-sm text-center font-bold mb-1">
          {mutation.error.message}
        </p>
      )}
      <Form.Item
        name="email"
        label={<p className="navy-color">Email</p>}
        rules={[
          { type: "email", message: "Enter a valid email" },
          { required: true, message: "Enter email address" },
        ]}
      >
        <Input autoComplete="no" onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <p className="text-[10px] -mt-3 mb-3">
        Enter your email to receive one time verification and other
        notifications
      </p>

      <Form.Item
        name="username"
        label={<p className="navy-color">Username</p>}
        rules={[
          { required: true, message: "Enter username" },
        ]}
      >
        <Input autoComplete="no" onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label={<p className="navy-color">Mobile Number</p>}
      >
        <Space.Compact className="w-full">
          <Select
            defaultValue="+234"
            className="bg-transparent"
            style={{ width: "30%" }}
            onSelect={(e) => setCountryCode(e)}
          >
            {allCountryCodes.map((code) => (
              <Option
                value={`+${code.countryCallingCode}`}
                key={code.countryCallingCode}
              >
                <div className="flex gap-2">
                  <p className="mt-[1px]">{code.flag}</p>+
                  {code.countryCallingCode}
                </div>
              </Option>
            ))}
          </Select>
          <Input
            style={{ width: "70%" }}
            inputMode="numeric"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Space.Compact>
        <p className="text-[10px] mt-3">
          Enter your mobile number to receive one time verification and other
          notifications
        </p>
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="navy-color">Password</p>}
        rules={[
          { required: true, message: "Enter password" },
        ]}
      >
        <Input autoComplete="no" Password onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      <div className="flex gap-2 items-center mb-5 max-w-[400px] text-center">
        <CheckBox onSelect={(e) => setAgreed(e)} />
        <TermsCondition navigate={navigate} />
      </div>

      <Button
        loading={mutation.isLoading}
        color="orange"
        block
        disabled={!agreed}
        onClick={onFinish}
      >
        Continue
      </Button>
    </Form>
  );
};

export default RegisterForm;
