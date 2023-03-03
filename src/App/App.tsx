import React, { Component } from "react"
import { TodoList, Header} from "../components"
import { ITodo } from "../types"

interface IAppState {
    todos: ITodo[]
}

export default class App extends Component<{}, IAppState> {

    state = {
        todos: [
            { id: 1, text: 'Learn React', done: false, important: false },
            { id: 2, text: 'Drink Water', done: false, important: false },
            { id: 3, text: 'Drink Soda', done: false, important: false },
        ]
    }

    onChangeStateTodos = (id: number, field: string) => {
        this.setState((state) => {
            const todoIdx = state.todos.findIndex(item => item.id === id)
            const newTodo = {
                ...state.todos[todoIdx],
                // @ts-ignore
                [field]: !state.todos[todoIdx][field]
            }

            const before = state.todos.slice(0, todoIdx);
            const after = state.todos.slice(todoIdx + 1)

            return {
                todos: [...before, newTodo, ...after]
            }
        })
    }

    render() {
        const { todos } = this.state;
        
        return (
            <div>
                <Header title="Todo App" />
                <TodoList
                    todos={todos}
                    onDone={(id) => this.onChangeStateTodos(id, 'done')}
                    onImportant={(id) => this.onChangeStateTodos(id, 'important')}
                />
            </div>
        )
    }
}