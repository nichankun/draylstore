"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions/auth";
import { Lock, Gamepad2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAdmin,
    initialState,
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border shadow-2xl relative z-10 overflow-hidden">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tighter uppercase">
            Admin Portal
          </CardTitle>
          <CardDescription className="font-medium">
            Masuk untuk mengelola Dashboard DraylStore
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold text-center animate-in fade-in zoom-in duration-300">
                {state.error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Alamat Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@draylstore.com"
                className="bg-background/50 border-border focus-visible:ring-primary h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="bg-background/50 border-border focus-visible:ring-primary h-11"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="bg-muted/30 border-t border-border/50 py-4 flex justify-center">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-primary font-medium flex items-center gap-1.5 transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            Kembali ke Toko
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
