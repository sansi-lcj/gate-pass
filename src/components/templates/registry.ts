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
  nameZh: string;
  previewUrl: string;
}

// All available styles with metadata
export const STYLES: StyleConfig[] = [
  // Tech Series (1-3)
  { key: 'TechFuture', name: 'Tech Future', nameZh: '科技未来', previewUrl: '/styles/tech-future.png' },
  { key: 'CyberGrid', name: 'Cyber Grid', nameZh: '赛博网格', previewUrl: '/styles/cyber-grid.png' },
  { key: 'DigitalWave', name: 'Digital Wave', nameZh: '数字浪潮', previewUrl: '/styles/digital-wave.png' },
  // Business Series (4-6)
  { key: 'Executive', name: 'Executive', nameZh: '行政精英', previewUrl: '/styles/executive.png' },
  { key: 'CorporateBlue', name: 'Corporate Blue', nameZh: '商务蓝调', previewUrl: '/styles/corporate-blue.png' },
  { key: 'MinimalWhite', name: 'Minimal White', nameZh: '极简白', previewUrl: '/styles/minimal-white.png' },
  // Creative Series (7-8)
  { key: 'LuxuryGold', name: 'Luxury Gold', nameZh: '奢华金', previewUrl: '/styles/luxury-gold.png' },
  { key: 'AbstractArt', name: 'Abstract Art', nameZh: '抽象艺术', previewUrl: '/styles/abstract-art.png' },
  // Regional Series (9-10)
  { key: 'OrientalInk', name: 'Oriental Ink', nameZh: '东方水墨', previewUrl: '/styles/oriental-ink.png' },
  { key: 'ArabicGeometry', name: 'Arabic Geometry', nameZh: '阿拉伯几何', previewUrl: '/styles/arabic-geometry.png' },
  // Other Series (11-12)
  { key: 'NatureGreen', name: 'Nature Green', nameZh: '自然绿', previewUrl: '/styles/nature-green.png' },
  { key: 'DarkMatter', name: 'Dark Matter', nameZh: '暗物质', previewUrl: '/styles/dark-matter.png' },
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
