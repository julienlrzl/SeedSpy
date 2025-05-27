// src/components/SlimeFinder/ShareButton.tsx
import React, { useState } from "react";
import html2canvas from "html2canvas";

interface ShareButtonProps {
  /** ref vers l’élément DOM de la grille */
  gridRef: React.RefObject<HTMLElement>;
  /** seed actuelle */
  seed: string;
  /** chunk centre de la vue */
  centerChunk: { x: number; z: number };
  /** niveau de zoom actuel */
  zoom: number;
  /** si on affiche ou non les grid lines */
  gridLines: boolean;
}

export default function ShareButton({
  gridRef,
  seed,
  centerChunk,
  zoom,
  gridLines,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string>("");

  async function openModal() {
    if (!gridRef.current) return;

    // 1) capture de la grille
    const canvas = await html2canvas(gridRef.current, {
      backgroundColor: "#fafafa",
      scale: 2,
    });
    const url = canvas.toDataURL("image/png");
    setImgUrl(url);

    // 2) génération du lien
    const params = new URLSearchParams({
      seed,
      zoom: zoom.toString(),
      gridLines: gridLines.toString(),
      centerX: centerChunk.x.toString(),
      centerZ: centerChunk.z.toString(),
    });
    const current = new URL(window.location.href);
    current.search = params.toString();
    const link = current.toString();
    setShareLink(link);

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setImgUrl(null);
    setShareLink("");
  }

  function downloadImage() {
    if (!imgUrl) return;

    const Seed = seed;
    const fileName = `slime-${Seed}_x${centerChunk.x}_z${centerChunk.z}.png`;

    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = fileName;
    a.click();
  }

  function copyLink() {
    navigator.clipboard.writeText(shareLink);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-2 text-white text-xs font-bold px-3 py-2 rounded-md hover:opacity-90 transition h-[40px]"
        style={{ backgroundColor: "rgba(118,190,109,1)" }}
      >
        <svg
          height="16"
          viewBox="0 0 512 512"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-white"
        >
          <path d="M384,336a63.78,63.78,0,0,0-46.12,19.7l-148-83.27a63.85,63.85,0,0,0,0-32.86l148-83.27a63.8,63.8,0,1,0-15.73-27.87l-148,83.27a64,64,0,1,0,0,88.6l148,83.27A64,64,0,1,0,384,336Z" />
        </svg>
        Share
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pt-20 z-[9999]"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Croix de fermeture en haut à gauche */}
            <button
              onClick={closeModal}
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
              Share your grid
            </h2>

            {/* Aperçu de l’image */}
            {imgUrl && (
              <img
                src={imgUrl}
                alt="Slime grid snapshot"
                className="w-full border mb-4"
              />
            )}

            <div className="flex justify-between mb-4">
              <button
                onClick={downloadImage}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Save PNG
              </button>
              <button
                onClick={copyLink}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy Link
              </button>
            </div>

            <input
              type="text"
              readOnly
              value={shareLink}
              className="w-full border p-2 text-xs"
            />
          </div>
        </div>
      )}
    </>
  );
}
