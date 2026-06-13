"use client";

import { useEffect, useState } from "react";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { updateMe, getMe } from "@/lib/api/clientApi";

import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? "");
      setAvatar(user.avatar ?? "");
      setEmail(user.email ?? "");

      //  синхронізуємо store при завантаженні
      setUser(user);
    });
  }, [setUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const updatedUser = await updateMe({
        username,
      });

      // оновлюємо глобальний state
      setUser(updatedUser);
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit profile</h1>

        <AvatarPicker profilePhotoUrl={avatar} onChangePhoto={() => {}} />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              className={css.input}
            />

            <label>Email</label>
            <input type="text" value={email} disabled className={css.input} />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
