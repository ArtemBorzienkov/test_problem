import React from 'react';
import callAPI from './callAPI';
import './index.css'

class NoteModal extends React.PureComponent {
  state = {
    note: {},
  }

  componentDidMount = async () => {
    const response = await callAPI({
        method: 'GET', 
        url: `http://159.89.96.181/api/v1/notes/:${this.props.note.id}`, 
        token: this.props.token
      },
      this.props.handleError
    );
    if (response && response.notes && response.notes.length > 0) {
      this.setState({note: response.notes[0]})
    }
  }

  onClose = () => {
    this.props.closeModal()
  }

  render() {
    return (
      <div className="modal-note">
        <p className="modal-note__title">
          {this.state.note.title || 'Unfortunately requested note is unavailable now'}
        </p>
        <span className="modal-note__content">
          {this.state.note.content}
        </span>
        <button onClick={() => this.props.editNote(this.props.note)}>Edit Note</button>
      </div>
    );
  }
}

export default NoteModal