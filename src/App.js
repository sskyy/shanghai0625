import React from 'react'
import TodoList from "./TodoList";
import withLocalStorage from "./withLocalStorage";
import { ThemeContext } from "./ThemeContext";
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

// 经过 HOC 包装后，具备了从 localStorage 读取和每次变化时自动存储的能力。
// 修改了 todo list 之后刷新试试，值都被保存了
const TodoListWithStorage = withLocalStorage(TodoList, {propName: 'todos'})

class App extends React.Component {
  render() {

    return <ThemeContext.Provider value={{mode: 'light'}} >
      <TodoListWithStorage />
    </ThemeContext.Provider>
  }
}

export default App;
