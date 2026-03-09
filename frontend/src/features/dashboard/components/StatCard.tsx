import { memo } from 'react';
import {
  Card, Text, Stack, Box,
} from '@mantine/core';
import classes from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
}

export const StatCard = memo(({ label, value, trend }: StatCardProps) => (
  <Card withBorder className={classes['card']}>
    <Stack gap="xs">
      <Text size="xs" fw={500} lts="0.04em" c="dimmed">{label}</Text>
      <Text className={classes['value']}>{value}</Text>
      <Box className={classes['trend']}>
        <Box className={classes['dot']} />
        <Text size="xs">{trend}</Text>
      </Box>
    </Stack>
  </Card>
));
