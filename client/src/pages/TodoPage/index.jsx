import React, { useState, useEffect } from 'react';

const TodoPage = ({ tasks, onAddTask }) => {
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [points, setPoints] = useState(0);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [outstandingItems, setOutstandingItems] = useState([]);

  useEffect(() => {
    const filteredOutstandingItems = items.filter(
      (item) => !item.done && item.finish !== null && new Date(item.finish) < currentDate
    );
    setOutstandingItems(filteredOutstandingItems);
  }, [items, currentDate]);

  const handleAddItem = (text) => {
  const newItem = { id: Date.now(), text, done: false, dueDate: currentDate.toISOString() };
  setItems([...items, newItem]);
  onAddTask(text, currentDate.toISOString());
};


  const handleToggleDone = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        let pointsToAdd = 0;
  
        if (item.done) {
          
          if (item.finish && new Date(item.finish) < currentDate) {
            
            pointsToAdd = 50;
          }
        } else {
          setPoints((prevPoints) => prevPoints - 100);
        }
  
        const updatedItem = { ...item, done: !item.done };
        setPoints((prevPoints) => prevPoints + pointsToAdd);
        return updatedItem;
      }
      return item;
    });
  
    setItems(updatedItems);
  };
  

  const handleEditItem = (id, newText, newHours, newDays) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        let finish = null;
  
        if (newHours && newHours !== '') {
          const finishDate = new Date();
          finishDate.setHours(finishDate.getHours() + parseInt(newHours));
          finish = finishDate.toISOString();
        } else if (newDays && newDays !== '') {
          const finishDate = new Date();
          finishDate.setDate(finishDate.getDate() + parseInt(newDays));
          finish = finishDate.toISOString();
        }
  
        return { ...item, text: newText, hours: newHours, days: newDays, finish };
      }
      return item;
    });
  
    setItems(updatedItems);
  };
  
  
  const TodoItem = ({ item, onToggleDone, onEditItem, onDeleteItem }) => {
    const handleToggle = () => {
      onToggleDone(item.id);
    };
  
    const handleEdit = () => {
      const newText = prompt('Enter new text:', item.text);
      if (newText !== null) {
        const newTime = prompt('Enter new time (hours:days):', `${item.hours || ''}:${item.days || ''}`);
        if (newTime !== null) {
          const [newHours, newDays] = newTime.split(':');
          onEditItem(item.id, newText.trim(), newHours.trim(), newDays.trim());
        }
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
  
  
  

  const handleDeleteItem = (id, done) => {
    if (done) {
      setPoints((prevPoints) => prevPoints - 100);
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
  
      const updatedItems = items.map((item) => {
        if (!item.done) {
          const finishDate = new Date(item.start);
          const hoursToFinish = parseInt(item.hours);
          const daysToFinish = parseInt(item.days);
          finishDate.setHours(finishDate.getHours() + hoursToFinish);
          finishDate.setDate(finishDate.getDate() + daysToFinish);
  
          if (finishDate < newDate) {
            return { ...item, start: null, finish: null };
          }
        }
        return item;
      });
  
      setItems(updatedItems);
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

      <h3>Outstanding Tasks</h3>
      <TodoList
        items={outstandingItems}
        onToggleDone={handleToggleDone}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

const TodoForm = ({ onAddItem }) => {
  const [text, setText] = useState('');
  const [hours, setHours] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const dueDate = new Date();
      onAddItem(text.trim(), dueDate);
      setText('');
      setHours('');
      setDays('');
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
      <input
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
      onEditItem(item.id, newText.trim(), item.hours, item.days);
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


