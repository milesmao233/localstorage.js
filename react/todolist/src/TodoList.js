import React, { Component, Fragment }from 'react'
import TodoItem from './TodoItem'

const loadTodos = () => {
    const s = localStorage.savedTodos
    if (s === undefined) {
        return []
    } else {
        const ts = JSON.parse(s)
        return ts
    }
}

const saveTodo = (todo, todos) => {
    todos.push(todo)
    const s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            inputValue: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)

    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleBtnClick() {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        })
        // console.log(this.state.list)
        // localStorage.savedTodos = s
    }

    handleDelete(index) {
        const list = [...this.state.list]
        list.splice(index, 1)
        this.setState({
            list,
        })
    }

    render() {
        return (
            <Fragment>
                <div>
                    <input
                        onChange={this.handleInputChange}
                        value={this.state.inputValue}
                    />
                    <button onClick={this.handleBtnClick}>
                        add
                    </button>
                </div>
                <ul>
                    {this.state.list.map((item, index) => {
                        return (
                        <TodoItem
                            content={item}
                            deleteItem={this.handleDelete}
                            key={index}
                            index={index}
                        />
                        )
                    })}
                </ul>
            </Fragment>
        )
    }

    componentDidMount() {
        this.setState(() => ({
            list: loadTodos()
        }))
    }

}

export default TodoList