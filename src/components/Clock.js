import React, { useState, useEffect } from "react";

function Clock({ timezoneOffset }) {
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {

      // Calculate the local time using the timezone offset
      const currentTime = new Date();
      const utcTime =
        currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
      const localTime = new Date(utcTime + 1000 * timezoneOffset);
      setLocalTime(localTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezoneOffset]); 

  return (
    <div>
      <h4 style={{ color: "white", marginTop: '-40px' }}>{localTime.toLocaleTimeString()}</h4>
    </div>
  );
}

export default Clock;
