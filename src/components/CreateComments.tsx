import { useEffect, useRef, useState, useContext } from "react";
import { CommentsFunctionContext } from "./CommentsComponents";

//댓글 작성폼, 데이터 스프레드시트로 보내기
function CreateComments() {
  const submitBtnRef = useRef<any>(null);
  const [createForm, setCreateForm] = useState({
    commentsId: 0,
    nickname: "",
    password: "",
    content: "",
    date: "",
  });
  /**Context호출 */
  const { onCreate } = useContext(CommentsFunctionContext);

  //createForm 구조분해
  let { commentsId, nickname, password, content } = createForm;
  //useState onChange함수
  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };
  /**submit으로 id부여 및 데이터 전송*/
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (nickname && password && content) {
      submitBtnRef.current.disabled = true;
      setCreateForm({
        ...createForm,
        commentsId: Math.floor(Math.random() * 10000000000000),
        date: new Date().toLocaleString(),
      });
    } else {
      return alert("작성되지않은 빈칸이 존재합니다.");
    }
  };
  /** commentsId부여시(handleOnSubmit)에 context(onCreate)로 fetch post실행 */
  useEffect(() => {
    console.log(createForm);
    if (commentsId !== 0 && nickname && password && content) {
      onCreate(createForm, setCreateForm, submitBtnRef);
    }
  }, [commentsId]);

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        {" "}
        <input
          name="nickname"
          type="text"
          value={nickname}
          onChange={handleChangeForm}
          maxLength={20}
        />
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={handleChangeForm}
        />
      </div>
      <div>
        <textarea
          name="content"
          value={content}
          onChange={handleChangeForm}
        ></textarea>
        <button ref={submitBtnRef} name="submit_btn">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreateComments;
