import React from 'react';
import { cn } from '../../utils/cn';
import { Menu, X } from 'lucide-react';
import { Icon } from '../../icons/Icon';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  items?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
  }>;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      brand,
      items = [],
      mobileMenuOpen = false,
      onMobileMenuToggle,
      ...props
    },
    ref,
  ) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700',
          className,
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            {brand && (
              <div className="flex-shrink-0 flex items-center">
                {brand}
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {items.map((item, index) => {
                  const content = (
                    <span
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        item.active
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100',
                      )}
                    >
                      {item.label}
                    </span>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={index}
                        href={item.href}
                        onClick={item.onClick}
                        className="block"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={item.onClick}
                      className="block"
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            {onMobileMenuToggle && (
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={onMobileMenuToggle}
                  className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle navigation menu"
                >
                  <Icon
                    icon={mobileMenuOpen ? X : Menu}
                    size="md"
                    aria-hidden={true}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200 dark:border-neutral-700">
              {items.map((item, index) => {
                const content = (
                  <span
                    className={cn(
                      'block px-3 py-2 rounded-md text-base font-medium',
                      item.active
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100',
                    )}
                  >
                    {item.label}
                  </span>
                );

                if (item.href) {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      onClick={item.onClick}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={item.onClick}
                    className="w-full text-left"
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    );
  },
);

Navbar.displayName = 'Navbar';

