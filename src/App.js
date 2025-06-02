import React, { useState, useEffect } from "react";
import posts from "./data/posts.json";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs"));
    if (stored && stored.length > 0) {
      setBlogs(stored);
    } else {
      const initialBlogs = posts.map(post => ({
        title: post.title,
        content: post.body
      }));
      setBlogs(initialBlogs);
      localStorage.setItem("blogs", JSON.stringify(initialBlogs));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("blogs", JSON.stringify(data));
  };

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

  const handleEdit = (index) => {
    setTitle(blogs[index].title);
    setContent(blogs[index].content);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    const updated = blogs.filter((_, i) => i !== index);
    setBlogs(updated);
    saveToStorage(updated);
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2>Blogs Post Application</h2>
      <p>Blog post application in React.js with Edit, Upload and Delete features.</p>
      
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
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

      <hr />

      <h3>Blog List (Page {currentPage} of {totalPages})</h3>
      {blogs.length === 0 && <p>No blogs yet.</p>}
      {currentBlogs.map((blog, index) => (
        <div key={indexOfFirstBlog + index} className="blog-item">
          <h4>{blog.title}</h4>
          <p>{blog.content}</p>
          <button onClick={() => handleEdit(indexOfFirstBlog + index)}>Edit</button>
          <button onClick={() => handleDelete(indexOfFirstBlog + index)}>Delete</button>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            style={{
              margin: "4px",
              backgroundColor: currentPage === i + 1 ? "#007bff" : "#f0f0f0",
              color: currentPage === i + 1 ? "white" : "black"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
