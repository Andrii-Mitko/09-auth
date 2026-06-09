"use client";

import { useEffect, useState } from "react";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { updateMe, uploadImage } from "@/lib/api/clientApi";
import { getMe } from "@/lib/api";
import css from "./EditProfilePage.module.css";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? "");
      setPhotoUrl(user.photoUrl ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : photoUrl;

      await updateMe({
        userName,
        photoUrl: newPhotoUrl,
      });
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit profile</h1>

        <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label>Username</label>
            <input
              type="text"
              value={userName}
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
