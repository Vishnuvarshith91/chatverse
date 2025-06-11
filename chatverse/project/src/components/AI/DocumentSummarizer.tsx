import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Link, 
  Sparkles, 
  Download,
  Copy,
  CheckCircle
} from 'lucide-react';

interface DocumentSummarizerProps {
  onClose?: () => void;
}

const DocumentSummarizer: React.FC<DocumentSummarizerProps> = ({ onClose }) => {
  const [inputType, setInputType] = useState<'upload' | 'url' | 'text'>('text');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockSummary = `
**Key Points Summary:**

• **Main Topic**: ${inputType === 'url' ? 'Web content analysis' : 'Document analysis'} focusing on educational content extraction

• **Core Concepts**: 
  - Information processing and comprehension
  - Knowledge synthesis and organization
  - Learning optimization strategies

• **Important Insights**:
  - Structured learning approaches improve retention by 40%
  - Visual aids and summaries enhance understanding
  - Regular review cycles strengthen long-term memory

• **Action Items**:
  - Apply spaced repetition techniques
  - Create visual mind maps for complex topics
  - Break down information into digestible chunks

• **Conclusion**: Effective summarization transforms complex information into actionable knowledge, making learning more efficient and enjoyable.
      `;
      
      setSummary(mockSummary.trim());
      setIsLoading(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Document Summarizer</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Extract key insights from any content</p>
          </div>
        </div>
      </div>

      {/* Input Type Selection */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setInputType('text')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            inputType === 'text'
              ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
              : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-1" />
          Text
        </button>
        <button
          onClick={() => setInputType('url')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            inputType === 'url'
              ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
              : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          <Link className="w-4 h-4 inline mr-1" />
          URL
        </button>
        <button
          onClick={() => setInputType('upload')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            inputType === 'upload'
              ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
              : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-1" />
          Upload
        </button>
      </div>

      {/* Input Area */}
      <div className="mb-4">
        {inputType === 'text' && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your text content here..."
            className="w-full h-32 p-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        )}
        
        {inputType === 'url' && (
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (YouTube, article, blog post...)"
            className="w-full p-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        )}
        
        {inputType === 'upload' && (
          <div className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">Drop your file here or click to browse</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Supports PDF, DOC, TXT files</p>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" />
          </div>
        )}
      </div>

      {/* Summarize Button */}
      <button
        onClick={handleSummarize}
        disabled={isLoading || (!content && !url)}
        className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate Summary</span>
          </>
        )}
      </button>

      {/* Summary Output */}
      {summary && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white">AI Summary</h4>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-2 py-1 text-xs bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <Download className="w-3 h-3" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans">
              {summary}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentSummarizer;