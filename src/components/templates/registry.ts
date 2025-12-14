import TechFuture from './TechFuture';
import CyberGrid from './CyberGrid';
import DigitalWave from './DigitalWave';
import Executive from './Executive';
import CorporateBlue from './CorporateBlue';
import MinimalWhite from './MinimalWhite';
import LuxuryGold from './LuxuryGold';
import AbstractArt from './AbstractArt';
import OrientalInk from './OrientalInk';
import ArabicGeometry from './ArabicGeometry';
import NatureGreen from './NatureGreen';
import DarkMatter from './DarkMatter';
import { InvitationProps } from './types';

// Style configuration (replaces database Style model)
export interface StyleConfig {
  key: string;
  name: string;
  previewUrl: string;
}

// All available styles with metadata
export const STYLES: StyleConfig[] = [
  // Tech Series (1-3)
  { key: 'TechFuture', name: 'Tech Future', previewUrl: '/styles/tech-future.png' },
  { key: 'CyberGrid', name: 'Cyber Grid', previewUrl: '/styles/cyber-grid.png' },
  { key: 'DigitalWave', name: 'Digital Wave', previewUrl: '/styles/digital-wave.png' },
  // Business Series (4-6)
  { key: 'Executive', name: 'Executive', previewUrl: '/styles/executive.png' },
  { key: 'CorporateBlue', name: 'Corporate Blue', previewUrl: '/styles/corporate-blue.png' },
  { key: 'MinimalWhite', name: 'Minimal White', previewUrl: '/styles/minimal-white.png' },
  // Creative Series (7-8)
  { key: 'LuxuryGold', name: 'Luxury Gold', previewUrl: '/styles/luxury-gold.png' },
  { key: 'AbstractArt', name: 'Abstract Art', previewUrl: '/styles/abstract-art.png' },
  // Regional Series (9-10)
  { key: 'OrientalInk', name: 'Oriental Ink', previewUrl: '/styles/oriental-ink.png' },
  { key: 'ArabicGeometry', name: 'Arabic Geometry', previewUrl: '/styles/arabic-geometry.png' },
  // Other Series (11-12)
  { key: 'NatureGreen', name: 'Nature Green', previewUrl: '/styles/nature-green.png' },
  { key: 'DarkMatter', name: 'Dark Matter', previewUrl: '/styles/dark-matter.png' },
];

// Template registry - maps style keys to React components
export const TEMPLATES: Record<string, React.ComponentType<InvitationProps>> = {
  'TechFuture': TechFuture,
  'CyberGrid': CyberGrid,
  'DigitalWave': DigitalWave,
  'Executive': Executive,
  'CorporateBlue': CorporateBlue,
  'MinimalWhite': MinimalWhite,
  'LuxuryGold': LuxuryGold,
  'AbstractArt': AbstractArt,
  'OrientalInk': OrientalInk,
  'ArabicGeometry': ArabicGeometry,
  'NatureGreen': NatureGreen,
  'DarkMatter': DarkMatter,
};

// Get template component by style key
export const getTemplate = (key: string): React.ComponentType<InvitationProps> => {
  return TEMPLATES[key] || TechFuture;
};

// Get all available styles
export const getAllStyles = (): StyleConfig[] => STYLES;

// Get style by key
export const getStyleByKey = (key: string): StyleConfig | undefined => {
  return STYLES.find(s => s.key === key);
};
