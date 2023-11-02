import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import useUserStore from "@/stores/user";
import Image from "next/image";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { AlertError } from "./alert";

interface RegisterAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterAuthForm({
  className,
  ...props
}: RegisterAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const { errAuth, handleRegister } = useUserStore();

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFile(file);
    file && setFilePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    handleRegister({
      email,
      password,
      displayName,
      file: file as Blob | Uint8Array | ArrayBuffer,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
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
              required
              autoCorrect="off"
              value={displayName}
              disabled={isLoading}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect="off"
              required
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
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
              required
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

          {errAuth && <AlertError />}
        </div>
      </form>
    </div>
  );
}
