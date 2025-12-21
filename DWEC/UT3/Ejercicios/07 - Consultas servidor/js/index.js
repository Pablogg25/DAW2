import { get } from "./api.js";

const cards = document.getElementById("card");
const error = document.getElementById("error");

(async () => {
  try {
    const [users, todos, posts, comments, albums, photos] = await Promise.all([
      get("users"),
      get("todos"),
      get("posts"),
      get("comments"),
      get("albums"),
      get("photos"),
    ]);
    const entidades = [
      { nombre: "Users", total: users.length, url: "../html/users.html" },
      { nombre: "Todos", total: todos.length, url: "../html/todos.html" },
      { nombre: "Posts", total: posts.length, url: "../html/posts.html" },
      {
        nombre: "Comments",
        total: comments.length,
        url: "../html/comments.html",
      },
      { nombre: "Albums", total: albums.length, url: "../html/albums.html" },
      { nombre: "Photos", total: photos.length, url: "../html/photos.html" },
    ];
    entidades.forEach((e) => {
      const div = document.createElement("div");
      div.textContent = `${e.nombre} ${e.total}`;
      div.style.border = "1px solid black";
      div.onclick = () => (location.href = e.url);
      cards.appendChild(div);
    });
  } catch (e) {
    error.textContent = "Error cargando datos" + e.message;
  }
})();
