"use client";

import toast from "react-hot-toast";

export default function ToastTestButton() {
  const testSuccess = () => {
    toast.success("This is a success toast message!");
  };

  const testError = () => {
    toast.error("This is an error toast message!");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex gap-2">
      <button
        onClick={testSuccess}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer shadow-lg"
      >
        Test Success Toast
      </button>
      <button
        onClick={testError}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer shadow-lg"
      >
        Test Error Toast
      </button>
    </div>
  );
}
