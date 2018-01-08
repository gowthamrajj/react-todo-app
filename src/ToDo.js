import React, { Component } from 'react';
import ToDoList from './ToDoList';
import './ToDo.css';

class ToDo extends Component {

  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.addOnEnter = this.addOnEnter.bind(this);
    this.state = {
      todos : []
    };
  }

  /*
  * add the given todo
  */
  add() {
    var el = document.querySelector('#todo');
    // dont add if its a empty todo.
    if(el.value !== '') {
      // if we dont use the setState method, react wont trigger re-render and it is better to update the state using setState() method.
      //this.setState(this.state.todos.slice(0, index));
      this.setState((prevState) => {
        prevState.todos.push({
          id: (new Date()).toJSON(),
          value: el.value
        });
        return {
          todos : prevState.todos
        }
      });
      // if not in settimeout, it executes before setState, and empty string gets added to todo
      setTimeout(() => el.value = '', 0);
    }
  }

  /*
  * Delete the todo based on the passed id.
  */
  delete(id) {
    for(let i=0; i<this.state.todos.length; i++) {
      if(id === this.state.todos[i].id) {
        this.setState((prevState) => {
          // todos: prevState.todos.splice(i, 1); wont work, since since Array.splice returns the removed element.
          // And the removed element would be assigned to todos, which is not we want.
          prevState.todos.splice(i, 1);
          return {
            todos : prevState.todos
          }
        });
      }
    }
  }

  /*
  * if Enter is pressed, add todo.
  */
  addOnEnter(e) {
    if(e.key === 'Enter')
      this.add();
  }

  render() {
    return (
      <div className="ToDo">
        <header className="ToDo-header">
          <h1 className="ToDo-title">To Do React App</h1>
        </header>
        <div className="ToDoList">
          {
            /*
            * Passing the todos and delete method to our child Component ToDoList as props.
            * Child Component wont be able to alter Parent Component's state directly. Hence we pass in the delete method.
            */
          }
          <ToDoList delete={this.delete} todos={this.state.todos}/>
          <div className="input-block">
            <input type="text" id="todo" name="name" placeholder="Enter you ToDo here" onKeyPress={this.addOnEnter}/>
            <button onClick={this.add}>Add ToDo</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDo;
