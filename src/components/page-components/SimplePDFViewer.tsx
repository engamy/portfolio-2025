import React, { useState } from 'react';
import './PDFViewer.css';

interface SimplePDFViewerProps {
  pdfUrl: string;
  title?: string;
}

export default function SimplePDFViewer({ pdfUrl, title = "PDF Document" }: SimplePDFViewerProps) {
  console.log('SimplePDFViewer rendering with URL:', pdfUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-viewer-header">
        <h3>{title}</h3>
        <div className="pdf-actions">
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-button"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Open in New Tab
          </a>
        </div>
      </div>

      <div className="pdf-content">
        {isLoading && (
          <div className="pdf-loading">
            <div className="loading-spinner"></div>
            <p>Loading PDF...</p>
          </div>
        )}

        {hasError && (
          <div className="pdf-error">
            <p>Failed to load PDF. Please try opening it in a new tab.</p>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Open PDF in New Tab
            </a>
          </div>
        )}

        {!hasError && (
          <div className="pdf-iframe-container">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              title={title}
              width="100%"
              height="600px"
              onLoad={handleLoad}
              onError={handleError}
              style={{
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                background: 'white'
              }}
            />
          </div>
        )}
      </div>

      <div className="pdf-info">
        <p><strong>Note:</strong> This PDF viewer uses your browser's built-in PDF viewer.</p>
        <p>For the best experience with large files, you can open the PDF in a new tab.</p>
      </div>
    </div>
  );
}
