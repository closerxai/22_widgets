import { useState, useEffect } from 'react';

interface ColorTheme {
  primary: string;
  secondary: string;
  text: string;
  accent?: string;
}

const defaultColors: ColorTheme = {
  primary: '#3B82F6',
  secondary: '#0F172A',
  text: '#FFFFFF',
  accent: '#F97316'
};

export const useThemeExtractor = (imageUrl?: string): { colors: ColorTheme; isLoading: boolean } => {
  const [colors, setColors] = useState<ColorTheme>(defaultColors);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!imageUrl) return;

    setIsLoading(true);

    // In a real implementation, we would extract colors from the image
    // For this demo, we'll simulate extraction with predefined colors based on image URL
    // In a production environment, you'd use something like Vibrant.js or a color extraction API
    const simulateColorExtraction = () => {
      // This is a simplified simulation - in real scenarios, you'd actually analyze the image
      // The hash creates somewhat randomized but consistent colors for the same image URL
      const hash = hashString(imageUrl);
      
      // Generate "random" but consistent colors based on the image URL hash
      const hue = hash % 360;
      const saturation = 60 + (hash % 30); // Between 60-90%
      const lightness = 45 + (hash % 15);  // Between 45-60%

      // Create complementary color (opposite on the color wheel)
      const secondaryHue = (hue + 180) % 360;
      
      // Determine if we should use a dark or light text color based on background
      const textColor = lightness > 50 ? '#1A202C' : '#FFFFFF';
      
      // Create accent color (30° offset from primary)
      const accentHue = (hue + 30) % 360;

      return {
        primary: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        secondary: `hsl(${secondaryHue}, ${saturation - 10}%, ${lightness - 10}%)`,
        text: textColor,
        accent: `hsl(${accentHue}, ${saturation + 10}%, ${lightness + 5}%)`
      };
    };

    // Simple timeout to simulate the time it would take to extract colors
    const timer = setTimeout(() => {
      setColors(simulateColorExtraction());
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [imageUrl]);

  // Simple string hashing function to get consistent results for the same URL
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  return { colors, isLoading };
};