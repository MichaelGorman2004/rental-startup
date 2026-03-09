import { useMemo } from 'react';
import {
  Container, Stack, Title, Text, SimpleGrid, Card, ThemeIcon, Group,
} from '@mantine/core';
import {
  MagnifyingGlass, CalendarCheck, Confetti,
} from '@phosphor-icons/react';
import {
  HOW_IT_WORKS_TITLE, HOW_IT_WORKS_SUBTITLE, HOW_IT_WORKS_STEPS,
} from '../constants/landing.constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import type { HowItWorksStep } from '../types/landing.types';
import classes from './HowItWorks.module.css';

const ICON_MAP = { MagnifyingGlass, CalendarCheck, Confetti } as const;

function StepNumber({ step, isVisible }: { step: number; isVisible: boolean }) {
  const count = useAnimatedCounter(step, isVisible);
  return <Text className={classes['stepNumber']}>{count}</Text>;
}

interface StepCardProps {
  step: HowItWorksStep;
  index: number;
  isVisible: boolean;
}

function StepCard({ step, index, isVisible }: StepCardProps) {
  const Icon = ICON_MAP[step.icon];
  const delay = useMemo(() => `${index * 150}ms`, [index]);

  return (
    <Card
      className={classes['card']}
      style={{ animationDelay: isVisible ? delay : '0ms' }}
      data-visible={isVisible || undefined}
    >
      <Stack gap="md" align="center" ta="center">
        <StepNumber step={index + 1} isVisible={isVisible} />
        <ThemeIcon size={48} radius="xl" variant="light" color="copper">
          <Icon size="1.4rem" />
        </ThemeIcon>
        <Text fw={600} size="lg">{step.title}</Text>
        <Text size="sm" c="dimmed" lh={1.6}>{step.description}</Text>
      </Stack>
    </Card>
  );
}

/** "How It Works" 3-step explainer with scroll-triggered animation. */
export function HowItWorks() {
  const { isVisible, ref } = useScrollAnimation();

  return (
    <Container size="lg" py={80} ref={ref}>
      <Stack gap="xl" align="center">
        <Group gap="md" align="center">
          <Title order={2} ta="center">{HOW_IT_WORKS_TITLE}</Title>
        </Group>
        <Text c="dimmed" ta="center" maw={480}>{HOW_IT_WORKS_SUBTITLE}</Text>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="lg">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} isVisible={isVisible} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
