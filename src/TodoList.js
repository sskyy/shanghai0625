import React from 'react'
import {ThemeContext, ThemeReceiver} from "./ThemeContext";
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

export default class TodoList extends React.Component {
  static contextType = ThemeContext
  constructor(props) {
    super();
    this.state = {
      todoInputText: '',
      // 如果外部传入了 todos prop，那么就作为初始值。
      // 例如这里演示的是和 withLocalStorage 结合，每次刷新都从 localStorage 里读之前有的数据。
      todos: props.todos || []
    }
  }
  componentDidUpdate(){
    // 如果外部传入了 onChange 回调，那么就在每次数据变化的时候都调用
    // 这里是为了演示和 withLocalStorage 结合，实现每次变化都存到 localStorage 的效果。
    this.props.onChange && this.props.onChange(this.state.todos)
  }
  onInputChange = (e) => {
    this.setState(() => ({
      todoInputText: e.target.value
    }))
  }
  onInputKeyDown = (e) => {
    if (e.keyCode ===13) {
      this.setState(({todos,todoInputText }) => ({
        todos: [
          {id: Date.now(), content: todoInputText, completed: false},
          ...todos
        ],
        todoInputText: ''
      }))
    }
  }
  toggleTodo = (todo) => {
    this.setState(({ todos }) => {
      const index = todos.findIndex(i => i.id===todo.id)
      return {
        todos: [
          ...todos.slice(0, index),
          {...todo, completed: !todo.completed},
          ...todos.slice(index+1)
        ]
      }
    })
  }
  destroyTodo = (todo) => {
    // 对数组的操作不要忘了创建新的数据引用。数组的 slice 和 concat 都能创建新的引用。splice/pop/push/shift/unshift 都是操作原引用。
    this.setState(({ todos }) => {
      const index = todos.findIndex(i => i.id===todo.id)
      return {
        todos: todos.slice(0, index).concat(todos.slice(index+1))
      }
    })
  }
  render() {
    /**
     * 几个重点：
     * 1. 不要忘记循环渲染时的 `key` prop 来表示唯一性。
     * 2. 最下面的 theme 的写法演示了 render props。
     */
    return (
        <div className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={this.state.todoInputText}
                onKeyDown={this.onInputKeyDown}
                onChange={this.onInputChange}
                autoFocus={true}
            />
          </header>
          <section className="main">
            <ul className="todo-list">
              {this.state.todos.map(todo => (
                  <li key={todo.id}>
                    <div className="view">
                      <input
                          className="toggle"
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => this.toggleTodo(todo)}
                      />
                      <label>
                        {todo.content}
                      </label>
                      <button className="destroy" onClick={() => this.destroyTodo(todo)} />
                    </div>
                  </li>

              ))}
            </ul>
          </section>
          <ThemeReceiver>
            {(theme) => {
              return <div>theme mode: {theme.mode}</div>
            }}
          </ThemeReceiver>
        </div>
    );
  }
}

