import { notFound } from "next/navigation";
import { Flag } from "@/lib/types";
import { FlagDetail } from "@/components/FlagDetail";
import flagsData from "@/data/flags.json";

const flags = flagsData as Flag[];

export function generateStaticParams() {
  return flags.map((flag) => ({
    code: flag.code.toLowerCase(),
  }));
}

export function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  return params.then(({ code }) => {
    const flag = flags.find((f) => f.code.toLowerCase() === code.toLowerCase());
    if (!flag) {
      return { title: "Flag Not Found" };
    }
    return {
      title: `${flag.name} Flag`,
      description: `Learn about the flag of ${flag.name}. Located in ${flag.continent} with capital ${flag.capital}.`,
    };
  });
}

export default async function FlagPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const flag = flags.find((f) => f.code.toLowerCase() === code.toLowerCase());

  if (!flag) {
    notFound();
  }

  return <FlagDetail flag={flag} />;
}
