import React from "react";
import lineChart from "../../assets/line-chart.png"; // adjust if needed

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="flex flex-col w-full md:w-[60vw] px-12 pb-12 pt-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-violet-600">Expense Tracker</h1>
        {children}
      </div>

      {/* Right side with image */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-200">
        <img src={lineChart} alt="Line chart" className="relative top-20 left-10 w-full h-[300px] object-cover rounded-xl" />
      </div>
    </div>
  );
};

export default AuthLayout;
