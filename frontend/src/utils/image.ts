interface OptimizeImageOptions {
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * Optimiza una URL de imagen agregando parámetros de compresión
 * @param url URL de la imagen original
 * @param options Opciones de optimización (width, height, quality)
 * @returns URL optimizada con parámetros de compresión
 */
export function optimizeImageUrl(
  url: string,
  options: OptimizeImageOptions = {}
): string {
  if (!url || url.includes('placeholder')) {
    return url;
  }

  const { width = 800, height = 600, quality = 80 } = options;

  const params = new URLSearchParams({
    auto: 'compress',
    cs: 'tinysrgb',
    w: width.toString(),
    h: height.toString(),
    q: quality.toString(),
  });

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}
