import { renderHook, act } from '@testing-library/react';
import { useToggle } from '@/shared/hooks/useToggle';

describe('useToggle', () => {
  it('inicializa en false por defecto y alterna', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });

  it('acepta estado inicial y setState', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
    act(() => result.current[2](false));
    expect(result.current[0]).toBe(false);
  });
});
