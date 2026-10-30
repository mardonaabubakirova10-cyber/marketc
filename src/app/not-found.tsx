import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
        404
      </span>
      <h1 className="mt-3 text-3xl font-normal text-neutral-900 tracking-tight sm:text-4xl">
        Страница не найдена
      </h1>
      <p className="mt-4 max-w-[46ch] text-sm text-neutral-600 leading-relaxed">
        Возможно, ссылка устарела или адрес был введён с опечаткой. Перейдите в каталог
        или вернитесь на главную страницу.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-none bg-neutral-900 px-6 py-3 text-xs tracking-wider text-white uppercase transition hover:bg-neutral-800"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
