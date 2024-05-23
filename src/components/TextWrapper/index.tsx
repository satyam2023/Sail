import React from "react";
import RNText, { IRNTextProps } from "components/RNText/RNText";

interface ITextWrapperProps extends IRNTextProps {
  children?: React.ReactNode;
  color?: string;
  fontFamily?: string;
}

const TextWrapper: React.FC<ITextWrapperProps> = ({
  fontFamily,
  color,
  children,
  ...rest
}) => {
  return (
    <RNText fontFamily={fontFamily} color={color} {...rest} >
      {children}
    </RNText>
  );
};

export default TextWrapper;
