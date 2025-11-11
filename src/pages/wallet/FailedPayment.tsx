import { XCircle } from "react-feather";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // You can retrieve order_id or reason from query params if NOWPayments redirects with them
  const orderId = searchParams.get("order_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full">
        <XCircle className="text-red-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          {orderId
            ? `We were unable to process your payment for order ${orderId}.`
            : "Your payment could not be completed. Please try again."}
        </p>

        <button
          onClick={() => navigate("/wallet")}
          className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
