// import React, { createContext, useContext, useState, useEffect } from "react";

// type CommentsStateType = {
//   getCommentsData: string[][];
// };
// type CommentsFuncType = {
//   onCreate: (
//     newNicknaeme: string,
//     newPassword: string,
//     newContent: string
//   ) => void;
//   onRemove: (key: number) => void;
// };

// const CommentsStateContext = React.createContext<CommentsStateType | null>(
//   null
// );
// const CommentsFunctionContext = React.createContext<CommentsFuncType | null>(
//   null
// );

// export const useCommentsFunctionContext = () => {
//   const context = useContext(CommentsFunctionContext);
//   if (!context) {
//     throw new Error("useContext must be used within a Provider");
//   }
//   return context;
// };
// export const useCommentsStateContext = () => {
//   const context = useContext(CommentsStateContext);
//   if (!context) {
//     throw new Error("useContext must be used within a Provider");
//   }
//   return context;
// };
