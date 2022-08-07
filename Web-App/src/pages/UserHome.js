import styled from "styled-components";
import { useState, useEffect } from "react";

import UsersContainer from "../components/UsersContainer";
import ChatContainer from "../components/ChatContainer";
import Cover from "../components/Cover";
import AddContact from "../components/AddContact";

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
        <UsersContainer addContact={handleAddContactView} contacts={contacts} />
        <ChatContainer />
      </Container>
      {addContactView && (
        <Cover handleVisiblity={setAddContactView}>
          <AddContact
            addContact={setContacts}
            handleView={handleAddContactView}
          />
        </Cover>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  display: flex;
`;
