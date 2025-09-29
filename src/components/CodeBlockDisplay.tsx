import { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { toast } from 'sonner'
import { Copy, Check, FileCode } from '@phosphor-icons/react'

interface CodeBlockDisplayProps {
  title: string
  description: string
  code: string
  language: string
  filePath?: string
  lineNumbers?: boolean
}

export function CodeBlockDisplay({ 
  title, 
  description, 
  code, 
  language, 
  filePath,
  lineNumbers = true 
}: CodeBlockDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Code copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy code')
    }
  }

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-500/10 text-yellow-400',
      typescript: 'bg-blue-500/10 text-blue-400',
      jsx: 'bg-cyan-500/10 text-cyan-400',
      tsx: 'bg-cyan-500/10 text-cyan-400',
      python: 'bg-green-500/10 text-green-400',
      java: 'bg-red-500/10 text-red-400',
      cpp: 'bg-purple-500/10 text-purple-400',
      css: 'bg-pink-500/10 text-pink-400',
      html: 'bg-orange-500/10 text-orange-400',
      json: 'bg-gray-500/10 text-gray-400',
      markdown: 'bg-indigo-500/10 text-indigo-400'
    }
    return colors[lang.toLowerCase()] || 'bg-gray-500/10 text-gray-400'
  }

  const lines = code.split('\n')

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileCode size={18} className="text-primary" />
              <h3 className="font-semibold text-foreground">{title}</h3>
              <Badge variant="outline" className={getLanguageColor(language)}>
                {language.toUpperCase()}
              </Badge>
            </div>
            {filePath && (
              <div className="text-xs text-muted-foreground font-mono mb-2">
                {filePath}
              </div>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="ml-4 flex-shrink-0"
          >
            {copied ? (
              <>
                <Check size={14} className="mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} className="mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div className="bg-card border-t overflow-x-auto">
            <pre className="text-sm leading-relaxed p-4">
              <code className="block text-foreground font-mono">
                {lines.map((line, index) => (
                  <div key={index} className="flex">
                    {lineNumbers && (
                      <span className="select-none text-muted-foreground mr-4 text-right w-8 flex-shrink-0">
                        {index + 1}
                      </span>
                    )}
                    <span className="flex-1 whitespace-pre-wrap break-all">
                      {line || ' '}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}