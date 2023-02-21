import React from "react";
import styled from "styled-components";

import dummy_contacts from "../../../assets/dummy_contacts";

export default function SideBar() {
  return (
    <Container>
      <Heading>Messages</Heading>
      <ContactsContainer>
        {dummy_contacts.map((i) => (
          <Contact>
            <AvatarContainer>
              {i.status === true && <ContactStatus />}
              <Avatar src={i.avatar} alt="contact avatar" />
            </AvatarContainer>
            <Details>
              <Name>{i.contact}</Name>
              <LastMessage>{i.lastMsg}</LastMessage>
            </Details>
          </Contact>
        ))}
      </ContactsContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  overflow: hidden;
  background: ${(props) => props.theme.bg.container};
`;

const Heading = styled.h3`
  font-size: 1.4rem;
  text-align: left;
  color: ${(props) => props.theme.txt.main};
  font-weight: 500;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.border.default};
`;

const ContactsContainer = styled.div`
  height: calc(100% - 70px);
  overflow: auto;
`;

const Contact = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${(props) => props.theme.border.default};
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.contact.active};
  }
`;

const ContactStatus = styled.span`
  width: 8px;
  height: 8px;
  background-color: #00bb27;
  position: absolute;
  top: 70%;
  border-radius: 50%;
  right: 0;
  border: 1px solid #fff;
`;

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
`;

const Details = styled.div`
  margin-left: 8px;
  overflow: hidden;
`;

const Name = styled.span`
  display: block;
  font-weight: 400;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LastMessage = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
`;
