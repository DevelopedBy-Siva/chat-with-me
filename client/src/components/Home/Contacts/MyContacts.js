import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MdPersonOff, MdBlock } from "react-icons/md";

import { getAvatar } from "../../../assets/avatars";
import { sortContactsByAsc } from "../../../utils/InputHandler";
import axios from "../../../api/axios";
import toast from "../../Toast";
import retrieveError from "../../../api/ExceptionHandler";
import LoadingSpinner from "../../Loader";
import {
  blockUserContact,
  deleteUserContact,
} from "../../../store/actions/ContactActions";
import { setActive, setBlockedBy } from "../../../store/actions/ChatActions";

export default function MyContacts({ inProgress, setInProgress }) {
  const { contacts = [], isOnline } = useSelector((state) => state.contacts);

  const dispatch = useDispatch();

  const [whichOne, setWhichOne] = useState({
    email: null,
    msg: null,
    type: null,
  });

  function filterContacts() {
    if (!contacts || contacts.length === 0) return [];
    const data = contacts.filter((val) => !val.isBlocked);
    return sortContactsByAsc(data);
  }

  const deleteContact = (email, msg) => {
    if (inProgress) return;
    setWhichOne({ email, msg, type: "delete" });
  };
  const blockContact = (email, msg) => {
    if (inProgress) return;
    setWhichOne({ email, msg, type: "block" });
  };

  const removeConfirmMessage = () => {
    if (inProgress) return;
    setWhichOne({ email: null, msg: null, type: null });
  };
  async function callServer(type, email, chatId) {
    if (inProgress) return;
    setInProgress(true);

    switch (type) {
      case "delete":
        await axios
          .delete(`/user/contact?email=${email}`)
          .then(() => {
            dispatch(setActive(null, true));
            dispatch(deleteUserContact(email));
            removeConfirmMessage();
            setInProgress(false);
            toast.success("Contact removed successfully");
          })
          .catch((error) => {
            const { message } = retrieveError(error);
            setInProgress(false);
            toast.error(message, toast.props.user.nonPersist);
          });
        break;
      case "block":
        await axios
          .put(`/user/block?email=${email}`)
          .then(({ data }) => {
            dispatch(setActive(null, true));
            dispatch(blockUserContact(email));
            dispatch(setBlockedBy(chatId, data.blockedBy));
            removeConfirmMessage();
            setInProgress(false);
            toast.success("Contact blocked successfully");
          })
          .catch((error) => {
            const { message } = retrieveError(error);
            setInProgress(false);
            toast.error(message, toast.props.user.nonPersist);
          });
        break;
      default:
        break;
    }
  }

  function isContactOnline(id) {
    const index = isOnline.findIndex((i) => i === id);
    return index === -1 ? false : true;
  }

  if (filterContacts().length === 0)
    return <NoContactsMsg>No contacts found</NoContactsMsg>;

  return filterContacts().map((item, index) => {
    const { _id, name, nickname, avatarId, email, chatId } = item;
    return (
      <ContactContainer key={index}>
        {whichOne.email === email ? (
          <React.Fragment>
            <ConfirmMsg>{whichOne.msg}</ConfirmMsg>
            <ConfirmExecuteBtn
              disabled={inProgress}
              onClick={() => callServer(whichOne.type, email, chatId)}
            >
              {inProgress ? (
                <LoadingSpinner
                  style={{ width: "10px", height: "10px", opacity: 0.7 }}
                />
              ) : (
                "Yes"
              )}
            </ConfirmExecuteBtn>
            <ConfirmExecuteBtn
              disabled={inProgress}
              onClick={removeConfirmMessage}
            >
              No
            </ConfirmExecuteBtn>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ContactDetails>
              <ContactAvatarContainer>
                <ContactAvatar src={getAvatar(avatarId)} />
                {isContactOnline(_id) && <ContactStatus />}
              </ContactAvatarContainer>
              <ContactNameContainer>
                <ContactName>{name}</ContactName>
                <ContactNickname>{nickname}</ContactNickname>
              </ContactNameContainer>
            </ContactDetails>
            <OptionBtnContainer>
              <ContactOptions
                type="block"
                email={email}
                execute={blockContact}
                inProgress={inProgress}
              />
              <ContactOptions
                type="delete"
                email={email}
                execute={deleteContact}
                inProgress={inProgress}
              />
            </OptionBtnContainer>
          </React.Fragment>
        )}
      </ContactContainer>
    );
  });
}

const options = {
  delete: {
    placeholder: "Remove contact",
    confirmMsg: "Are you sure you want to remove the contact?",
  },
  block: {
    placeholder: "Block contact",
    confirmMsg: "Are you sure want to block the contact?",
  },
};

function ContactOptions({ type, execute, email, inProgress }) {
  const what = type === "delete" ? options.delete : options.block;
  const handleClick = () => execute(email, what.confirmMsg);

  return (
    <OptionBtn disabled={inProgress}>
      {type === "delete" ? (
        <MdPersonOff onClick={handleClick} title={what.placeholder} />
      ) : (
        <MdBlock onClick={handleClick} title={what.placeholder} />
      )}
    </OptionBtn>
  );
}

const ContactContainer = styled.div`
  padding: 1.2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 70px;

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
  background-color: ${(props) => props.theme.btn.active};
  flex-shrink: 0;

  @media (max-width: 484px) {
    width: 30px;
    height: 30px;
  }
`;

const ContactAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  flex-shrink: 0;
  border-radius: 50%;
`;

const ContactStatus = styled.span`
  width: 9px;
  height: 9px;
  background-image: linear-gradient(#40bf32, #10a300);
  background-clip: padding-box;
  position: absolute;
  top: 70%;
  border-radius: 50%;
  right: 0;
  border: 1px solid #fff;
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

  :enabled:hover {
    color: ${(props) => props.theme.txt.main};
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const NoContactsMsg = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  text-align: center;
  line-height: 16px;
  margin-top: 10px;
`;

const ConfirmMsg = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.txt.sub};
  display: block;
  line-height: 15px;
  padding-left: 4px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const ConfirmExecuteBtn = styled.button`
  background: ${(props) => props.theme.btn.active};
  color: ${(props) => props.theme.txt.sub};
  padding: 3px;
  height: 22px;
  width: 45px;
  border: 1px solid ${(props) => props.theme.border.default};
  margin-left: 6px;
  border-radius: 3px;
  font-size: 0.7rem;
  cursor: pointer;
  position: relative;
  font-weight: 400;

  :enabled:hover {
    color: ${(props) => props.theme.txt.main};
  }

  :disabled:first-of-type {
    cursor: progress;
  }

  :disabled:last-of-type {
    cursor: not-allowed;
  }

  @media (max-width: 484px) {
    font-size: 0.65rem;
  }
`;
