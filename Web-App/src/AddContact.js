import { useRef, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

function AddContact({ handleView, addContact }) {
  const emailRef = useRef(null);

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const valid = handleInput(email);
    if (!valid) return;

    addContact((contact) => [...contact, email.toLowerCase()]);
    handleView(false);
  };

  const handleInput = (value) => {
    setError(null);

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value && value.match(emailRegex)) {
      // TODO: API CALL
      return true;
    }
    setError("Invalid Email Id");
    return false;
  };

  return (
    <Container>
      <MdCloseCustom onClick={handleView} />
      <Title>Add contact</Title>
      <Form onSubmit={handleSubmit}>
        <EmailId ref={emailRef} spellCheck="false" />
        <ErrorResponse>{error}</ErrorResponse>
        <AddBtn onClick={handleSubmit}>Add</AddBtn>
      </Form>
    </Container>
  );
}

export default AddContact;

const Container = styled.div`
  width: 95%;
  max-width: 500px;
  height: 250px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 1rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  text-transform: capitalize;
`;

const Form = styled.form``;

const EmailId = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  outline: none;
  font-size: 20px;
  padding: 0.5rem;
  margin-top: 1.2rem;
`;

const AddBtn = styled.button`
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 1rem;
  width: 120px;
  height: 40px;
  border: 1px solid black;
  color: white;
  background-color: #009310;
  border-radius: 10px;
  cursor: pointer;
`;

const ErrorResponse = styled.span`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: red;
  width: 100%;
  height: 20px;
  pointer-events: none;
`;

const MdCloseCustom = styled(MdClose)`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  font-size: 1.2rem;
  cursor: pointer;
`;
