import React, { useEffect, useState } from 'react';
import Device = BrowserPrint.Device;

const PrintComponent: React.FC = () => {
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [devices, setDevices] = useState<any[]>([]);

    useEffect(() => {
        setup();
    }, []);

    const setup = () => {
        window.BrowserPrint.getDefaultDevice("printer", (device: Device) => {
            setSelectedDevice(device);
            setDevices([device]);

            const htmlSelect = document.getElementById("selected_device") as HTMLSelectElement;
            const option = document.createElement("option");
            option.text = device.name;
            htmlSelect.add(option);

            (window as any).BrowserPrint.getLocalDevices((deviceList: any[]) => {
                deviceList.forEach((device) => {
                    if (!selectedDevice || device.uid !== selectedDevice.uid) {
                        setDevices((prevDevices) => [...prevDevices, device]);
                        const option = document.createElement("option");
                        option.text = device.name;
                        option.value = device.uid;
                        htmlSelect.add(option);
                    }
                });
            }, () => {
                alert("Error getting local devices");
            }, "printer");

        }, (error: any) => {
            alert(error);
        });
    };

    const getConfig = () => {
        (window as any).BrowserPrint.getApplicationConfiguration((config: any) => {
            alert(JSON.stringify(config));
        }, () => {
            alert(JSON.stringify(new (window as any).BrowserPrint.ApplicationConfiguration()));
        });
    };

    const writeToSelectedPrinter = (dataToWrite: string) => {
        selectedDevice.send(dataToWrite, undefined, errorCallback);
    };

    const readCallback = (readData: any) => {
        if (!readData) {
            alert("No Response from Device");
        } else {
            alert(readData);
        }
    };

    const errorCallback = (errorMessage: string) => {
        alert("Error: " + errorMessage);
    };

    const readFromSelectedPrinter = () => {
        selectedDevice.read(readCallback, errorCallback);
    };

    const getDeviceCallback = (deviceList: any) => {
        alert("Devices: \n" + JSON.stringify(deviceList, null, 4));
    };

    const sendImage = (imageUrl: string) => {
        let url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
        url = url + "/" + imageUrl;
        selectedDevice.convertAndSendFile(url, undefined, errorCallback);
    };

    const sendFile = (fileUrl: string) => {
        let url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
        url = url + "/" + fileUrl;
        selectedDevice.sendFile(url, undefined, errorCallback);
    };

    const onDeviceSelected = (selected: any) => {
        const selectedDevice = devices.find(device => device.uid === selected.value);
        setSelectedDevice(selectedDevice);
    };

    return (
        <div>
            <span style={{ paddingRight: '50px', fontSize: '200%' }}>Zebra Browser Print Test Page</span><br/>
            <span style={{ fontSize: '75%' }}>This page must be loaded from a web server to function properly.</span><br/><br/>
            Selected Device: <select id="selected_device" onChange={(e) => onDeviceSelected(e.target)}></select><br/><br/>
            <input type="button" value="Get Application Configuration" onClick={getConfig} /><br/><br/>
            <input type="button" value="Send Config Label" onClick={() => writeToSelectedPrinter('~wc')} /><br/><br/>
            <input type="button" value="Send ZPL Label" onClick={() => writeToSelectedPrinter('^XA^FO200,200^A0N36,36^FDTest Label^FS^XZ')} /><br/><br/>
            <input type="button" value="Get Status" onClick={() => { writeToSelectedPrinter('~hs'); readFromSelectedPrinter(); }} /><br/><br/>
            <input type="button" value="Get Local Devices" onClick={() => (window as any).BrowserPrint.getLocalDevices(getDeviceCallback, errorCallback)} /><br/><br/>
            <input type="text" name="write_text" id="write_text" />
            <input type="button" value="Write" onClick={() => writeToSelectedPrinter((document.getElementById('write_text') as HTMLInputElement).value)} /><br/><br/>
            <input type="button" value="Read" onClick={readFromSelectedPrinter} /><br/><br/>
            <input type="button" value="Send BMP" onClick={() => sendImage('Zebra_logobox.bmp')} /><br/><br/>
            <input type="button" value="Send JPG" onClick={() => sendImage('ZebraGray.jpg')} /><br/><br/>
            <input type="button" value="Send File" onClick={() => sendFile('wc.zpl')} /><br/><br/>
        </div>
    );
};

export default PrintComponent;
