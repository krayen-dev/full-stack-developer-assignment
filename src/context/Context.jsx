import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { boardReducer, cardReducer } from "./Reducer.jsx";

//Four default sections - Backlogs, Planned, In Progress and Completed.

const defaultBoards = [
  {
    id: parseInt(Date.now() * Math.random()),
    title: "Planned",
  },
  {
    id: parseInt(Date.now() * Math.random()),
    title: "In Progress",
  },
  {
    id: parseInt(Date.now() * Math.random()),
    title: "Backlogs",
  },
  {
    id: parseInt(Date.now() * Math.random()),
    title: "Completed",
  },
];
let defaultCards = [];

export const AppContext = createContext();

const AppProvider = (props) => {
  const [boardState, boardDispatch] = useReducer(boardReducer, defaultBoards);
  const [cardState, cardDispatch] = useReducer(cardReducer, defaultCards);
  useEffect(() => {
    console.log("useEff");
    if (localStorage.getItem("cards")) {
      console.log("cards set");
      cardDispatch({
        type: "UPDATE_FROM_LOCALSTORAGE",
        payload: { data: JSON.parse(localStorage.getItem("cards")) },
      });
    }
    if (localStorage.getItem("boards")) {
      console.log("boards set");
      boardDispatch({
        type: "UPDATE_FROM_LOCALSTORAGE",
        payload: { data: JSON.parse(localStorage.getItem("boards")) },
      });
    } else {
      boardDispatch({ type: "UPDATE_TO_LOCALSTORAGE" });
    }
  }, []);
  console.log("cont", cardState);
  console.log("board state", boardState);
  return (
    <AppContext.Provider
      value={{ boardState, boardDispatch, cardState, cardDispatch }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
