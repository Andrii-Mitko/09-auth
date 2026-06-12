"use client";

import { useEffect, useState } from "react";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { uploadImage } from "@/lib/api/api";

import css from "./EditProfilePage.module.css";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? "");
      setAvatar(user.avatar ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newAvatar = imageFile ? await uploadImage(imageFile) : avatar;

      await updateMe({
        username,
        avatar: newAvatar,
      });
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit profile</h1>

        <AvatarPicker profilePhotoUrl={avatar} onChangePhoto={setImageFile} />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              className={css.input}
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
