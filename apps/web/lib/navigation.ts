export function getSection(path: string | undefined) {
  if (!path) return 'protocol';
  const [dir] = path.split('/', 1);
  if (!dir) return 'protocol';
  return (
    {
      ui: 'ui',
      mdx: 'mdx',
      cli: 'cli',
      headless: 'headless',
    }[dir] ?? 'protocol'
  );
}