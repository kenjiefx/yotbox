import { ArrowLeft } from "lucide-react";

export type EditorHeaderProps = {
  title: string;
  onExit: () => void;
};

export default function EditorHeader({ title, onExit }: EditorHeaderProps) {
  return (
    <div className="relative p-2 flex justify-between items-center card">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
      <div className="flex items-center mt-1">
        <button onClick={onExit} className="mr-3 p-1 rounded hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-slate-800">
          {title}
        </h2>
      </div>
    </div>
  );
}
