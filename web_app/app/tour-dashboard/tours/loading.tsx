import { LoadingDots } from "@/app/components/loading-dots/LoadingDots"; // Import the new LoadingDots component

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center min-h-[50vh]" role="status" aria-busy="true">
      <LoadingDots />
      <p className="text-muted-foreground">Loading tours...</p>
    </div>
  );
}
