/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactNode } from "react";
import ChatHeader from "./ChatHeader";
import Button from "../library/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="pb-2">
      <div className="flex justify-between mx-28">
        <ChatHeader />
        {/* <div className="sm:w-[120px] sm:mr-5 pr-3 pt-5">
          <Button className="w-[120px]" onClick={() => navigate("/wallet")}>
            Wallet
          </Button>
        </div> */}
        <div className="sm:w-[120px] sm:pr-44 pt-5">
          <Button color="primary" className="w-[150px]" onClick={() => navigate("/contest")}>
            Contest
          </Button>
        </div>
      </div>

      <div className="sm:grid sm:place-items-center">
        <div className="sm:w-[522px] sm:mt-10 mt-4 mx-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
