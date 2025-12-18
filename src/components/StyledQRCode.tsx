"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface StyledQRCodeProps {
  data: string;
  size?: number;
  image?: string;
  className?: string;
}

export default function StyledQRCode({
  data,
  size = 200,
  image = "/assets/realsee-logo.jpeg",
  className,
}: StyledQRCodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: size,
        height: size,
        data,
        image,
        dotsOptions: {
          color: "#000000",
          type: "rounded",
        },
        cornersSquareOptions: {
          color: "#000000",
          type: "extra-rounded",
        },
        cornersDotOptions: {
          color: "#000000",
          type: "dot",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
        },
      });

      if (ref.current) {
        ref.current.innerHTML = "";
        qrCodeRef.current.append(ref.current);
      }
    }
  }, [data, size, image]);

  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.update({
        data,
        image,
        width: size,
        height: size,
      });
    }
  }, [data, size, image]);

  return <div ref={ref} className={className} />;
}
