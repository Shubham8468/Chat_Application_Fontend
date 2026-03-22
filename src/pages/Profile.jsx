import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Camera, Loader2, Mail, Save, ShieldCheck, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    setFullName(authUser?.fullName || "");
    setEmail(authUser?.email || "");
    setAvatarPreview(authUser?.avatar?.url || "/avatar-holder.avif");
  }, [authUser]);

  const memberSince = useMemo(() => {
    if (!authUser?.createdAt) return "-";

    return new Date(authUser.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [authUser?.createdAt]);

  const initials = useMemo(() => {
    if (!fullName?.trim()) return "U";
    return fullName
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [fullName]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    dispatch(updateProfile(formData));
  };

  return (
    <section className="min-h-screen px-4 py-24 bg-[radial-gradient(circle_at_top_left,_#e2e8f0_0%,_#f8fafc_35%,_#eef2ff_100%)]">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-7 md:px-8 md:py-9 shadow-[0_28px_50px_-28px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="absolute -top-16 -right-14 h-40 w-40 rounded-full bg-amber-200/50 blur-2xl" />
          <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-sky-200/50 blur-2xl" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Account Atelier</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tight text-slate-800">Profile Overview</h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">
              Step into your personal space and shape how others see you in the conversation.
               Update your profile, set your status, and add your unique touch to every detail. Whether you're here to chat, connect, or collaborate, your profile is the first impression — make it powerful, expressive, and truly yours.
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_40px_-30px_rgba(15,23,42,0.7)]">
            <div className="relative mx-auto w-max">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={fullName || "profile"}
                  className="size-36 rounded-3xl object-cover ring-4 ring-white shadow-xl"
                />
              ) : (
                <div className="size-36 rounded-3xl bg-slate-900 text-white grid place-items-center text-3xl font-bold shadow-xl">
                  {initials}
                </div>
              )}

              <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-xl bg-slate-900 p-2.5 text-white shadow-md transition-colors hover:bg-slate-800">
                <Camera className="size-4" />
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>

            <h2 className="mt-5 text-center text-xl font-bold text-slate-800">{fullName || "Your Name"}</h2>
            <p className="text-center text-sm text-slate-500">{email || "your@email.com"}</p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Member Since</p>
                <div className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarDays className="size-4 text-slate-500" />
                  <span>{memberSince}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700">Status</p>
                <p className="mt-1.5 text-sm font-semibold text-emerald-700">Verified and active</p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_24px_40px_-30px_rgba(15,23,42,0.7)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4">
                    <User className="size-4 text-slate-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-transparent px-3 py-3 outline-none text-slate-800"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4">
                    <Mail className="size-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent px-3 py-3 outline-none text-slate-800"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-sky-200 bg-sky-50/80 px-4 py-3 flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 text-sky-600" />
                <p className="text-sm text-sky-800">
                  Your profile data is only used to personalize your chat identity and account presentation.
                </p>
              </div>

              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isUpdatingProfile ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {isUpdatingProfile ? "Saving changes..." : "Save Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
