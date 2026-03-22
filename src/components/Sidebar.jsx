import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, Users } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton"; 

import { getUsers, selectedUser as setSelectedUser } from "../store/slices/chatSlice";

const Sidebar = () => {
  const [showOnlyOnline, setShowOnlyOnline] = useState(false);
  const {
    users,
    selectedUser,
    isUsersLodding,
  } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());

    const intervalId = setInterval(() => {
      dispatch(getUsers());
    }, 20000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const onlineUserIds = new Set((onlineUsers || []).map((id) => String(id)));
  const isRecentlyOnline = (user) => {
    const lastSeen = user?.lastSeen ? new Date(user.lastSeen).getTime() : 0;
    return Boolean(lastSeen) && (Date.now() - lastSeen) < 45000;
  };

  const isUserOnline = (user) => onlineUserIds.has(String(user?._id)) || isRecentlyOnline(user);

  const filteredUsers = showOnlyOnline
    ? users?.filter((user) => isUserOnline(user))
    : users;

  if (isUsersLodding) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-300 bg-white">
      <div className="border-b border-gray-200 p-5">
        <div className="flex items-center gap-2 bg-blue-100 w-max px-3 py-1 rounded-lg">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="hidden lg:inline font-semibold text-gray-700">Chats</span>
        </div>

        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <span className="hidden lg:inline font-semibold text-gray-700">Online Users</span>
          <input
            type="checkbox"
            checked={showOnlyOnline}
            onChange={(e) => setShowOnlyOnline(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        </label>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1">
        {filteredUsers?.length ? (
          filteredUsers.map((user) => {
            const isActive = selectedUser?._id === user._id;
            const isOnline = isUserOnline(user);

            return (
              <button
                key={user._id}
                type="button"
                onClick={() => dispatch(setSelectedUser(user))}
                className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                  isActive ? "bg-blue-50" : ""
                }`}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user?.avatar?.url || "/avatar-holder.avif"}
                    alt={user?.fullName || "user"}
                    className="size-10 object-cover rounded-full"
                  />
                  <span
                    className={`absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-white ${
                      isOnline ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </div>

                <div className="hidden lg:block min-w-0 text-left flex-1">
                  <p className="font-medium text-gray-800 truncate">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{isOnline ? "Online" : "Offline"}</p>
                </div>

                {isActive && <Check className="hidden lg:inline w-4 h-4 text-blue-600" />}
              </button>
            );
          })
        ) : (
          <p className="px-4 text-sm text-gray-500">No users available</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
