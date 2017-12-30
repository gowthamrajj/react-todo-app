import React, { Component } from 'react';
import './ToDoList.css';

class ToDoList extends Component {
  
  todos = [];

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  /*
  * Calling the delete method in Parent Component, which was passed in as props
  */
  delete(event) {
    console.dir(event.target);
    this.props.delete(event.target.parentElement.id);
  }

  render() {
    this.todos = this.props.todos;
    this.todos = this.todos.map((todo) => (
      // Adding id={todo.id} since react doesnt expose key attribute, and we need id attribute to identify our todo
      <li key={todo.id} id={todo.id}>
        <input type="checkbox" />
        <span>{todo.value}</span>
        <span className="pull-left close" onClick={this.delete}>X</span>
      </li>
      )
    );
    
    if(this.todos.length === 0) {
      return (
        <ul><li>Start adding your ToDos</li></ul>
      );
    }
    return (
      <ul>{this.todos}</ul>
    );
  }
}

export default ToDoList;
