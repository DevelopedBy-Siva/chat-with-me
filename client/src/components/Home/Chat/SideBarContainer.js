import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { setActive } from "../../../store/actions/ChatActions";
import {
  getContactsTimestamp,
  orderContactsDesc,
} from "../../../utils/DateTime";
import Loader from "../../Loader";
import { getAvatar } from "../../../assets/avatars";

export default function SideBar() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contacts);
  const { active } = useSelector((state) => state.chats);

  function handleContact(id) {
    dispatch(setActive(id));
  }

  return (
    <Container>
      <Heading>Messages</Heading>
      <ContactsContainer>
        {loading ? (
          <Loader style={{ top: "60px", opacity: "0.6" }} />
        ) : !error ? (
          orderContactsDesc(contacts).map((data, index) => {
            const { name, lastMsg, isOnline, avatarId, lastMsgTstmp, id } =
              data;
            return (
              <Contact
                className={active === id ? "active-contact" : ""}
                onClick={() => handleContact(id)}
                key={index}
              >
                <AvatarContainer>
                  {isOnline === true && <ContactStatus />}
                  <Avatar src={getAvatar(avatarId)} />
                </AvatarContainer>
                <Details>
                  <Wrapper>
                    <Name>{name}</Name>
                    <LastMsgTmstp>
                      {getContactsTimestamp(lastMsgTstmp)}
                    </LastMsgTmstp>
                  </Wrapper>
                  <LastMessage>{lastMsg}</LastMessage>
                </Details>
              </Contact>
            );
          })
        ) : (
          ""
        )}
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
  position: relative;
`;

const Contact = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${(props) => props.theme.border.default};
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  cursor: pointer;
  position: relative;

  &.active-contact {
    background: ${(props) => props.theme.contact.active};
  }

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
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.span`
  display: block;
  font-weight: 400;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
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

const LastMsgTmstp = styled.span`
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.6rem;
  flex-shrink: 0;
  margin-left: 12px;
  display: block;
`;
