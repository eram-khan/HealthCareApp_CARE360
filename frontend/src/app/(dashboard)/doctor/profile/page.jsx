import ProfilePage from "@/components/ProfilePage/ProfilePage";


export const metadata = {
  title: "Doctor Profile | CARE360",
  description: "View and manage your doctor profile in CARE360 platform."
};

export default function Page() {
  return <ProfilePage userType='doctor' />;
}