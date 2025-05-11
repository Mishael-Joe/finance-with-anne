import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <Loader2 className="w-10 h-10 animate-spin text-primary-light" />
    </div>
  );
}
