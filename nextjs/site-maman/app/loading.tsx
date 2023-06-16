import { RiLoader4Fill } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <RiLoader4Fill size={40} className="text-rose-500 animate-spin" />
    </div>
  );
}
