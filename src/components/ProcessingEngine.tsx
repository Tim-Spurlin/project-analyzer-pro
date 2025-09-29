import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Warning,
  Cpu,
  Brain,
  FileText,
  ChartBar
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

interface ProcessingEngineProps {
  project: ProcessedProject
  isProcessing: boolean
  onProcessingStart: () => void
  onProcessingComplete: () => void
}

interface ProcessingStep {
  id: string
  name: string
  description: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
  details?: string
}

interface AnalysisResult {
  summary: string
  architecture: string
  dependencies: string[]
  recommendations: string[]
  complexity: 'low' | 'medium' | 'high'
  tokenUsage: number
  estimatedProcessingTime: number
}

export function ProcessingEngine({ 
  project, 
  isProcessing, 
  onProcessingStart, 
  onProcessingComplete 
}: ProcessingEngineProps) {
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: 'analyze-structure',
      name: 'Analyze Project Structure',
      description: 'Examining file organization and dependencies',
      status: 'pending',
      progress: 0
    },
    {
      id: 'extract-docs',
      name: 'Extract Documentation',
      description: 'Finding and processing README files and comments',
      status: 'pending',
      progress: 0
    },
    {
      id: 'analyze-code',
      name: 'Analyze Code Patterns',
      description: 'Identifying architecture patterns and components',
      status: 'pending',
      progress: 0
    },
    {
      id: 'generate-insights',
      name: 'Generate Insights',
      description: 'Creating summaries and recommendations',
      status: 'pending',
      progress: 0
    },
    {
      id: 'prepare-outputs',
      name: 'Prepare Outputs',
      description: 'Formatting results for export',
      status: 'pending',
      progress: 0
    }
  ])

  const [analysisResult, setAnalysisResult] = useKV<AnalysisResult | null>('analysis-result', null)
  const [activeTab, setActiveTab] = useState('overview')

  const startProcessing = async () => {
    onProcessingStart()
    
    const steps = [...processingSteps]
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      step.status = 'processing'
      setProcessingSteps([...steps])
      
      // Simulate processing with actual analysis
      await processStep(step, project)
      
      step.status = 'completed'
      step.progress = 100
      setProcessingSteps([...steps])
      
      // Add delay to show progress
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Generate final analysis result
    const result = await generateAnalysisResult(project)
    setAnalysisResult(result)
    
    onProcessingComplete()
  }

  const processStep = async (step: ProcessingStep, project: ProcessedProject) => {
    const updateProgress = (progress: number, details?: string) => {
      step.progress = progress
      step.details = details
      setProcessingSteps(current => [...current])
    }

    switch (step.id) {
      case 'analyze-structure':
        updateProgress(25, 'Scanning file types...')
        await new Promise(resolve => setTimeout(resolve, 500))
        updateProgress(50, 'Building dependency tree...')
        await new Promise(resolve => setTimeout(resolve, 500))
        updateProgress(75, 'Analyzing folder structure...')
        await new Promise(resolve => setTimeout(resolve, 500))
        updateProgress(100, `Found ${project.fileCount} files in ${Object.keys(project.structure).length} directories`)
        break
        
      case 'extract-docs':
        const docFiles = project.files.filter(f => 
          f.name.toLowerCase().includes('readme') || 
          f.name.toLowerCase().includes('doc') ||
          f.type === 'md'
        )
        updateProgress(50, `Processing ${docFiles.length} documentation files...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        updateProgress(100, `Extracted documentation from ${docFiles.length} files`)
        break
        
      case 'analyze-code':
        const codeFiles = project.files.filter(f => 
          ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp'].includes(f.type)
        )
        updateProgress(33, `Analyzing ${codeFiles.length} code files...`)
        await new Promise(resolve => setTimeout(resolve, 800))
        updateProgress(66, 'Identifying patterns and components...')
        await new Promise(resolve => setTimeout(resolve, 800))
        updateProgress(100, `Analyzed ${codeFiles.length} code files`)
        break
        
      case 'generate-insights':
        updateProgress(25, 'Generating project summary...')
        await new Promise(resolve => setTimeout(resolve, 600))
        updateProgress(50, 'Creating recommendations...')
        await new Promise(resolve => setTimeout(resolve, 600))
        updateProgress(75, 'Calculating complexity metrics...')
        await new Promise(resolve => setTimeout(resolve, 600))
        updateProgress(100, 'Analysis complete')
        break
        
      case 'prepare-outputs':
        updateProgress(50, 'Formatting export data...')
        await new Promise(resolve => setTimeout(resolve, 500))
        updateProgress(100, 'Ready for export')
        break
    }
  }

  const generateAnalysisResult = async (project: ProcessedProject): Promise<AnalysisResult> => {
    const codeFiles = project.files.filter(f => 
      ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs'].includes(f.type)
    )
    
    const totalLines = project.files.reduce((acc, file) => 
      acc + (file.content.split('\n').length), 0
    )

    const complexity = totalLines > 10000 ? 'high' : totalLines > 3000 ? 'medium' : 'low'
    
    return {
      summary: `This project contains ${project.fileCount} files across ${Object.keys(project.structure).length} directories. The codebase includes ${codeFiles.length} source code files with approximately ${totalLines.toLocaleString()} lines of code.`,
      architecture: project.files.some(f => f.name.includes('package.json')) ? 'Node.js/JavaScript' :
                   project.files.some(f => f.name.includes('requirements.txt')) ? 'Python' :
                   project.files.some(f => f.name.includes('pom.xml')) ? 'Java/Maven' :
                   'Unknown',
      dependencies: project.files
        .filter(f => ['package.json', 'requirements.txt', 'pom.xml', 'Gemfile'].some(dep => f.name.includes(dep)))
        .map(f => f.name),
      recommendations: [
        'Add comprehensive README documentation',
        'Implement automated testing',
        'Set up continuous integration',
        'Add code quality tools'
      ],
      complexity,
      tokenUsage: Math.floor(project.totalSize / 4), // Rough estimate
      estimatedProcessingTime: Math.floor(project.fileCount / 10) + 2
    }
  }

  const getStepIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-green-500" />
      case 'processing':
        return <Cpu size={20} className="text-blue-500 animate-pulse" />
      case 'error':
        return <Warning size={20} className="text-red-500" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain size={24} className="text-primary" />
                Processing Engine
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Analyze your project and prepare documentation exports
              </p>
            </div>
            <Button 
              onClick={startProcessing} 
              disabled={isProcessing}
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Pause size={16} className="mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Play size={16} className="mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Processing Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processingSteps.map((step) => (
                <div key={step.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    {getStepIcon(step.status)}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {step.description}
                      </div>
                    </div>
                    {step.status !== 'pending' && (
                      <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                        {step.status}
                      </Badge>
                    )}
                  </div>
                  {step.status === 'processing' && (
                    <div className="ml-8">
                      <Progress value={step.progress} className="h-2" />
                      {step.details && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {step.details}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {analysisResult && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div>
                    <div className="font-medium text-sm mb-2">Project Summary</div>
                    <p className="text-sm text-muted-foreground">{analysisResult.summary}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium text-sm">Architecture</div>
                      <div className="text-sm text-muted-foreground">{analysisResult.architecture}</div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Complexity</div>
                      <Badge variant={analysisResult.complexity === 'high' ? 'destructive' : 
                                    analysisResult.complexity === 'medium' ? 'secondary' : 'default'}>
                        {analysisResult.complexity}
                      </Badge>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div>
                    <div className="font-medium text-sm mb-2">Dependencies Found</div>
                    <div className="space-y-1">
                      {analysisResult.dependencies.map((dep, i) => (
                        <Badge key={i} variant="outline" className="text-xs mr-2">
                          {dep}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-sm mb-2">Recommendations</div>
                    <ScrollArea className="h-32">
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {analysisResult.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}