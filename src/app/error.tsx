"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // В реальном приложении логируем в службу мониторинга
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
        Ошибка
      </span>
      <h1 className="mt-3 text-3xl font-normal text-neutral-900 tracking-tight sm:text-4xl">
        Что-то пошло не так
      </h1>
      <p className="mt-4 max-w-[46ch] text-sm text-neutral-600 leading-relaxed">
        Произошла непредвиденная ошибка при загрузке страницы. Попробуйте обновить экран.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-none bg-neutral-900 px-6 py-3 text-xs tracking-wider text-white uppercase transition hover:bg-neutral-800 cursor-pointer"
        >
          Повторить попытку
        </button>
      </div>
    </main>
  );
}
