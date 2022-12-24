import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;		
        font-family: 'Poppins', sans-serif;
    }
    body {
        overflow: hidden;
        font-size: 32px;
        letter-spacing: 1px;
    }
`;

export default GlobalStyles;