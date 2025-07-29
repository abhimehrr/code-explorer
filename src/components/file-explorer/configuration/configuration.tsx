import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";
import {
  HostConfiguration as HostConfigurationType,
  PathEnum,
} from "@/validation/configuration.zod";
import { HostConfiguration } from "./tabs/host-configuration";
import { generateRandomString } from "@/lib/utils/random.utils";
import { useFilesStore } from "@/stores/files.store";

// Configuration and Settings
const ConfigurationAndSettings = () => {
  // Store
  const { hosts, isAddingHost, setIsAddingHost } = useFilesStore();

  // Default Host Values
  const defaultHost: HostConfigurationType = {
    id: generateRandomString(),
    name: "",
    baseUrl: "",
    paths: Object.values(PathEnum).map((path) => ({
      key: path,
      path: "",
    })),
    default: false,
    token: "",
  };

  return (
    <Tabs defaultValue="host">
      <TabsList>
        <TabsTrigger value="host" className="px-4">
          Host
        </TabsTrigger>
      </TabsList>

      <div className="max-h-[60vh] pr-2 thin-scrollbar overflow-y-auto">
        {/* Host Configuration */}
        <TabsContent value="host">
          <div className="space-y-4">
            {/* Hosts */}
            {hosts.map((host, index) => (
              <HostConfiguration key={index} host={host} />
            ))}
          </div>

          {/* Add Host Form */}
          {isAddingHost && (
            <div className="my-4">
              <HostConfiguration host={defaultHost} />
            </div>
          )}

          {/* Add Host Button */}
          <AddHostButton setIsAddingHost={setIsAddingHost} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

// Add Host Button
const AddHostButton = ({
  setIsAddingHost,
}: {
  setIsAddingHost: (isAddingHost: boolean) => void;
}) => {
  return (
    <div className="mt-4 flex justify-end">
      <Button variant="outline" onClick={() => setIsAddingHost(true)}>
        <Server className="size-4" />
        <span>Add Host</span>
      </Button>
    </div>
  );
};

export default ConfigurationAndSettings;
