import styled from "styled-components";
import { useState, useEffect } from "react";

import UsersContainer from "../components/UsersContainer";
import ChatContainer from "../components/ChatContainer";
import Cover from "../components/Cover";
import AddContact from "../components/AddContact";

import { FiSearch } from "react-icons/fi";
import Header from "../components/Home/Header";

export default function UserHome() {
  useEffect(() => {}, []);

  const [contacts, setContacts] = useState(["Duke", "Nukem", "Sanker"]);
  const [addContactView, setAddContactView] = useState(false);

  const handleAddContactView = () => {
    setAddContactView((view) => !view);
  };

  return (
    <>
      <Container>
        <LeftContainer></LeftContainer>

        <MiddleContainer></MiddleContainer>

        <RightContainer></RightContainer>

        {/* 
        <UsersContainer addContact={handleAddContactView} contacts={contacts} />
        <ChatContainer /> */}
      </Container>
      {/* {addContactView && (
        <Cover handleVisiblity={setAddContactView}>
          <AddContact
            addContact={setContacts}
            handleView={handleAddContactView}
          />
        </Cover>
      )} */}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const LeftContainer = styled.div`
  width: 50px;
  height: 100%;
  background: red;
`;

const MiddleContainer = styled.div`
  flex: 0.3;
  height: 100%;
  background-color: yellow;
`;

const RightContainer = styled.div`
  flex: 1;
  background-color: green;
`;
