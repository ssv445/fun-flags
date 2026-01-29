"use client";

import { useState, useEffect } from "react";
import { Flag } from "@/lib/types";
import { sortFlagsAlphabetically } from "@/lib/flags";
import { Slideshow } from "@/components/Slideshow";

export default function SlideshowPage() {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await import("@/data/flags.json");
        setFlags(sortFlagsAlphabetically(data.default as Flag[]));
      } catch (error) {
        console.error("Failed to load flags:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple via-sky to-coral">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-bounce">🏳️</div>
          <p className="text-xl font-medium">Loading flags...</p>
        </div>
      </div>
    );
  }

  return <Slideshow flags={flags} />;
}
