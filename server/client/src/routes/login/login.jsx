// import { useContext, useState } from "react";
// import "./login.scss";
// import { Link, useNavigate } from "react-router-dom";
// import apiRequest from "../../lib/apiRequest";
// import { AuthContext } from "../../context/AuthContext";

// function Login() {
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const {updateUser} = useContext(AuthContext)

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
//     const formData = new FormData(e.target);

//     const username = formData.get("username");
//     const password = formData.get("password");

//     try {
//       const res = await apiRequest.post("/auth/login", {
//         username,
//         password,
//       });

//       updateUser(res.data)

//       navigate("/");
//     } catch (err) {
//       setError(err.response.data.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="login">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <h1>Welcome back</h1>
//           <input
//             name="username"
//             required
//             minLength={3}
//             maxLength={20}
//             type="text"
//             placeholder="Username"
//           />
//           <input
//             name="password"
//             type="password"
//             required
//             placeholder="Password"
//           />
//           <button disabled={isLoading}>Login</button>
//           {error && <span>{error}</span>}
//           <Link to="/register">{"Don't"} you have an account?</Link>
//         </form>
//       </div>
//       <div className="imgContainer">
//         <img src="/bg.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useContext, useState } from 'react';
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import Notification from "../../components/notification/Notification";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });

  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", { username, password });

      updateUser(res.data);

      setNotification({ message: "Login successful", type: "success", visible: true });
      // Navigate after 1 second to ensure the notification is visible
      setTimeout(() => navigate("/"), 1000); // Redirect after 1 second

    } catch (err) {
      setNotification({ message: err.response.data.message, type: "error", visible: true });
      // Optionally, set a shorter timeout for errors
      setTimeout(() => setNotification({ ...notification, visible: false }), 3000); // Error message stays for 3 seconds
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
    </div>
  );
}

export default Login;
