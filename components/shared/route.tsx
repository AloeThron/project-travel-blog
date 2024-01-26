import Link from "next/link";
import { cn } from "@/lib/utils";

interface routeProps {
  route: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Route({ route, label, isActive, onClick }: routeProps) {
  return (
    <Link
      href={route}
      onClick={onClick}
      className={cn(isActive && "text-primary")}
    >
      {label}
    </Link>
  );
}
