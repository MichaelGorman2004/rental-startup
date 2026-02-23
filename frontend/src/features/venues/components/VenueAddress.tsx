import { memo, useMemo } from 'react';
import {
  Card, Group, Text, Anchor, ThemeIcon,
} from '@mantine/core';
import { IconMapPin, IconExternalLink } from '@tabler/icons-react';
import { VENUE_DETAIL_MESSAGES } from '../constants/venue-defaults';
import { formatAddress } from '../utils/format-address';
import { buildMapsUrl } from '../utils/build-maps-url';

interface VenueAddressProps {
  street: string;
  city: string;
  state: string;
  zip: string;
}

/** Address card with formatted address and Google Maps link. */
export const VenueAddress = memo(({
  street, city, state, zip,
}: VenueAddressProps) => {
  const mapsUrl = useMemo(
    () => buildMapsUrl(street, city, state, zip),
    [street, city, state, zip],
  );

  return (
    <Card withBorder>
      <Group justify="space-between" align="flex-start">
        <Group gap="md">
          <ThemeIcon size="lg" radius="md" variant="light" color="gray">
            <IconMapPin size="1.25rem" stroke={1.5} />
          </ThemeIcon>
          <div>
            <Text size="sm" c="dimmed">{VENUE_DETAIL_MESSAGES.ADDRESS_LABEL}</Text>
            <Text fw={500}>{formatAddress(street, city, state)}</Text>
            <Text size="sm" c="dimmed">{zip}</Text>
          </div>
        </Group>
        <Anchor
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          aria-label={VENUE_DETAIL_MESSAGES.OPEN_IN_MAPS}
        >
          <Group gap="xs">
            <IconExternalLink size="0.875rem" stroke={1.5} />
            {VENUE_DETAIL_MESSAGES.OPEN_IN_MAPS}
          </Group>
        </Anchor>
      </Group>
    </Card>
  );
});
