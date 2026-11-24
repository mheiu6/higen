import { useState } from 'react';

type FinishId = string;

interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  type: 'mobile' | 'tablet' | 'desktop' | 'custom';
}

const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'iphone-se',   name: 'iPhone SE',         width: 375,  height: 667,  type: 'mobile' },
  { id: 'iphone-14',   name: 'iPhone 14',         width: 390,  height: 844,  type: 'mobile' },
  { id: 'iphone-14pm', name: 'iPhone 14 Pro Max', width: 430,  height: 932,  type: 'mobile' },
  { id: 'ipad-mini',   name: 'iPad mini',         width: 768,  height: 1024, type: 'tablet' },
  { id: 'ipad-pro',    name: 'iPad Pro 12.9"',    width: 1024, height: 1366, type: 'tablet' },
  { id: 'macbook-air', name: 'MacBook Air',       width: 1280, height: 800,  type: 'desktop' },
  { id: 'macbook-pro', name: 'MacBook Pro 16"',   width: 1536, height: 960,  type: 'desktop' },
  { id: 'windows-fhd', name: 'Windows FHD',       width: 1920, height: 1080, type: 'desktop' },
];

interface ResponsivePreviewProps {
  onBack: () => void;
}

export default function ResponsivePreview({ onBack }: ResponsivePreviewProps) {
  const [url, setUrl] = useState('https://example.com');
  const [devices, setDevices] = useState<DevicePreset[]>([
    DEVICE_PRESETS[1],
    DEVICE_PRESETS[3],
    DEVICE_PRESETS[5],
  ]);

  const toggleDevice = (device: DevicePreset) => {
    setDevices((prev) => {
      const exists = prev.find((d) => d.id === device.id);
      if (exists) return prev.filter((d) => d.id !== device.id);
      return [...prev, device];
    });
  };

  const removeDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const loadAll = () => {
    try {
      new URL(url);
    } catch {
      alert('Invalid URL. Please include http:// or https://');
      return;
    }
    setDevices((prev) => [...prev]);
  };

  return (
    <div className="app-shell">
      <div className="toolbar">
        <button type="button" className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a website URL"
          onKeyDown={(e) => e.key === 'Enter' && loadAll()}
        />
        <button type="button" className="btn-load" onClick={loadAll}>
          Load All
        </button>
      </div>

      <div className="device-selector">
        <span>Add device:</span>
        {DEVICE_PRESETS.map((device) => {
          const isActive = devices.some((d) => d.id === device.id);
          return (
            <button
              key={device.id}
              type="button"
              className={`device-btn${isActive ? ' active' : ''}`}
              onClick={() => toggleDevice(device)}
            >
              {device.name}
            </button>
          );
        })}
      </div>

      <div className="preview-area">
        {devices.length === 0 && (
          <div className="empty-state">
            <p>Please select at least one device</p>
          </div>
        )}
        {devices.map((device) => (
          <div key={device.id} className="device-frame">
            <div className="device-label">
              {device.name}{' '}
              <span className="dimensions">
                {device.width}×{device.height}
              </span>
              <button
                type="button"
                className="remove-device"
                onClick={() => removeDevice(device.id)}
                title="Remove"
              >
                ✕
              </button>
            </div>
            <div
              className={`frame-shell${
                device.type === 'mobile' || device.type === 'tablet' ? ' mobile' : ''
              }`}
            >
              <iframe
                src={url}
                width={device.width}
                height={device.height}
                loading="lazy"
                title={`${device.name} preview`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}