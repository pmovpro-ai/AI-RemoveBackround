"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
      aria-label="Toggle Language"
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium">{currentLang === "en" ? "العربية" : "English"}</span>
    </button>
  );
}