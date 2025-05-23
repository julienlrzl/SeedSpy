// components/Social.tsx
import { FaDiscord, FaReddit, FaXTwitter, FaYoutube } from "react-icons/fa6";

const ICON_SIZE = 32;
const BUTTON_CLASSES = `
  w-12 h-12
  flex items-center justify-center
  rounded-full
  transition-transform duration-200
  hover:scale-110
`;

export default function Social() {
  return (
    <div className="flex gap-4">
      {/* Discord */}
      <a
        href="https://discord.gg/ton-serveur"
        target="_blank"
        rel="noopener noreferrer"
        className={BUTTON_CLASSES}
      >
        <FaDiscord size={ICON_SIZE} color="#5865F2" />
      </a>

      {/* Reddit */}
      <a
        href="https://reddit.com/r/ton-subreddit"
        target="_blank"
        rel="noopener noreferrer"
        className={BUTTON_CLASSES}
      >
        <FaReddit size={ICON_SIZE} color="#FF4500" />
      </a>

      {/* X */}
      <a
        href="https://x.com/ton-compte"
        target="_blank"
        rel="noopener noreferrer"
        className={BUTTON_CLASSES}
      >
        {/* FaTwitter mais pointe vers X */}
        <FaXTwitter size={ICON_SIZE} color="#000000" />
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/c/ta-chaine"
        target="_blank"
        rel="noopener noreferrer"
        className={BUTTON_CLASSES}
      >
        <FaYoutube size={ICON_SIZE} color="#FF0000" />
      </a>
    </div>
  );
}
