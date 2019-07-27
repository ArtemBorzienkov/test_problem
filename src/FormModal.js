import React from 'react';
import callAPI from './callAPI';
import './index.css'


class FormModal extends React.PureComponent {
  state = {
    title: '',
    content: '',
    id: null
  }

  header = {
    headers: `Bearer ${this.state.token}`
  }

  componentDidMount = () => {
    if (this.props.noteToEdit) {
      this.setState({
        title: this.props.noteToEdit.title,
        content: this.props.noteToEdit.content,
        id: this.props.noteToEdit.id,
      })
    }
  }

  closeModal = () => {
    this.props.onClose()
  }

  saveInfo = (e) => {
    const target = e.currentTarget.getAttribute('data-name');
    const nextValue = e.currentTarget.value;
    this.setState({[target]: nextValue});
  }

  handleSend = async () => {
    const {title, content} = this.state;
    const response = await callAPI({
        method: 'POST', 
        url: 'http://159.89.96.181/api/v1/notes',  
        token: this.props.currentUser.token,
        data: {title, content}
      },
      this.props.handleError
    );
    if (response && response.data) {
      this.props.createNote(response.data);
    }
  }

  handleEdit = async () => {
    const {title, content} = this.state;
    const response = await callAPI({
        method: 'PATCH', 
        url: `http://159.89.96.181/api/v1/notes/:${this.props.noteToEdit.id}`,  
        token: this.props.currentUser.token,
        data: {title, content},
        additionalParams: this.props.noteToEdit.id
      },
      this.props.handleError
    );
    if (response && response.data) {
      this.props.createNote(response.data);
    }
  }

  render() {
    const editModal = !!this.props.noteToEdit.content
    return (
      <div className="modal-form">
        <div className="modal-form__title">
          {editModal? 'Edit your Note!' : 'Create a new Note!'}
        </div>
        <form className="modal-form__form">
          <input
            value={this.state.title}
            placeholder='Title' 
            onChange={this.saveInfo} 
            data-name='title' 
          />
          <textarea 
            value={this.state.content} 
            placeholder='Note content' 
            onChange={this.saveInfo} 
            data-name='content' 
          />
        </form>
        <div className="modal-form__footer">
          {editModal? (
            <button onClick={this.handleEdit}>Edit</button>
          ) : (
            <button onClick={this.handleSend}>Send</button>
          )}
          <button onClick={this.closeModal}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default FormModal