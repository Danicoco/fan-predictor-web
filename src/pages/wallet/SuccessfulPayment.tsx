import { CheckCircle } from "react-feather";
import { useNavigate, useSearchParams } from "react-router-dom";

const SuccessfulPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          {orderId
            ? `Your payment for order ${orderId} has been confirmed.`
            : "Your payment has been successfully processed."}
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
