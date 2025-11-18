import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Configure axios to include credentials (cookies) with requests
axios.defaults.withCredentials = true;

//Sends POST request to /login.
// Handles login, signup, and authentication. 
// Used by Login.jsx
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return { verified: false, error: error.response?.data?.error || 'Login failed' };
  }
};

// Sends a POST request to '/signup'.
// Enters the data from signup form to the database.
// Used by Signup.jsx
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    return { error: error.response?.data?.error || 'Signup failed' };
  }
};

// Sends a POST request to '/logout'.
// Logs the user out.
export const logout = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/logout",{},{withCredentials:true});
    if (response.status!==200){
      throw new Error(`Logout failed with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
    return { error: error.response?.data?.message || 'Logout failed' };
  }
};

// Sends a GET request to '/check-auth'. 
// Checks if user is authenticated. If user is not returns False.
export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`);
    return response.data;
  } catch (error) {
    console.error('Auth check error:', error);
    return { authenticated: false };
  }
};

// Sends GET request to '/sessions'.
// Retrieves all the sessions for a user.
// No longer needs email parameter as it's stored in session on backend
// Used by Sidebar.jsx
export const fetchSessions = async () => {
  try {
    const response = await axios.get(`${API_URL}/sessions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
};

// Sends POST request to '/session'.
// Creates a new chat session for the authenticated user
// Used by Sidebar.jsx
export const createSession = async (userEmail) => {
  try {
    const response = await axios.post(`${API_URL}/sessions`, 
      { email: userEmail },  // Send email in the request body
      { headers: { "Content-Type": "application/json" } } // Set correct headers
    );

    if (response.data && response.data.session_id) {
      return response.data;
    } else {
      console.error("Session created but no session_id returned");
      return null;
    }
  } catch (error) {
    console.error('Error creating session:', error.response?.data || error.message);
    return null;
  }
};


// Sends the GET request to 'sessions/{sessionID}/messages'.
// Fetches all messages in a chat session.
export const fetchMessages = async (sessionId) => {
  try {
    const response = await axios.get(`${API_URL}/sessions/${sessionId}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

// Sends a POST request to '/sessions/{sessionsId}/messages'.
// Responsible to carry user response to LLM and get the response back from LLM.
export const sendMessage = async (sessionId, message) => {
  try {
    const response = await axios.post(`${API_URL}/sessions/${sessionId}/messages`, {
      message
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};