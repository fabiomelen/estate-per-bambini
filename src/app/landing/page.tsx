import Link from "next/link";

import Alert from "@/components/alert";

export default function LandingPage() {
  if (!process.env.LOGIN_URL) {
    return <Alert>Missing LOGIN_URL</Alert>;
  }

  if (!process.env.RETURN_URL) {
    return <Alert>Missing RETURN_URL</Alert>;
  }

  const partecipateURL = `${process.env.LOGIN_URL}?return=${encodeURIComponent(
    process.env.RETURN_URL,
  )}`;

  return (
    <div className="flex justify-center">
      <Link
        href={partecipateURL}
        className="mt-16 inline-block rounded border-2 border-[#9C3AFF] px-6 pb-[6px] pt-2 text-xl font-medium uppercase leading-normal text-[#9C3AFF] transition duration-150 ease-in-out hover:border-[#9C3AFF] hover:bg-[#9C3AFF] hover:bg-opacity-10 hover:text-[#9C3AFF] focus:border-[#9C3AFF] focus:text-[#9C3AFF] focus:outline-none focus:ring-0 active:border-[#9C3AFF] active:text-[#9C3AFF]"
        data-te-ripple-init
      >
        Partecipa al concorso
      </Link>
    </div>
  );
}
