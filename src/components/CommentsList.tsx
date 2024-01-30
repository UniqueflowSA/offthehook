import React, { useState } from "react";
import {
  useCommentsFunctionContext,
  useCommentsStateContext,
} from "./CommentsComponents";
import styled from "styled-components";
import { VscCheck, VscChromeClose } from "react-icons/vsc";

function CommentsList() {
  const [ModalToggleKey, setModalToggleKey] = useState(0);
  const [password, setPassword] = useState("");

  const { getCommentsData } = useCommentsStateContext();
  const { onRemove } = useCommentsFunctionContext();
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
    <StyledCommentsList>
      {getCommentsData.map((item: any) => (
        <div className="comments-item" key={item[0]}>
          <span className="comments-userid">{item[1]}</span>
          <span className="comments-password">{item[3]}</span>
          <span className="comments-date">
            {item[4]}
            <button
              className="comments-remove-btn"
              onClick={() => setModalToggleKey(item[0])}
            >
              <VscChromeClose />
            </button>
            {ModalToggleKey === item[0] && (
              <div className="remove-modal-container">
                <input
                  className="remove-modal-password"
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="remove-modal-confirmbtn"
                  onClick={() => {
                    handleConfirmPassword(item[0], password, item[2]);
                  }}
                >
                  <VscCheck />
                </button>
                <button
                  className="remove-modal-cancelbtn"
                  onClick={() => setModalToggleKey(0)}
                >
                  <VscChromeClose />
                </button>
              </div>
            )}
          </span>
        </div>
      ))}
    </StyledCommentsList>
  );
}

export default React.memo(CommentsList);

const StyledCommentsList = styled.div`
  width: 100%;
  .comments-item {
    max-width: 900px;
    padding: 0.5rem 0.7rem;
    border-bottom: 0.1rem solid #000;
    display: grid;
    grid-template-columns: 0.5fr 3fr 0.7fr;
    column-gap: 0.5rem;

    .comments-userid {
    }
    .comments-password {
    }
    .comments-date {
      font-size: 0.7rem;
      font-weight: 500;
      position: relative;

      .comments-remove-btn {
        background-color: #f5f4ec;
        cursor: pointer;
        border: none;
        /* font-size: 1.8rem; */

        &:hover {
          color: #e61919;
          padding: auto;
        }
      }
      .remove-modal-container {
        padding: 0.5rem;
        width: 15rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 25px;
        left: 0;
        background-color: #f5f4ec;
        border: 1px solid black;
        z-index: 1;
        .remove-modal-password {
          background-color: #f5f4ec;
          padding: 0.5rem 0;
          height: 80%;
          width: 10rem;
          max-height: 2rem;
          border: none;
          border-bottom: 0.14rem solid #000;
          padding: 0 0.5rem;
          font-family: "pretendard";
          font-size: 1rem;
        }
        .remove-modal-confirmbtn {
          cursor: pointer;
          border: none;
          background-color: #f5f4ec;
          font-size: 0.8rem;

          &:hover {
            color: #e61919;
            padding: auto;
          }
        }
        .remove-modal-cancelbtn {
          cursor: pointer;
          border: none;
          background-color: #f5f4ec;
          font-size: 0.8rem;

          &:hover {
            color: #e61919;
            padding: auto;
          }
        }
      }
    }
  }
`;
