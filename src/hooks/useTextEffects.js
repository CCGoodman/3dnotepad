import { useState } from 'react';
export function useTextEffects() {
    const [effects, setEffects] = useState([]);
    const addEffect = (effect) => {
        setEffects(prev => [...prev, effect]);
    };
    const removeEffect = (start, end) => {
        setEffects(prev => prev.filter(effect => !(effect.start === start && effect.end === end)));
    };
    const getEffectForPosition = (position) => {
        return effects.find(effect => position >= effect.start && position < effect.end);
    };
    return {
        effects,
        addEffect,
        removeEffect,
        getEffectForPosition
    };
}
