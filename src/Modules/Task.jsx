import React from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TaskList = ({ taskList, title, onChangeHandler }) => {
  return (
    <>
      <div className="row">
        <div className="col-sm-6 mt-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="mt-5">{title}</th>
              </tr>
            </thead>
            {taskList.map((task) => {
              return (
                <div className="form-check" key={task.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={title === "Completed Task List" ? true : false}
                    id="flexCheckDefault"
                    onChange={(e) => onChangeHandler(e, task.id)}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    {task.value}{" "}
                  </label>
                   <ContentCopyIcon  />
                </div>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default TaskList;

