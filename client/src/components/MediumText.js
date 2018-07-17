import React, { Component } from 'react';
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class MediumText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }

  postData = (e) => {
    e.preventDefault();
    const newCours = {
        title : this.state.title,
        body: this.state.body,
      }
    axios.post("/cours/add", newCours)
        .then(response => this.props.history.push("/cours"))
        .catch(err => console.log(err));
}  

  onHandleChange = (e) => {
    this.setState({ body: e });
    console.log(this.state.body);
  }

  render() {
    return (
      <div className="container">
      <br/>
        <form onSubmit={this.postData}>
        <div className="form-group">
        <input
              value={this.state.title}
              type="text"
              name="title"
              placeholder="Title"
              onChange={e => {this.setState({ title: e.target.value });}}
              className="form-control"
            />
        </div>
          <div className="form-group">
            <ReactQuill
              modules={MediumText.modules}
              formats={MediumText.formats}
              value={this.state.body}
              placeholder="Description"
              onChange={this.onHandleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Post</button>
        </form>
        <br />
      </div>
    );
  }
}

MediumText.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};

MediumText.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default MediumText;