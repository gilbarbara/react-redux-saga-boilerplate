vi.mock('react-inlinesvg', async importOriginal => {
  const reactInlinesvg = await importOriginal<typeof import('react-inlinesvg')>();

  return {
    ...reactInlinesvg,
    default: (props: any) => <svg {...props} />,
  };
});
