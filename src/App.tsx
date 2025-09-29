import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { FileUpload } from './components/FileUpload'
import { DocumentationGenerator } from './components/DocumentationGenerator'
import { ExportSelector } from './components/ExportSelector'
import { ProjectStructure } from './components/ProjectStructure'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { FolderOpen, FileText, Download, Code } from '@phosphor-icons/react'

interface ProjectFile {
  name: string
  path: string
  content: string
  size: number
  type: string
}

export interface ProcessedProject {
  name: string
  files: ProjectFile[]
  structure: any
  totalSize: number
  fileCount: number
  uploadedAt: Date
}

function App() {
  const [currentProject, setCurrentProject] = useKV<ProcessedProject | null>('current-project', null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')

  const handleProjectUploaded = (project: ProcessedProject) => {
    setCurrentProject(project)
    setActiveTab('structure')
  }

  const handleProcessingStart = () => {
    setIsProcessing(true)
    setActiveTab('processing')
  }

  const handleProcessingComplete = () => {
    setIsProcessing(false)
    setActiveTab('export')
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="container mx-auto px-6 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <FolderOpen size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Project Documentation Generator</h1>
              <p className="text-muted-foreground">
                Upload projects and generate detailed documentation with copyable code blocks
              </p>
            </div>
          </div>
          
          {currentProject && (
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {currentProject.name}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {currentProject.fileCount} files
              </Badge>
              <Badge variant="outline" className="text-sm">
                {(currentProject.totalSize / 1024 / 1024).toFixed(2)} MB
              </Badge>
            </div>
          )}
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FolderOpen size={16} />
              Upload
            </TabsTrigger>
            <TabsTrigger value="structure" disabled={!currentProject} className="flex items-center gap-2">
              <FileText size={16} />
              Structure
            </TabsTrigger>
            <TabsTrigger value="processing" disabled={!currentProject} className="flex items-center gap-2">
              <Code size={16} />
              Generate
            </TabsTrigger>
            <TabsTrigger value="export" disabled={!currentProject} className="flex items-center gap-2">
              <Download size={16} />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Project</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload onProjectUploaded={handleProjectUploaded} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            {currentProject && (
              <ProjectStructure project={currentProject} />
            )}
          </TabsContent>

          <TabsContent value="processing" className="space-y-6">
            {currentProject && (
              <DocumentationGenerator 
                project={currentProject} 
                isProcessing={isProcessing}
                onProcessingStart={handleProcessingStart}
                onProcessingComplete={handleProcessingComplete}
              />
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            {currentProject && (
              <ExportSelector project={currentProject} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App