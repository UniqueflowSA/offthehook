import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div className="header-inner">
        <button type="button">
          <img
            className="header-logo"
            onClick={() => navigate("/")}
            src="/img/logo.png"
            alt="OFFTHEHOOK로고이미지입니다."
          />
        </button>
      </div>
    </StyledHeader>
  );
}
export default Header;

const StyledHeader = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 0.1rem solid black;

  .header-inner {
    margin: 0 auto;
    padding: 1rem 5% 1.5rem;
    max-width: 1360px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    & button {
      border: none;
      background-color: transparent;
      .header-logo {
        cursor: pointer;

        /* 이걸로 조절 */
      }
    }
  }
`;
