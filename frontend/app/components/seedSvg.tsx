// components/DynamicSVG.tsx
import { useEffect, useState } from 'react';

interface DynamicSVGProps {
  ethAddress: string;
  size: string;
}

const DynamicSVG: React.FC<DynamicSVGProps> = ({ ethAddress, size }) => {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    // Function to generate bright and vibrant colors based on Ethereum address
    function generateColorsFromEthAddress(ethAddress: string): string[] {
      const hash = ethAddress.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);

      // Generate 6 different bright and vibrant colors based on the Ethereum address
      const colors: string[] = [];
      for (let i = 0; i < 6; i++) {
        const h = (hash * (i + 1) * 17) % 360; // Generate hue value between 0 and 360
        const s = 80 + ((hash * (i + 1) * 13) % 20); // Generate saturation between 80% and 100%
        const l = 50 + ((hash * (i + 1) * 19) % 10); // Generate brightness between 50% and 60%
        const a = 0.7; // Set alpha value for transparency
        colors.push(`hsla(${h}, ${s}%, ${l}%, ${a})`);
      }
      return colors;
    }

    // Generate colors when ethAddress changes
    setColors(generateColorsFromEthAddress(ethAddress));
  }, [ethAddress]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="-135 -135 270 270">
      <g transform="translate(0,0)">
        <circle r={64} cx={0} cy={0} fill="#fff" opacity="0.8" />
        {colors.map((color, index) => (
          <circle key={index} r={64} cx={64 * Math.cos((2 * Math.PI * index) / colors.length)} cy={64 * Math.sin((2 * Math.PI * index) / colors.length)} fill={color} opacity="0.7" />
        ))}
        {colors.map((_, index) => (
          <circle key={index} r={64} cx={64 * Math.cos((2 * Math.PI * index) / colors.length)} cy={64 * Math.sin((2 * Math.PI * index) / colors.length)} fill="none" stroke="#000" strokeWidth="2" />
        ))}
        <circle r={64} cx={0} cy={0} fill="none" stroke="#000" strokeWidth="2" />
      </g>
    </svg>
  );
};

export default DynamicSVG;
