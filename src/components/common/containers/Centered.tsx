import { FunctionComponent } from "react";
import { styled } from "styled-components/native";
import { ViewProps } from "./types";

export const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CenteredContainer: FunctionComponent<ViewProps> = ({
  children,
  viewStyle,
}) => {
  return <Centered style={viewStyle}>{children}</Centered>;
};

export default CenteredContainer;
