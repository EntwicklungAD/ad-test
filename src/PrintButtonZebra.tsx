import type { ReactElement } from "react";
import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";

const PrintButtonZebra = (): ReactElement => {
    const handlePrint = async (): Promise<void> => {
        const browserPrint = new ZebraBrowserPrintWrapper();
        const defaultPrinter = await browserPrint.getDefaultPrinter();
        browserPrint.setPrinter(defaultPrinter);
        const printerStatus = await browserPrint.checkPrinterStatus();

        if (printerStatus.isReadyToPrint) {
            const zpl = `^XA
                    ^FO20,20^ADN,36,36^FDHallo Welt^FS
                    ^XZ`;
            await browserPrint.print(zpl);
        } else {
            console.log("Druckerfehler:", printerStatus.errors);
        }
    };

    return (
        <div>
            <button onClick={handlePrint}>Dokument drucken</button>
        </div>
    );
};

export default PrintButtonZebra;
