import { DataIdentity } from "@/types/identity";

interface IdentityCardProps {
    identity: DataIdentity;
}

export default function IdentityCard({ identity }: IdentityCardProps) {
    return (
        <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
                {identity.firstName} {identity.lastName}
            </span>
            <span className="truncate text-xs">
                {identity.position} {identity.position && identity.company && "@"} {identity.company}
            </span>
        </div>
    );
}
