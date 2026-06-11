"use client";

// Додаємо імпорти
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "@/app/api/api";
import css from "./SignInPage.module.css";
import { LoginRequest } from "@/types/note";
import { login } from "@/lib/api/api";


const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as LoginRequest;
      // Виконуємо запит
      const res = await login(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
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
