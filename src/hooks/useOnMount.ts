import type { EffectCallback } from 'react';
import { useEffect } from 'react';

export function useOnMount(effect: EffectCallback) {
  useEffect(effect, []); // eslint-disable-line react-hooks/exhaustive-deps
}
