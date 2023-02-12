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
        letter-spacing: 1px;
        font-size: 16px;
        height: 100%;
        width: 100%;
        background: ${(props) => props.theme.bg.app};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #nprogress .bar {
        background: ${(props) => props.theme.txt.highlight};
    }
    #nprogress .peg {
        box-shadow: ${(props) =>
          `0 0 10px ${props.theme.txt.highlight}, 0 0 5px ${props.theme.txt.highlight}`};
    }
`;

export default GlobalStyles;
