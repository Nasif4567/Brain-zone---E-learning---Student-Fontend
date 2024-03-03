import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from '../Assets/lecture.pdf'

function PdfViewer() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(<div key={i} className="mb-5 w-[200px]">
      <Page pageNumber={i} renderAnnotationLayer={false} renderTextLayer={false} />
    </div>);
    }
    return pages;
  };

  return (
    <div className='flex flex-col h-[500px] w-[900px] overflow-auto p-20 mt-20 ml-32 bg-aliceblue border mr-20 rounded-sm '>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
      {renderPages()}
      </Document>
    </div>
  );
}

export default PdfViewer