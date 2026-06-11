"use client";

// Додаємо імпорти
import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { ApiError } from "@/app/api/api";
import { RegisterRequest } from "@/types/note";
import { register } from "@/lib/api/api";


const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      // Виконуємо запит
      const res = await register(formValues);
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
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <label className={css.formGroup}>
          Username
          <input className={css.input} type="text" name="userName" required />
        </label>
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
