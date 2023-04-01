import { Suspense, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import OneTimeInfo from "../../../components/Home/Info/OneTimeInfo";
import FullPageLoading from "../../../components/Loader/FullPage";
import Navbar from "../../../components/Home/NavBar";
import store from "../../../store";
import { initializeContacts } from "../../../store/reducers/Contacts";

export default function UserHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeContacts());
  }, [dispatch]);

  const showOneTimeInfo = useSelector((state) => state.contacts.oneTimeInfo);

  return (
    <Provider store={store}>
      <Container>
        {showOneTimeInfo && <OneTimeInfo />}
        <Navbar />
        <Suspense fallback={<FullPageLoading />}>
          <Outlet />
        </Suspense>
      </Container>
    </Provider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  position: relative;
`;
