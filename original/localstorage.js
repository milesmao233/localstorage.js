// 加载LocalStorage 中的 todos
// 循环插入到页面中
// 进行事件绑定
// 如果点击添加，那么将todos中增加todo,并且在页面中添加
// 如果点击删除，那么将todos中的todo删除，然后页面中也去除
// 如果点击完成，那么加上done的css
// 删除和完成可以放在一起完成，找到点击的父元素，对父元素进行处理

const log = console.log.bind(console)

const e = function(selector) {
    const element = document.querySelector(selector)
    return element
}

const template = (todo) => {
    const t = `
        <div class="todo-cell">
            <button class="todo-done">完成</button>
            <button class="todo-delete">删除</button>
            <span contenteditable="true">${todo}</span>
        </div>
    `
    return t
}

const loadTodos = () => {
    const s = localStorage.savedTodos
    if (s === undefined) {
        return []
    } else {
        const ts = JSON.parse(s)
        return ts
    }
}

const insertTodos = (todos) => {
    const todoContainer = e('#id-div-container')
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i]
        const t = template(todo)
        todoContainer.insertAdjacentHTML('beforeend', t)
    }
}

const insertTodo = (todo) => {
    const todoContainer = e('#id-div-container')
    const t = template(todo)
    todoContainer.insertAdjacentHTML('beforeend', t)
}

const saveTodo = (todo, todos) => {
    todos.push(todo)
    const s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

const bindEventAdd = (todos) => {
    const addButton = e('#id-button-add')
    addButton.addEventListener('click', function () {
        const todoInput = e('#id-input-todo')
        const todo = todoInput.value
        saveTodo(todo, todos)
        insertTodo(todo)
    })
}

const deleteTodo = (todoCell, container, todos) => {
    for (let i = 0; i < container.children.length; i++) {
        const cell = container.children[i]
        if (todoCell === cell) {
            // 删除页面
            todoCell.remove()
            // 删除数组中的todo
            todos.splice(i, 1)
            localStorage.savedTodos = JSON.stringify(todos)
        }
    }
}

const bindEventDeleteAndComplete = (todos) => {
    const todoContainer = e('#id-div-container')
    todoContainer.addEventListener('click', function (event) {
        const self = event.target
        if (self.classList.contains('todo-delete')) {
            const todoDiv = self.parentElement
            const container = todoDiv.parentElement
            deleteTodo(todoDiv, container, todos)
        } else if (self.classList.contains('todo-done')) {
            const todoDiv = self.parentElement
            todoDiv.classList.toggle('done')
        }
    })


}

const bindEvents = (todos) => {
    bindEventAdd(todos)
    bindEventDeleteAndComplete(todos)
}

const __main = () => {
    const todos = loadTodos()
    insertTodos(todos)
    bindEvents(todos)
}

__main()