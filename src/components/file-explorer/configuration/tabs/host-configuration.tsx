"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus, Trash2 } from "lucide-react";
import {
  HostConfiguration as HostConfigurationType,
  hostConfigurationSchema,
} from "@/validation/configuration.zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { successToast, zodError } from "@/components/form-error";
import { InlineLoader } from "@/components/loaders";
import { ls } from "@/lib/utils/ls";
import { Checkbox } from "@/components/ui/checkbox";

// Host Configuration Component
export const HostConfiguration = ({
  host,
  setHosts,
}: {
  host: HostConfigurationType;
  setHosts: (hosts: HostConfigurationType[]) => void;
}) => {
  // Form
  const form = useForm({
    resolver: zodResolver(hostConfigurationSchema),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  // Handle Delete Host
  const handleDeleteHost = () => {
    // Remove from Local Storage
    const hosts = ls.get("hosts") || [];

    if (hosts.length > 0) {
      const lhost = hosts.filter(
        (h: HostConfigurationType) => h.id !== host.id
      );
      ls.set("hosts", lhost);
      setHosts(lhost);
      reset();
    }
  };

  // Handle Save Configuration
  const onSubmit = (data: HostConfigurationType) => {
    // console.log(data);

    // Save to Local Storage
    let hosts = ls.get("hosts") || [];

    // If host already exists, update it
    const host = hosts.find((h: HostConfigurationType) => h.id === data.id);

    // If current host is default, remove it from other hosts
    if (data.default) {
      hosts = hosts.map((host: HostConfigurationType) =>
        host.id !== data.id ? { ...host, default: false } : host
      );
    }

    // If host already exists, update it
    if (host) {
      // Update Host
      Object.assign(host, data);
    } else {
      // Add new host
      hosts.push(data);
    }

    // Save to Local Storage
    ls.set("hosts", hosts);
    setHosts(hosts);

    // Toast
    successToast("Host saved successfully");
  };

  // Handle Zod Errors
  useEffect(() => {
    if (errors) {
      zodError(errors);
    }
  }, [errors]);

  // Set Default Values
  useEffect(() => {
    if (host) reset(host);
  }, [host, reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border even:bg-accent rounded-lg"
      >
        <div className="px-6 py-2 flex items-center justify-between">
          <h2 className="text-muted-foreground text-lg font-medium">
            Host Id: {host.id}
          </h2>

          {/* Set Default */}
          <FormField
            control={control}
            name="default"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <Checkbox
                  id={`set-default-${host.id}`}
                  className="cursor-pointer"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label
                  htmlFor={`set-default-${host.id}`}
                  className="cursor-pointer"
                >
                  Set Default
                </Label>
              </FormItem>
            )}
          />
        </div>
        <div className="p-6 border-t grid grid-cols-3 gap-x-4 gap-y-6">
          {/* Host Name */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>
                  <span>Host Name</span>
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="dev, prod, etc." />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Base URL */}
          <FormField
            control={control}
            name="baseUrl"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  <span>Base URL</span>
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Token */}
          <FormField
            control={control}
            name="token"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Access Token (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Access Token" />
                </FormControl>
                <FormDescription>
                  Please provide a Bearer token for authentication if required.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Paths */}
          <div className="col-span-full border-t pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm max-w-11/12 text-muted-foreground">
                Please provide the paths to the files you want to explore. Which
                you have set in your API.
              </p>
              <Button variant="outline" size="icon" className="hidden">
                <Plus className="size-4" />
              </Button>
            </div>
            {host.paths?.map((path, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
                {/* Path Key */}
                <FormField
                  control={control}
                  name={`paths.${index}.key`}
                  render={({ field }) => (
                    <FormItem className="w-1/3">
                      <FormLabel className="text-muted-foreground">
                        Key
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={path.key} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Path */}
                <FormField
                  control={control}
                  name={`paths.${index}.path`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Path</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="path"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="col-span-full flex justify-end items-center gap-4">
            <Button type="button" variant="outline" onClick={handleDeleteHost}>
              <Trash2 className="size-3" />
              <span>Delete</span>
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <InlineLoader
                  loader={{
                    show: true,
                    text: "Saving...",
                  }}
                  classNames={{
                    loader: "size-4",
                  }}
                />
              ) : (
                <span>Save</span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
