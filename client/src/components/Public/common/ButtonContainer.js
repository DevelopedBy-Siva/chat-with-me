import styled from "styled-components";

import LoadingSpinner from "../../Loader";

export default function ButtonContainer({ label, loading = false, ...rest }) {
  return (
    <Button isLoading={loading} {...rest}>
      {loading ? <LoadingSpinner /> : label}
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 40px;
  position: relative;
  border-radius: ${({ borderRadius }) => borderRadius};
  border: none;
  background: none;
  margin: 15px 0 15px 0;
  border-radius: 5px;
  cursor: ${({ disabled, isLoading }) =>
    isLoading ? "progress" : disabled ? "not-allowed" : "pointer"};
  background: ${(props) => props.theme.btn.inactive};
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
`;
