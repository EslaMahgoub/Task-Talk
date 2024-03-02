import {useState, useEffect} from 'react'
import useAxios from '../../utils/useAxios'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'

function Todo() {
    const api = useAxios()

    const token = localStorage.getItem("authTokens")
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id
    

    const [todos, setTodos] = useState()
    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
      await api.get("todos/").then((res) => {
        setTodos(res.data.results)
      })
    }

    const [createTodo, setCreateTodo] = useState({"title": "", "completed": ""});
    const handleNewTodoTitle = (event) => {
      setCreateTodo({
        ...createTodo,
        [event.target.name]: event.target.value
      })
    }

    const formSubmit = () => {
        const todoFormData = new FormData()

        todoFormData.append("user", user_id)
        todoFormData.append("title", createTodo.title)
        todoFormData.append("completed", false)
        
        try{
          if (!createTodo.title) {
            Swal.fire({
                title: "Title is empty",
                text: "Title field cannot be empty, please enter one before submitting..",
                icon: "error",
                toast: true,
                timer: 3000,
                position: "top-right",
                timerProgressBar: true,
                showConfirmButton: true,
            });
            return;
          }
          api.post('todos/', todoFormData).then((res) => {
              Swal.fire({
                  title: "Todo Added",
                  icon:"success",
                  toast: true,
                  timer: 2000,
                  position: "top-right",
                  timerProgressBar: true,
              })
              setTodos([...todos, res.data])
              createTodo.title = ""
          }).catch(err => {
            Swal.fire({
              title: "Error Accurred, please try again later.",
              icon:"error",
              toast: true,
              timer: 2000,
              position: "top-right",
              timerProgressBar: true,
          })
          })
        } catch (error){
            console.log(error);
        }
    }

    const deleteTodo = async (todo_id) => {
      try {
        await api.delete(`/todos/${todo_id}`)
        setTodos((todos) => todos.filter(todo => todo.id != todo_id))
        Swal.fire({
            title: "Todo Deleted",
            icon:"success",
            toast: true,
            timer: 2000,
            position: "top-right",
            timerProgressBar: true,
        });
      } catch (error) {
        console.error('Error deleting todo:', error);
        
        // Rollback UI changes on deletion failure, re-fetch the todos to synchronize with the server
        fetchTodos();
      }
    };

    const updateTodo = async (todo_id) => {
      const currentTodo = await api.get(`/todos/${todo_id}`);
      const updatedData = {
        ...currentTodo.data,
        is_completed: true,
      };
      await api.patch(`/todos/${todo_id}/`, updatedData)
      Swal.fire({
          title: "Todo Completed, Congratulations.",
          icon:"success",
          toast: true,
          timer: 2000,
          position: "top-right",
          timerProgressBar: true,
      })
      fetchTodos()
  }

  return (
    <div>
      <div>
        <div className="container" style={{marginTop:"150px", padding:"10px"}}>
          <div className="row justify-content-center align-items-center main-row mx-auto">
            <div className="col shadow main-col bg-white">
                <div className="row bg-secondary text-white">
                  <div className="col p-2">
                      <h4>Todo List</h4>
                  </div>
              </div>
              <div className="row mx-auto p-2">
                  <div className='col-10'>
                    <div className="form-group flex-fill mb-2">
                      <input id="todo-input" name='title' onChange={handleNewTodoTitle} value={createTodo.title} type="text" className="form-control" placeholder='Write a todo...'  />
                    </div>
                  </div>
                  <div className='col-2'>
                    <button type="button" onClick={formSubmit} className="btn btn-secondary mb-2 ml-2"> Add todo </button>
                  </div>
              </div>
              <div className="row" id="todo-container">
                {Array.isArray(todos) ? (
                  todos.map(todo => (
                    <div className="col col-12 p-2 todo-item" key={todo.id}>
                    <div className="input-group ">
                          {todo.is_completed.toString() === "true" && 
                            <p className="form-control"><strike>{todo.title}</strike></p>
                        }
                        {todo.is_completed.toString() === "false" && 
                            <p className="form-control">{todo.title}</p>
                        } 
                        <div className="input-group-append">
                            <button className="btn bg-success text-white ml-2" type="button" id="button-addon2" onClick={() => updateTodo(todo.id)} ><i className='fa fa-check' ></i></button>
                            <button className="btn bg-danger text-white me-2 ms-2 ml-2" type="button" id="button-addon2" onClick={() => deleteTodo(todo.id)} ><i className='fa fa-trash' ></i></button>
                        </div> 
                    </div>
                </div>
                  ))
                ) : (
                    <p>Loading...</p>
                )}
                    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
)
}

export default Todo