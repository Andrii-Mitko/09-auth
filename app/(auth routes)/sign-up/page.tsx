"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";

import { RegisterRequest } from "@/types/note";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;

      const user = await register(formValues);

      setUser(user);

      router.push("/profile");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Oops... some error");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} action={handleSubmit}>
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
            Register
          </button>
        </div>
      </form>

      {error && <p className={css.error}>{error}</p>}
    </main>
  );
};

export default SignUp;
