'use client';

import css from './EditProfilePage.module.css';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '../../../../lib/store/authStore';
import {editProfile} from '../../../../lib/api/clientApi';
import {UpdateUserRequest} from '../../../../types/user';
import Image from 'next/image';
import Link from 'next/link';

export default function EditPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [error, setError] = useState("");

    const setUser = useAuthStore((state) => state.setUser);

    const hundleEditProfile = async (formData: FormData) => {
        try {
            const formValues = Object.fromEntries(formData) as UpdateUserRequest;
            console.log(formValues);

            const res = await editProfile(formValues);
     
            if (res) {
                setUser(res);

                router.push("/profile");
            } else {
                setError("Invalid email or password");
            }
        }  catch (error) {
      console.log("error", error);
      setError("Invalid email or password");
    }
};

    return (
        <main className={css.mainContent}>
        <div className={css.profileCard}>
            <h1 className={css.formTitle}>Edit Profile</h1>
            <div className={css.avatar}>{/* <AvatarPicker /> */}</div>
            {user && (
            <Image
                src={user.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
            />
            )}
            <form
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                await hundleEditProfile(formData);
            }}
            className={css.profileInfo}
            >
            <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                id="username"
                name="username"
                type="text"
                className={css.input}
                required
                />
            </div>

            <p>Email: {user?.email}</p>

            <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                Save
                </button>
                <Link href="/profile">
                <button type="button" className={css.cancelButton}>
                    Cancel
                </button>
                </Link>
            </div>
            </form>
            {error && <p>{error}</p>}
        </div>
        </main>
    );
}