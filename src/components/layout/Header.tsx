
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Bell, HandHelping, PlusCircle, Sparkles, Menu, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/browse', label: 'Browse', icon: HandHelping },
  { href: '/donate', label: 'Donate', icon: PlusCircle },
  { href: '/smart-matching', label: 'Smart Matching', icon: Sparkles },
  { href: '/volunteer', label: 'Volunteer', icon: Truck },
];

export default function Header() {
  const pathname = usePathname();

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className={cn(
            'text-foreground/70 transition-colors hover:text-foreground',
            pathname === link.href && 'text-foreground font-semibold'
          )}
        >
          <Link href={link.href}>
            <link.icon className="mr-2 h-4 w-4" />
            {link.label}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/browse" className="mr-8 flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">
            Harvest Hub
          </span>
        </Link>

        <div className="hidden flex-1 items-center md:flex">
          <nav className="flex items-center gap-2">
            <NavContent />
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 pt-8">
                  <NavContent />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
