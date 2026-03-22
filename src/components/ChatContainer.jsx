import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { getMessages, pushNewMessage } from "../store/slices/chatSlice";
import { getSocket } from "../lib/socket";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);
  const { selectedUser, messages, isMessageLoading } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [dispatch, selectedUser?._id]);

  useEffect(() => {
    if (!selectedUser?._id) return;

    const intervalId = setInterval(() => {
      dispatch(getMessages(selectedUser._id));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [dispatch, selectedUser?._id]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !selectedUser?._id || !authUser?._id) return;

    const handleIncomingMessage = (incomingMessage) => {
      const sender = String(incomingMessage?.senderId);
      const receiver = String(incomingMessage?.reciverId);
      const myId = String(authUser._id);
      const openChatUserId = String(selectedUser._id);

      const belongsToOpenChat =
        (sender === openChatUserId && receiver === myId) ||
        (sender === myId && receiver === openChatUserId);

      if (belongsToOpenChat) {
        dispatch(pushNewMessage(incomingMessage));
      }
    };

    socket.on("newMessage", handleIncomingMessage);
    return () => socket.off("newMessage", handleIncomingMessage);
  }, [dispatch, selectedUser?._id, authUser?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="flex-1 flex flex-col bg-gradient-to-b from-stone-50 via-slate-50 to-blue-50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-5">
        {isMessageLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className={`h-12 rounded-2xl bg-white/70 border border-slate-200 animate-pulse ${
                  idx % 2 === 0 ? "w-2/3" : "w-1/2 ml-auto"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {messages?.map((message) => {
              const isMine = String(message?.senderId) === String(authUser?._id);
              const time = message?.createdAt
                ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "";
              const mediaUrl = message?.media;
              const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl || "");

              return (
                <div key={message._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[82%] rounded-2xl px-3 py-2 shadow-sm border ${
                      isMine
                        ? "bg-slate-900 text-white border-slate-800 rounded-br-md"
                        : "bg-white text-slate-800 border-slate-200 rounded-bl-md"
                    }`}
                  >
                    {mediaUrl && (
                      isVideo ? (
                        <video src={mediaUrl} controls className="mb-2 max-h-60 rounded-xl" />
                      ) : (
                        <img src={mediaUrl} alt="message media" className="mb-2 max-h-60 rounded-xl object-cover" />
                      )
                    )}

                    {message?.text && <p className="text-sm leading-relaxed break-words">{message.text}</p>}
                    <p className={`mt-1 text-[10px] ${isMine ? "text-slate-300" : "text-slate-400"}`}>{time}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>

      <MessageInput />
    </section>
  );
};

export default ChatContainer;
