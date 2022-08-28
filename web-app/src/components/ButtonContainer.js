import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

export default function ButtonContainer({
  label,
  loading = false,
  width = "100%",
  height = "35px",
  marginBottom = "15px",
  marginTop = "none",
  borderRadius = "5px",
  ...rest
}) {
  return (
    <Button
      isLoading={loading}
      width={width}
      height={height}
      borderRadius={borderRadius}
      marginBottom={marginBottom}
      marginTop={marginTop}
      {...rest}
    >
      {loading ? <LoadingSpinner /> : label}
    </Button>
  );
}

const Button = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: none;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-top: ${({ marginTop }) => marginTop};
  font-weight: 700;
  color: white;
  cursor: ${({ disabled, isLoading }) =>
    isLoading ? "progress" : disabled ? "not-allowed" : "pointer"};
  background: ${({ disabled }) =>
    disabled ? "#c9c9c9" : "linear-gradient(to right, #8e2de2, #4a00e0)"};
  outline-color: #05a4fa;
`;
