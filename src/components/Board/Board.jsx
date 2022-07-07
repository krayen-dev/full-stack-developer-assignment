import { Button, Input } from "antd";
import { EllipsisOutlined, DeleteOutlined } from "@ant-design/icons";

import Task from "../Task/Task.jsx";
import { useAppContext } from "../../hooks/useAppContext.jsx";
import styles from "./board.module.css";
import { useState } from "react";

const Board = ({ id, title, deleteBoard }) => {
  const [toggle, setToggle] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [task, setTask] = useState("");
  const { cardState, cardDispatch } = useAppContext();

  console.log("Board");
  const addTask = () => {
    cardDispatch({
      type: "ADD_CARD",
      payload: {
        bid: id,
        id: parseInt(Date.now() * Math.random()),
        title: task,
      },
    });
    setToggle((prev) => !prev);
  };
  const deleteTask = (bid, id) => {
    cardDispatch({
      type: "REMOVE_CARD",
      payload: {
        id: id,
      },
    });
  };
  const editTask = (cid, data) => {
    console.log(data);
    cardDispatch({
      type: "EDIT_CARD",
      payload: {
        id: cid,
        title: data,
      },
    });
  };

  return (
    <div className={styles.board}>
      <div className={styles.board_header}>
        <span>{title}</span>
        <div className={styles.option_card_wrapper}>
          <EllipsisOutlined onClick={() => setMoreOptions((prev) => !prev)} />
          {moreOptions && (
            <Button
              onClick={() => deleteBoard(id)}
              className={styles.option_card}
            >
              Delete <DeleteOutlined />
            </Button>
          )}
        </div>
      </div>
      <div className={styles.card_body}>
        {cardState.map((card) => {
          console.log(card.bid, id);
          if (card.bid === id) {
            return (
              <Task
                key={card.id}
                id={card.id}
                title={card.title}
                bid={card.id}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            );
          }
        })}

        {toggle ? (
          <div>
            <Input
              placeholder="Enter task"
              value={task}
              onInput={(e) => {
                console.log(e.target.value);
                setTask(e.target.value);
              }}
            />
            <Button onClick={addTask}>Save</Button>
            <Button
              onClick={() => {
                setTask("");
                setToggle((prev) => !prev);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={() => setToggle((prev) => !prev)}>Add card</Button>
        )}
      </div>
    </div>
  );
};

export default Board;
