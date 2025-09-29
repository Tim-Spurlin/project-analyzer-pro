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

const spark = window.spark

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
      id: 'comprehensive-pdf',
      name: 'Comprehensive PDF',
      description: 'Dense, detailed PDF with maximum content per page and copyable code',
      icon: <FilePdf size={20} className="text-red-500" />,
      estimatedSize: '5-15 MB',
      selected: false,
      preview: 'Complete project documentation with detailed explanations, code blocks, and maximum content density'
    },
    {
      id: 'detailed-markdown',
      name: 'Detailed Markdown',
      description: 'Complete markdown documentation with code blocks',
      icon: <FileText size={20} className="text-blue-500" />,
      estimatedSize: '500 KB - 3 MB',
      selected: false,
      preview: 'Comprehensive .md file with detailed sections, copyable code blocks, and elaborate explanations'
    },
    {
      id: 'consolidated-txt',
      name: 'Consolidated Text',
      description: 'Single text file optimized for AI platform limits',
      icon: <FileText size={20} className="text-gray-400" />,
      estimatedSize: '200 KB - 1 MB',
      selected: false,
      preview: 'Optimized text format fitting maximum content within AI platform token limitations'
    },
    {
      id: 'code-extraction',
      name: 'Code Extraction',
      description: 'Separate files for each extracted code component',
      icon: <FileCode size={20} className="text-green-500" />,
      estimatedSize: '1-10 MB',
      selected: false,
      preview: 'Individual files for each function, class, and component with detailed explanations'
    },
    {
      id: 'visual-diagrams',
      name: 'Visual Diagrams',
      description: 'High-quality PNG/JPG diagrams with annotations',
      icon: <FileImage size={20} className="text-purple-500" />,
      estimatedSize: '2-8 MB',
      selected: false,
      preview: 'Visual architecture diagrams, flowcharts, and component relationships with detailed labels'
    },
    {
      id: 'technical-qa',
      name: 'Technical Q&A',
      description: 'Comprehensive question-answer format documentation',
      icon: <Question size={20} className="text-orange-500" />,
      estimatedSize: '300-800 KB',
      selected: false,
      preview: 'Detailed Q&A covering implementation, architecture, and technical decisions'
    },
    {
      id: 'implementation-guide',
      name: 'Implementation Guide',
      description: 'Step-by-step implementation plan with code examples',
      icon: <ChartBar size={20} className="text-teal-500" />,
      estimatedSize: '400 KB - 1.5 MB',
      selected: false,
      preview: 'Detailed implementation roadmap with code samples and architectural guidance'
    },
    {
      id: 'json-schema',
      name: 'Communication Schema',
      description: 'Complete JSON schema of all component communications',
      icon: <FileCode size={20} className="text-indigo-500" />,
      estimatedSize: '50-300 KB',
      selected: false,
      preview: 'Comprehensive JSON schema documenting every communication pattern and data flow'
    },
    {
      id: 'enhanced-readme',
      name: 'Enhanced README.md',
      description: 'Professional README with comprehensive project overview',
      icon: <FileText size={20} className="text-cyan-500" />,
      estimatedSize: '100-500 KB',
      selected: false,
      preview: 'Complete README with setup instructions, architecture overview, and usage examples'
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

      // Get extracted code and sections from storage
      const extractedCode: any[] = (await spark.kv.get('extracted-code') as any[]) || []
      const generatedSections: any[] = (await spark.kv.get('generated-sections') as any[]) || []

      if (extractedCode.length === 0) {
        toast.error('Please generate documentation first')
        setIsExporting(false)
        return
      }

      // Generate each selected format
      for (const format of selectedFormats) {
        const content = await generateFormatContent(format.id, project, extractedCode, generatedSections)
        await downloadContent(content, format.id, project.name)
        
        completedSteps++
        setExportProgress((completedSteps / totalSteps) * 100)
        toast.success(`Generated ${format.name}`)
      }

      // Generate each selected diagram
      for (const diagram of selectedDiagrams) {
        const diagramContent = await generateDiagramContent(diagram.id, project, extractedCode)
        await downloadContent(diagramContent, `diagram-${diagram.id}`, project.name)
        
        completedSteps++
        setExportProgress((completedSteps / totalSteps) * 100)
        toast.success(`Generated ${diagram.name}`)
      }

      toast.success('Export completed successfully!')
      
    } catch (error) {
      toast.error('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const generateFormatContent = async (formatId: string, project: ProcessedProject, extractedCode: any[], generatedSections: any[]): Promise<string> => {
    switch (formatId) {
      case 'comprehensive-pdf':
        return await generateComprehensivePDF(project, extractedCode, generatedSections)
      case 'detailed-markdown':
        return await generateDetailedMarkdown(project, extractedCode, generatedSections)
      case 'consolidated-txt':
        return await generateConsolidatedText(project, extractedCode, generatedSections)
      case 'code-extraction':
        return await generateCodeExtraction(project, extractedCode)
      case 'technical-qa':
        return await generateTechnicalQA(project, extractedCode, generatedSections)
      case 'implementation-guide':
        return await generateImplementationGuide(project, extractedCode, generatedSections)
      case 'json-schema':
        return await generateJSONSchema(project, extractedCode)
      case 'enhanced-readme':
        return await generateEnhancedReadme(project, extractedCode, generatedSections)
      default:
        return 'Format not implemented'
    }
  }

  const generateComprehensivePDF = async (project: ProcessedProject, extractedCode: any[], generatedSections: any[]): Promise<string> => {
    const promptText = `Create comprehensive PDF documentation content for project ${project.name} with maximum content density per page.

Project Overview:
- ${project.fileCount} files
- ${(project.totalSize / 1024 / 1024).toFixed(2)} MB total size
- ${extractedCode.length} extracted code components

Include:
1. Executive summary and architecture overview
2. Detailed component documentation for each extracted code block
3. Implementation details and technical specifications
4. Code relationships and dependencies
5. Performance considerations and optimizations

Format for maximum content density while maintaining readability. Each section should be comprehensive and detailed.`

    const prompt = spark.llmPrompt([promptText], project.name, project.fileCount.toString())
    return await spark.llm(prompt)
  }

  const generateDetailedMarkdown = async (project: ProcessedProject, extractedCode: any[], generatedSections: any[]): Promise<string> => {
    let markdown = `# ${project.name} - Complete Documentation\n\n`
    
    markdown += `## Project Overview\n`
    markdown += `- **Files**: ${project.fileCount}\n`
    markdown += `- **Size**: ${(project.totalSize / 1024 / 1024).toFixed(2)} MB\n`
    markdown += `- **Extracted Components**: ${extractedCode.length}\n\n`

    for (const section of generatedSections) {
      markdown += `## ${section.title}\n\n`
      markdown += `${section.content}\n\n`
      
      for (const codeBlock of section.codeBlocks) {
        markdown += `### ${codeBlock.title}\n\n`
        markdown += `**File**: \`${codeBlock.filePath}\`\n\n`
        markdown += `${codeBlock.description}\n\n`
        markdown += `\`\`\`${codeBlock.language}\n${codeBlock.code}\n\`\`\`\n\n`
      }
    }

    return markdown
  }

  const generateConsolidatedText = async (project: ProcessedProject, extractedCode: any[], generatedSections: any[]): Promise<string> => {
    let content = `PROJECT: ${project.name}\n`
    content += `FILES: ${project.fileCount} | SIZE: ${(project.totalSize / 1024 / 1024).toFixed(2)}MB | COMPONENTS: ${extractedCode.length}\n\n`

    // Optimize for AI platforms by including maximum relevant content
    for (const section of generatedSections.slice(0, 10)) { // Limit sections to fit token limits
      content += `SECTION: ${section.title}\n`
      content += `${section.content}\n\n`
      
      for (const codeBlock of section.codeBlocks.slice(0, 5)) { // Limit code blocks per section
        content += `CODE: ${codeBlock.title} (${codeBlock.filePath})\n`
        content += `DESC: ${codeBlock.description}\n`
        content += `${codeBlock.code}\n\n---\n\n`
      }
    }

    return content
  }

  const generateCodeExtraction = async (project: ProcessedProject, extractedCode: any[]): Promise<string> => {
    let content = `# Code Extraction for ${project.name}\n\n`
    
    for (const [index, code] of extractedCode.entries()) {
      content += `## Component ${index + 1}: ${code.title}\n\n`
      content += `**File**: ${code.filePath}\n`
      content += `**Type**: ${code.type}\n\n`
      content += `### Description\n${code.description}\n\n`
      content += `### Implementation\n\`\`\`${code.language}\n${code.code}\n\`\`\`\n\n`
      content += `---\n\n`
    }
    
    return content
  }

  const generateTechnicalQA = async (project: ProcessedProject, extractedCode: any[], generatedSections: any[]): Promise<string> => {
    const promptText = `Create comprehensive technical Q&A documentation for ${project.name} with ${extractedCode.length} components.

Generate detailed questions and answers covering:
1. Architecture and design patterns
2. Component interactions and dependencies
3. Implementation details and technical decisions
4. Performance considerations
5. Maintenance and extensibility
6. Troubleshooting and debugging

Make it comprehensive for developers who need to understand and work with this codebase.`

    const prompt = spark.llmPrompt([promptText], project.name, extractedCode.length.toString())
    return await spark.llm(prompt)
  }

  const generateImplementationGuide = async (project: ProcessedProject, extractedCode: any[], generatedSections: any[]): Promise<string> => {
    const promptText = `Create a detailed implementation guide for ${project.name} with step-by-step instructions.

Include:
1. Development environment setup
2. Architecture overview and component structure
3. Implementation phases with code examples
4. Integration patterns and best practices
5. Testing strategies and deployment procedures
6. Maintenance and scaling considerations

Base the guide on the ${extractedCode.length} extracted components and their relationships.`

    const prompt = spark.llmPrompt([promptText], project.name, extractedCode.length.toString())
    return await spark.llm(prompt)
  }

  const generateJSONSchema = async (project: ProcessedProject, extractedCode: any[]): Promise<string> => {
    const schema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: `${project.name} Communication Schema`,
      description: "Complete schema defining all component communications and data flows",
      type: "object",
      properties: {
        project: {
          type: "object",
          properties: {
            name: { type: "string", const: project.name },
            components: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  type: { type: "string", enum: ["function", "class", "component", "config", "script", "style"] },
                  filePath: { type: "string" },
                  dependencies: { type: "array", items: { type: "string" } },
                  exports: { type: "array", items: { type: "string" } },
                  communications: {
                    type: "object",
                    properties: {
                      input: { type: "object" },
                      output: { type: "object" },
                      events: { type: "array", items: { type: "string" } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return JSON.stringify(schema, null, 2)
  }

  const generateEnhancedReadme = async (project: ProcessedProject, extractedCode: any[], generatedSections: any[]): Promise<string> => {
    const promptText = `Create a comprehensive README.md for ${project.name} with professional formatting.

Include:
1. Project overview and key features
2. Installation and setup instructions
3. Architecture overview with component descriptions
4. Usage examples and code samples
5. API documentation for key components
6. Contributing guidelines and development setup
7. License and acknowledgments

Base the content on ${extractedCode.length} extracted components and make it professional and comprehensive.`

    const prompt = spark.llmPrompt([promptText], project.name, extractedCode.length.toString())
    return await spark.llm(prompt)
  }

  const generateDiagramContent = async (diagramId: string, project: ProcessedProject, extractedCode: any[]): Promise<string> => {
    const promptText = `Generate ${diagramId} diagram description for ${project.name} with ${extractedCode.length} components.
    
Provide detailed textual description that could be used to create visual diagrams, including:
1. Component relationships and connections
2. Data flow directions and types
3. Interface boundaries and protocols
4. Hierarchical structures and dependencies

Make it comprehensive and technically accurate.`

    const prompt = spark.llmPrompt([promptText], diagramId, project.name, extractedCode.length.toString())
    return await spark.llm(prompt)
  }

  const downloadContent = async (content: string, formatId: string, projectName: string) => {
    const extensions = {
      'comprehensive-pdf': 'md', // Will be rendered as markdown for now
      'detailed-markdown': 'md',
      'consolidated-txt': 'txt',
      'code-extraction': 'md',
      'technical-qa': 'md',
      'implementation-guide': 'md',
      'json-schema': 'json',
      'enhanced-readme': 'md'
    }

    const extension = extensions[formatId as keyof typeof extensions] || 'txt'
    const filename = `${projectName}-${formatId}.${extension}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
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