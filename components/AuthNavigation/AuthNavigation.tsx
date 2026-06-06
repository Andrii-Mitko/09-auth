// Якщо користувач не авторизований, в AuthNavigation мають відображатися посилання на сторінки реєстрації (Register) та входу (Login).

// Якщо користувач авторизований, в AuthNavigation мають відображатися:

// посилання на сторінку профілю (Profile);
// кнопка Logout, яка при натисканні викликає функцію виходу з акаунта і виконує редірект на сторінку Login.

// Важливо: логіку виведення елементів Register, Login, Profile, Logout в хедері необхідно побудувати через умовний рендер на основі значення isAuthenticated з Zustand-стора.

const AuthNavigation = () => {
  return <li>AuthNavigation</li>;
};

export default AuthNavigation;

//  <li className={css.navigationItem}>
//   <a href="/profile" prefetch={false} className={css.navigationLink}>
//     Profile
//   </a>
// </li>

// <li className={css.navigationItem}>
//   <p className={css.userEmail}>User email</p>
//   <button className={css.logoutButton}>
//     Logout
//   </button>
// </li>

// <li className={css.navigationItem}>
//   <a href="/sign-in" prefetch={false} className={css.navigationLink}>
//     Login
//   </a>
// </li>

// <li className={css.navigationItem}>
//   <a href="/sign-up" prefetch={false} className={css.navigationLink}>
//     Sign up
//   </a>
// </li>
