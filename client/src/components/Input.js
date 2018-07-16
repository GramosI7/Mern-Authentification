import React from "react";
// import {Editor, EditorState} from 'draft-js';
import axios from "axios";




class Input extends React.Component {

    state = {
        title : "",
        body: "",
        img: "",
        // editorState: EditorState.createEmpty()
    }

    onHandleOnChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value || e.target.files
        })
    }

    // onChangeDraft = (editorState) => this.setState({editorState});
    
    postData = (e) => {
        e.preventDefault();
        const newCours = {
            title : this.state.title,
            body: this.state.body,
            // img: this.state.img
          }
        axios.post("/cours/add", newCours)
            .then(response => this.props.history.push("/cours"))
            .catch(err => console.log(err));

    }

    // componentDidMount() {
    //     if(this.props.auth.isAuthenticated) {
    //       this.props.history.push("/cours")
    //     }
    //   }

    render() {
        
        return (
            <div className="container">

                    <br/>
                    <h1 className="text-center">Creez votre cours !</h1>
                    <hr/>
                        <h2>{this.state.title}</h2>
                    <br/>
                    <br/>

                    <p>{this.state.body}</p>
                    
                    <br/>
                    <hr/>
                <form onSubmit={this.postData}>
                    
                    <div className="formgroup">
                    <br/>
                        <label>Titre</label>
                        <input onChange={this.onHandleOnChange} value={this.state.title} type="Text" name="title" className="form-control" placeholder="Titre du cours" required/>
                    </div>
                   
                    <div className="formgroup">
                    <br/>
                        <label>Description</label>
                        <textarea onChange={this.onHandleOnChange}  value={this.state.body} type="text" name="body" className="form-control"/>
                    </div>
                    {/* <form  method="POST" action="http://localhost:4000/cours/add" encType="multipart/form-data"> */}
                    {/* <div className="formgroup">
                    <br/>
                        <label>Image</label>
                        <input onChange={this.onHandleOnChange} type="file" name="img" className="form-control" rows="100" cols="50"/>
                    </div>
                    <br/> */}
                    <br/>
                    <button className="btn btn-primary" type="submit">Ajouter</button>
                    {/* </form> */}
                    
                </form>
            </div>
            
        )
    }     
}

export default Input;