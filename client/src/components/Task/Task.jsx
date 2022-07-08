import { useRef } from "react";
import { Card, Input } from "antd";
import { SaveOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./task.module.css";
import { useAppContext } from "../../hooks/useAppContext.jsx";

const Task = ({ id, title, bid, editTask, deleteTask }) => {
  const [edit, setEdit] = useState(false);
  const [taskValue, setTaskValue] = useState(title);

  const { cardDispatch, target, setTarget } = useAppContext();
  const inputEl = useRef();

  const onButtonClick = () => {
    setEdit((prev) => !prev);
  };
  const handleEnd = (cid, bid) => {
    cardDispatch({
      type: "MOVE_CARD",
      payload: {
        cid: cid,
        bid: bid,
        targetBoard: target.bid,
        targetCard: target.cid,
      },
    });
  };
  const handleEnter = (cid, bid) => {
    setTarget({
      cid: cid,
      bid: bid,
    });
  };
  console.log("target", target);

  return (
    <>
      <Card
        draggable
        style={{ cursor: "pointer", borderRadius: "0.4rem", padding: "0.2rem" }}
        onDragEnter={() => handleEnter(id, bid)}
        onDragEnd={() => handleEnd(id, bid)}
        onClick={() => console.log(id, bid)}
        actions={
          edit
            ? [
                <SaveOutlined
                  key="save"
                  onClick={() => {
                    editTask(id, taskValue);
                    setEdit((prev) => !prev);
                  }}
                />,
              ]
            : [
                <EditOutlined key="edit" onClick={onButtonClick} />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => deleteTask(bid, id)}
                />,
              ]
        }
      >
        {edit ? (
          <input
            className={styles.input}
            value={taskValue}
            ref={inputEl}
            autoFocus={true}
            onChange={(e) => setTaskValue(e.target.value)}
          />
        ) : (
          <Input
            className={styles.input}
            value={title}
            ref={inputEl}
            disabled={!edit}
          />
        )}
      </Card>
    </>
  );
};

export default Task;
