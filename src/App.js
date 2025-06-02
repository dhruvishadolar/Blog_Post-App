import React, {useState, useEffect} from "react";
import posts from "./components/posts.json";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // on page load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(stored);
  }, []);

  // Save blogs
  const saveToStorage = (data) => {
    localStorage.setItem("blogs", JSON.stringify(data));
  };

  // update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    let updatedBlogs;
    if (editIndex !== null) {
      blogs[editIndex] = { title, content };
      updatedBlogs = [...blogs];
      setEditIndex(null);
    } else {
      updatedBlogs = [...blogs, { title, content }];
    }

    setBlogs(updatedBlogs);
    saveToStorage(updatedBlogs);
    setTitle("");
    setContent("");
  };

  //edit
  const handleEdit = (index) => {
    setTitle(blogs[index].title);
    setContent(blogs[index].content);
    setEditIndex(index);
  };

  //delete
  const handleDelete = (index) => {
    const updated = blogs.filter((_, i) => i !== index);
    setBlogs(updated);
    saveToStorage(updated);
  };

  return (
    <div className="container">
      <h2>Blogs Post Application</h2>
      <p>Blog post application in react js. Blog Post application in edit, upload and delete the data. </p>
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type = "text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
        />
        <button type="submit">
          {editIndex !== null ? "Update" : "Add"} Blog
        </button>
      </form>

      <hr/>

      <h3>Blog List</h3>
      {blogs.length === 0 && <p>No blogs yet.</p>}
      {blogs.map((blog, index) => (
        <div key={index} className="blog-item">
          <h4>{blog.title}</h4>
          <p>{blog.content}</p>
          <button onClick={() => handleEdit(index)}> Edit </button>
          <button onClick={() => handleDelete(index)}> Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;