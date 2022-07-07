import styles from "./app.module.css";
import { useState } from "react";
import { Card } from "antd";
import { useAppContext } from "./hooks/useAppContext.jsx";
import { Layout, Button, Input } from "antd";
import Board from "./components/Board/Board.jsx";

const { Header, Footer } = Layout;

function App() {
  const [boardTitle, setBoardTitle] = useState("");
  const [addBoardCard, setAddBoardCard] = useState(false);
  const { boardState, boardDispatch } = useAppContext();
  console.log("b state", boardState);
  // boardState.map((b) => console.log(b));
  console.log("APP");
  const deleteBoard = (id) => {
    boardDispatch({
      type: "REMOVE_BOARD",
      payload: {
        id: id,
      },
    });
  };
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header>
        <h1 className={styles.title}>Kanban</h1>
      </Header>
      <div className={styles.board_list}>
        {boardState.map((board) => {
          return (
            <Board
              key={board.id}
              id={board.id}
              title={board.title}
              deleteBoard={deleteBoard}
            />
          );
        })}
        <Card>
          {addBoardCard ? (
            <>
              <Input
                value={boardTitle}
                onInput={(e) => setBoardTitle(e.target.value)}
              />
              <Button
                onClick={() => {
                  boardDispatch({
                    type: "ADD_BOARD",
                    payload: { title: boardTitle },
                  });
                  setBoardTitle("");
                  setAddBoardCard((prev) => !prev);
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setAddBoardCard((prev) => !prev);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                setAddBoardCard((prev) => !prev);
              }}
            >
              Add Board
            </Button>
          )}
        </Card>
      </div>
    </Layout>
  );
}

export default App;
