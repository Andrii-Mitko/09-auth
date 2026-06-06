// Достатньо реалізувати можливість редагування лише для поля з іменем користувача (username), при цьому в полі інпуту має бути встановлене початкове значення поточного імені. Email користувача відображається у вигляді звичайного тексту, без можливості редагування. Аватар користувача відображається зображенням, без можливості редагування, використовуйте компонент Image від Next.js.

// При натисканні на кнопку Save має відправлятися запит на оновлення імені користувача через API. У разі успішного оновлення має виконуватися автоматичне перенаправлення (редірект) на сторінку профілю /profile.

// При натисканні на кнопку Cancel користувач повинен повернутися назад на сторінку профілю.

{
  /* <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <img src="avatar"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
        />
      </div>

      <p>Email: user_email@example.com</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main> */
}
