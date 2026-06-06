// Створіть клієнтський компонент components/AuthProvider/AuthProvider.tsx, який перевіряє, чи користувач авторизований, і при переході на приватну сторінку виконує повторну перевірку сесії. Якщо користувач неавторизований і намагається перейти на приватну сторінку, має виконуватися вихід і контент не відображатись. Під час перевірки показуйте лоедер.
"use client";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default AuthProvider;
