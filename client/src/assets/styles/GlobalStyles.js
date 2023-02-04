import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;		
        font-family: 'Rubik', sans-serif;
        font-weight: 300;
    }
    html, body {
        overflow: hidden;
        font-size: 32px;
        letter-spacing: 1px;
        font-size: 16px;
        height: 100%;
        width: 100%;
        background: ${(props) => props.theme.bg.app};
    }
`;

export default GlobalStyles;
