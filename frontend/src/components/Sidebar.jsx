import React, { useEffect, useState } from 'react';
import { fetchSessions, createSession } from '../services/api';

const Sidebar = ({ onSelectSession, activeSessionId }) => {
  const [sessions, setSessions] = useState([]); // Stores fetched chat sessions

  // Load sessions when component mounts
  useEffect(() => {
    loadSessions();
  }, []); // No longer dependent on userEmail

  // Fetches sessions from the backend
  // The backend will use the user email from the session
  const loadSessions = async () => {
    const sessionsData = await fetchSessions(); // No longer passing email
    setSessions(sessionsData);
  };

  // Creates a new chat session
  // Backend will associate it with the logged-in user from the session
  const handleCreateSession = async () => {
    const newSession = await createSession(); // No longer passing email
    if (newSession) {
      setSessions([newSession, ...sessions]);
      onSelectSession(newSession.session_id);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Previous Chats</h2>
        <button onClick={handleCreateSession} className="new-chat-btn">
          New Chat
        </button>
      </div>
      <div className="sessions-scroll">
        <div className="sessions-list">
          {sessions.map((session) => (
            <div
              key={session.session_id}
              className={`session-item ${session.session_id === activeSessionId ? 'active' : ''}`}
              onClick={() => onSelectSession(session.session_id)}
            >
              <div className="session-title">Chat {session.session_id.substring(0, 8)}...</div>
              <div className="session-date">{session.last_updated}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;