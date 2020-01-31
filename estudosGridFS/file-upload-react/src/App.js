import React from 'react';
import './App.css';
import axios from 'axios';

const endpoint = 'http://localhost:8000/upload'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
    }
  }

  handleSelectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })
  }

  render() {
    return(
      <div className="App">
        <input type="file" name="" id="" onChange={this.handleSelectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} % </div>
      </div>
    )
  }
}
