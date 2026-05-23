import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 hero-dots">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-5">📬</div>
        <h1 className="font-heading text-2xl font-black mb-2">Check your inbox</h1>
        <p className="text-muted-foreground text-sm font-semibold mb-6 leading-relaxed">
          We sent a confirmation link to your email. Click it to activate your account and start your free trial.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-primary text-sm font-extrabold hover:underline underline-offset-2"
        >
          Back to sign in →
        </Link>
      </div>
    </div>
  );
}
