import { renderHook, act } from '@testing-library/react';
import { useIsDesktop } from '../hooks/useIsDesktop';

describe('useIsDesktop', () => {
  const resizeWindow = (width) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
  };

  test('should return true if window width is greater than 1080', () => {
    resizeWindow(1200);
    
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current.isDesktop).toBe(true);
  });

  test('should return false if window width is less than or equal to 1080', () => {
    resizeWindow(1080);
    
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current.isDesktop).toBe(false);
  });

  test('should update isDesktop when window is resized', () => {
    const { result } = renderHook(() => useIsDesktop());
    
    act(() => {
      resizeWindow(1200);
    });
    expect(result.current.isDesktop).toBe(true);
    
    act(() => {
      resizeWindow(800);
    });
    expect(result.current.isDesktop).toBe(false);
  });
});