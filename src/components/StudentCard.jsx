import React from 'react';
import axios from 'axios';

class StudentCard extends React.Component {
  state = {
    _id: this.props.student._id,
    name: this.props.student.name,
    startingCohort: this.props.student.startingCohort,
    currentBlock: this.props.student.currentBlock,
    expanded: false,
    isLoaded: false,
    bigCardData: {}
  };

  componentDidMount() {
    this.getStudentByID(this.state._id);
  }

  getStudentByID(id) {
    axios
      .get(`https://nc-student-tracker.herokuapp.com/api/students/${id}`)
      .then(({ data }) => {
        this.setState({ bigCardData: data, isLoaded: true });
      });
  }

  toggle = isExpanded => {
    console.log('hello');
    this.setState({ expanded: !isExpanded });
  };

  render() {
    // console.log(this.state.bigCardData);
    return this.state.isLoaded ? (
      this.state.expanded ? (
        <BigCard
          toggle={this.toggle}
          expanded={this.state.expanded}
          student={this.state.bigCardData}
        />
      ) : (
        <SmallCard
          toggle={this.toggle}
          expanded={this.state.expanded}
          state={this.state}
        />
      )
    ) : (
      <p>loading...</p>
    );
  }
}

const BigCard = props => {
  // console.log(props.student.student);
  const { _id, name, startingCohort, blockHistory } = props.student.student;
  return (
    <li
      onClick={() => {
        props.toggle(props.expanded);
      }}
      className="studentlist-item"
    >
      <div>
        <h3>Name: {name}</h3>
        <p>ID: {_id}</p>
      </div>
      <div className="card-segment">
        <p>Starting Cohort: {startingCohort}</p>
        <ul>
          Block history:{' '}
          {blockHistory.map(block => {
            return <li>{block.name}</li>;
          })}
        </ul>
      </div>
    </li>
  );
};

const SmallCard = props => {
  const { _id, name, startingCohort, currentBlock } = props.state;
  return (
    <li
      onClick={() => {
        props.toggle(props.expanded);
      }}
      className="studentlist-item"
    >
      <div>
        <h3>Name: {name}</h3>
        {/* <p>{_id}</p> */}
      </div>
      <div className="card-segment">
        <p>Starting Cohort: {startingCohort}</p>
        <p>Current Block: {currentBlock}</p>
      </div>
      <label>
        Graduate: <input type="checkbox"></input>
      </label>
    </li>
  );
};

export default StudentCard;
