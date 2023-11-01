import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { AlertError } from "./alert";

interface RegisterAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterAuthForm({
  className,
  ...props
}: RegisterAuthFormProps) {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<File>();

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFileUpload(file);
    file && setFilePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Display name
            </Label>
            <Input
              id="displayname"
              placeholder="Display name"
              type="displayname"
              autoCapitalize="none"
              autoCorrect="off"
              value={displayName}
              disabled={isLoading}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect="off"
              value={username}
              disabled={isLoading}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="grid">
            {filePreview && (
              <div className="relative rounded-full flex w-full max-w-sm items-center justify-center gap-1.5">
                <Image
                  loading="lazy"
                  src={filePreview}
                  width={200}
                  height={200}
                  alt="file-preview"
                />
              </div>
            )}
            <Input onChange={handleUploadImage} id="picture" type="file" />
          </div>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>

          {errorMessage && <AlertError />}
        </div>
      </form>
    </div>
  );
}
