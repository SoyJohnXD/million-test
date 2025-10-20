interface OptimizeImageOptions {
  width?: number;
  height?: number;
  quality?: number;
}

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
