import React, { useEffect, useReducer, useContext } from "react";
import CommentsList from "./CommentsList";
import CreateComments from "./CreateComments";
import { useParams } from "react-router-dom";

type PostProps = {
  slug: string;
};
type NewCommentsData = {
  commentsId: number;
  nickname?: string;
  password?: string;
  content?: string;
  date: string;
};

type State = {
  getCommentsData: string[][];
  newCommentsData: NewCommentsData;
};
type CommentsStateType = {
  getCommentsData: string[][];
};
type CommentsFuncType = {
  onCreate: (
    newNicknaeme: string,
    newPassword: string,
    newContent: string
  ) => void;
  onRemove: (key: number) => void;
};
type Action =
  | { type: "SET_DATA"; getCommentsData: string[][] }
  | { type: "CREATE_DATA"; newCommentsData: {} };

const CommentsStateContext = React.createContext<CommentsStateType | null>(
  null
);
const CommentsFunctionContext = React.createContext<CommentsFuncType | null>(
  null
);

export const useCommentsFunctionContext = () => {
  const context = useContext(CommentsFunctionContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
export const useCommentsStateContext = () => {
  const context = useContext(CommentsStateContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_DATA": {
      return {
        ...state,
        getCommentsData: action.getCommentsData,
      };
    }
    case "CREATE_DATA": {
      const newCommentsId = Math.floor(Math.random() * 10000000000000);
      const newDate = new Date().toLocaleString([], {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return {
        ...state,
        newCommentsData: {
          ...action.newCommentsData,

          commentsId: newCommentsId,
          date: newDate,
        },
      };
    }
  }
}

function CommentsComponents() {
  const { slug } = useParams<PostProps>();
  const [commentsState, dispatch] = useReducer(reducer, {
    getCommentsData: [],
    newCommentsData: {
      commentsId: 0,
      nickname: "",
      password: "",
      content: "",
      date: "",
    },
  });
  const { getCommentsData, newCommentsData } = commentsState;
  /**데이터 함수*/
  const onGet = () => {
    //시트 데이터 가져오기
    fetch(
      `https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec?post=${slug}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data[0][0] !== "") {
          // 데이터가 존재하는 경우에만 상태를 업데이트
          dispatch({ type: "SET_DATA", getCommentsData: data });
        }
        console.log(data[0]);
      })
      .catch((err) => console.log(err));
  };
  const onCreate = (
    newNicknaeme: string,
    newPassword: string,
    newContent: string
  ) => {
    dispatch({
      type: "CREATE_DATA",
      newCommentsData: {
        nickname: newNicknaeme,
        password: newPassword,
        content: newContent,
      },
    });
    console.log(newCommentsData);
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
          post: slug,
        }),
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onGet();
    console.log(commentsState);
  }, [commentsState]);

  /** commentsId부여시(handleOnSubmit)에 context(onCreate)로 fetch post실행 */
  useEffect(() => {
    //데이터 시트입력
    const fetchCreateComments = async () => {
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
          {
            method: "POST",
            body: JSON.stringify({
              action: "create",
              data: commentsState.newCommentsData,
              post: slug,
            }),
          }
        );
        alert("입력 완료.");
      } catch (err) {
        console.log(err);
        alert("에러");
      }
    };
    if (
      newCommentsData.nickname &&
      newCommentsData.password &&
      newCommentsData.content
    ) {
      fetchCreateComments();
    }
  }, [newCommentsData, slug]);

  return (
    <>
      <CommentsStateContext.Provider value={{ getCommentsData }}>
        <CommentsFunctionContext.Provider value={{ onCreate, onRemove }}>
          <CreateComments />
          <CommentsList />
        </CommentsFunctionContext.Provider>
      </CommentsStateContext.Provider>
    </>
  );
}
export default React.memo(CommentsComponents);
