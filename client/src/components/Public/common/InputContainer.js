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
    <Wrapper>
      <Container>
        <InputBox required="required" ref={inputRef} {...rest} />
        <InputHeading>{title}</InputHeading>
        <Icon>{icon}</Icon>
      </Container>
      <InputErrorMessage ref={errorRef} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  position: relative;
  min-height: 80px;

  :last-of-type {
    margin-bottom: 15px;
  }
`;

const Container = styled.label`
  display: block;
  position: relative;
  padding-top: 24px;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
`;

const InputHeading = styled.span`
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;
  position: absolute;
  bottom: 4px;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  font-weight: 400;
`;

const InputBox = styled.input`
  width: calc(100% - 24px);
  display: block;
  background: none;
  outline: none;
  border: none;
  padding: 6px 0;
  color: ${(props) => props.theme.txt.main};
  font-size: 0.8rem;
  letter-spacing: 1px;
  font-weight: 400;

  &:disabled
    ~ ${InputHeading},
    &:valid
    ~ ${InputHeading},
    &:focus
    ~ ${InputHeading} {
    transform: translateY(-26px);
  }
`;

const Icon = styled.span`
  position: absolute;
  right: 0;
  width: 24px;
  height: 18px;
  text-align: right;
  bottom: 3px;
  font-size: 1rem;
  color: ${(props) => props.theme.txt.sub};
  cursor: text;
`;

const InputErrorMessage = styled.span`
  display: none;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  margin-top: 5px;
  line-height: 16px;

  &.input-error {
    display: block;
  }
`;
