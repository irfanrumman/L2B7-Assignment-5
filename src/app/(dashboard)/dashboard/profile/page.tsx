import { redirect } from "next/navigation";
import { getMe } from "@/service/getMe";
import { ProfileForm } from "./_components/ProfileForm";

export default async function ProfilePage() {
  const result = await getMe();

  if (!result.success) {
    redirect("/login");
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">My Profile</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          View and update your account information.
        </p>
      </div>

      <ProfileForm user={result.data.user} />
    </div>
  );
}
