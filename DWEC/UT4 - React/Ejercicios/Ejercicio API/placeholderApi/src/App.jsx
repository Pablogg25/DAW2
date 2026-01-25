import { useState, useEffect } from "react";
import Post from "./components/Posts/Post.jsx";
import { cargarPosts } from "./core/api.js";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function cargar() {
      const lista = await cargarPosts();
      setPosts(lista);
    }
    cargar();
  }, []);

  return (
    <>
      <Post posts={posts} />
    </>
  );
}

export default App;
