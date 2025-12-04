"use client";
import * as React from "react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldSeparator,
  FieldContent,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Eye, EyeOff, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";

export default function FormData({
  FieldGroupLayoutVariant,
  FieldWidth,
  Label,
  FieldItems,
  onSubmit,
  onCancel,
}: {
  FieldGroupLayoutVariant: "grid1" | "grid2" | "grid3";
  FieldWidth:
    | "max-w-md"
    | "max-w-lg"
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-8xl"
    | "max-w-9xl"
    | "max-w-10xl";
  Label?: string;
  FieldItems: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
}) {
  return (
    <main>
      <div>
        <form onSubmit={onSubmit}>
          <FieldGroup className={cn(FieldWidth, "")}>
            <FieldSet>
              <FieldLegend>Form Data {Label}</FieldLegend>
              <FieldDescription>
                This is the form data for the form {Label}.
              </FieldDescription>
              <FieldSeparator />
              <FieldGroupLayout variant={FieldGroupLayoutVariant}>
                {FieldItems}
              </FieldGroupLayout>
            </FieldSet>
            <FieldSeparator />
            <Field orientation="horizontal" className="flex justify-end gap-2">
              <Button type="submit">Submit {Label}</Button>
              <Button
                variant="outline"
                type="button"
                onClick={(e) => {
                  onCancel();
                  e.currentTarget.form?.reset();
                }}
              >
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}

export function FieldGroupLayout({
  children,
  variant,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  variant: "grid1" | "grid2" | "grid3";
}) {
  const variants = {
    grid1: "grid grid-cols-1 gap-4",
    grid2: "grid md:grid-cols-2 grid-cols-1 gap-4",
    grid3: "grid md:grid-cols-3 grid-cols-1 gap-4",
  } as const;
  return (
    <>
      <FieldGroup className={cn(className, variants[variant], "")}>
        {children}
      </FieldGroup>
    </>
  );
}

export function FormDialog({
  title,
  description,
  FieldGroupLayoutVariant,
  FieldItems,
  onSubmit,
  isOpen,
  setIsOpen,
}: {
  title: string;
  description: string;
  FieldGroupLayoutVariant: "grid1" | "grid2" | "grid3";
  FieldItems: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add {title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <FieldSet>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <FieldGroupLayout variant={FieldGroupLayoutVariant}>
              {FieldItems}
            </FieldGroupLayout>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function FieldInput({
  fieldData,
  defaultValue,
  disabled,
}: {
  fieldData: string;
  defaultValue?: string;
  disabled?: boolean;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={fieldData}>
        {fieldData.charAt(0).toUpperCase() +
          fieldData.slice(1).replace("_", " ")}
      </FieldLabel>
      <Input
        id={fieldData}
        name={fieldData}
        placeholder={`input ${fieldData.toLowerCase().replace(" ", "-")}`}
        required
        defaultValue={defaultValue}
        disabled={disabled}
      />
      <FieldDescription>This is input {fieldData}.</FieldDescription>
      <FieldError />
    </Field>
  );
}

export function FieldPasswordInput({
  fieldData,
  disabled,
}: {
  fieldData: string;
  disabled?: boolean;
}) {
  const [isHidePassword, setIsHidePassword] = React.useState(false);
  return (
    <Field>
      <FieldLabel htmlFor={fieldData}>
        {fieldData.charAt(0).toUpperCase() +
          fieldData.slice(1).replace("_", " ")}
      </FieldLabel>
      <InputGroup>
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton variant="secondary" size="icon-xs">
                <InfoIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex flex-col gap-1 rounded-xl text-sm"
          >
            <p className="font-medium">Your connection is not secure.</p>
            <p>You should not enter any sensitive information on this site.</p>
          </PopoverContent>
        </Popover>
        <InputGroupInput
          id={fieldData}
          name={fieldData}
          type={isHidePassword ? "text" : "password"}
          placeholder="********"
          disabled={disabled}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => setIsHidePassword(!isHidePassword)}
            size="icon-xs"
          >
            {isHidePassword ? <Eye /> : <EyeOff />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>This is your password.</FieldDescription>
      <FieldError />
    </Field>
  );
}

export function FieldSelect({
  fieldData,
  disabled,
  options,
  defaultValue,
}: {
  fieldData: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  const [value, setValue] = React.useState(defaultValue || "");

  return (
    <Field>
      <FieldLabel htmlFor={fieldData}>
        {fieldData.charAt(0).toUpperCase() +
          fieldData.slice(1).replace("_", " ")}
      </FieldLabel>
      <Select
        value={value}
        onValueChange={setValue}
        disabled={disabled}
        name={fieldData}
        defaultValue={defaultValue}
      >
        <SelectTrigger disabled={disabled}>
          <SelectValue
            placeholder={`Choose ${fieldData.toLowerCase().replace(" ", "-")}`}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Hidden input to store value for form submission */}
      <input type="hidden" name={fieldData} value={value} />
      <FieldDescription>
        Select your {fieldData.toLowerCase().replace(" ", "-")}.
      </FieldDescription>
    </Field>
  );
}

export function FieldTextarea({
  fieldData,
  disabled,
  defaultValue,
}: {
  fieldData: string;
  disabled?: boolean;
  defaultValue?: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={fieldData}>
        {fieldData.charAt(0).toUpperCase() +
          fieldData.slice(1).replace("_", " ")}
      </FieldLabel>
      <Textarea
        id={fieldData}
        name={fieldData}
        placeholder={`textarea ${fieldData.toLowerCase().replace(" ", "-")}`}
        required
        defaultValue={defaultValue}
        disabled={disabled}
      />
      <FieldDescription>This is your textarea {fieldData}.</FieldDescription>
      <FieldError />
    </Field>
  );
}

export function FieldSwitch({
  fieldData,
  disabled,
  defaultValue,
  className,
  orientation,
}: {
  fieldData: string;
  disabled?: boolean;
  defaultValue?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
}) {
  return (
    <div className={cn("flex gap-2", className)}>
      <Field orientation={orientation}>
        <FieldContent>
          <FieldLabel htmlFor={fieldData}>
            {fieldData.charAt(0).toUpperCase() +
              fieldData.slice(1).replace("_", " ")}
          </FieldLabel>
        </FieldContent>
        <div className="flex items-center gap-2">
          <Switch id={fieldData} defaultChecked={defaultValue} />
          <span className="text-sm text-muted-foreground">
            {defaultValue ? "True" : "False"}
          </span>
        </div>
        <FieldDescription>
          Enable {fieldData.toLowerCase().replace(" ", "-")}.
        </FieldDescription>
      </Field>
    </div>
  );
}

//Fiel ImagefileInput

const ImagePreview = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => (
  <div className="relative aspect-square">
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    <Image
      src={url}
      height={500}
      width={500}
      alt=""
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);

export function FieldImageFileInput({
  fieldData,
  disabled,
  defaultValue,
}: {
  fieldData: string;
  disabled?: boolean;
  defaultValue?: string;
}) {
  const [image, setImage] = useState<string | null>(defaultValue || null);

  return (
    <Field className="w-full max-w-40">
      <FieldLabel htmlFor={fieldData}>
        {fieldData.charAt(0).toUpperCase() +
          fieldData.slice(1).replace("_", " ")}
      </FieldLabel>
      <div className="mt-1 w-full">
        {image ? (
          <ImagePreview url={image} onRemove={() => setImage(null)} />
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setImage(imageUrl);
              }
            }}
            accept={{
              "image/png": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxFiles={1}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-hidden focus:border-primary",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input {...getInputProps()} id="profile" />
                <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
              </div>
            )}
          </Dropzone>
        )}
      </div>
      <FieldDescription>This is image file input {fieldData}.</FieldDescription>
      <FieldError />
    </Field>
  );
}
