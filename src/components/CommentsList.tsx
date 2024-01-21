import React, { useContext, useState } from "react";
import {
  CommentsStateContext,
  CommentsFunctionContext,
} from "./CommentsComponents";

function CommentsList() {
  const [ModalToggleKey, setModalToggleKey] = useState(0);
  const [password, setPassword] = useState("");

  const { formData } = useContext(CommentsStateContext);
  const { onRemove } = useContext(CommentsFunctionContext);

  //onClickEvent 누르면 onRemoveComments 작동
  const handleConfirmPassword = (
    key: number,
    password: string,
    commentsPassword: string
  ) => {
    const toStringPassword = commentsPassword.toString();
    if (password === toStringPassword) {
      onRemove(key);
      alert("삭제되었습니다.");
    } else if (password !== commentsPassword) {
      alert("비밀번호를 확인해주세요.");
    }
    setPassword("");
  };
  return (
    <>
      <div>
        {formData.map((item) => (
          <div className="commentsList" key={item[0]}>
            <span>아이디:{item[1]}</span>
            <span>내용:{item[3]}</span>
            <span>
              시간:
              {item[4]}
              <button onClick={() => setModalToggleKey(item[0])}>
                &times;
              </button>
              {ModalToggleKey === item[0] && (
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      handleConfirmPassword(item[0], password, item[2]);
                    }}
                  >
                    확인
                  </button>
                  <button onClick={() => setModalToggleKey(0)}>&times;</button>
                </div>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default React.memo(CommentsList);
