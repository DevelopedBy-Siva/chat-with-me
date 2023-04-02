import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;		
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
        -webkit-text-size-adjust: 100%;
        font-family: 'Roboto', sans-serif;
    }

    button, input, textarea {
        font-family: inherit;
    }

    #nprogress .bar {
        background: red;
    }

    #nprogress .peg {
        box-shadow: 0 0 10px red, 0 0 5px red;
    }

    .notistack-SnackbarContainer{
        z-index: 999999999;
    }

    .notistack-Snackbar{
        min-width: 0;
    }

    .notistack-MuiContent{
        background: ${(props) => props.theme.toast.bg};
        padding: 0;
    }

    ::-webkit-scrollbar {
        width: 3px; 
    }

    ::-webkit-scrollbar-track {
        background-color: none;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #989898;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
`;

export default GlobalStyles;
