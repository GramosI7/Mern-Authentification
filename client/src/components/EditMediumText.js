import React, { Component } from 'react';
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EditMediumText extends Component {

    state = {
      title: '',
      body: '',
    }

    componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/cours/${id}`)
        .then((response) => this.setState({ title : response.data.title, body : response.data.body}))
        .catch((error) => console.log(error));
    }


    postData = () => {
        const { id } = this.props.match.params;
        const editCours = { title : this.state.title, body: this.state.body }
        axios.post(`/cours/edit/${id}`, editCours)
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
                ref="title"
                className="form-control"
                />
            </div>
            <div className="form-group">
                <ReactQuill
                    theme="snow"
                    modules={EditMediumText.modules}
                    formats={EditMediumText.formats}
                    value={this.state.body}
                    placeholder="Description"
                    onChange={this.onHandleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Editer</button>
            </form>
        </div>
        );
    }
    }

EditMediumText.modules = {
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

EditMediumText.formats = [
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

export default EditMediumText;