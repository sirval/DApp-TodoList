import React, { useEffect, useState } from "react";

const Greeting = () => {
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const day = new Date();
    const hour = day.getUTCHours() - new Date().getTimezoneOffset() / 60;
    if (hour >= 5 && hour < 12) {
      setTimeOfDay("Morning");
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay("Afternoon");
    } else {
      setTimeOfDay("Evening");
    }
  }, []);

  return (
    <div>
      <h2 className="text-4xl bolder text-white pb-8">
        Hey, Good {timeOfDay}!
      </h2>
    </div>
  );
};
export default Greeting;
