import { memo } from 'react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

/** Reusable breadcrumb navigation. Last item renders as plain text (current page). */
export const Breadcrumbs = memo(({ items }: BreadcrumbsProps) => (
  <MantineBreadcrumbs>
    {items.map((item) => (
      item.href
        ? (
          <Anchor key={item.href} component={Link} to={item.href} size="sm">
            {item.label}
          </Anchor>
        )
        : <Text key={item.label} size="sm" c="dimmed">{item.label}</Text>
    ))}
  </MantineBreadcrumbs>
));
