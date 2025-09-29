import { useState, useCallback } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Upload, FolderOpen, File, Warning } from '@phosphor-icons/react'
interface ProcessedProject {
  name: string
  files: FileItem[]
  structure: any
  totalSize: number
  fileCount: number
  uploadedAt: Date
}

interface FileUploadProps {
  onProjectUploaded: (project: ProcessedProject) => void
}

interface FileItem {
  name: string
  path: string
  content: string
  size: number
  type: string
}

const SUPPORTED_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.cs', '.php',
  '.rb', '.go', '.rs', '.swift', '.kt', '.scala', '.r', '.m', '.h',
  '.html', '.css', '.scss', '.sass', '.less', '.vue', '.svelte',
  '.json', '.xml', '.yaml', '.yml', '.toml', '.ini', '.conf',
  '.md', '.txt', '.rst', '.adoc', '.tex',
  '.sql', '.sh', '.bash', '.zsh', '.ps1', '.bat',
  '.dockerfile', '.gitignore', '.env', '.lock'
]

export function FileUpload({ onProjectUploaded }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileStats, setFileStats] = useState<{
    total: number
    processed: number
    supported: number
    unsupported: number
  } | null>(null)

  const processFiles = async (files: FileList | File[]) => {
    setIsProcessing(true)
    setUploadProgress(0)
    
    const fileArray = Array.from(files)
    const processedFiles: FileItem[] = []
    let totalSize = 0
    let supported = 0
    let unsupported = 0

    setFileStats({
      total: fileArray.length,
      processed: 0,
      supported: 0,
      unsupported: 0
    })

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]
      const progress = ((i + 1) / fileArray.length) * 100
      setUploadProgress(progress)

      // Check if file is supported
      const isSupported = SUPPORTED_EXTENSIONS.some(ext => 
        file.name.toLowerCase().endsWith(ext.toLowerCase())
      ) || file.name.includes('README') || file.name.includes('LICENSE')

      if (isSupported && file.size < 1024 * 1024 * 5) { // 5MB limit
        try {
          const content = await file.text()
          processedFiles.push({
            name: file.name,
            path: file.webkitRelativePath || file.name,
            content,
            size: file.size,
            type: file.name.split('.').pop() || 'unknown'
          })
          totalSize += file.size
          supported++
        } catch (error) {
          console.warn(`Failed to read file: ${file.name}`, error)
          unsupported++
        }
      } else {
        unsupported++
      }

      setFileStats({
        total: fileArray.length,
        processed: i + 1,
        supported,
        unsupported
      })

      // Add small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 10))
    }

    // Create project structure
    const projectName = fileArray[0]?.webkitRelativePath?.split('/')[0] || 'Uploaded Project'
    const structure = buildFileTree(processedFiles)

    const project: ProcessedProject = {
      name: projectName,
      files: processedFiles,
      structure,
      totalSize,
      fileCount: processedFiles.length,
      uploadedAt: new Date()
    }

    setTimeout(() => {
      setIsProcessing(false)
      onProjectUploaded(project)
    }, 500)
  }

  const buildFileTree = (files: FileItem[]) => {
    const tree: any = {}
    
    files.forEach(file => {
      const parts = file.path.split('/')
      let current = tree
      
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = file
        } else {
          if (!current[part]) {
            current[part] = {}
          }
          current = current[part]
        }
      })
    })
    
    return tree
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      processFiles(files)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFiles(files)
    }
  }

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFiles(files)
    }
  }

  return (
    <div className="space-y-6">
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragOver ? 'border-primary bg-primary/5' : 'border-border'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <CardContent className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Upload size={32} className="text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Upload Project Files</h3>
              <p className="text-muted-foreground max-w-md">
                Drag and drop a project folder here, or click to browse files
              </p>
            </div>

            <div className="flex gap-4">
              <div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept={SUPPORTED_EXTENSIONS.join(',')}
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <File size={16} className="mr-2" />
                    Browse Files
                  </label>
                </Button>
              </div>

              <div>
                <input
                  type="file"
                  onChange={handleFolderSelect}
                  className="hidden"
                  id="folder-upload"
                  {...({ webkitdirectory: "", directory: "" } as any)}
                />
                <Button asChild>
                  <label htmlFor="folder-upload" className="cursor-pointer">
                    <FolderOpen size={16} className="mr-2" />
                    Upload Folder
                  </label>
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground max-w-md">
              Supports: Code files, documentation, configuration files. Max 5MB per file.
            </div>
          </div>
        </CardContent>
      </Card>

      {isProcessing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Processing Files...</h4>
                <span className="text-sm text-muted-foreground">
                  {uploadProgress.toFixed(0)}%
                </span>
              </div>
              
              <Progress value={uploadProgress} className="w-full" />
              
              {fileStats && (
                <div className="flex gap-4 text-sm">
                  <Badge variant="secondary">
                    {fileStats.processed}/{fileStats.total} processed
                  </Badge>
                  <Badge variant="default">
                    {fileStats.supported} supported
                  </Badge>
                  {fileStats.unsupported > 0 && (
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      <Warning size={14} className="mr-1" />
                      {fileStats.unsupported} skipped
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}