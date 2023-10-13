import Link from "next/link";

export default function Card({
  children,
  title,
  cta,
}: {
  children: React.ReactNode;
  title: string;
  cta: { href: string; label?: string };
}) {
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <h5 className="mb-2 flex-none text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {title}
      </h5>
      <p className="mb-4 grow text-base text-neutral-600 dark:text-neutral-200">
        {children}
      </p>
      <div className="flex-none">
        <Link
          href={cta.href}
          type="button"
          className="inline-block rounded border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
          data-te-ripple-init
        >
          {cta.label || "view more"}
        </Link>
      </div>
    </div>
  );
}
