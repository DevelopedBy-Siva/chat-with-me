import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { IoMdClose, IoMdArrowDropdown } from "react-icons/io";
import { MdError } from "react-icons/md";

import { setActive } from "../../../store/actions/ChatActions";
import {
  getContactsTimestamp,
  orderContactsDesc,
} from "../../../utils/DateTime";
import Loader from "../../Loader";
import { getAvatar } from "../../../assets/avatars";

export default function SideBar() {
  const {
    contacts: unfilteredContacts,
    groups,
    loading,
    error,
  } = useSelector((state) => state.contacts);

  const [search, setSearch] = useState("");

  function handleSearchInput(e) {
    const val = e.target.value;
    setSearch(val);
  }
  const contacts = unfilteredContacts.filter((item) => !item.isBlocked);
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
                  name="contact"
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  title="Search"
                  onChange={handleSearchInput}
                />
                <SearchInputIcon search={search} setSearch={setSearch} />
              </SearchContainer>
            )}
            <ContactsWrapper
              search={search}
              contacts={contacts}
              groups={groups}
            />
          </React.Fragment>
        ) : (
          <FetchError>
            <MdError style={{ fontSize: "1.4rem", marginBottom: "6px" }} />
            Oops, something went wrong.
            <br />
            Failed to get the contacts.
          </FetchError>
        )}
      </ContactsContainer>
    </Container>
  );
}

function ContactsWrapper({ search, contacts, groups }) {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.chats);

  function handleContact(id) {
    dispatch(setActive(id));
  }

  function groupContacts(contacts = [], groups = []) {
    let grouped = {
      directMessage: [],
      group: [],
    };
    grouped.directMessage = orderContactsDesc(search, contacts);
    grouped.group = orderContactsDesc(search, groups);

    let refactoredKeys = [];
    Object.keys(grouped).forEach((k) => {
      if (grouped[k].length > 0) refactoredKeys.push(k);
    });
    return { keys: refactoredKeys, values: grouped };
  }

  const contactsToRender = groupContacts(contacts, groups);

  if (contacts && contacts.length === 0 && groups && groups.length === 0)
    return (
      <EmptyContacts>
        No contacts found. <AddContact to="/contacts">Add contact</AddContact>
      </EmptyContacts>
    );

  if (contactsToRender.keys.length === 0)
    return <EmptyContacts>No contacts/ groups found</EmptyContacts>;

  return (
    <React.Fragment>
      {contactsToRender.keys.map((val, index) => (
        <GroupedContacts
          key={`G${index}`}
          group={val}
          handleContact={handleContact}
          contactsToRender={contactsToRender}
          active={active}
        />
      ))}
    </React.Fragment>
  );
}

function GroupedContacts({ contactsToRender, handleContact, group, active }) {
  const [dropdown, setDropdown] = useState(true);

  const groupName = group === "group" ? "Groups" : "Direct Messages";

  return (
    <GroupContainer stretch={contactsToRender.keys.length === 1 ? 1 : 0}>
      {contactsToRender.keys && contactsToRender.keys.length > 1 && (
        <GroupDropBtn onClick={() => setDropdown(!dropdown)}>
          <IoMdArrowDropdown
            style={{
              fontSize: "1rem",
              transform: `${dropdown ? "rotate(180deg)" : ""}`,
            }}
          />
          <GroupName> {groupName}</GroupName>
        </GroupDropBtn>
      )}
      {dropdown ? (
        <GroupContacts>
          {contactsToRender.values[group].map((data, index) => {
            const {
              name,
              lastMsg,
              isOnline,
              avatarId,
              lastMsgTstmp,
              email,
              nickname,
              icon,
            } = data;
            return (
              <Contact
                className={active === email ? "active-contact" : ""}
                onClick={() => handleContact(email)}
                key={`V${index}`}
              >
                <AvatarContainer>
                  {isOnline === true && <ContactStatus />}
                  {icon ? (
                    <Icon bg={icon.background}>{icon.letter}</Icon>
                  ) : (
                    <Avatar src={getAvatar(avatarId)} />
                  )}
                </AvatarContainer>
                <Details>
                  <Wrapper>
                    <Name>
                      {nickname && nickname.length > 0 ? nickname : name}
                    </Name>
                    <LastMsgTmstp>
                      {getContactsTimestamp(lastMsgTstmp)}
                    </LastMsgTmstp>
                  </Wrapper>
                  <LastMessage>{lastMsg}</LastMessage>
                </Details>
              </Contact>
            );
          })}
        </GroupContacts>
      ) : (
        ""
      )}
    </GroupContainer>
  );
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
  display: flex;
  flex-direction: column;

  @media (max-width: 920px) {
    min-width: 0;
    width: auto;
    flex: 1;
    height: 100%;
  }
`;

const Heading = styled.h3`
  font-size: 1.4rem;
  text-align: left;
  color: ${(props) => props.theme.txt.main};
  font-weight: 500;
  height: 70px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.border.default};

  @media (max-width: 920px) {
    height: 52px;
    font-size: 1.1rem;
  }
`;

const SearchContainer = styled.label`
  margin: 1.5rem 1rem 1rem 1rem;
  padding: 6px 10px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme.bg.app};
  color: ${(props) => props.theme.txt.sub};
  cursor: text;

  @media (max-width: 920px) {
    margin: 1.2rem 0.8rem 0.8rem 0.8rem;
  }
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
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const GroupContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:first-of-type {
    max-height: ${(props) => (props.stretch ? "100%" : "50%")};
    flex-shrink: 0;
  }

  &:last-of-type {
    flex: 1;
  }
`;

const GroupName = styled.span`
  margin-left: 5px;
  font-weight: 400;
  text-transform: capitalize;
`;

const GroupDropBtn = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.txt.sub};
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin: 1.3rem 0.6rem 0.6rem 0.6rem;
  cursor: pointer;
`;

const GroupContacts = styled.ul`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const Contact = styled.li`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${(props) => props.theme.border.default};
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  cursor: pointer;
  position: relative;
  list-style: none;

  &.active-contact {
    background: ${(props) => props.theme.contact.active};
  }

  &:hover {
    background: ${(props) => props.theme.contact.active};
  }

  @media (max-width: 920px) {
    height: 64px;
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
  background: ${(props) => props.theme.btn.active};

  @media (max-width: 920px) {
    width: 38px;
    height: 38px;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
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

  @media (max-width: 920px) {
    font-size: 0.7rem;
  }
`;

const LastMessage = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;

  @media (max-width: 920px) {
    font-size: 0.65rem;
  }
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
  padding: 0.4rem;
  text-align: center;
  display: block;
  line-height: 20px;
`;

const AddContact = styled(Link)`
  color: ${(props) => props.theme.txt.sub};
  text-decoration: underline;
`;

const FetchError = styled.span`
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.7rem;
  padding: 0.4rem;
  text-align: center;
  display: block;
  line-height: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const Icon = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${(props) => props.bg};
  text-transform: capitalize;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: #fff;
`;
