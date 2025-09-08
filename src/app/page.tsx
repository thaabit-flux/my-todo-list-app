"use client";

import React, { Component } from 'react';

// Custom SVG Icons
const Plus = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const X = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Check = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const Edit3 = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

export default class TodoApp extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
      inputValue: '',
      filter: 'all',
      editingId: null,
      editValue: ''
    };
  }

  componentDidMount() {
    // Load todos from localStorage on mount
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.setState({ todos: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = () => {
    if (this.state.inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: this.state.inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      this.setState({
        todos: [newTodo, ...this.state.todos],
        inputValue: ''
      });
    }
  }

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    });
  }

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  startEditing = (id, text) => {
    this.setState({
      editingId: id,
      editValue: text
    });
  }

  saveEdit = (id) => {
    if (this.state.editValue.trim()) {
      this.setState({
        todos: this.state.todos.map(todo =>
          todo.id === id ? { ...todo, text: this.state.editValue.trim() } : todo
        ),
        editingId: null,
        editValue: ''
      });
    }
  }

  cancelEdit = () => {
    this.setState({
      editingId: null,
      editValue: ''
    });
  }

  clearCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.completed)
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      this.saveEdit(id);
    } else if (e.key === 'Escape') {
      this.cancelEdit();
    }
  }

  render() {
    const { todos, inputValue, filter, editingId, editValue } = this.state;

    const filteredTodos = todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });

    const activeCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.filter(todo => todo.completed).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">

            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
                Todo<span className="text-indigo-600">.</span>
              </h1>
              <p className="text-gray-600 text-lg">Stay organized, stay productive</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => this.setState({ inputValue: e.target.value })}
                    onKeyPress={this.handleKeyPress}
                    placeholder="Add a new todo..."
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors duration-200 placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={this.addTodo}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 flex items-center gap-2 font-medium"
                >
                  <Plus size={20} />
                  Add
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl mb-8 border border-gray-100">
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{activeCount}</div>
                      <div className="text-sm text-gray-600">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                      <div className="text-sm text-gray-600">Done</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{todos.length}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                  </div>
                  {completedCount > 0 && (
                    <button
                      onClick={this.clearCompleted}
                      className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    >
                      Clear Completed
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  {['all', 'active', 'completed'].map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => this.setState({ filter: filterType })}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
                        filter === filterType
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {filterType}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {filteredTodos.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-medium mb-2">No todos yet</h3>
                  <p>Add your first todo above to get started!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredTodos.map((todo, index) => (
                    <div
                      key={todo.id}
                      className={`p-4 transition-all duration-200 hover:bg-gray-50 ${
                        todo.completed ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Toggle Button */}
                        <button
                          onClick={() => this.toggleTodo(todo.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            todo.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {todo.completed && <Check size={14} />}
                        </button>

                        {/* Todo Text */}
                        <div className="flex-1">
                          {editingId === todo.id ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editValue}
                                onChange={(e) => this.setState({ editValue: e.target.value })}
                                onKeyPress={(e) => this.handleEditKeyPress(e, todo.id)}
                                onBlur={() => this.saveEdit(todo.id)}
                                className="flex-1 px-3 py-1 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <div
                              onDoubleClick={() => this.startEditing(todo.id, todo.text)}
                              className={`cursor-pointer transition-all duration-200 ${
                                todo.completed
                                  ? 'text-gray-500 line-through'
                                  : 'text-gray-800'
                              }`}
                            >
                              <div className="font-medium">{todo.text}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                {new Date(todo.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          )}
                        </div>

      
                        <div className="flex gap-2">
                          {!todo.completed && editingId !== todo.id && (
                            <button
                              onClick={() => this.startEditing(todo.id, todo.text)}
                              className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200"
                            >
                              <Edit3 size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => this.deleteTodo(todo.id)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}