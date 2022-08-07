import styled from "styled-components";

export default function UserInputContainer({
  title,
  placeholderRef,
  inputRef,
  errorRef,
  placeholder,
  ...rest
}) {
  return (
    <InputContainer>
      <InputHeading>{title}</InputHeading>
      <Placeholder ref={placeholderRef}>{placeholder}</Placeholder>
      <InputBox ref={inputRef} {...rest} />
      <InputErrorMessage ref={errorRef}></InputErrorMessage>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  position: relative;
`;

const InputHeading = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 700;
`;

const Placeholder = styled.span`
  position: absolute;
  bottom: 44px;
  left: 8px;
  color: #737373;
  font-size: 10px;
  pointer-events: none;
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
`;

const InputErrorMessage = styled.span`
  display: block;
  position: absolute;
  bottom: 12px;
  left: 4px;
  font-size: 10px;
  color: red;
`;
