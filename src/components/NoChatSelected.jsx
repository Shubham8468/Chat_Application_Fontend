import { MessageSquare } from "lucide-react";
import { Sparkles, Users } from "lucide-react";
import { useSelector } from "react-redux";

const NoChatSelected = () => {
  const { authUser } = useSelector((state) => state.auth);

  return (
    <section className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_#f8fafc_0%,_#eef2ff_40%,_#e2e8f0_100%)]">
      <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative h-full w-full p-6 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/80 p-7 md:p-10 backdrop-blur shadow-[0_24px_40px_-28px_rgba(15,23,42,0.55)]">
          <div className="mx-auto w-max rounded-2xl bg-slate-900 p-4 text-white shadow-lg">
            <MessageSquare className="size-8" />
          </div>

          <h2 className="mt-5 text-center text-2xl md:text-3xl font-black tracking-tight text-slate-800">
            Welcome{authUser?.fullName ? `, ${authUser.fullName}` : ""}
          </h2>

          <p className="mt-2 text-center text-slate-600">
            Select a conversation from the sidebar to start chatting. Your messages, media, and real-time updates will appear here.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                <Users className="size-4" />
                Choose a Contact
              </div>
              <p className="mt-1 text-xs text-slate-500">Pick any user from the left list.</p>
            </div>

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
                <Sparkles className="size-4" />
                Start the Vibe
              </div>
              <p className="mt-1 text-xs text-indigo-600">Send text, images, or videos instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoChatSelected;
