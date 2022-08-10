import styled from "styled-components";

export default function InputContainer({
  title,
  placeholderRef,
  inputRef,
  errorRef,
  errorMessage,
  ...rest
}) {
  return (
    <Container>
      <InputHeading>{title}</InputHeading>
      <InputBox ref={inputRef} {...rest} />
      <InputErrorMessage ref={errorRef}>{errorMessage}</InputErrorMessage>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const InputHeading = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 700;
`;

const InputBox = styled.input`
  width: 100%;
  height: 35px;
  outline: none;
  border: 1px solid #737373;
  border-radius: 5px;
  margin-bottom: 32px;
  font-size: 12px;
  padding: 3px 6px;
  background: none;
  &:hover:disabled {
    cursor: not-allowed;
  }
  &::placeholder,
  &::-webkit-input-placeholder,
  &:-ms-input-placeholder {
    color: #737373;
    font-size: 10px;
  }
`;

const InputErrorMessage = styled.span`
  display: block;
  position: absolute;
  bottom: 12px;
  left: 4px;
  font-size: 10px;
  color: red;
`;
