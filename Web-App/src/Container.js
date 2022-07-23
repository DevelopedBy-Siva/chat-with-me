import styled from "styled-components";

import UsersContainer from "./UsersContainer";
import ChatContainer from "./ChatContainer";
import Cover from "./Cover";
import AddContact from "./AddContact";
import { useState, useEffect } from "react";

function Container() {
  useEffect(() => {}, []);

  const [contacts, setContacts] = useState(["Duke", "Nukem", "Sanker"]);
  const [addContactView, setAddContactView] = useState(false);

  const handleAddContactView = () => {
    setAddContactView((view) => !view);
  };

  return (
    <>
      <Wrapper>
        <UsersContainer addContact={handleAddContactView} contacts={contacts} />
        <ChatContainer />
      </Wrapper>
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

export default Container;

const Wrapper = styled.div`
  width: 100%;
  max-height: 100vh;
  display: flex;
`;
