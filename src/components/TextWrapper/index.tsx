import React from "react";
import fonts from "@fonts";
import RNText, { IRNTextProps } from "components/RNText/RNText";

interface ITextWrapperProps extends IRNTextProps {
  children?: React.ReactNode;
  color?: string;
  fontFamily?: string;
}

const TextWrapper: React.FC<ITextWrapperProps> = ({
  fontFamily = fonts.type.regular,
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
