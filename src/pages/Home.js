import React,{useContext} from 'react'
import axios from "axios"; 
import {useEffect, useState } from "react";
import {   Link, useNavigate } from "react-router-dom";
/*import { post } from '../../server/routes/Comments';*/
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext} from "../helpers/AuthContext";


function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState} = useContext(AuthContext);
    

    
    let navigate =useNavigate();

    const likeAPost = (postId) => {
      axios.post("https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/likes", {PostId: postId}, {headers: {accessToken: localStorage.getItem("accessToken")}})
    .then((response) =>{
      
      setListOfPosts(listOfPosts.map((post)=>{
        if(post.id===postId && !response.data.error){
          console.log(response.data);
          if(response.data.liked){
            return {...post, Likes: [...post.Likes, 0] };
          }else{
            const likeArray = post.Likes
            likeArray.pop()
            return {...post, Likes: likeArray};
          }
          
        }else {
          return post
        }
      }));
      if(likedPosts.includes(postId)){
        setLikedPosts(likedPosts.filter((id)=>{return id!=postId;}))
      }else{
        setLikedPosts([...likedPosts,postId])
      }
  
    }
    
    )}
  
  useEffect (() => {

    console.log(authState.status);
    if(!localStorage.getItem("accessToken")){
      navigate("/login");
    }else{
        
      axios.get("https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/posts", {headers: {accessToken: localStorage.getItem("accessToken")}})
    .then((response) => {
      console.log(response.data);
      setListOfPosts(response.data.listOfPosts);
      setLikedPosts(response.data.likedPosts.map((like)=> {
        return like.PostId;
      })
      );
    })
    }

    

  }, [])

    return (
        <div>
            {listOfPosts.map((value, key) =>{
                return (
                  
                  
                  <div className="post" key={key} >
                    
                    <div className="title">{value.title}</div>
                    <Link className="contenedor" to={`/post/${value.id}`} key={value.id}  >
                    <div className="body">{value.postText}</div>
                    </Link>
                    <div className="footer">
                      <div className="userName" onClick={() => {navigate(`/profile/${value.UserId}`);}}>
                        {value.username}
                      </div>
                      <div className="buttons">
                      <ThumbUpIcon onClick={()=>{
                            likeAPost(value.id);
                            }} 
                            className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                         />
                        
                        
                      
                        
                      <label>{value.Likes.length}</label>
                      </div>
                    </div>
                  </div>
                  
                  
                 
                );
            })}
        </div>
    )
}

export default Home
