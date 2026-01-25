import { useState } from "react";
import Post from "./components/Posts/Post.jsx";
import { cargarPosts } from "./core/api.js";
function App() {
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const listaPost = cargarPosts();
  //   setPosts(listaPost);
  return (
    <>
      <Post posts={posts} />;
    </>
  );
}
export default App;
