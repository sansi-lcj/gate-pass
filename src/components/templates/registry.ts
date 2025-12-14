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

// Template registry - maps component names from database to React components
export const TEMPLATES: Record<string, React.ComponentType<InvitationProps>> = {
  // Tech Series (1-3)
  'TechFuture': TechFuture,
  'CyberGrid': CyberGrid,
  'DigitalWave': DigitalWave,
  // Business Series (4-6)
  'Executive': Executive,
  'CorporateBlue': CorporateBlue,
  'MinimalWhite': MinimalWhite,
  // Creative Series (7-8)
  'LuxuryGold': LuxuryGold,
  'AbstractArt': AbstractArt,
  // Regional Series (9-10)
  'OrientalInk': OrientalInk,
  'ArabicGeometry': ArabicGeometry,
  // Other Series (11-12)
  'NatureGreen': NatureGreen,
  'DarkMatter': DarkMatter,
};

export const getTemplate = (name: string): React.ComponentType<InvitationProps> => {
  return TEMPLATES[name] || TechFuture;
};


