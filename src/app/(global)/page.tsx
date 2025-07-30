import React from "react";
import { Button } from "@/components/ui/button";
import {
  Code,
  FolderOpen,
  Cloud,
  GitBranch,
  Search,
  Share2,
  Monitor,
  FileText,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

// Home Page
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
          <span className="text-primary">CodeExplorer</span> - Your Code Editor
          in the Browser
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore and view code files from your local system, cloud storage, or
          Git repositories. Perfect for developers and teams who need to share
          and review code assets, interfaces, and any type of code files without
          complex setup.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="flex items-center gap-2">
            <Link href="/files?tab=config">
              <Cloud className="size-4" />
              Connect API
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="flex items-center gap-2"
          >
            <Link
              href="https://github.com/abhimehrr/code-explorer"
              target="_blank"
            >
              <GitBranch className="size-4" />
              Explore Repo
            </Link>
          </Button>
        </div>
      </div>

      {/* Problem Solution Section */}
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why CodeExplorer?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solve the common problems developers and teams face when sharing and
            reviewing code
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Team Collaboration
            </h3>
            <p className="text-muted-foreground mb-4">
              Share code snippets, interfaces, and assets with your team
              instantly. No need for complex setup or external tools - just
              browse and view code directly in the browser.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Instant code sharing without file uploads</li>
              <li>• Real-time collaboration on code reviews</li>
              <li>• No complex IDE setup required</li>
            </ul>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-primary" />
              Quick Access
            </h3>
            <p className="text-muted-foreground mb-4">
              Access your code from anywhere - local files, cloud storage, or
              Git repositories. View files with syntax highlighting and search
              capabilities.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Browse local file system</li>
              <li>• Connect to cloud services (Google Drive, Dropbox)</li>
              <li>• Explore Git repositories</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Code Viewing</h3>
            <p className="text-muted-foreground">
              View code files with syntax highlighting, line numbers, and search
              functionality.
            </p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
            <p className="text-muted-foreground">
              Find files and code snippets quickly with powerful search across
              all your sources.
            </p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
            <p className="text-muted-foreground">
              Share code files and folders with your team through simple links
              and permissions.
            </p>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 border rounded-lg">
            <Code className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Code Reviews</h3>
            <p className="text-sm text-muted-foreground">
              Review code changes and share feedback with your team
            </p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Share API documentation, interfaces, and type definitions
            </p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <GitBranch className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Repository Browsing</h3>
            <p className="text-sm text-muted-foreground">
              Explore Git repositories and view code without cloning
            </p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Cloud className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Cloud Integration</h3>
            <p className="text-sm text-muted-foreground">
              Access code files stored in cloud services
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to explore your code?</h2>
        <p className="text-muted-foreground mb-6">
          Start browsing your files and sharing code with your team today.
        </p>
        <Button asChild size="lg">
          <Link href="/local">
            <Monitor className="mr-2 h-4 w-4" />
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
};

