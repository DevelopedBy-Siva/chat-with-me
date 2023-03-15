import React, { useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { getAvatar } from "../../../assets/avatars";
import LoadingSpinner from "../../Loader";

export default function AddContacts() {
  const [data, setData] = useState({
    loading: false,
    error: null,
    contacts: null,
  });
  const [search, setSearch] = useState("");

  function handleSearchInput(e) {
    const val = e.target.value;
    setSearch(val);
  }

  function searchContact(e) {
    e.preventDefault();
    if (data.loading) return;
    const value = search.toLocaleLowerCase().trim();
    if (value.length === 0) return;
    setSearch("");
    setData({ ...data, contacts: [] });
  }

  return (
    <Container>
      <SearchContainer onSubmit={searchContact}>
        <SearchInput
          value={search}
          placeholder="Search contacts here"
          name="contact"
          type="text"
          spellCheck="false"
          autoComplete="off"
          title="Search"
          onChange={handleSearchInput}
          disabled={data.loading}
        />
        <SearchBtn type="submit" disabled={data.loading}>
          <BiSearch style={{ cursor: "pointer" }} />
        </SearchBtn>
      </SearchContainer>
      <Content>
        {data.loading ? (
          <LoadingSpinner />
        ) : data.error ? (
          <UserMsg>Something went wrong. Try after sometime.</UserMsg>
        ) : !data.contacts ? (
          ""
        ) : data.contacts.length === 0 ? (
          <UserMsg>Sorry, no contacts found</UserMsg>
        ) : (
          data.contacts.map((item, index) => {
            const { name, nickname, avatarId } = item;
            return (
              <ContactContainer key={index}>
                <ContactDetails>
                  <ContactAvatarContainer>
                    <ContactAvatar src={getAvatar(avatarId)} />
                  </ContactAvatarContainer>
                  <ContactNameContainer>
                    <ContactName>{name}</ContactName>
                    <ContactNickname>{nickname}</ContactNickname>
                  </ContactNameContainer>
                </ContactDetails>
                <OptionBtnContainer>
                  <OptionBtn>
                    <IoMdAdd title="Add contact" />
                  </OptionBtn>
                </OptionBtnContainer>
              </ContactContainer>
            );
          })
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SearchContainer = styled.form`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.theme.btn.active};
  color: ${(props) => props.theme.txt.sub};
  cursor: text;
  height: 40px;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  outline: none;
  border: none;
  display: block;
  font-size: 0.8rem;
  font-weight: 400;
  background: none;
  color: ${(props) => props.theme.txt.main};
  letter-spacing: 1px;
  padding: 0px 10px;
  height: 40px;

  &::placeholder {
    color: ${(props) => props.theme.txt.sub};
    opacity: 1;
    font-size: 0.7rem;
  }

  &:-ms-input-placeholder {
    color: ${(props) => props.theme.txt.sub};
  }

  &::-ms-input-placeholder {
    color: ${(props) => props.theme.txt.sub};
  }
`;

const SearchBtn = styled.button`
  flex-shrink: 0;
  display: block;
  background: none;
  border: none;
  outline: none;
  height: 100%;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.txt.sub};
  background-color: ${(props) => props.theme.btn.default};
  width: 40px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.txt.main};
  }
`;

const Content = styled.div`
  margin-top: 0.6rem;
  min-height: 60px;
  overflow-y: auto;
  position: relative;
`;

const ContactContainer = styled.div`
  padding: 1.2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
  display: flex;
  align-items: center;
  flex-direction: row;

  &:last-of-type {
    border: none;
  }
`;

const ContactDetails = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

  &:first-of-type {
    margin-right: 10px;
  }
`;

const ContactAvatarContainer = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;

  @media (max-width: 484px) {
    width: 30px;
    height: 30px;
  }
`;

const ContactAvatar = styled.img`
  object-fit: cover;
  user-select: none;
  flex-shrink: 0;
`;

const ContactNameContainer = styled.div`
  margin-left: 15px;
  overflow: hidden;

  @media (max-width: 484px) {
    margin-left: 10px;
  }
`;

const ContactName = styled.span`
  font-size: 0.8rem;
  display: block;
  text-transform: capitalize;
  margin-bottom: 4px;
  letter-spacing: 1px;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const ContactNickname = styled.span`
  display: block;
  font-size: 0.7rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.txt.sub};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ::before {
    content: "#";
  }

  @media (max-width: 484px) {
    font-size: 0.6rem;
  }
`;

const OptionBtnContainer = styled.div`
  flex-shrink: 0;
`;

const OptionBtn = styled.button`
  display: inline-block;
  font-size: 1.2rem;
  background: none;
  border: none;
  outline: none;
  color: ${(props) => props.theme.txt.sub};
  cursor: pointer;
  margin: 0 10px;

  :hover {
    color: ${(props) => props.theme.txt.main};
  }

  :disabled {
    cursor: progress;
  }
`;

const UserMsg = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  text-align: center;
  line-height: 16px;
  margin-top: 10px;
`;
