import React from 'react'
import  {useParams, useNavigate, Link} from 'react-router-dom';
import axios from "axios";
import {useEffect, useState, useContext} from "react";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
let {id} = useParams();
let navigate = useNavigate();
const [postObject, setPostObject] = useState({});
const [comments, setComments] = useState([])
const [newComment, setNewComment] = useState("")
const { authState} = useContext(AuthContext);

useEffect(() => {
    axios.get(`https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/posts/byId/${id}`).then((response) => {
        console.log(response);
        setPostObject(response.data);
    }); 
    axios.get(`https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/comments/${id}`).then((response) => {        
	setComments(response.data)
});
}, [])



const addComment = () => {
    axios.post("https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/comments", {
        commentBody: newComment,
        PostId: id,},
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }
        )
    .then((response) => { 
        if(response.data.error){
            console.log(response.data.error);
        }else{
            console.log(response.data);
            const commentToAdd = {commentBody: newComment, username: response.data.username};
            setComments([...comments, commentToAdd]);
            setNewComment=("");
        }
        
});
};

const deleteComment = (id) => { 
    axios.delete(`https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/comments/${id}`, {headers: {accessToken: localStorage.getItem('accessToken')},
}).then(()=>
setComments(
    comments.filter((val) =>{
        return val.id != id;
    })
    ));
};

const deletePost = (id) => {
    axios.delete(`https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/posts/${id}`,{headers: {accessToken: localStorage.getItem('accessToken')},})
    .then(()=>{
        navigate("/");
    })
}
const editPost = (option) => {     		

	if(option === "title"){
        let newTitle = prompt("Enter New Title:");
        if(newTitle===null)
        {
            newTitle = postObject.title;
        }
        axios.put("https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/posts/title", 
		    {newTitle: newTitle, id: id}, 
            {headers: {accessToken: localStorage.getItem('accessToken')},
        })
        setPostObject({...postObject, title: newTitle}) 
	}else{
        let newPostText = prompt("Enter New Text");
        if(newPostText===null)
        {
            newPostText = postObject.postText;
        }
        axios.put("https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/posts/postText", 
		    {newPostText: newPostText, id: id}, 
            {headers: {accessToken: localStorage.getItem('accessToken')},
        }).then((response)=>{
            console.log(response.data);
        })  
        setPostObject({...postObject, postText: newPostText})
	}
}

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title" onClick={() => { 
                        if (authState.username === postObject.username){
                            editPost("title");}
                        }}>
                        {postObject.title}
                    </div>
                    <div className="body" onClick={() => {
                        if (authState.username === postObject.username){
                            editPost("body");}
                        }}>
                        {postObject.postText}
                    </div>
                    <div className="footer"><Link to={`/profile/${postObject.UserId}`}>{postObject.username}</Link>{authState.username===postObject.username &&<button onClick={() => {deletePost(postObject.id);}}> Delete Post</button>}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" placeholder="Comentario..." onChange={(event) => {setNewComment(event.target.value)}}  value={newComment}/>
                    <button onClick={addComment}>Agregar Comentario </button>
                </div>
                <div className="listOfComments">
                {comments.map((comment, key) => {
		            return <div className="comment" key={key} >
                         {comment.commentBody}
                            <div className="nombreUsuario">
                             <label >  {comment.username}</label>
                            </div>
                            {authState.username === comment.username && <button  onClick={() => {deleteComment(comment.id)}}>Borrar X</button>}
                         
                         </div>

                    })
                }
                </div>
            </div>
        </div>
    )
}

export default Post
