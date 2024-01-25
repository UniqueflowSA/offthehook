import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <button type="button">
        <img
          src="이미지 파일 경로"
          alt="대체 텍스트"
          onClick={() => navigate("/")}
        />
      </button>
    </>
  );
}
export default Header;
