import {useRef} from 'react';
import PDFDocument from "./PDFDocument.tsx";

const PrintButton = () => {

const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div ref={contentRef}><PDFDocument/></div>
        </div>
    );
};

export default PrintButton;
