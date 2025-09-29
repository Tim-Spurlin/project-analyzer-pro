import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { toast } from 'sonner'
import { 
  Download, 
  FilePdf, 
  FileImage, 
  FileCode, 
  ChartBar, 
  Question, 
  FileText,
  TreeStructure,
  CheckCircle,
  Eye
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

interface ExportSelectorProps {
  project: ProcessedProject
}

interface ExportFormat {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  estimatedSize: string
  selected: boolean
  preview?: string
}

interface DiagramType {
  id: string
  name: string
  description: string
  example: string
  selected: boolean
}

export function ExportSelector({ project }: ExportSelectorProps) {
  const [exportFormats, setExportFormats] = useKV<ExportFormat[]>('export-formats', [
    {
      id: 'pdf',
      name: 'PDF Documentation',
      description: 'Complete project documentation in PDF format',
      icon: <FilePdf size={20} className="text-red-500" />,
      estimatedSize: '2-5 MB',
      selected: false,
      preview: 'Comprehensive PDF with project structure, code analysis, and recommendations'
    },
    {
      id: 'png',
      name: 'PNG Diagrams',
      description: 'Visual diagrams and charts as PNG images',
      icon: <FileImage size={20} className="text-green-500" />,
      estimatedSize: '500 KB - 2 MB',
      selected: false,
      preview: 'High-quality PNG diagrams showing architecture and relationships'
    },
    {
      id: 'jpg',
      name: 'JPG Images',
      description: 'Compressed visual exports in JPG format',
      icon: <FileImage size={20} className="text-blue-500" />,
      estimatedSize: '200 KB - 1 MB',
      selected: false,
      preview: 'Compressed JPG images suitable for presentations'
    },
    {
      id: 'qa',
      name: 'Q&A Documentation',
      description: 'Structured questions and answers format',
      icon: <Question size={20} className="text-purple-500" />,
      estimatedSize: '100-500 KB',
      selected: false,
      preview: 'Interactive Q&A format covering project aspects and implementation'
    },
    {
      id: 'implementation',
      name: 'Implementation Plan',
      description: 'Detailed implementation roadmap and tasks',
      icon: <ChartBar size={20} className="text-orange-500" />,
      estimatedSize: '50-200 KB',
      selected: false,
      preview: 'Step-by-step implementation plan with timelines and milestones'
    },
    {
      id: 'json-schema',
      name: 'JSON Schema',
      description: 'Complete communication protocol schema',
      icon: <FileCode size={20} className="text-teal-500" />,
      estimatedSize: '10-100 KB',
      selected: false,
      preview: 'Detailed JSON schema defining all component communications'
    },
    {
      id: 'readme',
      name: 'README.md',
      description: 'Enhanced README with comprehensive documentation',
      icon: <FileText size={20} className="text-gray-400" />,
      estimatedSize: '20-100 KB',
      selected: false,
      preview: 'Professional README with setup instructions and project overview'
    }
  ])

  const [diagramTypes, setDiagramTypes] = useKV<DiagramType[]>('diagram-types', [
    {
      id: 'architecture',
      name: 'Architecture Diagram',
      description: 'High-level system architecture overview',
      example: 'Shows components, services, and their relationships',
      selected: false
    },
    {
      id: 'flowchart',
      name: 'Process Flowchart',
      description: 'Step-by-step process flows',
      example: 'Visualizes workflows and decision points',
      selected: false
    },
    {
      id: 'dependency',
      name: 'Dependency Graph',
      description: 'Module and package dependencies',
      example: 'Network diagram showing file and module relationships',
      selected: false
    },
    {
      id: 'data-flow',
      name: 'Data Flow Diagram',
      description: 'How data moves through the system',
      example: 'Shows data inputs, processing, and outputs',
      selected: false
    },
    {
      id: 'component',
      name: 'Component Diagram',
      description: 'Individual component structures',
      example: 'UML-style component relationships',
      selected: false
    },
    {
      id: 'timeline',
      name: 'Implementation Timeline',
      description: 'Project development timeline',
      example: 'Gantt chart showing development phases',
      selected: false
    }
  ])

  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('formats')

  const toggleFormat = (formatId: string) => {
    setExportFormats(current => 
      current ? current.map(format => 
        format.id === formatId 
          ? { ...format, selected: !format.selected }
          : format
      ) : []
    )
  }

  const toggleDiagram = (diagramId: string) => {
    setDiagramTypes(current =>
      current ? current.map(diagram =>
        diagram.id === diagramId
          ? { ...diagram, selected: !diagram.selected }
          : diagram
      ) : []
    )
  }

  const selectAllFormats = () => {
    setExportFormats(current =>
      current ? current.map(format => ({ ...format, selected: true })) : []
    )
  }

  const clearAllFormats = () => {
    setExportFormats(current =>
      current ? current.map(format => ({ ...format, selected: false })) : []
    )
  }

  const startExport = async () => {
    const selectedFormats = (exportFormats || []).filter(f => f.selected)
    const selectedDiagrams = (diagramTypes || []).filter(d => d.selected)

    if (selectedFormats.length === 0) {
      toast.error('Please select at least one export format')
      return
    }

    setIsExporting(true)
    setExportProgress(0)

    try {
      const totalSteps = selectedFormats.length + selectedDiagrams.length
      let completedSteps = 0

      // Simulate export process
      for (const format of selectedFormats) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        completedSteps++
        setExportProgress((completedSteps / totalSteps) * 100)
        toast.success(`Generated ${format.name}`)
      }

      for (const diagram of selectedDiagrams) {
        await new Promise(resolve => setTimeout(resolve, 1500))
        completedSteps++
        setExportProgress((completedSteps / totalSteps) * 100)
        toast.success(`Generated ${diagram.name}`)
      }

      // Create download
      const exportData = {
        project: project.name,
        formats: selectedFormats.map(f => f.id),
        diagrams: selectedDiagrams.map(d => d.id),
        generatedAt: new Date().toISOString(),
        summary: `Exported ${selectedFormats.length} formats and ${selectedDiagrams.length} diagrams`
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${project.name}-export.json`
      a.click()
      URL.revokeObjectURL(url)

      toast.success('Export completed successfully!')
      
    } catch (error) {
      toast.error('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const selectedCount = (exportFormats || []).filter(f => f.selected).length
  const selectedDiagramCount = (diagramTypes || []).filter(d => d.selected).length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Download size={24} className="text-primary" />
                Export Selection
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Choose output formats and diagrams for your project documentation
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {selectedCount} formats • {selectedDiagramCount} diagrams selected
              </div>
              <Button 
                onClick={startExport} 
                disabled={isExporting || selectedCount === 0}
                size="lg"
              >
                {isExporting ? (
                  <>
                    <Download size={16} className="mr-2 animate-pulse" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download size={16} className="mr-2" />
                    Export Selected
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {isExporting && (
            <div className="mt-4">
              <Progress value={exportProgress} className="w-full" />
              <div className="text-sm text-muted-foreground mt-2 text-center">
                {exportProgress.toFixed(0)}% complete
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="formats">Export Formats</TabsTrigger>
          <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="formats" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Available Export Formats</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllFormats}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllFormats}>
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(exportFormats || []).map((format) => (
              <Card key={format.id} className={`cursor-pointer transition-colors ${
                format.selected ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
              }`} onClick={() => toggleFormat(format.id)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={format.selected}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {format.icon}
                        <h4 className="font-semibold">{format.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {format.estimatedSize}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {format.description}
                      </p>
                      {format.preview && (
                        <p className="text-xs text-muted-foreground italic">
                          {format.preview}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diagrams" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Diagram Types</h3>
            <Badge variant="secondary">
              {selectedDiagramCount} selected
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(diagramTypes || []).map((diagram) => (
              <Card key={diagram.id} className={`cursor-pointer transition-colors ${
                diagram.selected ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
              }`} onClick={() => toggleDiagram(diagram.id)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={diagram.selected}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TreeStructure size={16} className="text-primary" />
                        <h4 className="font-medium text-sm">{diagram.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {diagram.description}
                      </p>
                      <p className="text-xs text-primary italic">
                        {diagram.example}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <h3 className="text-lg font-semibold">Export Preview</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Selected Formats</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCount > 0 ? (
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {(exportFormats || []).filter(f => f.selected).map((format) => (
                        <div key={format.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                          {format.icon}
                          <div className="flex-1">
                            <div className="font-medium text-sm">{format.name}</div>
                            <div className="text-xs text-muted-foreground">{format.estimatedSize}</div>
                          </div>
                          <CheckCircle size={16} className="text-green-500" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Eye size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No formats selected</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Selected Diagrams</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDiagramCount > 0 ? (
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {(diagramTypes || []).filter(d => d.selected).map((diagram) => (
                        <div key={diagram.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                          <TreeStructure size={16} className="text-primary" />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{diagram.name}</div>
                            <div className="text-xs text-muted-foreground">{diagram.description}</div>
                          </div>
                          <CheckCircle size={16} className="text-green-500" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <TreeStructure size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No diagrams selected</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}