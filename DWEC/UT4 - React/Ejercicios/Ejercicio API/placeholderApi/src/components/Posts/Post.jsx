import "./Post.css";
function Post({ posts }) {
  console.log(posts);

  return (
    <>
      <div className="posts-container">
        {posts.map((p) => (
          <div key={p.id} className="post">
            <p className="post-title">{p.title}</p>
            <p className="post-body">{p.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Post;
