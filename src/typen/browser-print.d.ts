declare namespace BrowserPrint {
    type DeviceType = "printer";
    interface Device {
        uid: string;
        name: string;
        connection: string;
        deviceType: DeviceType;
        send(data: string, successCallback?: () => void, errorCallback?: (error: string) => void): void;
        read(successCallback: (data: string) => void, errorCallback: (error: string) => void): void;
        convertAndSendFile(url: string, successCallback?: () => void, errorCallback?: (error: string) => void): void;
        sendFile(url: string, successCallback?: () => void, errorCallback?: (error: string) => void): void;
    }
    interface PrinterStatus {
        isReadyToPrint: boolean;
        errors: string[];
    }
    type ApplicationConfiguration = object
    function getDefaultDevice(deviceType: DeviceType, successCallback: (device: Device) => void, errorCallback?: (error: string) => void): void;
    function getLocalDevices(successCallback: (devices: Device[]) => void, errorCallback?: () => void, deviceType?: DeviceType): void;
    function getApplicationConfiguration(successCallback: (config: ApplicationConfiguration) => void, errorCallback?: (error: string) => void): void;
}

interface Window {
    BrowserPrint: typeof BrowserPrint;
}
