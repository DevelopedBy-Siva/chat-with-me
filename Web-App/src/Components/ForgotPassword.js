import styled from "styled-components";
import Modal from "./ModalContainer";

export default function ForgotPassword() {
  return (
    <Modal>
      <Container>
        <Form>
          <SubmitBtn></SubmitBtn>
        </Form>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 95%;
  max-width: 600px;
  background: white;
  position: fixed;
`;

const Form = styled.form``;

const SubmitBtn = styled.button``;
