import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import {
  Card, Stack, Text, Button, Title,
} from '@mantine/core';

const ERROR_BOUNDARY_MESSAGES = {
  TITLE: 'Something went wrong',
  DESCRIPTION: 'An unexpected error occurred. Please try again.',
  RETRY_BUTTON: 'Try Again',
} as const;

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Reusable error boundary that catches render errors and shows a Mantine UI fallback. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  override render(): ReactNode {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (!hasError) {
      return children;
    }

    if (fallback) {
      return fallback;
    }

    return (
      <Card withBorder p="xl" m="md" radius="md">
        <Stack align="center" gap="md">
          <Title order={3}>{ERROR_BOUNDARY_MESSAGES.TITLE}</Title>
          <Text c="dimmed" ta="center">
            {ERROR_BOUNDARY_MESSAGES.DESCRIPTION}
          </Text>
          <Button
            onClick={this.handleRetry}
            variant="light"
            aria-label={ERROR_BOUNDARY_MESSAGES.RETRY_BUTTON}
          >
            {ERROR_BOUNDARY_MESSAGES.RETRY_BUTTON}
          </Button>
        </Stack>
      </Card>
    );
  }
}
