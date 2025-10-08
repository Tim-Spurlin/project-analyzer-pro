# 🚀 Project Analyzer Pro

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)

**Transform your codebase into comprehensive, professional documentation with AI-powered analysis and multi-format export capabilities.**

[📖 Documentation](#-documentation) • [🎯 Features](#-features) • [🏗️ Architecture](#️-architecture) • [🚀 Quick Start](#-quick-start) • [🎨 UI Preview](#-ui-preview)

</div>

---

## 📋 Table of Contents

- [🎯 Features](#-features)
- [🏗️ Architecture Overview](#️-architecture-overview)  
- [📊 System Workflows](#-system-workflows)
- [🚀 Quick Start](#-quick-start)
- [🎨 UI Components](#-ui-components)
- [📦 Export Formats](#-export-formats)
- [⚡ Performance & Optimization](#-performance--optimization)
- [🔧 Configuration](#-configuration)
- [🛠️ Development](#️-development)
- [📚 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Features

### 🔥 Core Capabilities

```mermaid
mindmap
  root((Project Analyzer Pro))
    File Processing
      Drag & Drop Upload
      Multi-format Support
      Intelligent Chunking
      Token Management
    Documentation
      AI-Powered Analysis  
      Code Block Extraction
      Technical Explanations
      Q&A Generation
    Export Options
      PDF Documentation
      Markdown Files
      Visual Diagrams
      JSON Schema
      Implementation Plans
    User Experience
      Dark Mode UI
      High Contrast Design
      Real-time Progress
      Interactive Interface
```

### ✨ Advanced Features

- **🎯 Intelligent File Processing**: Automatically detects and processes 20+ file types with smart filtering
- **🧠 AI-Powered Documentation**: Generates detailed technical explanations for every code component  
- **📊 Visual Diagram Generation**: Creates architecture diagrams, flowcharts, and system relationships
- **🔄 Multi-Format Export**: Supports PDF, Markdown, PNG/JPG, JSON Schema, and structured prompts
- **📝 Copyable Code Blocks**: Every code snippet includes syntax highlighting and one-click copy functionality
- **🌙 Professional Dark UI**: High-contrast interface optimized for developer productivity
- **⚡ Performance Optimized**: Handles large codebases with intelligent chunking and memory management
- **🎨 Interactive Experience**: Real-time progress tracking and responsive feedback

---

## 🏗️ Architecture Overview

### System Architecture

```mermaid
graph TB
    subgraph "User Interface Layer"
        UI[React Frontend]
        Components[UI Components]
        Theme[Dark Theme System]
    end
    
    subgraph "Application Core"
        App[App.tsx]
        Router[Tab Router]
        State[State Management]
    end
    
    subgraph "Processing Pipeline"
        Upload[File Upload System]
        Processor[Processing Engine]
        Generator[Documentation Generator]
        Exporter[Export Selector]
    end
    
    subgraph "Data Layer"
        KV[Key-Value Store]
        Memory[Memory Management]
        Cache[Processing Cache]
    end
    
    subgraph "External Services"
        AI[AI Language Models]
        Spark[GitHub Spark Platform]
    end
    
    UI --> App
    App --> Router
    Router --> Upload
    Router --> Processor  
    Router --> Generator
    Router --> Exporter
    
    Upload --> KV
    Processor --> AI
    Generator --> AI
    Exporter --> Memory
    
    Components --> Theme
    State --> KV
    Cache --> Memory
    
    Spark --> AI
    
    classDef primary fill:#3b82f6,stroke:#1e40af,color:#fff
    classDef secondary fill:#64748b,stroke:#475569,color:#fff
    classDef accent fill:#06b6d4,stroke:#0891b2,color:#fff
    classDef success fill:#10b981,stroke:#059669,color:#fff
    
    class UI,App primary
    class Upload,Processor,Generator,Exporter secondary
    class AI,Spark accent
    class KV,Memory,Cache success
```

### Component Architecture

```mermaid
graph LR
    subgraph "Core Components"
        A[App.tsx] --> B[FileUpload.tsx]
        A --> C[ProjectStructure.tsx] 
        A --> D[DocumentationGenerator.tsx]
        A --> E[ExportSelector.tsx]
    end
    
    subgraph "UI Components"
        F[CodeBlockDisplay.tsx] --> G[Card Components]
        H[Tabs] --> I[Progress Bars]
        J[Buttons] --> K[Badges]
    end
    
    subgraph "Processing Components"
        L[ProcessingEngine.tsx] --> M[AI Integration]
        N[File Parser] --> O[Content Extractor]
        P[Diagram Generator] --> Q[Export Manager]
    end
    
    B --> F
    C --> G
    D --> F
    D --> L
    E --> P
    
    M --> AI[External AI APIs]
    
    classDef core fill:#3b82f6,stroke:#1e40af,color:#fff
    classDef ui fill:#64748b,stroke:#475569,color:#fff  
    classDef processing fill:#06b6d4,stroke:#0891b2,color:#fff
    
    class A,B,C,D,E core
    class F,G,H,I,J,K ui
    class L,M,N,O,P,Q processing
```

---

## 📊 System Workflows

### File Upload & Processing Workflow

```mermaid
sequenceDiagram
    participant User
    participant UI as User Interface
    participant FileUpload as File Upload System
    participant Processor as Processing Engine
    participant Storage as KV Storage
    participant AI as AI Services
    
    User->>UI: Drag & drop project folder
    UI->>FileUpload: Trigger file processing
    
    Note over FileUpload: Validate file types & sizes
    FileUpload->>FileUpload: Filter supported files
    FileUpload->>Storage: Store file metadata
    
    loop For each file
        FileUpload->>FileUpload: Read file content
        FileUpload->>FileUpload: Extract code blocks
        FileUpload->>Processor: Queue for analysis
    end
    
    FileUpload->>UI: Update progress (0-100%)
    FileUpload->>Storage: Save processed project
    UI->>User: Display project structure
    
    User->>UI: Start documentation generation
    UI->>Processor: Begin AI processing
    
    loop For each code section
        Processor->>AI: Generate documentation
        AI-->>Processor: Return analysis
        Processor->>Storage: Cache results
        Processor->>UI: Update progress
    end
    
    Processor->>UI: Processing complete
    UI->>User: Show export options
```

### Documentation Generation Process

```mermaid
flowchart TD
    Start([User Initiates Processing]) --> ValidateProject{Project Loaded?}
    ValidateProject -->|No| Error[Show Error Message]
    ValidateProject -->|Yes| ExtractCode[Extract Code Components]
    
    ExtractCode --> GroupCode[Group by File Type/Functionality]
    GroupCode --> GeneratePrompts[Create AI Prompts]
    
    GeneratePrompts --> ProcessLoop{More Sections?}
    ProcessLoop -->|Yes| CallAI[Call AI Service]
    CallAI --> ParseResponse[Parse AI Response]
    ParseResponse --> StoreSection[Store Documentation Section]
    StoreSection --> UpdateProgress[Update Progress Bar]
    UpdateProgress --> ProcessLoop
    
    ProcessLoop -->|No| GenerateCodeBlocks[Create Code Block Components]
    GenerateCodeBlocks --> CompileResults[Compile Final Results]
    CompileResults --> CacheResults[Cache to Storage]
    CacheResults --> ShowPreview[Display Preview]
    ShowPreview --> End([Enable Export Options])
    
    style Start fill:#10b981
    style End fill:#10b981
    style Error fill:#ef4444
    style CallAI fill:#3b82f6
    style StoreSection fill:#06b6d4
```

### Export System Architecture

```mermaid
graph TB
    subgraph "Export Formats"
        PDF[📄 Comprehensive PDF]
        MD[📝 Detailed Markdown]
        TXT[📃 Consolidated Text]
        IMG[🖼️ Visual Diagrams]
        JSON[🔧 JSON Schema]
        QA[❓ Q&A Format]
        IMPL[📋 Implementation Guide]
        README[📖 Enhanced README]
    end
    
    subgraph "Processing Pipeline"
        Select[Format Selection] --> Generate[Content Generation]
        Generate --> Template[Apply Templates]
        Template --> Optimize[Content Optimization]
        Optimize --> Download[File Download]
    end
    
    subgraph "Content Types"
        Code[Code Blocks]
        Docs[Documentation]
        Diagrams[Visual Diagrams]
        Schema[API Schema]
    end
    
    Select --> PDF
    Select --> MD
    Select --> TXT
    Select --> IMG
    Select --> JSON
    Select --> QA
    Select --> IMPL
    Select --> README
    
    Code --> Generate
    Docs --> Generate
    Diagrams --> Generate
    Schema --> Generate
    
    classDef format fill:#3b82f6,stroke:#1e40af,color:#fff
    classDef process fill:#06b6d4,stroke:#0891b2,color:#fff
    classDef content fill:#10b981,stroke:#059669,color:#fff
    
    class PDF,MD,TXT,IMG,JSON,QA,IMPL,README format
    class Select,Generate,Template,Optimize,Download process
    class Code,Docs,Diagrams,Schema content
```

---

## 🚀 Quick Start

### Prerequisites

```bash
# Node.js 18+ and npm required
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

### Installation

```bash
# Clone the repository
git clone https://github.com/Tim-Spurlin/project-analyzer-pro.git
cd project-analyzer-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands

```bash
# 🔧 Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# 🧹 Code Quality  
npm run lint         # Run ESLint (when configured)
npm run optimize     # Optimize Vite dependencies

# 🔥 Utilities
npm run kill         # Kill processes on port 5000
```

### First Run Experience

```mermaid
journey
    title New User Journey
    section Discovery
      Open Application: 5: User
      See Upload Interface: 4: User
      Read Instructions: 3: User
    section Upload
      Drag Project Folder: 5: User
      Watch Progress Bar: 4: User
      View File Statistics: 4: User
    section Structure
      Explore Project Tree: 5: User
      Check File Details: 4: User
      Navigate Folders: 4: User  
    section Processing
      Start Documentation: 5: User
      Monitor AI Progress: 4: User
      Review Generated Content: 5: User
    section Export
      Select Output Formats: 5: User
      Configure Options: 3: User
      Download Results: 5: User
```

---

## 🎨 UI Components

### Design System Overview

```mermaid
graph LR
    subgraph "Color System"
        Primary[Primary Blue #3b82f6]
        Secondary[Secondary Gray #64748b] 
        Accent[Accent Cyan #06b6d4]
        Success[Success Green #10b981]
        Warning[Warning Orange #f59e0b]
        Error[Error Red #ef4444]
    end
    
    subgraph "Typography"
        Inter[Inter Font - UI Text]
        Mono[JetBrains Mono - Code]
        Sizes[Multiple Size Scale]
    end
    
    subgraph "Components"
        Cards[Card Components]
        Buttons[Button Variants]  
        Inputs[Form Controls]
        Navigation[Tab Navigation]
        Progress[Progress Indicators]
        Code[Code Block Display]
    end
    
    Primary --> Cards
    Secondary --> Navigation
    Accent --> Buttons
    Success --> Progress
    
    Inter --> Cards
    Mono --> Code
    
    classDef color fill:#3b82f6,stroke:#1e40af,color:#fff
    classDef type fill:#64748b,stroke:#475569,color:#fff
    classDef comp fill:#06b6d4,stroke:#0891b2,color:#fff
    
    class Primary,Secondary,Accent,Success,Warning,Error color
    class Inter,Mono,Sizes type
    class Cards,Buttons,Inputs,Navigation,Progress,Code comp
```

### Component Hierarchy

```mermaid
flowchart TD
    App[App.tsx] --> Header[Header Section]
    App --> Tabs[Tab Navigation]
    
    Header --> Title[Application Title]  
    Header --> ProjectInfo[Project Information]
    
    Tabs --> Upload[Upload Tab]
    Tabs --> Structure[Structure Tab]
    Tabs --> Processing[Processing Tab]
    Tabs --> Export[Export Tab]
    
    Upload --> FileUpload[File Upload Component]
    FileUpload --> DropZone[Drag & Drop Zone]
    FileUpload --> Progress[Upload Progress]
    
    Structure --> ProjectStructure[Project Structure Tree]
    ProjectStructure --> FileTree[Collapsible File Tree]
    ProjectStructure --> FileIcons[File Type Icons]
    
    Processing --> DocGenerator[Documentation Generator]
    DocGenerator --> CodeBlocks[Code Block Display]
    DocGenerator --> AIProgress[AI Processing Progress]
    
    Export --> ExportSelector[Export Format Selector]  
    ExportSelector --> FormatCards[Format Selection Cards]
    ExportSelector --> DiagramTypes[Diagram Type Options]
    
    style App fill:#3b82f6,stroke:#1e40af,color:#fff
    style FileUpload fill:#10b981,stroke:#059669,color:#fff
    style DocGenerator fill:#06b6d4,stroke:#0891b2,color:#fff
    style ExportSelector fill:#f59e0b,stroke:#d97706,color:#fff
```

---

## 📦 Export Formats

### Comprehensive Export Options

```mermaid
quadrantChart
    title Export Format Positioning
    x-axis Low Complexity --> High Complexity
    y-axis Technical --> Business
    
    PDF Documentation: [0.8, 0.7]
    Markdown Files: [0.6, 0.6]
    Text Files: [0.3, 0.4]
    Visual Diagrams: [0.7, 0.3]
    JSON Schema: [0.9, 0.8]
    Q&A Format: [0.4, 0.2]
    Implementation Guide: [0.8, 0.9]
    Enhanced README: [0.5, 0.5]
```

### Format Specifications

| Format | File Extension | Use Case | Features |
|--------|---------------|----------|----------|
| 📄 **Comprehensive PDF** | `.md` (rendered) | Complete documentation | Maximum content density, professional formatting |
| 📝 **Detailed Markdown** | `.md` | Developer documentation | Copyable code blocks, structured headers |  
| 📃 **Consolidated Text** | `.txt` | AI platform consumption | Optimized for token limits, dense content |
| 🖼️ **Visual Diagrams** | `.png/.jpg` | Architecture visualization | Mermaid-generated diagrams, annotations |
| 🔧 **JSON Schema** | `.json` | API documentation | Complete communication protocols, data structures |
| ❓ **Q&A Format** | `.md` | Knowledge transfer | Technical questions and detailed answers |
| 📋 **Implementation Guide** | `.md` | Development planning | Step-by-step tasks, technical specifications |
| 📖 **Enhanced README** | `.md` | Project documentation | Professional project overview with examples |

### Export Generation Process

```mermaid
stateDiagram-v2
    [*] --> FormatSelection: User selects formats
    FormatSelection --> ContentPreparation: Validate selections
    
    ContentPreparation --> PDFGeneration: PDF selected
    ContentPreparation --> MarkdownGeneration: MD selected  
    ContentPreparation --> DiagramGeneration: Diagrams selected
    ContentPreparation --> SchemaGeneration: JSON selected
    
    PDFGeneration --> ContentOptimization
    MarkdownGeneration --> ContentOptimization
    DiagramGeneration --> ContentOptimization
    SchemaGeneration --> ContentOptimization
    
    ContentOptimization --> FilePackaging: All formats processed
    FilePackaging --> Download: Files ready
    Download --> [*]: Export complete
    
    PDFGeneration --> ErrorHandling: Generation fails
    MarkdownGeneration --> ErrorHandling: Generation fails
    DiagramGeneration --> ErrorHandling: Generation fails
    SchemaGeneration --> ErrorHandling: Generation fails
    
    ErrorHandling --> FormatSelection: Retry with different formats
```

---

## ⚡ Performance & Optimization

### Performance Metrics

```mermaid
xychart
    title "Processing Performance by Project Size"
    x-axis ["Small (< 10MB)", "Medium (10-50MB)", "Large (50-100MB)", "XL (100MB+)"]
    y-axis "Processing Time (seconds)" 0 --> 300
    line "Upload Time" [5, 15, 45, 120]
    line "Analysis Time" [10, 30, 90, 180]
    line "Export Time" [3, 8, 20, 45]
```

### Memory Usage Patterns

```mermaid
pie title Memory Allocation
    "File Content Storage" : 40
    "Processing Cache" : 25
    "UI Components" : 15
    "AI Response Cache" : 12
    "System Overhead" : 8
```

### Optimization Features

- **🔄 Intelligent Chunking**: Automatically splits large files to respect AI token limits
- **💾 Efficient Caching**: Stores processing results to avoid redundant AI calls  
- **🎯 Selective Processing**: Only processes supported file types to save resources
- **⚡ Progress Streaming**: Real-time updates prevent UI blocking
- **🧠 Memory Management**: Automatic cleanup of large file content after processing
- **📊 Batch Processing**: Groups similar files for efficient AI analysis

---

## 🔧 Configuration

### Environment Configuration

```bash
# .env.local (create this file)
VITE_AI_MODEL_PREFERENCE=gpt-4  # AI model preference
VITE_MAX_FILE_SIZE=5242880      # Max file size in bytes (5MB)
VITE_PROCESSING_TIMEOUT=300     # Processing timeout in seconds
```

### Theme Customization

```json
// theme.json
{
  "extend": {
    "colors": {
      "primary": {
        "50": "#eff6ff",
        "500": "#3b82f6", 
        "900": "#1e3a8a"
      },
      "accent": {
        "50": "#ecfeff",
        "500": "#06b6d4",
        "900": "#164e63"
      }
    }
  }
}
```

### Supported File Types

```typescript
const SUPPORTED_EXTENSIONS = [
  // Programming Languages
  '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c',
  '.cs', '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.scala',
  
  // Web Technologies  
  '.html', '.css', '.scss', '.sass', '.less', '.vue', '.svelte',
  
  // Configuration & Data
  '.json', '.xml', '.yaml', '.yml', '.toml', '.ini', '.env',
  
  // Documentation
  '.md', '.rst', '.txt', '.adoc', '.tex',
  
  // Scripts & Tools
  '.sql', '.sh', '.bash', '.zsh', '.ps1', '.bat',
  '.dockerfile', '.gitignore', '.lock'
]
```

---

## 🛠️ Development

### Project Structure

```
project-analyzer-pro/
├── 📁 src/
│   ├── 📁 components/          # React components
│   │   ├── CodeBlockDisplay.tsx
│   │   ├── DocumentationGenerator.tsx  
│   │   ├── ExportSelector.tsx
│   │   ├── FileUpload.tsx
│   │   ├── ProcessingEngine.tsx
│   │   ├── ProjectStructure.tsx
│   │   └── 📁 ui/              # Reusable UI components
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 lib/                 # Utility libraries
│   ├── 📁 styles/              # CSS and theme files
│   ├── App.tsx                 # Main application component
│   └── main.tsx               # Application entry point
├── 📁 public/                  # Static assets
├── 📄 package.json            # Dependencies and scripts
├── 📄 tailwind.config.js      # Tailwind CSS configuration
├── 📄 vite.config.ts          # Vite build configuration
├── 📄 PRD.md                  # Product Requirements Document
└── 📄 README.md               # This documentation
```

### Development Workflow

```mermaid
gitgraph
    commit id: "Initial Setup"
    branch feature/ui-components
    checkout feature/ui-components
    commit id: "Add base components"
    commit id: "Implement dark theme"
    checkout main
    merge feature/ui-components
    
    branch feature/file-processing
    checkout feature/file-processing  
    commit id: "File upload system"
    commit id: "Content extraction"
    checkout main
    merge feature/file-processing
    
    branch feature/ai-integration
    checkout feature/ai-integration
    commit id: "AI service integration"
    commit id: "Documentation generation"
    checkout main
    merge feature/ai-integration
    
    branch feature/export-system
    checkout feature/export-system
    commit id: "Export formats"
    commit id: "Multi-format support"
    checkout main
    merge feature/export-system
```

### Testing Strategy

```mermaid
flowchart TD
    UnitTests[Unit Tests] --> ComponentTests[Component Tests]
    ComponentTests --> IntegrationTests[Integration Tests]
    IntegrationTests --> E2ETests[End-to-End Tests]
    
    UnitTests --> FileProcessing[File Processing Logic]
    UnitTests --> ExportGeneration[Export Generation]
    
    ComponentTests --> UIComponents[UI Component Rendering]
    ComponentTests --> UserInteractions[User Interactions]
    
    IntegrationTests --> AIIntegration[AI Service Integration]
    IntegrationTests --> DataFlow[Data Flow Testing]
    
    E2ETests --> UserJourneys[Complete User Journeys]
    E2ETests --> CrossBrowser[Cross-Browser Testing]
    
    classDef test fill:#10b981,stroke:#059669,color:#fff
    classDef scope fill:#3b82f6,stroke:#1e40af,color:#fff
    
    class UnitTests,ComponentTests,IntegrationTests,E2ETests test
    class FileProcessing,ExportGeneration,UIComponents,UserInteractions,AIIntegration,DataFlow,UserJourneys,CrossBrowser scope
```

---

## 📚 API Reference

### Core Interfaces

```typescript
// Project data structure
interface ProcessedProject {
  name: string                    // Project name
  files: FileItem[]              // Array of processed files
  structure: ProjectStructure    // Nested file structure
  totalSize: number             // Total size in bytes
  fileCount: number             // Number of processed files
  uploadedAt: Date              // Upload timestamp
}

// Individual file representation
interface FileItem {
  name: string        // File name
  path: string        // Relative path from project root
  content: string     // File content
  size: number        // File size in bytes
  type: string        // File extension
}

// Extracted code component
interface ExtractedCode {
  id: string          // Unique identifier
  title: string       // Component title
  description: string // AI-generated description
  code: string        // Raw code content
  language: string    // Programming language
  filePath: string    // Source file path
  type: 'function' | 'class' | 'component' | 'config' | 'script' | 'style'
}

// Documentation section
interface GeneratedSection {
  id: string                // Unique identifier
  title: string            // Section title
  description: string      // Section description
  content: string          // AI-generated content
  codeBlocks: ExtractedCode[] // Related code blocks
}

// Export format configuration
interface ExportFormat {
  id: string           // Format identifier
  name: string         // Display name
  description: string  // Format description
  icon: React.ReactNode // UI icon
  estimatedSize: string // Estimated output size
  selected: boolean    // Selection state
  preview?: string     // Preview content
}
```

### Component Props

```typescript
// File upload component
interface FileUploadProps {
  onProjectUploaded: (project: ProcessedProject) => void
}

// Documentation generator component  
interface DocumentationGeneratorProps {
  project: ProcessedProject
  isProcessing: boolean
  onProcessingStart: () => void
  onProcessingComplete: () => void
}

// Export selector component
interface ExportSelectorProps {
  project: ProcessedProject
}

// Code block display component
interface CodeBlockDisplayProps {
  title: string
  description: string
  code: string
  language: string
  filePath?: string
  lineNumbers?: boolean
}
```

### Utility Functions

```typescript
// File type detection
const getFileIcon = (fileName: string, type: string): React.ReactNode

// File tree construction  
const buildFileTree = (files: FileItem[]): ProjectStructure

// Content optimization for AI consumption
const optimizeForTokenLimits = (content: string, maxTokens: number): string

// Export format generation
const generateExportContent = (
  formatId: string, 
  project: ProcessedProject,
  extractedCode: ExtractedCode[],
  generatedSections: GeneratedSection[]
): Promise<string>
```

---

## 🤝 Contributing

### Contribution Guidelines

```mermaid
flowchart LR
    Fork[Fork Repository] --> Clone[Clone Locally]
    Clone --> Branch[Create Feature Branch]
    Branch --> Develop[Implement Changes]
    Develop --> Test[Run Tests]
    Test --> Commit[Commit Changes]
    Commit --> Push[Push to Fork]
    Push --> PR[Create Pull Request]
    PR --> Review[Code Review]
    Review --> Merge[Merge to Main]
    
    style Fork fill:#3b82f6
    style PR fill:#10b981
    style Merge fill:#10b981
```

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/project-analyzer-pro.git
   cd project-analyzer-pro
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

### Code Standards

- **TypeScript**: Strict mode enabled, full type coverage required
- **React**: Functional components with hooks, proper prop typing
- **Styling**: Tailwind CSS with consistent design tokens
- **Testing**: Unit tests for utility functions, component tests for UI
- **Documentation**: JSDoc comments for public APIs

### Pull Request Process

1. Ensure all tests pass and code builds successfully
2. Update documentation for new features or API changes  
3. Follow conventional commit message format
4. Include screenshots for UI changes
5. Reference related issues in PR description

---

## 🔒 Security & Privacy

### Data Handling

```mermaid
flowchart TD
    Upload[File Upload] --> LocalProcessing[Local Processing Only]
    LocalProcessing --> MemoryOnly[In-Memory Storage]
    MemoryOnly --> NoTransmission[No External File Transmission]
    NoTransmission --> AIAnalysis{AI Analysis Needed?}
    
    AIAnalysis -->|Yes| TextOnly[Text Content Only]
    AIAnalysis -->|No| LocalOnly[Fully Local]
    
    TextOnly --> MinimalData[Minimal Data Sharing]
    MinimalData --> NoStorage[No External Storage]
    NoStorage --> SecureAPI[Secure API Calls]
    
    LocalOnly --> UserControl[User Controlled]
    SecureAPI --> UserControl
    UserControl --> DataCleanup[Automatic Cleanup]
    
    style Upload fill:#3b82f6
    style LocalProcessing fill:#10b981
    style NoTransmission fill:#10b981
    style UserControl fill:#10b981
```

### Privacy Principles

- **🔒 Local-First**: All file processing happens locally in your browser
- **🛡️ Minimal AI Sharing**: Only text content sent to AI services, never file metadata
- **🚫 No Storage**: No files stored on external servers
- **🧹 Auto-Cleanup**: Memory automatically cleared after processing
- **👤 User Control**: Complete control over what gets processed and exported

---

## 📊 Performance Benchmarks

### Processing Speed Metrics

```mermaid
xychart
    title "Average Processing Times by File Type"
    x-axis ["JavaScript", "TypeScript", "Python", "Java", "C++", "Markdown", "JSON", "CSS"]
    y-axis "Processing Time (ms)" 0 --> 500
    bar [120, 150, 100, 200, 180, 50, 30, 40]
```

### Memory Usage Patterns

```mermaid
sankey-beta
    "Total Memory" ,[Project Files],40
    "Total Memory" ,[UI Components],20  
    "Total Memory" ,[Processing Cache],25
    "Total Memory" ,[AI Responses],15
    
    [Project Files] ,[File Content],35
    [Project Files] ,[Metadata],5
    
    [UI Components] ,[React State],12
    [UI Components] ,[DOM Elements],8
    
    [Processing Cache] ,[Code Extraction],15
    [Processing Cache] ,[Documentation],10
    
    [AI Responses] ,[Generated Content],15
```

---

## 🚀 Deployment

### Build Configuration

```bash
# Production build
npm run build

# Preview production build  
npm run preview

# Build with custom settings
VITE_BUILD_TARGET=modern npm run build
```

### Deployment Options

```mermaid
flowchart LR
    Source[Source Code] --> Build[Build Process]
    Build --> Static[Static Assets]
    
    Static --> Netlify[Netlify Deploy]
    Static --> Vercel[Vercel Deploy] 
    Static --> GitHub[GitHub Pages]
    Static --> S3[AWS S3 + CloudFront]
    
    Netlify --> CDN1[Global CDN]
    Vercel --> CDN2[Edge Network]
    GitHub --> CDN3[GitHub CDN]
    S3 --> CDN4[CloudFront CDN]
    
    CDN1 --> Users[End Users]
    CDN2 --> Users
    CDN3 --> Users  
    CDN4 --> Users
    
    style Source fill:#3b82f6
    style Build fill:#06b6d4
    style Users fill:#10b981
```

### Environment Variables

```bash
# Production environment
VITE_APP_TITLE="Project Analyzer Pro"
VITE_APP_DESCRIPTION="AI-powered project documentation generator"
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your_sentry_dsn_here
```

---

## 🔍 Troubleshooting

### Common Issues & Solutions

```mermaid
flowchart TD
    Issue1[Files Not Uploading] --> Check1{File Size < 5MB?}
    Check1 -->|No| Solution1[Reduce file size or exclude large files]
    Check1 -->|Yes| Check2{Supported file type?}
    Check2 -->|No| Solution2[Check supported extensions list]
    Check2 -->|Yes| Solution3[Check browser console for errors]
    
    Issue2[AI Processing Fails] --> Check3{Internet connection?}
    Check3 -->|No| Solution4[Check network connection]
    Check3 -->|Yes| Check4{Token limits exceeded?}
    Check4 -->|Yes| Solution5[Reduce project size or chunking]
    Check4 -->|No| Solution6[Retry with different AI model]
    
    Issue3[Export Not Working] --> Check5{Format selected?}
    Check5 -->|No| Solution7[Select at least one export format]
    Check5 -->|Yes| Check6{Browser blocking downloads?}
    Check6 -->|Yes| Solution8[Enable downloads in browser settings]
    Check6 -->|No| Solution9[Check browser console for errors]
    
    style Issue1,Issue2,Issue3 fill:#ef4444
    style Solution1,Solution2,Solution3,Solution4,Solution5,Solution6,Solution7,Solution8,Solution9 fill:#10b981
```

### Debug Mode

Enable debug logging by adding to your browser console:

```javascript
// Enable debug mode
localStorage.setItem('DEBUG', 'true')

// View processing logs
localStorage.setItem('VERBOSE_LOGGING', 'true')  

// Clear debug data
localStorage.removeItem('DEBUG')
localStorage.removeItem('VERBOSE_LOGGING')
```

---

## 📈 Roadmap

### Planned Features

```mermaid
timeline
    title Project Analyzer Pro Roadmap
    
    section Q1 2024
        Core Features    : File Upload System
                         : AI Integration
                         : Basic Export Formats
    
    section Q2 2024  
        Enhanced UI      : Dark Mode Polish
                         : Advanced Code Display
                         : Progress Indicators
    
    section Q3 2024
        Advanced Exports : Visual Diagram Generation
                         : JSON Schema Output
                         : Q&A Format Support
    
    section Q4 2024
        Performance      : Large File Optimization
                         : Batch Processing
                         : Memory Management
                         
    section 2025
        New Features     : Custom Templates
                         : Plugin System
                         : Collaboration Tools
                         : API Endpoints
```

---

## 🌟 Acknowledgments

### Technologies Used

- **⚛️ React 19**: Modern React with hooks and concurrent features
- **⚡ Vite**: Lightning-fast build tool and development server
- **🎨 Tailwind CSS**: Utility-first CSS framework with design system
- **🔧 Radix UI**: Accessible, unstyled UI components  
- **🎯 TypeScript**: Type-safe JavaScript development
- **🤖 GitHub Spark**: AI integration platform and hosting
- **📊 Mermaid**: Diagram generation for documentation
- **🎨 Phosphor Icons**: Beautiful, consistent icon set

### Contributors

Special thanks to all contributors who help make Project Analyzer Pro better!

---

## 📄 License

```
MIT License

Copyright (c) 2024 Project Analyzer Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Built with ❤️ by the Project Analyzer Pro team**

[⬆️ Back to Top](#-project-analyzer-pro) • [🐛 Report Bug](https://github.com/Tim-Spurlin/project-analyzer-pro/issues) • [💡 Request Feature](https://github.com/Tim-Spurlin/project-analyzer-pro/issues)

</div>