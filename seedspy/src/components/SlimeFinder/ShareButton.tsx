export default function ShareButton() {
  return (
    <button
      className="flex items-center gap-2 text-white text-xs font-bold px-3 py-2 rounded-md hover:opacity-90 transition h-[40px]"
      style={{ backgroundColor: "rgba(118,190,109,255)" }}
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
  );
}
