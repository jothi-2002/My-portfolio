import { StackLayer } from '../data/portfolio.models';

/**
 * Class names per stack layer. Written out in full (not interpolated) so Tailwind can detect them.
 */
export interface LayerStyle {
  readonly label: string;
  readonly text: string;
  readonly softBg: string;
  readonly dot: string;
  readonly border: string;
}

export const LAYER_STYLES: Readonly<Record<StackLayer, LayerStyle>> = {
  core: {
    label: 'Full stack',
    text: 'text-brand',
    softBg: 'bg-brand/10',
    dot: 'bg-brand',
    border: 'border-brand/40',
  },
  ui: {
    label: 'Frontend',
    text: 'text-ui',
    softBg: 'bg-ui/10',
    dot: 'bg-ui',
    border: 'border-ui/40',
  },
  api: {
    label: 'Backend',
    text: 'text-api',
    softBg: 'bg-api/10',
    dot: 'bg-api',
    border: 'border-api/40',
  },
  data: {
    label: 'Database',
    text: 'text-data',
    softBg: 'bg-data/10',
    dot: 'bg-data',
    border: 'border-data/40',
  },
  security: {
    label: 'Security',
    text: 'text-security',
    softBg: 'bg-security/10',
    dot: 'bg-security',
    border: 'border-security/40',
  },
  ops: {
    label: 'Delivery',
    text: 'text-ops',
    softBg: 'bg-ops/10',
    dot: 'bg-ops',
    border: 'border-ops/40',
  },
};
