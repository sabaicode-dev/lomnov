import UserPostedProperties from "@/components/organisms/user-posted-properties/UserPostedProperties";
export default function Page({ params }: { params: { username: string } }) {
  console.log("params in page.tsx:",params.username);
  
  return (
    
    <div className="max-w-[1300px] mx-auto p-[10px] xl:p-0">
      <UserPostedProperties user={params.username} />
    </div>
  );
}
