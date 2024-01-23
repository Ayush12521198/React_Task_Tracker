import './App.css';
import CustomButton from './Component/CustomButton';
import CustomInput from './Component/CustomInput';
import Header from './Component/Header';
import Card from './Component/Card';
import { useState } from 'react';

function App() {
  const [add, setAdd] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [singleTask, setSingleTask] = useState('');
  const [singleDes, setSingleDes] = useState('');
  const [filter, setFilter] = useState('all');

  const updateTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, complete: true } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => (t.id === id ? false : true)));
  };

  const addToCard = () => {
    const id = tasks.length === 0 ? 1 : tasks.length + 1;
    const taskDetail = {
      id: id,
      task: singleTask,
      des: singleDes,
      date: new Date().toLocaleDateString(),
      complete: false,
    };
    setTasks([...tasks, taskDetail]);
    setFilter('all'); // Reset filter to show all tasks after adding a new task
    clearInput();
  };

  const clearInput = () => {
    setSingleTask('');
    setSingleDes('');
  };

  const handleCustomTask = (event) => {
    setSingleTask(event.target.value);
  };

  const handleCustomDes = (event) => {
    setSingleDes(event.target.value);
  };

  const handleInput = () => {
    setAdd(!add);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks =
    filter === 'all'
      ? tasks
      : filter === 'completed'
      ? tasks.filter((task) => task.complete)
      : tasks.filter((task) => !task.complete);

  return (
    <div className='main'>
      <div className='inputSection'>
        <Header handleInput={handleInput} />
        {add === true ? (
          <>
            <CustomInput
              value={singleTask}
              placeHolder='Enter Task'
              name='Task'
              change={handleCustomTask}
            />
            <CustomInput
              value={singleDes}
              placeHolder='Enter Description'
              name='Description'
              change={handleCustomDes}
            />
            <div className='btnwrapper'>
              <CustomButton
                color='White'
                bg='#1877F2'
                name='Save Task'
                click={addToCard}
              />
              <CustomButton
                color='White'
                bg='red'
                name='Cancel'
                click={clearInput}
              />
            </div>
          </>
        ) : null}
      </div>

      <div className='filterSection'>
        <label>Filter: </label>
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          value={filter}
        >
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='incomplete'>Incomplete</option>
        </select>
      </div>

      <div className='cardSection'>
        {filteredTasks.map((t) => (
          <Card
            title={t.task}
            des={t.des}
            date={t.date}
            complete={t.complete}
            key={t.id}
            delete={() => deleteTask(t.id)}
            update={() => updateTask(t.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
