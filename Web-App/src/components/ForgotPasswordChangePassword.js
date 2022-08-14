import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";
import InputContainer from "./InputContainer";

export default function ForgotPasswordChangePassword() {
  return (
    <Container>
      <Title>Create new password</Title>
      <Form>
        <InputContainer
          title="New password"
          placeholder="Enter the new password"
          name="new-password"
          type="password"
        />
        <InputContainer
          title="Confirm password"
          placeholder="Confirm the new password"
          name="confirm-password"
          type="password"
        />
        <ButtonContainer
          type="submit"
          label="Submit"
          marginTop="5px"
          marginBottom="10px"
        />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const Form = styled.form``;
