import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import TaskList from "./Task";
import './HomePage.css'

const Homepage = () => {

    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [pendingTaskList, setPendingTaskList] = useState([]);
    const [completedTaskList, setCompletedTaskList] = useState([]);

    useEffect(() => {
        const pendingTasks = taskList.filter((task) => task.isPending === true);
        setPendingTaskList(pendingTasks);
        const completedTasks = taskList.filter((task) => task.isPending === false);
        setCompletedTaskList(completedTasks);
    }, [taskList]);

    const itemEvent = (event) => {
        setTaskInput(event.target.value);
    };

    const listOfTask = () => {
        if (taskInput) {
            setTaskList([
                ...taskList,
                { id: uniqid(), isPending: true, value: taskInput },
            ]);
            setTaskInput("");
        } else {
            alert("please provide values");
        }
    };


    const handleCheckboxTask = (e, id) => {
        if (e.target.checked) {
            console.log("Checkbox is checked", e.target.checked, id);
            const updatedTaskList = taskList.map((itemvalue) => {
                if (itemvalue.id === id) {
                    return { ...itemvalue, isPending: false };
                } else {
                    return itemvalue;
                }
            });
            setTaskList(updatedTaskList);
        } else {
            console.log(" Checkbox is NOT checked", e.target.checked, id);
            const updatedTaskList = taskList.map((itemvalue) => {
                if (itemvalue.id === id) {
                    return { ...itemvalue, isPending: true };
                } else {
                    return itemvalue;
                }
            });
            setTaskList(updatedTaskList);
        }
    };

    return (
        <>
            <h1 className="text-center mt-5">Make Your To Do</h1>
            <div>
                <div className="row justify-content-center">
                    <div className=" mt-5">
                        <form>
                            <div className="col-6">
                                <input onChange={itemEvent}
                                    value={taskInput}
                                    className="form-control form-control-lg textinput"
                                    type="text"
                                    placeholder="Add Task"
                                    aria-label=".form-control-lg example">
                                </input>
                            </div>
                            <div className="col-6">
                                <div
                                style={{marginLeft:"100%" , marginTop:"-10%"}}
                                    onClick={listOfTask}
                                    type="button"
                                    className="btn btn-primary" >
                                    Add
                                </div>
                            </div>
                        </form>

                        <div className="container row mb-5">
                            <div className="col-sm-6 ">
                                <TaskList
                                    taskList={pendingTaskList}
                                    title={"Pending Task List"}
                                    onChangeHandler={handleCheckboxTask}
                                />
                            </div>
                            <div className="col-sm-6">
                                <TaskList
                                    taskList={completedTaskList}
                                    title={"Completed Task List"}
                                    onChangeHandler={handleCheckboxTask}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;