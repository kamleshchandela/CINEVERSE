"use client";

import { useState } from "react";
import Image from "next/image";
import type { CastMember } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function CastGrid({ cast }: { cast: CastMember[] }) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  if (cast.length === 0) return null;

  return (
    <div className="cast-scroll">
      {cast.map((member) => (
        <div key={member.actorId} className="cast-card">
          <div className="cast-avatar">
            {failed[member.actorId] || !member.imageUrl ? (
              <div className="cast-fallback">{initials(member.name)}</div>
            ) : (
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={96}
                height={96}
                sizes="96px"
                style={{ objectFit: "cover" }}
                onError={() =>
                  setFailed((prev) => ({ ...prev, [member.actorId]: true }))
                }
              />
            )}
          </div>
          <div className="cast-name">{member.name}</div>
          <div className="cast-role">{member.role}</div>
        </div>
      ))}
    </div>
  );
}
