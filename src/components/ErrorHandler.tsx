import { Button, Container, Icon, Paragraph } from '@gilbarbara/components';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorHandler({ error, resetErrorBoundary }: Props) {
  const handleClickReset = () => {
    resetErrorBoundary();
  };

  return (
    <Container data-component-name="ErrorHandler" fullScreen>
      <Icon name="danger-o" size={64} />
      <Paragraph my="md">{error.message}</Paragraph>

      <Button bg="red" onClick={handleClickReset}>
        Tentar novamente
      </Button>
    </Container>
  );
}
