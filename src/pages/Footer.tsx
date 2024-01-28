import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  return (
    <StyledFooter>
      <div className="footer-inner">
        <div>Copyright © 2024. UniqueFlowSA All rights reserved.</div>
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
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
`;
