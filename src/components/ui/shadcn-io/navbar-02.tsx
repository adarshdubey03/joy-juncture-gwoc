'use client';

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width='1em' height='1em' viewBox='0 0 324 323' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...(props as any)}>
            <rect
                x='88.1023'
                y='144.792'
                width='151.802'
                height='36.5788'
                rx='18.2894'
                transform='rotate(-38.5799 88.1023 144.792)'
                fill='currentColor'
            />
            <rect
                x='85.3459'
                y='244.537'
                width='151.802'
                height='36.5788'
                rx='18.2894'
                transform='rotate(-38.5799 85.3459 244.537)'
                fill='currentColor'
            />
        </svg>
    );
};

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
    <svg
        className={cn('pointer-events-none', className)}
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        {...(props as any)}
    >
        <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
    </svg>
);

// Types
export interface Navbar02NavItem {
    href?: string;
    label: string;
    submenu?: boolean;
    type?: 'description' | 'simple' | 'icon';
    items?: Array<{
        href: string;
        label: string;
        description?: string;
        icon?: string;
    }>;
}

export interface Navbar02Props extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode;
    logoHref?: string;
    navigationLinks?: Navbar02NavItem[];
    signInText?: string;
    signInHref?: string;
    ctaText?: string;
    ctaHref?: string;
    onSignInClick?: () => void;
    onCtaClick?: () => void;
}

// Default navigation links
const defaultNavigationLinks: Navbar02NavItem[] = [
    { href: '/', label: 'Home' },
    {
        label: 'Shop',
        submenu: true,
        type: 'simple',
        items: [
            { label: "All Games", href: "/shop/all-games" },
            { label: "By Occasion", href: "/shop/by-occasion" },
            { label: "By Players", href: "/shop/by-players" },
            { label: "By Mood / Vibe", href: "/shop/by-mood" },
        ],
    },
    {
        label: 'Experiences',
        submenu: true,
        type: 'simple',
        items: [
            { label: "Corporate Engagement", href: "/experiences/corporate" },
            { label: "Weddings", href: "/experiences/weddings" },
            { label: "Birthdays / Anniversaries", href: "/experiences/birthdays" },
            { label: "Carnivals / Game zones", href: "/experiences/carnivals" },
        ],
    },
    {
        label: 'Play',
        submenu: true,
        type: 'simple',
        items: [
            { label: "The Showdown", href: "/play/showdown" },
            { label: "Free Online Games", href: "/play/free-games" },
            { label: "How JJ Games Work", href: "/play/how-it-works" },
        ],
    },
    {
        label: 'Events',
        submenu: true,
        type: 'simple',
        items: [
            { label: "Upcoming Game Nights", href: "/events/upcoming" },
            { label: "Past Events", href: "/events/past" },
        ],
    },
    {
        label: 'Community',
        submenu: true,
        type: 'simple',
        items: [
            { label: "Blog", href: "/community/blog" },
            { label: "Wallet & Points", href: "/community/wallet" },
            { label: "About us", href: "/community/about" },
        ],
    },
];

export const Navbar02 = React.forwardRef<HTMLElement, Navbar02Props>(
    (
        {
            className,
            logo = <Logo />,
            logoHref = '#',
            navigationLinks = defaultNavigationLinks,
            signInText = 'Sign In',
            signInHref = '#signin',
            ctaText = 'Get Started',
            ctaHref = '#get-started',
            onSignInClick,
            onCtaClick,
            ...props
        },
        ref
    ) => {
        const [isMobile, setIsMobile] = useState(false);
        const containerRef = useRef<HTMLElement>(null);

        useEffect(() => {
            const checkWidth = () => {
                if (containerRef.current) {
                    const width = containerRef.current.offsetWidth;
                    setIsMobile(width < 768); // 768px is md breakpoint
                }
            };

            checkWidth();

            const resizeObserver = new ResizeObserver(checkWidth);
            if (containerRef.current) {
                resizeObserver.observe(containerRef.current);
            }

            return () => {
                resizeObserver.disconnect();
            };
        }, []);

        // Combine refs
        const combinedRef = React.useCallback((node: HTMLElement | null) => {
            containerRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        }, [ref]);

        const renderIcon = (iconName: string) => {
            switch (iconName) {
                case 'BookOpenIcon':
                    return <BookOpenIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
                case 'LifeBuoyIcon':
                    return <LifeBuoyIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
                case 'InfoIcon':
                    return <InfoIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
                default:
                    return null;
            }
        };

        return (
            <header
                ref={combinedRef}
                className={cn(
                    'sticky top-0 z-50 w-full border-b bg-white px-4 md:px-6 [&_*]:no-underline',
                    className
                )}
                {...(props as any)}
            >
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                        {/* Mobile menu trigger */}
                        {isMobile && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <HamburgerIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-64 p-1">
                                    <NavigationMenu className="max-w-none">
                                        <NavigationMenuList className="flex-col items-start gap-0">
                                            {navigationLinks.map((link, index) => (
                                                <NavigationMenuItem key={index} className="w-full">
                                                    {link.submenu ? (
                                                        <>
                                                            <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                                                                {link.label}
                                                            </div>
                                                            <ul>
                                                                {link.items?.map((item, itemIndex) => (
                                                                    <li key={itemIndex}>
                                                                        <Link
                                                                            href={item.href}
                                                                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                                                                        >
                                                                            {item.label}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    ) : (
                                                        <Link
                                                            href={link.href || "#"}
                                                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    )}
                                                    {/* Add separator between different types of items */}
                                                    {index < navigationLinks.length - 1 &&
                                                        ((!link.submenu && navigationLinks[index + 1].submenu) ||
                                                            (link.submenu && !navigationLinks[index + 1].submenu) ||
                                                            (link.submenu &&
                                                                navigationLinks[index + 1].submenu &&
                                                                link.type !== navigationLinks[index + 1].type)) && (
                                                            <div
                                                                role="separator"
                                                                aria-orientation="horizontal"
                                                                className="bg-border -mx-1 my-1 h-px w-full"
                                                            />
                                                        )}
                                                </NavigationMenuItem>
                                            ))}
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </PopoverContent>
                            </Popover>
                        )}
                        {/* Main nav */}
                        <div className="flex items-center gap-6">
                            <Link
                                href={logoHref}
                                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                            >
                                <div className="text-2xl">
                                    {logo}
                                </div>
                                <span className="hidden font-bold text-xl sm:inline-block tracking-tighter">JOY JUNCTURE</span>
                            </Link>
                            {/* Navigation menu */}
                            {!isMobile && (
                                <NavigationMenu className="flex">
                                    <NavigationMenuList className="gap-1">
                                        {navigationLinks.map((link, index) => (
                                            <NavigationMenuItem key={index}>
                                                {link.submenu ? (
                                                    <>
                                                        <NavigationMenuTrigger>
                                                            {link.label}
                                                        </NavigationMenuTrigger>
                                                        <NavigationMenuContent>
                                                            {link.type === 'description' && link.label === 'Features' ? (
                                                                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                                    <div className="row-span-3">
                                                                        <NavigationMenuLink asChild>
                                                                            <Link
                                                                                href="/"
                                                                                className="flex h-full w-full select-none flex-col justify-center items-center text-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                                                                            >\n                                    <div className="mb-3 text-xl font-medium">
                                                                                    JOY JUNCTURE
                                                                                </div>
                                                                                <p className="text-sm leading-tight text-muted-foreground">
                                                                                    Moments of Joy, One Game at a Time.
                                                                                </p>
                                                                            </Link>
                                                                        </NavigationMenuLink>
                                                                    </div>
                                                                    {link.items?.map((item, itemIndex) => (
                                                                        <ListItem
                                                                            key={itemIndex}
                                                                            title={item.label}
                                                                            href={item.href}
                                                                            type={link.type}
                                                                        >
                                                                            {item.description}
                                                                        </ListItem>
                                                                    ))}
                                                                </div>
                                                            ) : link.type === 'simple' ? (
                                                                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                                    {link.items?.map((item, itemIndex) => (
                                                                        <ListItem
                                                                            key={itemIndex}
                                                                            title={item.label}
                                                                            href={item.href}
                                                                            type={link.type}
                                                                        >
                                                                            {item.description}
                                                                        </ListItem>
                                                                    ))}
                                                                </div>
                                                            ) : link.type === 'icon' ? (
                                                                <div className="grid w-[400px] gap-3 p-4">
                                                                    {link.items?.map((item, itemIndex) => (
                                                                        <ListItem
                                                                            key={itemIndex}
                                                                            title={item.label}
                                                                            href={item.href}
                                                                            icon={item.icon}
                                                                            type={link.type}
                                                                        >
                                                                            {item.description}
                                                                        </ListItem>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="grid gap-3 p-4">
                                                                    {link.items?.map((item, itemIndex) => (
                                                                        <ListItem
                                                                            key={itemIndex}
                                                                            title={item.label}
                                                                            href={item.href}
                                                                            type={link.type}
                                                                        >
                                                                            {item.description}
                                                                        </ListItem>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </NavigationMenuContent>
                                                    </>
                                                ) : (
                                                    <NavigationMenuLink
                                                        className={cn(navigationMenuTriggerStyle(), 'cursor-pointer')}
                                                        asChild
                                                    >
                                                        <Link href={link.href || "#"}>
                                                            {link.label}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                )}
                                            </NavigationMenuItem>
                                        ))}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            )}
                        </div>
                    </div>
                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onSignInClick) onSignInClick();
                            }}
                        >
                            {signInText}
                        </Button>
                        <Button
                            size="sm"
                            className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onCtaClick) onCtaClick();
                            }}
                        >
                            {ctaText}
                        </Button>
                    </div>
                </div>
            </header>
        );
    }
);

Navbar02.displayName = 'Navbar02';

// ListItem component for navigation menu items
const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'> & {
        title: string;
        href?: string;
        icon?: string;
        type?: 'description' | 'simple' | 'icon';
        children?: React.ReactNode;
    }
>(({ className, title, children, icon, type, ...props }, ref) => {
    const renderIconComponent = (iconName?: string) => {
        if (!iconName) return null;
        switch (iconName) {
            case 'BookOpenIcon':
                return <BookOpenIcon className="h-5 w-5" />;
            case 'LifeBuoyIcon':
                return <LifeBuoyIcon className="h-5 w-5" />;
            case 'InfoIcon':
                return <InfoIcon className="h-5 w-5" />;
            default:
                return null;
        }
    };

    return (
        <NavigationMenuLink asChild>
            <Link
                href={props.href || "#"}
                ref={ref}
                className={cn(
                    'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer',
                    className
                )}
                {...props}
            >
                {type === 'icon' && icon ? (
                    <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                            {renderIconComponent(icon)}
                        </div>
                        <div className="space-y-1">
                            <div className="text-base font-medium leading-tight">{title}</div>
                            {children && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {children}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-base font-medium leading-none">{title}</div>
                        {children && (
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {children}
                            </p>
                        )}
                    </>
                )}
            </Link>
        </NavigationMenuLink>
    );
});
ListItem.displayName = 'ListItem';

export { Logo, HamburgerIcon };
