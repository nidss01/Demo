// import React, { useState } from 'react'
// import './HomePage.css'
// // import Task from './Task';
// import uuid from 'react-uuid';


// export default function HomePage() {

//     const [inputList, setInputList] = useState("")
//     const [items, setItems] = useState([]);
//     const [isPending,setIspending] = useState(true)
//     console.log(items)

//     const itemEvent = (event) => {
//         setInputList(event.target.value)
//     }

//     const listItem = () => {
//         if (inputList) {
//             setItems((oldData) => {
//                 return [...oldData, { id:uuid(), value: inputList, isPending }];
//             })
//             setInputList('')
//         }
//         else {
//             alert("provide values")
//         }
//     }

//     // const pendingTask = () => {
//     //     setItems((oldData) => {
//     //         return [...oldData, { id:uuid(), value: inputList, isPending:false }];
//     //     })
//     // }


//   const pendingTask = (e) => {
//     console.log("clicked")
//     console.log(e.target.id)
//     //  passing function to setData method
//     setItems(prevState => {
//       const newState = prevState.map(itemval => {
//         //  if id equals 2, update country property
//         // if (itemval.id === uuid) {
//           return {...itemval, isPending:false};
//         // }

//         // otherwise return object as is
//         // return itemval;
//       });

//       return newState;
//     });
//   };


//     return (
//         <>
//             <div className="Main_div ">
//                 <div className="center_div datatask">
//                     <div className="">
//                         <br />
//                         <h1 className='head'>Make Your ToDo</h1>
//                         <br />
//                     </div>
//                     <div className="row ">
//                         <span className="col-8">
//                             <input type="text" placeholder="Add Tasks" value={inputList} name="title" className='textinput' onChange={itemEvent} />
//                         </span>
//                         <span className="col-4">
//                             <button className='addbutton' onClick={listItem}> + </button>
//                         </span>
//                     </div>
//                     <ol className='main_list '>
//                         <div className="container-fluid">
//                             {items.map((itemval) => {
//                                 return (
//                                     <>
//                                         <div className="row ">
//                                             <div className="form-check ">
//                                                 <span className="col-8">
//                                                     <input className="" type="checkbox" key={uuid()} onClick={pendingTask}/>
//                                                 </span>
//                                                 <span className="col-4">
//                                                     <li className=''>{itemval.value}</li>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </>
//                                 )
//                             })}
//                         </div>
//                     </ol>
//                 </div>
//             </div>
//         </>
//     )
// }


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
                                    onClick={listOfTask}
                                    type="button"
                                    class="btn btn-primary"
                                >
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