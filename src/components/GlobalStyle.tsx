import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable.css");
  }
  *{
    font-family: "Pretendard";
  }
    /* body{
      margin:0;
      padding:0;
      box-sizing: border-box;
    background-color:#f6f6f6;
    display: flex;
    justify-content:center;
    align-items:center;
  } */
  /* .App{
    background-color:white;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    padding:  0 20px;
  }
  @media(min-width: 650px){
    .App{
      width: 640px;
    }
  }
  @media(max-width: 650px){
    .App{
      width:90vw
    }
  } */
`;

export default GlobalStyle;
