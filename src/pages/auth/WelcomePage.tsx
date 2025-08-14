import Button from "../../library/Button";
import Players from "../../assets/player.png";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="grid place-content-center">
      <div className="w-[700px] mt-5">
        <div className="py-5 px-10 w-full bg-blue-300 rounded-lg">
          <div className="flex justify-between">
          <img src={Logo} className="h-[80px] w-[80px] rounded-xl" />

            <div className="flex gap-10 mt-5">
              <p className="text-white text-lg cursor-pointer" onClick={() => navigate("/")}>Home</p>
              <p className="text-[#f7f7f7] text-lg cursor-pointer" onClick={() => navigate("/about-us")}>About</p>
            </div>

            <Button onClick={() => navigate("/login")} color="danger" className="w-[120px]">
              Login
            </Button>
          </div>
        </div>

        <div className="flex justify-between mt-5 gap-10">
            <div className="w-[60%]">
          <img src={Players} className="h-[400px] w-full rounded-xl" />
          </div>

          <div className="mt-10 w-[40%]">
            <div className="flex flex-col gap-20 justify-between">
                <div>
            <h3 className="font-bold text-3xl">Predict Football Matches</h3>
            <p className="mt-5">
              Make your predictions and compete with others!
            </p>
                </div>
            <div className="">
              <Button className="w-full" onClick={() => navigate("/create-account")}>Get Started</Button>
              <p
                className="text-center text-blue-700 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login to predict
              </p>
            </div>
            </div>

          </div>
        </div>

        <div className="my-10 gap-10 flex justify-between">
          <div className="w-[60%]">
            <div className="bg-white p-5 rounded-lg">
              <h3 className="font-bold text-lg">Host or Join Contest</h3>
              <p>
                Invite friends and compete for a shared prize pool. Showcase
                your football knowledge with your peers!
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg mt-7">
              
              <h3 className="font-bold text-lg">Leaderboard</h3>
              <p>
                Track your performance on the leaderboard and see how you fair
                against other elites
              </p>
            </div>
          </div>

          <div className="w-[40%] bg-white">
            <h3 className="text-white p-3 bg-blue-950 rounded-t-xl font-bold">Leaderboard</h3>
            <div className="p-3">
              <div className="flex justify-between">
                <p>1. Robert</p>
                <p>100</p>
              </div>

              <div className="flex justify-between mt-5">
                <p>2. Miool</p>
                <p>98</p>
              </div>

              <div className="flex justify-between mt-5">
                <p>3. David</p>
                <p>80</p>
              </div>

              <div className="flex justify-between mt-5">
                <p>4. Saria</p>
                <p>78</p>
              </div>

              <div className="flex justify-between mt-5">
                <p>5. John</p>
                <p>48</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
