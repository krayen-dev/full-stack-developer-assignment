import { useRef } from "react";
import { Card, Button, Input } from "antd";
import { SaveOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./task.module.css";

const { Meta } = Card;

const Task = ({ bid, id, title, editTask, deleteTask }) => {
  const [edit, setEdit] = useState(false);
  const [taskValue, setTaskValue] = useState(title);
  const inputEl = useRef();
  console.log("TASK");
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    // inputEl.current.focus();

    setEdit((prev) => !prev);
  };
  return (
    <Card
      style={{
        borderRadius: "0.4rem",
        padding: "0.2rem",
      }}
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
      {/* <div className={styles.card_header}>
        <div className={styles.more_options_wrapper}>
          <EllipsisOutlined onClick={() => setMoreOptions((prev) => !prev)} />
          {moreOptions && (
            <Button
              className={styles.more_task}
             
            >
              Delete Task <DeleteOutlined />
            </Button>
          )}
        </div>
      </div> */}
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
  );
};

export default Task;

// <Card
// style={{ width: 300 }}
// cover={
//   <img
//     alt="example"
//     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//   />
// }
// actions={[
//   <SettingOutlined key="setting" />,
//   <EditOutlined key="edit" />,
//   <EllipsisOutlined key="ellipsis" />,
// ]}
// >
// <Meta
//   avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
//   title="Card title"
//   description="This is the description"
// />
// </Card>
