import { useRef, useState } from "react";
import { useCommentsFunctionContext } from "./CommentsComponents";
import { VscCheck } from "react-icons/vsc";
import styled from "styled-components";

//댓글 작성폼, 데이터 스프레드시트로 보내기
function CreateComments() {
  const submitBtnRef = useRef<any>(null);
  const [createForm, setCreateForm] = useState({
    nickname: "김아무개",
    password: "",
    content: "",
  });
  /**Context호출 */

  const { onCreate } = useCommentsFunctionContext();

  //createForm 구조분해
  let { nickname, password, content } = createForm;
  //useState onChange함수
  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };
  /**submit을 통해 newCommentsData에 createForm삽입*/
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (nickname && password && content) {
      submitBtnRef.current.disabled = true;
      try {
        await onCreate(nickname, password, content);
        setCreateForm({
          nickname: "김아무개",
          password: "",
          content: "",
        });
      } catch (err) {
        console.log(err);
      } finally {
        submitBtnRef.current.disabled = false;
      }
    } else {
      return alert("작성되지않은 빈칸이 존재합니다.");
    }
  };

  return (
    <StyledCommentsForm onSubmit={handleOnSubmit}>
      <div className="userinfo-wrapper">
        <input
          className="nickname-input"
          name="nickname"
          type="text"
          placeholder="NICKNAME"
          value={nickname}
          onChange={handleChangeForm}
          maxLength={20}
        />
        <input
          className="password-input"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="PASSWORD"
          value={password}
          onChange={handleChangeForm}
        />
      </div>
      <div className="content-wrapper">
        <textarea
          className="content-textarea"
          name="content"
          value={content}
          onChange={handleChangeForm}
          placeholder="대앳글입력"
        ></textarea>
        <button className="submit-btn" ref={submitBtnRef} name="submit_btn">
          <VscCheck />
        </button>
      </div>
    </StyledCommentsForm>
  );
}

export default CreateComments;

const StyledCommentsForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  height: 100%;
  padding: 2rem 1rem;
  column-gap: 1.5rem;
  .userinfo-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 0.5rem;
    width: 100%;
    height: 100%;
    .nickname-input {
      border: none;
      border-bottom: 0.14rem solid #000;
      padding: 0 0.5rem;
      font-family: "pretendard";
      font-size: 1rem;
      background-color: #f5f4ec;
    }
    .password-input {
      border: none;
      border-bottom: 0.14rem solid #000;
      padding: 0 0.5rem;
      font-family: "pretendard";
      font-size: 1rem;
      background-color: #f5f4ec;
    }
  }
  .content-wrapper {
    display: flex;

    box-sizing: border-box;
    border-right: 0.14rem solid #000;
    border-bottom: 0.14rem solid #000;

    .content-textarea {
      width: 99%;
      padding: 0 0.5rem;
      height: 4.5rem;
      font-family: "pretendard";
      font-size: 1rem;
      background-color: #f5f4ec;

      border: none;
      resize: none;
    }
    .submit-btn {
      cursor: pointer;
      border: none;
      background-color: #f5f4ec;
      font-size: 1.8rem;

      &:hover {
        background-color: black;
        color: white;
        padding: auto;
      }
    }
  }
`;
