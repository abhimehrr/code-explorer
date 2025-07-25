import React from 'react'
import { Button } from '@/components/ui/button'
import { FileText, FolderOpen, Search, Star } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Welcome to <span className="text-primary">FileExplorer</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A modern web-based file explorer that helps you organize, browse, and manage your files and folders with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/files">
              <FileText className="mr-2 h-4 w-4" />
              Browse Files
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/folders">
              <FolderOpen className="mr-2 h-4 w-4" />
              View Folders
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-16">
        <div className="text-center">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">File Management</h3>
          <p className="text-muted-foreground">
            Browse, organize, and manage your files with an intuitive interface.
          </p>
        </div>
        <div className="text-center">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Quick Search</h3>
          <p className="text-muted-foreground">
            Find files and folders instantly with powerful search capabilities.
          </p>
        </div>
        <div className="text-center">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Favorites</h3>
          <p className="text-muted-foreground">
            Mark important files and folders as favorites for quick access.
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Recent Activity</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Document {item}.pdf</p>
                  <p className="text-xs text-muted-foreground">Modified 2 hours ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page