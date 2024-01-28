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
            src="이미지 파일 경로"
            alt="대체 텍스트"
            onClick={() => navigate("/")}
          />
        </button>
      </div>
    </StyledHeader>
  );
}
export default Header;

const StyledHeader = styled.div`
  width: 100%;
  border-bottom: 0.1rem solid black;

  .header-inner {
    margin: 0 auto;
    padding: 1rem 5% 2.5rem;
    max-width: 1360px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: absolute;
    width: 120px;
    left: 40%; /* 이걸로 조절 */
  }
`;
