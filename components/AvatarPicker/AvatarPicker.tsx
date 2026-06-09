"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import css from "./AvatarPicker.module.css";

type Props = {
  onChangePhoto: (file: File | null) => void;
  profilePhotoUrl?: string;
};

const AvatarPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [removed, setRemoved] = useState(false);

  const imageUrl = !removed ? previewUrl || profilePhotoUrl : undefined;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only images");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size 5MB");
      return;
    }

    onChangePhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setRemoved(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChangePhoto(null);
    setPreviewUrl("");
    setRemoved(true);
  };

  return (
    <div>
      <div className={css.picker}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        )}

        <label
          className={imageUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}
        >
          📷 Choose photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={css.input}
          />
        </label>

        {imageUrl && (
          <button type="button" className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>

      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
