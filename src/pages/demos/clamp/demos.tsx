import * as React from 'react';
import { CustomCSSProperties } from '../../../utils';

export const maxWidthClampDemo = `
.no-clamp {
  min-width: 600px;
  width: 50%;
  max-width: 900px;
}

.clamped {
  width: clamp(600px, 50%, 900px);
  max-width: 100%;
}
`;

export const clampAnythingDemo = `
.clamp-font-size {
  /* The font size is controlled by the range slider */
  font-size: clamp(12px, var(--demo-font-size), 24px);
}
`;

export const ClampAnythingDemo = () => {
  const [rangeValue, setRangeValue] = React.useState('16');

  return (
    <div
      style={{ '--demo-font-size': rangeValue + 'px' } as CustomCSSProperties}
      className="flex flex-col justify-center items-center max-w-full resize-x mb-8 text-lg"
    >
      <label className="flex flex-col items-center gap-2">
        <span>Demo Font Size</span>
        <input
          type="range"
          min="1"
          max="40"
          value={rangeValue}
          onChange={(event) => setRangeValue(event.target.value)}
        />
      </label>
      <span>Value {rangeValue}px</span>
      <span
        style={{ fontSize: 'clamp(12px, var(--demo-font-size), 24px)' }}
        className="text-gray-600 font-medium h-8 mt-4"
      >
        Demo Text
      </span>
    </div>
  );
};
