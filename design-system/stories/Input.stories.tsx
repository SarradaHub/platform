import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/Input';
import { Search, Mail } from 'lucide-react';
import { Icon } from '../src/icons/Icon';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: 'Please enter a valid email address',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: <Icon icon={Search} size="sm" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    rightIcon: <Icon icon={Mail} size="sm" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Name',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

