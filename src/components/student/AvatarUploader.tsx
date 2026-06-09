import { useRef, useState } from "react";
import { Camera, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACCEPTED_IMAGE_TYPES, MAX_AVATAR_SIZE_MB } from "@/utils/constants";

interface AvatarUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  fallback: string;
}

export function AvatarUploader({ value, onChange, fallback }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onFile = (file: File | undefined | null) => {
    setError(null);
    setSuccess(null);
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Invalid file type. Use PNG, JPG, or WebP.");
      return;
    }
    if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      setError(`Image is larger than ${MAX_AVATAR_SIZE_MB}MB.`);
      return;
    }
    const url = URL.createObjectURL(file);
    onChange(url);
    setSuccess("Photo uploaded!");
    // TODO: POST to backend: studentService.uploadAvatar(file)
  };

  const remove = () => {
    onChange(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="w-full">
      <div className="relative mx-auto h-[120px] w-[120px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-xl opacity-60" aria-hidden />
        <div className="relative h-full w-full rounded-full overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          {value ? (
            <img src={value} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <span className="text-white text-3xl font-semibold">{fallback.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Change photo"
          className="absolute bottom-0 right-0 h-9 w-9 rounded-full gradient-primary text-white inline-flex items-center justify-center ring-2 ring-background hover:opacity-95"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />

      <div className="mt-5 flex flex-col gap-2 items-center">
        <Button size="sm" onClick={() => inputRef.current?.click()}>
          <Upload className="w-4 h-4" /> Upload Photo
        </Button>
        {value && (
          <button
            onClick={remove}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-danger transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        )}
        <p className="text-[11px] text-muted-foreground/70 mt-1">
          PNG, JPG or WebP · Max {MAX_AVATAR_SIZE_MB}MB
        </p>
        {error && <p className="text-xs text-danger">{error}</p>}
        {success && !error && <p className="text-xs text-success">{success}</p>}
      </div>
    </div>
  );
}
