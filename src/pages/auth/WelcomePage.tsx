import Button from "../../library/Button";
import Players from "../../assets/player.png";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/OnboardingLayout";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <OnboardingLayout hide className="sm:flex sm:justify-center sm:items-center w-screen">
      <div className="sm:w-[700px]">
      <div className="py-5 px-10 w-full bg-[#c2937e] rounded-lg">
        <div className="flex justify-between">
          <img src={Logo} className="h-[80px] w-[80px] rounded-xl" />

          <div className="mt-4">
            <Button
              onClick={() => navigate("/login")}
              color="danger"
              className="w-[120px]"
            >
              Login
            </Button>
          </div>
        </div>
      </div>

      <div className="flex sm:justify-between mt-5 gap-10">
        <div className="sm:w-[60%] sm:block hidden">
          <img src={Players} className="h-[400px] w-full rounded-xl" />
        </div>

        <div className="sm:mt-10 mt-5 sm:w-[40%] w-full">
          <div className="flex flex-col sm:gap-20 gap-7 justify-between">
            <div>
              <h3 className="text-3xl font-black text-black">Predict Football Matches</h3>
              <p className="mt-5">
                Make your predictions and compete with others!
              </p>
            </div>
            <div className="">
              <Button
                className="sm:w-full"
                onClick={() => navigate("/create-account")}
              >
                Get Started
              </Button>
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

      <div className="my-10 gap-10 flex flex-col sm:flex-row sm:justify-between">
          <div className="sm:w-[60%] sm:mb-10">
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

          <div className="sm:w-[40%] mb-10 bg-white">
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
    </OnboardingLayout>
  );
};

export default WelcomePage;
