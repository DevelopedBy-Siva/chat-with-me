import styled from "styled-components";
import { useState, useEffect } from "react";

import UsersContainer from "./UsersContainer";
import ChatContainer from "./ChatContainer";
import Cover from "./Cover";
import AddContact from "./AddContact";

function Wrapper() {
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

export default Wrapper;

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  display: flex;
`;
