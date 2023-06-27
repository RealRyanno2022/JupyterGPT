import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const openaiMessage = await getResponse(userMessage.content);
    setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: openaiMessage }]);
  };

  const getResponse = async (message) => {
    const result = await axios.post('http://localhost:3000/api/chat', { message });
    return result.data.message;
  };

  useEffect(() => {
    const initConversation = async () => {
      const message = 'Hello!';
      const response = await getResponse(message);
      setMessages([{ role: 'assistant', content: response }]);
    };
    initConversation();
  }, []);

  return (
    <div className="App">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message-container ${message.role}`}>
            <div className={message.role}>{message.content}</div>
          </div>
        ))}
      </div>
      <form className="input-form" onSubmit={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message here..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
