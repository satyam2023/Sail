import fonts from "@fonts";
import { Colors } from "commonStyles/RNColor.style";
import { TextWrapper } from "components";
import React, { useState, useEffect } from "react";

interface ICountDown{
  handleTimer:()=>void;
}

const CountdownTimer = ({handleTimer}:ICountDown) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        if(timeLeft==1){
          handleTimer();
        }
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  return (
    <TextWrapper
      style={{
        marginTop: 10,
        color: Colors.sailBlue,
        fontFamily: fonts.Poppins.regular,
        fontSize:14,
      }}
    >{` ${timeLeft}s`}</TextWrapper>
  );
};

export default CountdownTimer;
