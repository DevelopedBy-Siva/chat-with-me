import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import { setActive } from "../../../store/actions/ChatActions";
import {
  getContactsTimestamp,
  orderContactsDesc,
} from "../../../utils/DateTime";
import Loader from "../../Loader";
import { getAvatar } from "../../../assets/avatars";

export default function SideBar() {
  const { contacts, loading, error } = useSelector((state) => state.contacts);

  const [search, setSearch] = useState("");

  function handleSearchInput(e) {
    const val = e.target.value;
    setSearch(val);
  }

  return (
    <Container>
      <Heading>Message</Heading>
      <ContactsContainer>
        {loading ? (
          <Loader style={{ top: "60px", opacity: "0.6" }} />
        ) : !error ? (
          <React.Fragment>
            {contacts && contacts.length > 1 && (
              <SearchContainer>
                <SearchInput
                  value={search}
                  placeholder="Search"
                  name="email"
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  title="Search"
                  onChange={handleSearchInput}
                />
                <SearchInputIcon search={search} setSearch={setSearch} />
              </SearchContainer>
            )}
            <ContactsWrapper search={search} contacts={contacts} />
          </React.Fragment>
        ) : (
          ""
        )}
      </ContactsContainer>
    </Container>
  );
}

function ContactsWrapper({ search, contacts }) {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.chats);

  function handleContact(id) {
    dispatch(setActive(id));
  }

  const orderedContacts = orderContactsDesc(search, contacts);

  if (contacts && contacts.length === 0)
    return (
      <EmptyContacts>
        No contacts found. <AddContact to="/contacts">Add contact</AddContact>
      </EmptyContacts>
    );

  if (orderedContacts.length === 0)
    return <EmptyContacts>No contacts found</EmptyContacts>;

  return orderedContacts.map((data, index) => {
    const { name, lastMsg, isOnline, avatarId, lastMsgTstmp, id, nickname } =
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
            <Name>{nickname && nickname.length > 0 ? nickname : name}</Name>
            <LastMsgTmstp>{getContactsTimestamp(lastMsgTstmp)}</LastMsgTmstp>
          </Wrapper>
          <LastMessage>{lastMsg}</LastMessage>
        </Details>
      </Contact>
    );
  });
}

function SearchInputIcon({ search, setSearch }) {
  return search.length > 0 ? (
    <IoMdClose style={{ cursor: "pointer" }} onClick={() => setSearch("")} />
  ) : (
    <BiSearch />
  );
}

const Container = styled.div`
  width: 300px;
  overflow: hidden;
  background: ${(props) => props.theme.bg.container};
  z-index: 99;
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

const SearchContainer = styled.label`
  height: auto;
  margin: 1.5rem 1rem 1rem 1rem;
  padding: 6px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme.bg.app};
  color: ${(props) => props.theme.txt.sub};
  cursor: text;
`;

const SearchInput = styled.input`
  flex: 1;
  outline: none;
  border: none;
  font-size: 0.7rem;
  font-weight: 400;
  height: 20px;
  background: none;
  color: ${(props) => props.theme.txt.main};
  letter-spacing: 1px;

  &::placeholder {
    color: ${(props) => props.theme.txt.sub};
    opacity: 1;
  }

  &:-ms-input-placeholder {
    color: ${(props) => props.theme.txt.sub};
  }

  &::-ms-input-placeholder {
    color: ${(props) => props.theme.txt.sub};
  }
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
  width: 10px;
  height: 10px;
  background-image: linear-gradient(#40bf32, #10a300);
  background-clip: padding-box;
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
  pointer-events: none;
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

const EmptyContacts = styled.span`
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.7rem;
  margin-top: 10px;
  padding: 0.4rem;
  text-align: center;
  display: block;
  line-height: 20px;
`;

const AddContact = styled(Link)`
  color: ${(props) => props.theme.txt.sub};
  text-decoration: underline;
`;
