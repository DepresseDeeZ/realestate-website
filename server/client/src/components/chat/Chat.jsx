// import { useContext, useEffect, useRef, useState } from "react";
// import "./chat.scss";
// import { AuthContext } from "../../context/AuthContext";
// import apiRequest from "../../lib/apiRequest";
// import { format } from "timeago.js";
// import { SocketContext } from "../../context/SocketContext";
// import { useNotificationStore } from "../../lib/notificationStore";

// function Chat({ chats }) {
//   const [chat, setChat] = useState(null);
//   const { currentUser } = useContext(AuthContext);
//   const { socket } = useContext(SocketContext);

//   const messageEndRef = useRef();

//   const decrease = useNotificationStore((state) => state.decrease);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const handleOpenChat = async (id, receiver) => {
//     try {
//       const res = await apiRequest("/chats/" + id);
//       if (!res.data.seenBy.includes(currentUser.id)) {
//         decrease();
//       }
//       setChat({ ...res.data, receiver });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const text = formData.get("text");

//     if (!text) return;
//     try {
//       const res = await apiRequest.post("/messages/" + chat.id, { text });
//       setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
//       e.target.reset();
//       socket.emit("sendMessage", {
//         receiverId: chat.receiver.id,
//         data: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const read = async () => {
//       try {
//         await apiRequest.put("/chats/read/" + chat.id);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (chat && socket) {
//       socket.on("getMessage", (data) => {
//         if (chat.id === data.chatId) {
//           setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
//           read();
//         }
//       });
//     }
//     return () => {
//       socket.off("getMessage");
//     };
//   }, [socket, chat]);

//   return (
//     <div className="chat">
//       <div className="messages">
//         <h1>Messages</h1>
//         {chats?.map((c) => (
//           <div
//             className="message"
//             key={c.id}
//             style={{
//               backgroundColor:
//                 c.seenBy.includes(currentUser.id) || chat?.id === c.id
//                   ? "white"
//                   : "#fecd514e",
//             }}
//             onClick={() => handleOpenChat(c.id, c.receiver)}
//           >
//             <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
//             <span>{c.receiver.username}</span>
//             <p>{c.lastMessage}</p>
//           </div>
//         ))}
//       </div>
//       {chat && (
//         <div className="chatBox">
//           <div className="top">
//             <div className="user">
//               <img src={chat.receiver.avatar || "noavatar.jpg"} alt="" />
//               {chat.receiver.username}
//             </div>
//             <span className="close" onClick={() => setChat(null)}>
//               X
//             </span>
//           </div>
//           <div className="center">
//             {chat.messages.map((message) => (
//               <div
//                 className="chatMessage"
//                 style={{
//                   alignSelf:
//                     message.userId === currentUser.id
//                       ? "flex-end"
//                       : "flex-start",
//                   textAlign:
//                     message.userId === currentUser.id ? "right" : "left",
//                 }}
//                 key={message.id}
//               >
//                 <p>{message.text}</p>
//                 <span>{format(message.createdAt)}</span>
//               </div>
//             ))}
//             <div ref={messageEndRef}></div>
//           </div>
//           <form onSubmit={handleSubmit} className="bottom">
//             <textarea name="text"></textarea>
//             <button>Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { format } from "timeago.js";
import apiRequest from "../../lib/apiRequest";

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-semibold">Messages</h1>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {chats?.map((c) => (
          <div
            key={c.id}
            className={`flex items-center p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors relative ${
              !c.seenBy.includes(currentUser.id) && chat?.id !== c.id
                ? "bg-yellow-50"
                : "bg-white"
            }`}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <div className="relative">
              <img
                src={c.receiver.avatar || "/noavatar.jpg"}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              {!c.seenBy.includes(currentUser.id) && chat?.id !== c.id && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-semibold">{c.receiver.username}</h3>
              <p className="text-sm text-gray-500 truncate">{c.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {chat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-yellow-100">
              <div className="flex items-center gap-4">
                <img
                  src={chat.receiver.avatar || "/noavatar.jpg"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold">{chat.receiver.username}</span>
              </div>
              <button
                onClick={() => setChat(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {chat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.userId === currentUser.id ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.userId === currentUser.id
                        ? "bg-yellow-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs text-gray-500 mt-1">
                      {format(message.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t p-4 flex gap-4">
              <textarea
                name="text"
                className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                placeholder="Type a message..."
                rows="1"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;