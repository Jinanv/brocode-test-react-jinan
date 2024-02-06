import React from 'react'
import TaskList from './Components/TaskList'
import TaskCreation from './Components/TaskCreation'
import TaskUpdate from './Components/TaskUpdate'

function App() {
  return (
    <div>
      <TaskList/>
      <TaskCreation/>
      <TaskUpdate/>
    </div>
  )
}

export default App
