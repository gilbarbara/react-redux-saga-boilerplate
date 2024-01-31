function Helmet() {
  return <div>Helmet</div>;
}

vi.mock('react-helmet-async', async importOriginal => {
  const reactHelmetAsync = await importOriginal<typeof import('react-helmet-async')>();

  return {
    ...reactHelmetAsync,
    Helmet,
  };
});
