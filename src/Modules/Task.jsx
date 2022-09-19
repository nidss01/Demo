import React from "react";

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
                <div class="form-check" key={task.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={title === "Completed Task List" ? true : false}
                    id="flexCheckDefault"
                    onChange={(e) => onChangeHandler(e, task.id)}
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    <tbody>
                      <tr>
                        <td> {task.value}</td>{" "}
                      </tr>
                    </tbody>
                  </label>
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

