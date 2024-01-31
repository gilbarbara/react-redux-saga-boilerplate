import type { ReportCallback } from 'web-vitals';

const reportWebVitals = (onPerfEntry: ReportCallback) => {
  import('web-vitals').then(({ onCLS, onFCP, onFID, onINP, onLCP, onTTFB }) => {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  });
};

export default reportWebVitals;
