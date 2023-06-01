import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './todo.css'

const TodoPage = () => {
  // getting the date from params
  const { date } = useParams()
  // converting data string to date format
  let showDate = new Date(date)

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('')
  // setting initial date to be the one coming from params
  const [currentDate, setCurrentDate] = useState(showDate);
  const [points, setPoints] = useState(0);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [outstandingItems, setOutstandingItems] = useState([]);

  const fetchTodos = async () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}` }
    }
    const response = await axios.get('http://localhost:3000/events', config)
    const data = await response.data
    const todayData = data.filter(d => d.end === currentDate.toISOString())

    setItems(todayData)
  }

  const fetchUserPoints = async () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}` }
    }
    const response = await axios.get('http://localhost:3000/users/points', config)
    const data = await response.data
    setPoints(data)
  }

  const updateUserPoints = async () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}` }
    }

    const newPoints = { points: points }

    const response = await axios.post('http://localhost:3000/users/points', newPoints, config)
  }


  useEffect(() => {
    fetchTodos()
  }, [])

  useEffect(() => {
    fetchUserPoints()
  }, [])

  useEffect(() => {
    if(points != 0) {
      updateUserPoints()
    }
  }, [points])



  useEffect(() => {
    const filteredOutstandingItems = items.filter(
      (item) => !item.done && item.finish !== null && new Date(item.finish) < currentDate
    );
    setOutstandingItems(filteredOutstandingItems);
  }, [items, currentDate]);

  const handleAddItem = (item, text) => {
  const newItem = { id: item._id, text, done: false, dueDate: currentDate.toISOString() };
  setItems([...items, newItem]);
  onAddTask(text, currentDate.toISOString());
};


  const handleToggleDone = async (item) => {
    // done is being used backwards here because I couldnt fix the previous toggle properly
    // done = false - completed
    // done = true - incomplete

    const updatedItem = { ...item, done: !item.done }


    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}` }
    }

    const response = await axios.patch(`http://localhost:3000/events/${item._id}`, updatedItem, config)

    if (item.done === false) {
      setPoints((prevPoints) => prevPoints + 100)
      setMessage(`todo: ${item.text} was marked as completed`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

    if (item.done === true) {
      setPoints((prevPoints) => prevPoints - 100)
      setMessage(`todo: ${item.text} was marked as incomplete`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

    fetchTodos()
  };


  const handleEditItem = async (item, newText, newHours, newDays) => {
        // TODO
        const updatedItem = {
          text: newText
          // start: newHours,
          // days: newDays,
        };
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}` }
        }

        const response = await axios.patch(`http://localhost:3000/events/${item._id}`, updatedItem, config)
        fetchTodos()
  };


  const TodoItem = ({ item, onToggleDone, onEditItem, onDeleteItem }) => {
    const handleToggle = () => {
      onToggleDone(item);
    };


    const handleDelete = () => {
      onDeleteItem(item, item.done);
    };

    return (
      <li>
        <input type="checkbox" checked={item.done} onClick={handleToggle} />
        <span className={item.done ? 'done' : ''}>{item.text}</span>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </li>
    );
  };


  const handleDeleteItem = async (item, done) => {
    if (done) {
      setPoints((prevPoints) => prevPoints - 100);
      setPoints((prevPoints) => prevPoints - 100);
    }

    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}` }
    }

    const response = await axios.delete(`http://localhost:3000/events/${item._id}`, config)

    setMessage(`todo: ${item.text} was deleted`)
    setTimeout(() => {
      setMessage(null)
    }, 5000);

    fetchTodos()
  };

  const handleFilterTasks = () => {
    if (showDoneTasks) {
      return items.filter((item) => item.done);
    } else {
      return items.filter((item) => !item.done);
    }
  };

  const handleToggleShowDone = () => {
    setShowDoneTasks((prevState) => !prevState);
  };

  const handlePreviousDay = () => {
    let dateToChange = currentDate
    let nextDate = dateToChange.setDate(dateToChange.getDate() - 1)

    const dateFormatted = new Date(nextDate)
    setCurrentDate(dateFormatted)
    fetchTodos()
  };

  const handleNextDay = () => {
    let dateToChange = currentDate
    let nextDate = dateToChange.setDate(dateToChange.getDate() + 1)

    const dateFormatted = new Date(nextDate)
    setCurrentDate(dateFormatted)
    fetchTodos()
  };

  const notificationStyle = {
    color: "#FF8E3C",
    background: '#242424',
    fontSize: 20,
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    border: "1px solid #FF8E3C",
  }


  return (
    <div>
      <h2 className='date-header'>{currentDate.toDateString()}</h2>
      {/* <h2>{showDate.toDateString()}</h2> */}
      <p>Points: {points}</p>

      <div className='y-t-buttons'>
        <button onClick={handlePreviousDay}>&#8592; Yesterday</button>
        <button onClick={handleNextDay}>Tomorrow &#8594;</button>
      </div>


      <TodoForm onAddItem={handleAddItem} setItems={setItems} currentDate={currentDate} fetchTodos={fetchTodos} setMessage={setMessage}/>

      <button className='show-button' onClick={handleToggleShowDone}>
        {showDoneTasks ? 'Show Todos' : 'Show Completed'}
      </button>

      {
        message ? <div style={notificationStyle}>{message}</div> : null
      }

      <h3 className='todo-header'>{showDoneTasks ? 'Completed Tasks' : 'Todo Tasks'}</h3>
      <TodoList
        items={handleFilterTasks()}
        onToggleDone={handleToggleDone}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />

      {/* <h3>Outstanding Tasks</h3>
      <TodoList
        items={outstandingItems}
        onToggleDone={handleToggleDone}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      /> */}
    </div>
  );
};

const TodoForm = ({ setItems, onAddItem, currentDate, fetchTodos, setMessage}) => {
  const [text, setText] = useState('');
  // const [hours, setHours] = useState('');
  // const [days, setDays] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO

    const newItem = {
      text: text,
      end: currentDate
      // start: null,
      // days: null,
      // done: false,
    };
    console.log(newItem, 'l279')
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}` }
    }

    const response = await axios.post('http://localhost:3000/events', newItem, config)
    const createdItem = response.data

    setMessage(`a new todo: ${createdItem.text} was added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000);

    fetchTodos()



    if (text.trim()) {
      const dueDate = new Date();
      onAddItem(dueDate);
      setText('');
      // setHours('');
      // setDays('');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        {/* <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours to complete"
        />
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Days to complete"
        /> */}
        <button id="add-button" type="submit">+</button>
      </form>
    </div>
  );
};

const TodoList = ({ items, onToggleDone, onEditItem, onDeleteItem }) => {
  return (
    <ul className='todo-list'>
      {items.map((item) => (
        <TodoItem
          key={item._id}
          item={item}
          onToggleDone={onToggleDone}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </ul>
  );
};

const TodoItem = ({ item, onToggleDone, onEditItem, onDeleteItem }) => {
  const handleToggle = () => {
    onToggleDone(item);
  };

  const handleEdit = (e) => {
    e.preventDefault()
    const newText = prompt('Enter new text:', item.text);
    if (newText) {
      onEditItem(item, newText.trim(), item.hours, item.days);
    }
  };

  const handleDelete = () => {
    onDeleteItem(item, item.done);
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining >= 0 ? daysRemaining : 0;
  };

  const getTaskColor = (daysRemaining) => {
    if (daysRemaining >= 7) {
      return 'yellow';
    } else if (daysRemaining >= 3 && daysRemaining <= 6) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const daysRemaining = getDaysRemaining(item.dueDate);

  const renderDaysRemaining = () => {
    if (item.done) {
      return <span className="completed">Completed</span>;
    } else {
      const currentDate = new Date();
      const dueDate = new Date(item.dueDate);
      const timeDifference = dueDate.getTime() - currentDate.getTime();
      const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

      let colorClass = '';

      if (daysRemaining >= 7) {
        colorClass = 'yellow';
      } else if (daysRemaining >= 3 && daysRemaining <= 6) {
        colorClass = 'orange';
      } else {
        colorClass = 'red';
      }

      return <span className={colorClass}>{daysRemaining} day(s) remaining</span>;
    }
  };

  const taskColor = getTaskColor(daysRemaining);

  return (
    <li>
      <div className='todos-container'>
        <div>
          <input type="checkbox" checked={item.done} onChange={handleToggle} />
          <span id="todos-items" className={item.done ? 'done' : ''}>{item.text}</span>
          {/* <span className={taskColor}>{daysRemaining} days left</span> */}
        </div>
        <div>
          <button className="edit-button"onClick={handleEdit}>Edit</button>
          <button className="delete-button"onClick={handleDelete}>Remove</button>
        </div>
      </div>
    </li>
  );
};

export default TodoPage;
