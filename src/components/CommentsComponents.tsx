import React, { useEffect, useReducer } from "react";
import CommentsList from "./CommentsList";
import CreateComments from "./CreateComments";

// type State = {
//   createComments:{},

// }

export const CommentsFunctionContext = React.createContext();
export const CommentsStateContext = React.createContext();

function reducer(state: [], action: any) {
  switch (action.type) {
    case "SET_DATA": {
      return action.data;
    }
    //REMOVE
    //REPLY..?
  }
}

function CommentsComponents() {
  const [formData, dispatch] = useReducer(reducer, []);

  const onGet = () => {
    //시트 데이터 가져오기
    fetch(
      "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_DATA", data: data });
        // setCommentsData(data);
      })
      .catch((err) => console.log(err));
  };
  const onCreate = (createForm: {}, setCreateForm: any, submitBtnRef: any) => {
    //데이터 시트입력
    fetch(
      "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
      {
        method: "POST",
        body: JSON.stringify({
          action: "create",
          data: createForm,
        }),
      }
    )
      .then((res) => {
        alert("입력 완료.");
        console.log(res);
        setCreateForm({
          commentsId: 0,
          nickname: "",
          password: "",
          content: "",
          date: "",
        });
      })
      .catch((error) => {
        console.log(error);
        alert("에러");
      })
      .finally(() => {
        submitBtnRef.current.disabled = false;
      });
  };

  const onRemove = (key: number) => {
    //댓글 삭제기능
    fetch(
      "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
      {
        method: "POST",
        body: JSON.stringify({
          action: "remove",
          data: key,
        }),
      }
    )
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_DATA", data: formData });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onGet();
  }, [formData]);

  return (
    <>
      <CommentsStateContext.Provider value={{ formData }}>
        <CommentsFunctionContext.Provider value={{ onCreate, onRemove }}>
          <CreateComments />
          <CommentsList />
        </CommentsFunctionContext.Provider>
      </CommentsStateContext.Provider>
    </>
  );
}
export default React.memo(CommentsComponents);
