import { memo } from 'react';
import {
  Card, Group, Text, ThemeIcon, Box,
} from '@mantine/core';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  subtitle?: string;
}

/** Single stat card with icon, label, and value. */
export const StatCard = memo(({
  icon, label, value, color, subtitle,
}: StatCardProps) => (
  <Card withBorder>
    <Group gap="md" wrap="nowrap">
      <ThemeIcon size="lg" radius="md" variant="light" color={color}>
        {icon}
      </ThemeIcon>
      <Box>
        <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
          {label}
        </Text>
        <Text size="xl" fw={700}>{value}</Text>
        {subtitle ? (
          <Text size="xs" c="dimmed">{subtitle}</Text>
        ) : null}
      </Box>
    </Group>
  </Card>
));
