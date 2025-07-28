import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";
import { ls } from "@/lib/utils/ls";
import {
  HostConfiguration as HostConfigurationType,
  PathEnum,
} from "@/validation/configuration.zod";
import { HostConfiguration } from "./tabs/host-configuration";
import { generateRandomString } from "@/lib/utils/random.utils";

// Configuration and Settings
const ConfigurationAndSettings = () => {
  const [hosts, setHosts] = useState<HostConfigurationType[]>(
    ls.get("hosts") || []
  );

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
              <HostConfiguration key={index} host={host} setHosts={setHosts} />
            ))}
          </div>

          {/* Add Host Button */}
          <AddHostButton hosts={hosts} setHosts={setHosts} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

// Add Host Button
const AddHostButton = ({
  hosts,
  setHosts,
}: {
  hosts: HostConfigurationType[];
  setHosts: (hosts: HostConfigurationType[]) => void;
}) => {
  return (
    <div className="mt-4 flex justify-end">
      <Button
        variant="outline"
        onClick={() =>
          setHosts([
            ...hosts,
            {
              id: generateRandomString(),
              name: "",
              baseUrl: "",
              paths: Object.values(PathEnum).map((path) => ({
                key: path,
                path: "",
              })),
              default: false,
              token: "",
            },
          ])
        }
      >
        <Server className="size-4" />
        <span>Add Host</span>
      </Button>
    </div>
  );
};

export default ConfigurationAndSettings;
