import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/shared/hooks/useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('devuelve el valor inicial inmediatamente y actualiza tras el delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'a', delay: 500 },
      }
    );

    expect(result.current).toBe('a');

    rerender({ value: 'ab', delay: 500 });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('ab');
  });
});
