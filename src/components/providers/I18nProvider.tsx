"use client";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
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
  // Create a unique key based on locale and resources to force re-creation
  const resourcesKey = useMemo(() => JSON.stringify(resources), [resources]);

  const i18n = useMemo(() => {
    const instance = i18next.createInstance();
    instance.use(initReactI18next).init({
      lng: locale,
      resources: {
        [locale]: {
          translation: resources,
        },
      },
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
        prefix: "{",
        suffix: "}",
      },
    });
    return instance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, resourcesKey]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
