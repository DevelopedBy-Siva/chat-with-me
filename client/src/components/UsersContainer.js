import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";

function UsersContainer({ contacts, addContact }) {
  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownRef = useRef(null);
  const dropDownBtnRef = useRef(null);

  const DropDownMenu = ["Account", "Status", "Settings"];

  useEffect(() => {
    const { current } = dropDownRef;
    if (current) {
      const { left } = current.getBoundingClientRect();
      if (left < 10) {
        current.style.left = "0";
        return;
      }
      current.style.right = "0";
    }
  }, [showDropDown]);

  useEffect(() => {
    if (showDropDown) {
      document.addEventListener("click", ({ target }) => {
        if (target === dropDownBtnRef.current) return;
        setShowDropDown(false);
      });
    }
  });

  const handleDropDown = () => {
    setShowDropDown((show) => !show);
  };

  const handleDropDownClick = (option) => [alert(`SELECTED: ${option}`)];

  return (
    <Container>
      <UserDetailsHeader>
        <FaUserCircleCustom />
        <UserName>Siva</UserName>
        <AccountDropDownContainer>
          <ThreeDotBtn onClick={handleDropDown} ref={dropDownBtnRef}>
            <BiDotsVerticalRoundedCustom />
          </ThreeDotBtn>
          {showDropDown && (
            <AccountDropDown ref={dropDownRef}>
              {DropDownMenu.map((option, index) => (
                <DropDownList
                  key={index}
                  onClick={() => handleDropDownClick(option)}
                >
                  {option}
                </DropDownList>
              ))}
            </AccountDropDown>
          )}
        </AccountDropDownContainer>
      </UserDetailsHeader>
      <UserContainer>
        {contacts.map((user, index) => (
          <Receiver key={index}>
            <ReceiverName>{user}</ReceiverName>
          </Receiver>
        ))}
      </UserContainer>
      <AddUserButton onClick={addContact}>+</AddUserButton>
    </Container>
  );
}

export default UsersContainer;

const Container = styled.div`
  height: 100vh;
  display: flex;
  width: 30%;
  max-width: 400px;
  flex-direction: column;
`;

const UserDetailsHeader = styled.div`
  height: 50px;
  width: 100%;
  background-color: #5b5b5b;
  display: flex;
  align-items: center;
`;

const UserName = styled.h3`
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  width: 100%;
  font-size: 0.9rem;
`;

const UserContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
  background-color: #434343;
`;

const Receiver = styled.li`
  height: 60px;
  width: 100%;
  background-color: #777777;
  border-bottom: 1px solid gray;
  padding: 1rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  cursor: pointer;
  list-style: none;
  text-decoration: none;
`;

const ReceiverName = styled.h3`
  font-size: 1rem;
  color: white;
`;

const FaUserCircleCustom = styled(FaUserCircle)`
  font-size: 2rem;
  color: white;
  margin: 0 8px;
`;

const AccountDropDownContainer = styled.span`
  position: relative;
  margin-right: 8px;
  height: 100%;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThreeDotBtn = styled.button`
  width: 10px;
  height: 70%;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  overflow: hidden;
`;

const BiDotsVerticalRoundedCustom = styled(BiDotsVerticalRounded)`
  color: white;
  font-size: 1.6rem;
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AddUserButton = styled.button`
  width: 100%;
  height: 50px;
  font-size: 24px;
  background-color: #5b5b5b;
  color: white;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    background-color: #5f5f5f;
  }
`;

const AccountDropDown = styled.div`
  position: absolute;
  width: 180px;
  background-color: white;
  right: 0;
  top: 2.3rem;
  border: 1px solid #c7c6c6;
  border-radius: 6px;
  overflow: hidden;
`;

const DropDownList = styled.li`
  list-style: none;
  cursor: pointer;
  border-bottom: 1px solid #c7c6c6;
  width: 100%;
  padding: 0.6rem 0.4rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 1rem;
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background-color: #c7c6c6;
  }
`;
