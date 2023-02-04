import styled from "styled-components";

export default function InputContainer({
  title,
  placeholderRef,
  inputRef,
  errorRef,
  errorMessage,
  icon,
  ...rest
}) {
  return (
    <Container>
      <InputBox required="required" ref={inputRef} {...rest} />
      <InputHeading>{title}</InputHeading>
      <Icon>{icon}</Icon>
      <InputErrorMessage ref={errorRef}>{errorMessage}</InputErrorMessage>
    </Container>
  );
}

const Container = styled.label`
  display: block;
  position: relative;
  padding-top: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
`;

const InputHeading = styled.label`
  font-size: 0.8rem;
  margin-bottom: 4px;
  position: absolute;
  bottom: 3px;
  pointer-events: none;
  transition: transform 0.3s ease-in-out;
  color: ${(props) => props.theme.txt.sub};
`;

const InputBox = styled.input`
  width: calc(100% - 24px);
  display: block;
  background: none;
  outline: none;
  border: none;
  padding: 6px 0;
  color: ${(props) => props.theme.txt.input};
  font-size: 0.8rem;

  &:disabled
    ~ ${InputHeading},
    &:valid
    ~ ${InputHeading},
    &:focus
    ~ ${InputHeading} {
    transform: translateY(-26px);
  }

  &.input-error {
    color: ${(props) => props.theme.txt.error};
  }
`;

const Icon = styled.span`
  position: absolute;
  right: 0;
  bottom: 3px;
  pointer-events: none;
  font-size: 1rem;
  color: ${(props) => props.theme.txt.sub};
`;

const InputErrorMessage = styled.span`
  display: block;
  position: absolute;
  bottom: -20px;
  font-size: 0.7rem;
  color: red;
  pointer-events: none;
`;