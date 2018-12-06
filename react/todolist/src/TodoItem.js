import React, { Component }from 'react'

class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {
        const { deleteItem, index} = this.props
        deleteItem(index)
    }

    render() {
        const { content } = this.props
        return (
            <div>
                <button className="todo-done">完成</button>
                <button className="todo-edit">修改</button>
                <button className="todo-delete" onClick={this.handleDelete}>删除</button>
                <span suppressContentEditableWarning={true}>{content}</span>
            </div>
        )
    }
}

export default TodoItem