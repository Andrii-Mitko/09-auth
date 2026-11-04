"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import css from "./SignInPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { login, getMe, type LoginRequest } from "@/lib/api/clientApi";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError("");

    try {
      const formValues: LoginRequest = {
        email: String(formData.get("email") ?? "")
          .trim()
          .toLowerCase(),
        password: String(formData.get("password") ?? ""),
      };

      const res = await login(formValues);

      if (res) {
        const user = await getMe();
        setUser(user);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? (error.response?.data?.error ??
              error.message ??
              "Oops... some error")
          : "Oops... some error",
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <label className={css.formGroup}>
          Email
          <input className={css.input} type="email" name="email" required />
        </label>

        <label className={css.formGroup}>
          Password
          <input
            className={css.input}
            type="password"
            name="password"
            required
          />
        </label>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
