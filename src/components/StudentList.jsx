import React from 'react';
import StudentCard from './StudentCard';

class StudentList extends React.Component {
  render() {
    return (
      <div>
        <p>Here is button</p>
        <form onSubmit={this.handleSubmit}>
          <ul className="list-container">
            {this.props.studentData.map(student => {
              return (
                <StudentCard
                  key={student._id}
                  value={student._id}
                  student={student}
                />
              );
            })}
          </ul>
        </form>
      </div>
    );
  }
}

export default StudentList;
