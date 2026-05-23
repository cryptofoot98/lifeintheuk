import Link from "next/link";
import { Crown } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 hero-grid">
      <div className="text-center max-w-sm">
        <Crown className="h-10 w-10 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-2xl font-bold mb-2">Check your inbox</h1>
        <p className="text-muted-foreground text-sm mb-6">
          We sent a confirmation link to your email. Click it to activate your account and start your free trial.
        </p>
        <Link href="/auth/login" className="text-primary text-sm font-medium hover:underline underline-offset-2">
          Back to sign in →
        </Link>
      </div>
    </div>
  );
}
