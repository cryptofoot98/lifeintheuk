"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { AppNav } from "@/components/AppNav";
import { ArrowLeft, Camera, Save, Loader2, User, LogOut } from "lucide-react";

type FormData = {
  full_name: string;
  age: string;
  nationality: string;
  mobile: string;
  avatar_url: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState<FormData>({
    full_name: "", age: "", nationality: "", mobile: "", avatar_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }
      setUserEmail(user.email ?? "");
      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("full_name, age, nationality, mobile, avatar_url")
        .eq("id", user.id)
        .single();

      if (data) {
        setForm({
          full_name: data.full_name ?? "",
          age: data.age?.toString() ?? "",
          nationality: data.nationality ?? "",
          mobile: data.mobile ?? "",
          avatar_url: data.avatar_url ?? "",
        });
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const field = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  async function handleSave() {
    if (!userId) return;
    setSaving(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name || null,
        age: form.age ? parseInt(form.age, 10) : null,
        nationality: form.nationality || null,
        mobile: form.mobile || null,
      })
      .eq("id", userId);

    if (err) setError(err.message);
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    setUploading(true);
    setError("");
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${userId}/avatar.${ext}`;

    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (upErr) {
      setError(upErr.message);
    } else {
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const url = `${data.publicUrl}?t=${Date.now()}`;
      await supabase.from("profiles").update({ avatar_url: data.publicUrl }).eq("id", userId);
      setForm(prev => ({ ...prev, avatar_url: url }));
    }
    setUploading(false);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen pb-20 md:pb-0">
        <AppNav />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <Link href="/tests" className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="font-heading text-2xl font-black">My Profile</h1>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="relative group"
            aria-label="Change profile photo"
          >
            <div className="h-24 w-24 rounded-full border-4 border-border overflow-hidden bg-primary/10 flex items-center justify-center">
              {form.avatar_url ? (
                <Image
                  src={form.avatar_url}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <User className="h-10 w-10 text-primary/50" />
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {uploading
                ? <Loader2 className="h-6 w-6 text-white animate-spin" />
                : <Camera className="h-6 w-6 text-white" />
              }
            </div>
          </button>
          <p className="text-xs text-muted-foreground mt-2 font-semibold">
            {uploading ? "Uploading…" : "Tap to change photo"}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Form card */}
        <div className="bg-card border-2 border-border rounded-2xl p-6 flex flex-col gap-4 card-elevated">

          <div>
            <label className="text-sm font-extrabold block mb-1.5">Full name</label>
            <input
              type="text"
              value={form.full_name}
              onChange={field("full_name")}
              placeholder="Your full name"
              className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-extrabold block mb-1.5">Email</label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full rounded-2xl border-2 border-border bg-muted/50 px-4 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-extrabold block mb-1.5">Age</label>
              <input
                type="number"
                min={16}
                max={120}
                value={form.age}
                onChange={field("age")}
                placeholder="Age"
                className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-extrabold block mb-1.5">Mobile</label>
              <input
                type="tel"
                value={form.mobile}
                onChange={field("mobile")}
                placeholder="+44…"
                className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-extrabold block mb-1.5">Nationality</label>
            <input
              type="text"
              value={form.nationality}
              onChange={field("nationality")}
              placeholder="e.g. Nigerian, Polish, Indian…"
              className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {error && (
            <div className="text-sm font-semibold text-destructive bg-destructive/10 px-4 py-3 rounded-2xl border-2 border-destructive/20">
              {error}
            </div>
          )}

          {saved && (
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800">
              ✓ Profile saved!
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-3d w-full bg-primary text-white py-3 rounded-2xl font-extrabold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/25 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
          >
            {saving
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
              : <><Save className="h-4 w-4" /> Save profile</>
            }
          </button>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-border text-sm font-extrabold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </main>
    </div>
  );
}
