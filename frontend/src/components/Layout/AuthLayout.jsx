import React from "react";
import lineChart from "../../assets/line-chart.png"; 
import pieChart from "../../assets/pie-chart.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="flex flex-col w-full md:w-[60vw] px-12 pb-12 pt-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-violet-600">Expense Tracker</h1>
        {children}
      </div>

      {/* //TODO: Make the sideimage UI better */}
      {/* Right side with image */}
      <div className="hidden md:block w-[40vw] h-screen bg-img">
        <img src={lineChart} alt="Line chart" className="relative top-20 left-20 w-full rounded-xl" />
        <img src={pieChart} alt="Line chart" className="relative top-30 w-full rounded-xl" />
      </div>
    </div>
  );
};

export default AuthLayout;
