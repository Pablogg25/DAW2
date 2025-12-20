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
      { nombre: "Users", total: users.length, url: "users" },
      { nombre: "Todos", total: todos.length, url: "todos.html" },
      { nombre: "Posts", total: posts.length, url: "posts.html" },
      { nombre: "Comments", total: comments.length, url: "comments.html" },
      { nombre: "Albums", total: albums.length, url: "albums.html" },
      { nombre: "Photos", total: photos.length, url: "photos.html" },
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
