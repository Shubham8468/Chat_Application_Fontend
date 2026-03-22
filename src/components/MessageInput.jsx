import { useState } from "react";
import { Image, Loader2, Send, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/slices/chatSlice";

const MessageInput = () => {
  const dispatch = useDispatch();
  const { selectedUser, isSendingMessage } = useSelector((state) => state.chat);
  const [text, setText] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  const clearMedia = () => {
    setMediaFile(null);
    setMediaPreview("");
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!selectedUser?._id) return;
    if (!text.trim() && !mediaFile) return;

    const resultAction = await dispatch(
      sendMessage({
        reciverId: selectedUser._id,
        text,
        media: mediaFile,
      })
    );

    if (sendMessage.fulfilled.match(resultAction)) {
      setText("");
      clearMedia();
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white/90 backdrop-blur p-3 md:p-4">
      {mediaPreview && (
        <div className="mb-3 relative inline-block">
          <img src={mediaPreview} alt="preview" className="h-20 w-20 rounded-xl object-cover border border-slate-200" />
          <button
            type="button"
            onClick={clearMedia}
            className="absolute -top-2 -right-2 rounded-full bg-slate-800 p-1 text-white"
            aria-label="Remove media"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <label className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <Image className="size-4" />
          <input type="file" className="hidden" accept="image/*,video/*" onChange={handleMediaChange} />
        </label>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none focus:border-slate-400"
        />

        <button
          type="submit"
          disabled={isSendingMessage || (!text.trim() && !mediaFile)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          {isSendingMessage ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
