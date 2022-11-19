import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Exercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercise: props.exercise,
      deleteExercise: props.deleteExercise
    };
  }

  render() {
    return (
      <tr>
        <td>{this.state.exercise.username}</td>
        <td>{this.state.exercise.description}</td>
        <td>{this.state.exercise.duration}</td>
        <td>{this.state.exercise.date.substring(0,10)}</td>
        <td>
          <Link to={"/edit/"+this.state.exercise._id}>edit</Link> | <a href="#" onClick={() => {this.state.deleteExercise(this.state.exercise._id)}}>delete</a>
        </td>
      </tr>

    );
  }
}

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.exerciseList = this.exerciseList.bind(this);

    this.state = {
      exercises: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
         .then(res => {
           this.setState({ exercises: res.data });
         })
         .catch(err => console.log(err));
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/' + id)
         .then(res => console.log(res));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  exerciseList() {
    var i = 0;
    return this.state.exercises.map(currentexercise => {
      i = i + 1;
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thread-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    );
  }
}
