import { useMemo } from 'react';
import {
  Container, Stack, Title, Text, SimpleGrid, Card, ThemeIcon, Grid, Box,
} from '@mantine/core';
import {
  MagnifyingGlass, Buildings, CurrencyDollar,
  ChartLineUp, MegaphoneSimple, CalendarBlank,
} from '@phosphor-icons/react';
import {
  STUDENT_ORG_TITLE, STUDENT_ORG_SUBTITLE, STUDENT_ORG_PROPS,
  VENUE_OWNER_TITLE, VENUE_OWNER_SUBTITLE, VENUE_OWNER_PROPS,
} from '../constants/landing.constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { ValueProp } from '../types/landing.types';
import classes from './ValueProps.module.css';

const ICON_MAP = {
  MagnifyingGlass,
  Buildings,
  CurrencyDollar,
  ChartLineUp,
  MegaphoneSimple,
  CalendarBlank,
} as const;

interface PropCardProps {
  prop: ValueProp;
  index: number;
  isVisible: boolean;
}

function PropCard({ prop, index, isVisible }: PropCardProps) {
  const Icon = ICON_MAP[prop.icon];
  const delay = useMemo(() => `${index * 120}ms`, [index]);

  return (
    <Card
      className={classes['card']}
      data-visible={isVisible || undefined}
      style={{ animationDelay: isVisible ? delay : '0ms' }}
    >
      <Stack gap="sm">
        <ThemeIcon size={40} radius="md" variant="light" color="copper">
          <Icon size="1.2rem" />
        </ThemeIcon>
        <Text fw={600}>{prop.title}</Text>
        <Text size="sm" c="dimmed" lh={1.6}>{prop.description}</Text>
      </Stack>
    </Card>
  );
}

interface PropColumnProps {
  title: string;
  subtitle: string;
  items: readonly ValueProp[];
  isVisible: boolean;
}

function PropColumn({
  title, subtitle, items, isVisible,
}: PropColumnProps) {
  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Title order={3}>{title}</Title>
        <Text size="sm" c="dimmed">{subtitle}</Text>
      </Stack>
      <SimpleGrid cols={1} spacing="md">
        {items.map((item, i) => (
          <PropCard key={item.title} prop={item} index={i} isVisible={isVisible} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

/** Two-column value proposition section for student orgs and venue owners. */
export function ValueProps() {
  const { isVisible, ref } = useScrollAnimation();

  return (
    <Box className={classes['section']}>
      <Container size="lg" py={80} ref={ref}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PropColumn
              title={STUDENT_ORG_TITLE}
              subtitle={STUDENT_ORG_SUBTITLE}
              items={STUDENT_ORG_PROPS}
              isVisible={isVisible}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PropColumn
              title={VENUE_OWNER_TITLE}
              subtitle={VENUE_OWNER_SUBTITLE}
              items={VENUE_OWNER_PROPS}
              isVisible={isVisible}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
