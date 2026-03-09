import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  Paper,
  TextInput,
  Textarea,
  Radio,
  Group,
  Button,
  Anchor,
  ThemeIcon,
} from '@mantine/core';
import { Check, EnvelopeSimple } from '@phosphor-icons/react';
import { LandingHeader } from '../../landing/components/LandingHeader';
import { useInterestForm } from '../hooks/useInterestForm';
import { PRERELEASE_MESSAGES } from '../constants/prerelease.constants';
import classes from './InterestPage.module.css';

/** Public prerelease interest page. */
export function InterestPage() {
  const {
    form, handleSubmit, isSubmitting, isSuccess,
  } = useInterestForm();

  const orgLabel = form.values.respondentType === 'venue'
    ? PRERELEASE_MESSAGES.FORM_ORG_LABEL_VENUE
    : PRERELEASE_MESSAGES.FORM_ORG_LABEL_STUDENT;

  if (isSuccess) {
    return (
      <>
        <LandingHeader />
        <Box bg="var(--vl-bg-deep)" mih="100vh">
          <Container size="sm" py="xl" mt={64}>
            <Paper p="xl" radius="md" className={classes['successCard']}>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" color="green" variant="light">
                  <Check size={32} weight="bold" />
                </ThemeIcon>
                <Title order={2}>Thank You!</Title>
                <Text c="dimmed" ta="center">
                  {PRERELEASE_MESSAGES.SUBMIT_SUCCESS}
                </Text>
              </Stack>
            </Paper>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <LandingHeader />
      <Box bg="var(--vl-bg-deep)" mih="100vh">
        <Container size="md" py="xl" mt={64}>
          <Stack gap="xl">
            {/* Description Section */}
            <Paper p="xl" radius="md">
              <Stack gap="md">
                <Title order={2}>{PRERELEASE_MESSAGES.DESCRIPTION_TITLE}</Title>
                <Text>{PRERELEASE_MESSAGES.DESCRIPTION_BODY}</Text>
                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    {PRERELEASE_MESSAGES.BENEFITS_ORGS}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {PRERELEASE_MESSAGES.BENEFITS_VENUES}
                  </Text>
                </Stack>
                <Text size="sm" fw={600} c="copper.4">
                  {PRERELEASE_MESSAGES.LAUNCH_INFO}
                </Text>
                <Group gap="xs">
                  <EnvelopeSimple size={16} />
                  <Text size="sm">{PRERELEASE_MESSAGES.CONTACT_INFO}</Text>
                  <Anchor
                    href={`mailto:${PRERELEASE_MESSAGES.CONTACT_EMAIL}`}
                    size="sm"
                  >
                    {PRERELEASE_MESSAGES.CONTACT_EMAIL}
                  </Anchor>
                </Group>
              </Stack>
            </Paper>

            {/* Form Section */}
            <Paper p="xl" radius="md">
              <form onSubmit={handleSubmit}>
                <Stack gap="md">
                  <Title order={3}>{PRERELEASE_MESSAGES.FORM_TITLE}</Title>

                  <Group grow>
                    <TextInput
                      label={PRERELEASE_MESSAGES.FORM_FIRST_NAME}
                      required
                      {...form.getInputProps('firstName')}
                    />
                    <TextInput
                      label={PRERELEASE_MESSAGES.FORM_LAST_NAME}
                      required
                      {...form.getInputProps('lastName')}
                    />
                  </Group>

                  <Radio.Group
                    label={PRERELEASE_MESSAGES.FORM_RESPONDENT_TYPE}
                    required
                    {...form.getInputProps('respondentType')}
                  >
                    <Group mt="xs">
                      <Radio
                        value="student_org"
                        label={PRERELEASE_MESSAGES.TYPE_STUDENT_ORG}
                      />
                      <Radio
                        value="venue"
                        label={PRERELEASE_MESSAGES.TYPE_VENUE}
                      />
                    </Group>
                  </Radio.Group>

                  <TextInput
                    label={orgLabel}
                    required
                    {...form.getInputProps('orgOrVenueName')}
                  />

                  <TextInput
                    label={PRERELEASE_MESSAGES.FORM_EMAIL}
                    type="email"
                    required
                    {...form.getInputProps('email')}
                  />

                  <TextInput
                    label={PRERELEASE_MESSAGES.FORM_PHONE}
                    {...form.getInputProps('phone')}
                  />

                  <Textarea
                    label={PRERELEASE_MESSAGES.FORM_NOTE}
                    placeholder={PRERELEASE_MESSAGES.FORM_NOTE_PLACEHOLDER}
                    minRows={3}
                    {...form.getInputProps('personalNote')}
                  />

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                    mt="md"
                  >
                    {PRERELEASE_MESSAGES.SUBMIT_BUTTON}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
