import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [messages, setMessages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Error sending message");
    }
  };
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages");
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/messages/${id}`);
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };
  const updateMessage = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/messages/${id}`, {
        message: editMessage,
      });
      setEditId(null);
      setEditMessage("");
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div className="app">
      <nav className="navbar">
        <h2>Infant Portfolio</h2>
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <section className="hero">
        <h1>Hello, I'm Infant 🚀</h1>
        <p>
          MERN Stack Developer passionate about building modern web
          applications.
        </p>
        <div>
          <a
            href="https://github.com/25infant08/25infant08"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/infant-praveenkumar-v-b1045a3b6?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            LinkedIn
          </a>
        </div>
      </section>
      <section id="about">
        <h2>About Me</h2>
        <p>
          I'm Infant, a passionate MERN Stack Developer who enjoys building
          modern web applications. I love working with React, Node.js, Express,
          and MongoDB, and I'm continuously improving my skills through
          real-world projects.
        </p>
      </section>
      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-container">
          <div className="skill-card">⚛️ React</div>
          <div className="skill-card">🟢 Node.js</div>
          <div className="skill-card">🍃 MongoDB</div>
          <div className="skill-card">🚀 Express</div>
          <div className="skill-card">📜 JavaScript</div>
        </div>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <div className="project-card">
          <h3>MERN Portfolio Website</h3>
          <p>
            Full Stack portfolio website built using React, Node.js, Express and
            MongoDB with Contact Form CRUD operations.
          </p>
        </div>
        <div className="project-card">
          <h3>Todo App</h3>
          <p>
            Task management application with add, update and delete features.
          </p>
        </div>
        <div className="project-card">
          <h3>Contact Manager</h3>
          <p>
            CRUD application that allows users to create, read, update and
            delete contacts using MongoDB.
          </p>
        </div>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      </section>
      <section>
        <h2>Messages</h2>
        {messages.map((msg) => (
          <div key={msg._id} className="project-card">
            <h3>{msg.name}</h3>
            <p>{msg.email}</p>
            {editId === msg._id ? (
              <>
                <input
                  type="text"
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                />
                <br />
                <button className="btn" onClick={() => updateMessage(msg._id)}>
                  Save
                </button>
              </>
            ) : (
              <p>{msg.message}</p>
            )}
            {editId !== msg._id && (
              <button
                className="btn"
                onClick={() => {
                  setEditId(msg._id);
                  setEditMessage(msg.message);
                }}
              >
                Edit
              </button>
            )}
            <button className="btn" onClick={() => deleteMessage(msg._id)}>
              Delete
            </button>
          </div>
        ))}
      </section>
      <footer className="footer">
        <p>© 2026 Infant Portfolio. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
export default App;
