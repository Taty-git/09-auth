'use client';

import css from './SignInPage.module.css';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {LoginRequest} from '../../../types/user';
import {login} from '../../../lib/api/clientApi';
import {useAuthStore} from '../../../lib/store/authStore';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
      
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log("error", error);
      setError("Invalid email or password");
    }
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <h1 className={css.formTitle}>Sign in</h1>
      <label className={css.formGroup}>
        Email
        <input type="email" name="email" required className={css.input} />
      </label>
      <label className={css.formGroup}>
        Password
        <input type="password" name="password" required className={css.input} />
      </label>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Log in
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;