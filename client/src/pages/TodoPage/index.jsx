import React, { useState } from 'react';

const TodoPage = () => {
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [points, setPoints] = useState(0);
  const [showDoneTasks, setShowDoneTasks] = useState(true); 

  const handleAddItem = (text) => {
    const newItem = { id: Date.now(), text, done: false };
    setItems([...items, newItem]);
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

      <h3>{showDoneTasks ? 'Done Tasks' : 'Todo Tasks'}</h3> {}
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
      onAddItem(text.trim());
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
          onDeleteItem={() => onDeleteItem(item.id, item.done)} 
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

  return (
    <li>
      <input type="checkbox" checked={item.done} onChange={handleToggle} />
      <span className={item.done ? 'done' : ''}>{item.text}</span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoPage;
