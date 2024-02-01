// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  return (
    <StyledFooter>
      <div className="footer-inner">
        <div>Copyright © 2024. OFFTHEHOOK All rights reserved.</div>
        <img
          className="footer-logo"
          src="/img/logo.png"
          alt="OFFTHEHOOK로고이미지입니다."
        />
      </div>
    </StyledFooter>
  );
}

export default Footer;

const StyledFooter = styled.div`
  width: 100%;
  border-top: 0.1rem solid black;
  margin-top: 7rem;
  .footer-inner {
    margin: 0 auto;
    padding: 5rem 2% 1rem;
    max-width: 1360px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    .footer-logo {
      width: 20rem;
    }
  }
`;
