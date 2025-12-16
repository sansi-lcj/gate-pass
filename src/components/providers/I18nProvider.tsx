"use client";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { useMemo } from "react";

type I18nProviderProps = {
  children: React.ReactNode;
  locale: string;
  resources: Record<string, unknown>;
};

export default function I18nProvider({
  children,
  locale,
  resources,
}: I18nProviderProps) {
  const i18n = useMemo(() => {
    const instance = i18next.createInstance();

    instance
      .use(initReactI18next)
      .use(
        resourcesToBackend((language: string, _namespace: string) => {
          // This is primarily for lazy loading if needed, but we hydration with resources
          return import(`../../../messages/${language}.json`);
        })
      )
      .init({
        lng: locale,
        resources: {
          [locale]: {
            translation: resources, // 'translation' is default namespace
          },
        },
        fallbackLng: "en",
        interpolation: {
          escapeValue: false, // React already safes from xss
          prefix: "{",
          suffix: "}",
        },
      });

    return instance;
  }, [locale, resources]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
