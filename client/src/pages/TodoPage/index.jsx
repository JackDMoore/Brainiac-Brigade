import React, { useState } from 'react';

const TodoPage = ({ tasks, onAddTask }) => {
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [points, setPoints] = useState(0);
  const [showDoneTasks, setShowDoneTasks] = useState(true);

  const handleAddItem = (text) => {
  const newItem = { id: Date.now(), text, done: false, dueDate: currentDate.toISOString() };
  setItems([...items, newItem]);
  onAddTask(text, currentDate.toISOString());
};


  const handleToggleDone = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, done: !item.done };
        if (updatedItem.done) {
          setPoints((prevPoints) => prevPoints + 100);
        } else {
          setPoints((prevPoints) => prevPoints - 100);
        }
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleEditItem = (id, newText) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, text: newText };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDeleteItem = (id, done) => {
    if (done) {
      setPoints((prevPoints) => prevPoints - 100);
    }
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
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
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  return (
    <div>
      <h2>{currentDate.toDateString()}</h2>
      <p>Points: {points}</p>

      <div>
        <button onClick={handlePreviousDay}>&#8592; Yesterday</button>
        <button onClick={handleNextDay}>Tomorrow &#8594;</button>
      </div>

      <TodoForm onAddItem={handleAddItem} />

      <button onClick={handleToggleShowDone}>
        {showDoneTasks ? 'Show Todos' : 'Show Done'}
      </button>

      <h3>{showDoneTasks ? 'Done Tasks' : 'Todo Tasks'}</h3>
      <TodoList
        items={handleFilterTasks()}
        onToggleDone={handleToggleDone}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

const TodoForm = ({ onAddItem }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const dueDate = new Date();
      onAddItem(text.trim(), dueDate);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

const TodoList = ({ items, onToggleDone, onEditItem, onDeleteItem }) => {
  return (
    <ul>
      {items.map((item) => (
        <TodoItem
          key={item.id}
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
    onToggleDone(item.id);
  };

  const handleEdit = (e) => {
    const newText = prompt('Enter new text:', item.text);
    if (newText) {
      onEditItem(item.id, newText.trim());
    }
  };

  const handleDelete = () => {
    onDeleteItem(item.id, item.done);
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
      <div>
        <input type="checkbox" checked={item.done} onChange={handleToggle} />
        <span className={item.done ? 'done' : ''}>{item.text}</span>
        <span className={taskColor}>{daysRemaining} days left</span>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TodoPage;
