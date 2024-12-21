import { Theme } from '@/types/theme';

export const backgroundAnimations = {
  matrix: {
    className: 'animate-matrix-rain',
    css: `
      @keyframes matrix-rain {
        0% { background-position: 0% 0%; }
        100% { background-position: 0% 100%; }
      }
      .animate-matrix-rain {
        animation: matrix-rain 20s linear infinite;
      }
    `
  },
  cosmic: {
    className: 'animate-cosmic-drift',
    css: `
      @keyframes cosmic-drift {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
      .animate-cosmic-drift {
        animation: cosmic-drift 30s ease infinite;
      }
    `
  },
  aurora: {
    className: 'animate-aurora-waves',
    css: `
      @keyframes aurora-waves {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-aurora-waves {
        animation: aurora-waves 15s ease infinite;
      }
    `
  }
};