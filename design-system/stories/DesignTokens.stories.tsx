import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '../src/tokens';

const meta: Meta = {
  title: 'Foundations/Design Tokens',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Primary Colors</h2>
        <div className="grid grid-cols-11 gap-2">
          {Object.entries(tokens.colors.primary).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="h-16 rounded-lg mb-2 border border-neutral-200"
                style={{ backgroundColor: value }}
              />
              <div className="text-xs font-medium">{key}</div>
              <div className="text-xs text-neutral-500">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Semantic Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          {(['success', 'warning', 'error', 'info'] as const).map((semantic) => (
            <div key={semantic}>
              <h3 className="text-lg font-semibold mb-2 capitalize">{semantic}</h3>
              <div className="space-y-2">
                <div>
                  <div
                    className="h-12 rounded-lg mb-1 border border-neutral-200"
                    style={{ backgroundColor: tokens.colors[semantic][500] }}
                  />
                  <div className="text-xs">{tokens.colors[semantic][500]}</div>
                </div>
                <div>
                  <div
                    className="h-12 rounded-lg mb-1 border border-neutral-200"
                    style={{ backgroundColor: tokens.colors[semantic][600] }}
                  />
                  <div className="text-xs">{tokens.colors[semantic][600]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Headings</h2>
        <div className="space-y-4">
          {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((heading) => {
            const styles = tokens.typography.headings[heading];
            return (
              <div key={heading}>
                <div
                  style={{
                    fontSize: styles.fontSize,
                    lineHeight: styles.lineHeight,
                    fontWeight: styles.fontWeight,
                    letterSpacing: styles.letterSpacing,
                  }}
                >
                  {heading.toUpperCase()} - The quick brown fox jumps over the lazy dog
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Body Text</h2>
        <div className="space-y-4">
          {(['large', 'base', 'small'] as const).map((size) => {
            const styles = tokens.typography.body[size];
            return (
              <div key={size}>
                <div
                  style={{
                    fontSize: styles.fontSize,
                    lineHeight: styles.lineHeight,
                    fontWeight: styles.fontWeight,
                  }}
                >
                  Body {size} - The quick brown fox jumps over the lazy dog
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Spacing Scale</h2>
      <div className="space-y-4">
        {Object.entries(tokens.spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <div className="w-20 text-sm font-medium">{key}</div>
            <div
              className="bg-primary-500 h-8"
              style={{ width: value }}
            />
            <div className="text-sm text-neutral-600">{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

