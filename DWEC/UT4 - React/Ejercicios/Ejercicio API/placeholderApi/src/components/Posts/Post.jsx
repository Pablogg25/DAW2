function Post({ posts }) {
  //   const lista = posts.map((p) => p);
  console.log(posts);
  return (
    <>
      {posts.map((p) => {
        <p>{p.title}</p>;
        <p>{p.body}</p>;
      })}
    </>
  );
}
export default Post;
