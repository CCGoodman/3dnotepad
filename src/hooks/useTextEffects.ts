import { useState } from 'react';

export interface TextEffect {
  start: number;
  end: number;
  type: 'glow';
  color?: string;
}

export function useTextEffects() {
  const [effects, setEffects] = useState<TextEffect[]>([]);

  const addEffect = (effect: TextEffect) => {
    setEffects(prev => [...prev, effect]);
  };

  const removeEffect = (start: number, end: number) => {
    setEffects(prev => prev.filter(effect => 
      !(effect.start === start && effect.end === end)
    ));
  };

  const getEffectForPosition = (position: number) => {
    return effects.find(effect => 
      position >= effect.start && position < effect.end
    );
  };

  return {
    effects,
    addEffect,
    removeEffect,
    getEffectForPosition
  };
}