import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
         
        </h2>
        <SignUp />
        <p className="text-gray-600 text-center mt-4">
          Thank you for choosing Gourmet Delight. We hope you enjoy a delightful dining experience with us. Bon appétit!
        </p>
      </div>
    </div>
  );
}
