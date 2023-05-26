import "../styles/Dashboard.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import { db } from "../firebase"

function Dashboard() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    /* Just change "collection(db, 'tasks')" to "collectionGroup(db, 'tasks')" ????????????? */
    const q = query(collection(db, 'tasks'), orderBy('created', 'desc'));
    onSnapshot(q,(querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id : doc.id,
        data : doc.data()
      })))
    })
  },[])

  return (
    <div className="dashboard">
      <header>Todo App</header>
      <div className="dashboard__container">
        <button onClick={() => navigate("/logout")}>Logout</button>
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        <div className="dashboard">
          {tasks.map((todo) => (
            <TodoList
                id={todo.id}
                key={todo.id}
                completed={todo.data.completed}
                title={todo.data.title}
                description={todo.data.description}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default Dashboard;
