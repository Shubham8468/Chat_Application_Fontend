import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser as setSelectedUser } from "../store/slices/chatSlice";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.map((id) => String(id)).includes(String(selectedUser._id));

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur px-4 py-3 md:px-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative">
            <img
              src={selectedUser?.avatar?.url || "/avatar-holder.avif"}
              alt={selectedUser?.fullName || "chat user"}
              className="size-10 rounded-2xl object-cover ring-2 ring-white shadow"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-white ${
                isOnline ? "bg-emerald-500" : "bg-slate-300"
              }`}
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm md:text-base font-bold text-slate-800">{selectedUser?.fullName}</h3>
            <p className="text-xs text-slate-500">{isOnline ? "Online now" : "Offline"}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => dispatch(setSelectedUser(null))}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close chat"
        >
          <X className="size-4" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
