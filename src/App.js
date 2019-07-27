import React, {Component} from 'react';
import ModalTemplate from './ModalTemplate';
import FormModal from './FormModal';
import NoteModal from './NoteModal';
import AlertMessage from './AlertMessage';
import callAPI from './callAPI';
import classNames from 'classnames';
import './index.css'
const axios = require('axios');

class App extends Component {
  state = {
    currentUser: {},
    notes: [],
    formModal: false,
    highlightedNote: {},
    noteToEdit: {},
    alertMessage: {}
  }

  componentDidMount = async () => {
    await this.getToken();
    const response = await callAPI({
        method: 'GET', 
        url: 'http://159.89.96.181/api/v1/notes',  
        token: this.state.currentUser.token,
      },
      this.handleError
    );

    if (response && response.data) {
      this.setState({notes: response.data.notes})
    }
  }

  getToken = async () => {
    try{
      const response = await axios({
        method: 'POST', 
        url: 'http://159.89.96.181/api/v1/tokens', 
        data: {"userName": 'Bearer'}, 
      });
      this.setState({currentUser: response.data})
      return response.data
    } catch (error) {
      console.error(error);
      this.handleError(error.message)
    }
  }

  handleForm = () => {
    this.setState({formModal: !this.state.formModal, noteToEdit: []})
  }

  createNote = (note) => {
    if (!note) {
      return
    }

    this.setState({
      notes: [...this.state.notes ,note],
      alertMessage: {text: 'New note successfully created', type: 'success'}
    });
    this.handleForm();
  }

  handleError = (error) => {
    this.setState({
      alertMessage: {text: error, type: 'error'}
    });
  }

  clearAlert = () => {
    this.setState({alertMessage: {}});
  }

  openNote = (note) => {
    this.setState({highlightedNote: note})
  }

  closeNote = () => {
    this.setState({highlightedNote: {}})
  }

  editNote = (note) => {
    this.setState({
      noteToEdit: note,
      highlightedNote: {},
      formModal: !this.state.formModal
    })
  }

  render() {
    const {notes, formModal, highlightedNote, alertMessage} = this.state
    const isNoteModalOpened = Object.keys(highlightedNote).length > 0
    return (
      <>
        <div className={classNames("main", {
          'blur': formModal
        })}>
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div 
                  className="note-block" 
                  key={index}
                  onClick={() => this.openNote(note)}
                >
                  <div className="note-block-title">
                    <img
                      src='https://www.papirus.com.ua/img/catalog/491.jpg' 
                      alt='' 
                    />
                    <img
                      src='https://image.flaticon.com/icons/svg/17/17223.svg' 
                      alt='' 
                    />
                  </div>
                  <p>{note.title}</p>
                  <span>{note.content}</span>
                </div>
              ))
            ) : (
              <h1 className="emptyTitle">There are no notes yet</h1>
            )}
          <button 
            className="createBtn"
            onClick={this.handleForm}
          >
            Create note
          </button>
        </div>
        {formModal && (
          <ModalTemplate onClose={this.handleForm}>
            <FormModal
              currentUser={this.state.currentUser}
              createNote={this.createNote}
              noteToEdit={this.state.noteToEdit}
              onClose={this.handleForm}
              handleError={this.handleError}
            />
          </ModalTemplate>
        )}
        {isNoteModalOpened && (
          <ModalTemplate onClose={this.closeNote}>
            <NoteModal
              onClose={this.closeNote} 
              note={this.state.highlightedNote}
              token={this.state.currentUser.token}
              editNote={this.editNote}
              handleError={this.handleError}
            />
          </ModalTemplate>
        )}
        <AlertMessage 
          visible={!!alertMessage.text}
          contentMessage={alertMessage} 
          clearAlert={this.clearAlert}
        />
      </>
    );
  }
}

export default App