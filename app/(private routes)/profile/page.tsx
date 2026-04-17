import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi"; 
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile information",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.title}>My Profile</h1>

        <Image
          src={user.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <div className={css.profileInfo}>
          <p className={css.username}>
            <strong>Username:</strong> {user.username}
          </p>
          <p className={css.email}>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className={css.actions}>
          <Link href="/profile/edit" className={css.editButton}>
            Edit Profile
          </Link>
        </div>
      </div>
    </main>
  );
}