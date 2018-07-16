import React, { Component } from 'react'
import axios from "axios";

class EditCours extends Component {

    state = {
        coursId : [],
        title: "",
        author : "",
        body: "",
        // img: ""
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`/cours/${id}`)
            .then((response) => {
            this.setState({
                coursId : response.data,
                title : response.data.title,
                author : response.data.author,
                body : response.data.body,
                img : response.data.img
            }, () => console.log("State of SingleCours : ", this.state.img))
        })
            .catch((error) => {
            console.log(error);
        })
    }

    onSubmit = () => {
        const { id } = this.props.match.params;
        const editCours = {
            title : this.state.title,
            body: this.state.body,
            // img: this.state.img
            
          }
        axios.post(`/cours/edit/${id}`, editCours)
            .then(response => {
                this.props.history.push("/");
                console.log(response)
            })      
            .catch(err => console.log(err));
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


  render() {
      const { title, body } = this.state;

    return (
        <div className="container">
                    <br/>
                    <h1>Modifier votre cours</h1>
                    
                <form onSubmit={this.onSubmit}>
                    
                    <div className="formgroup">
                    <br/>
                        <label>Titre</label>
                        <input type="Text" name="title" className="form-control" onChange={this.handleOnChange} value={title}/>
                    </div>
                
                   
                    <div className="formgroup">
                    <br/>
                        <label>Description du cours</label>
                        <textarea type="text" name="body" className="form-control" onChange={this.handleOnChange} value={body}/>
                    </div>
                    
                    {/* <div className="formgroup">
                    <br/>
                        <label>Image</label>
                        <input type="file" name="img" className="form-control"/>
                    </div> */}
                    <br/>
                    <button className="btn btn-primary" type="submit">Ajouter</button>
                </form>
            </div>
    )
  }
}

export default EditCours;