import { CheckCircle } from "react-feather";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyNowPayment } from "../../server/wallet";
import { useEffect, useRef } from "react";

const SuccessfulPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("NP_id");

  const { mutate } = useMutation(verifyNowPayment);
  const hasCalled = useRef(false);

  useEffect(() => {
    if (!paymentId) return;

    if (!hasCalled.current) {
      mutate({ paymentId });
      hasCalled.current = true;
    }
  }, [paymentId, mutate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          {"Your payment has been successfully processed."}
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
