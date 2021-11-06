import * as React from 'react';
import { CustomCSSProperties } from '../utils';

/* Max Width Clamp Demo */
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

export const MaxWidthClampDemo = () => {
  return (
    <div className="overflow-hidden resize-x max-w-full">
      <p className="font-medium text-center">
        Resize the container to see how the two are affected.
      </p>
      <div
        style={{ minWidth: '600px', width: '50%', maxWidth: '900px' }}
        className="border-solid border border-gray-900 rounded my-8 mx-auto p-4 text-center"
      >
        Not clamped
      </div>
      <div
        style={{ width: 'clamp(600px, 50%, 900px)', maxWidth: '100%' }}
        className="border-solid border border-gray-900 rounded my-8 mx-auto p-4 text-center"
      >
        Clamped
      </div>
    </div>
  );
};

/* Clamp Anything Demo */
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
