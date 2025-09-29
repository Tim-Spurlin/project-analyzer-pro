import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { ScrollArea } from './ui/scroll-area'
import { 
  Folder, 
  File, 
  CaretRight, 
  CaretDown,
  Code,
  FileText,
  Image,
  Gear
} from '@phosphor-icons/react'

interface ProcessedProject {
  name: string
  files: Array<{
    name: string
    path: string
    content: string
    size: number
    type: string
  }>
  structure: any
  totalSize: number
  fileCount: number
  uploadedAt: Date
}

interface ProjectStructureProps {
  project: ProcessedProject
}

const getFileIcon = (fileName: string, type: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  
  if (['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'swift', 'kt'].includes(extension || '')) {
    return <Code size={16} className="text-blue-400" />
  }
  
  if (['md', 'txt', 'rst', 'adoc', 'tex'].includes(extension || '') || fileName.includes('README')) {
    return <FileText size={16} className="text-green-400" />
  }
  
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(extension || '')) {
    return <Image size={16} className="text-purple-400" />
  }
  
  if (['json', 'yaml', 'yml', 'toml', 'ini', 'conf'].includes(extension || '')) {
    return <Gear size={16} className="text-orange-400" />
  }
  
  return <File size={16} className="text-muted-foreground" />
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const FileTreeNode = ({ name, node, path = '' }: { name: string; node: any; path?: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isFile = node.content !== undefined
  const currentPath = path ? `${path}/${name}` : name

  if (isFile) {
    return (
      <div className="flex items-center gap-2 py-1 px-2 hover:bg-muted/50 rounded text-sm">
        {getFileIcon(node.name, node.type)}
        <span className="flex-1">{name}</span>
        <Badge variant="outline" className="text-xs">
          {formatFileSize(node.size)}
        </Badge>
      </div>
    )
  }

  const childCount = Object.keys(node).length

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-start p-2 h-auto text-sm hover:bg-muted/50">
          <div className="flex items-center gap-2">
            {isOpen ? <CaretDown size={14} /> : <CaretRight size={14} />}
            <Folder size={16} className="text-yellow-400" />
            <span>{name}</span>
            <Badge variant="secondary" className="ml-2 text-xs">
              {childCount}
            </Badge>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-4 border-l border-border pl-2">
        {Object.entries(node).map(([childName, childNode]) => (
          <FileTreeNode 
            key={childName} 
            name={childName} 
            node={childNode} 
            path={currentPath}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function ProjectStructure({ project }: ProjectStructureProps) {
  const getFileTypeStats = () => {
    const stats: Record<string, number> = {}
    project.files.forEach(file => {
      const type = file.type || 'unknown'
      stats[type] = (stats[type] || 0) + 1
    })
    return Object.entries(stats).sort((a, b) => b[1] - a[1])
  }

  const fileTypeStats = getFileTypeStats()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Files</span>
              <span className="font-semibold">{project.fileCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Size</span>
              <span className="font-semibold">{formatFileSize(project.totalSize)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Uploaded</span>
              <span className="font-semibold">
                {project.uploadedAt.toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">File Types</h4>
            <div className="space-y-1">
              {fileTypeStats.slice(0, 6).map(([type, count]) => (
                <div key={type} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{type}</span>
                  <span>{count}</span>
                </div>
              ))}
              {fileTypeStats.length > 6 && (
                <div className="text-xs text-muted-foreground">
                  +{fileTypeStats.length - 6} more types
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Tree */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">File Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-1">
              {Object.entries(project.structure).map(([name, node]) => (
                <FileTreeNode key={name} name={name} node={node} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}