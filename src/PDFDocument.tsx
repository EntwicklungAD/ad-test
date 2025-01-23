import {SpecialZoomLevel, Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import React, {useRef, useState} from 'react';
import "./index.css"

const PDFDocument = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [pdfFile, setPdfFile] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPdfFile(reader.result as string); // Cast to string
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                ref={fileInputRef}
            />
            {pdfFile ? (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <div style={{ height: '750px' }} className={""}>
                        <Viewer
                            defaultScale={SpecialZoomLevel.PageFit}
                            fileUrl={pdfFile}
                            plugins={[defaultLayoutPluginInstance]}

                        />
                    </div>
                </Worker>
            ) : (
                <div>
                    <p>Bitte laden Sie eine PDF-Datei hoch, um sie anzuzeigen.</p>
                </div>
            )}
        </div>
    );
};

export default PDFDocument;
