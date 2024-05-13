'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

export function CommandMenu({
  blogs,
  projects,
  snippets,
}: {
  blogs: any[];
  projects: any[];
  snippets: any[];
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen} className='w-4/5'>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          <CommandGroup heading='Routes'>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/home'))}
            >
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/tag'))}>
              <span>Tags</span>
            </CommandItem>
            <CommandGroup heading='Blogs'>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/blog'))}
              >
                <span>Blogs</span>
              </CommandItem>
              {blogs.map((blog: any) => (
                <CommandItem
                  key={blog.id}
                  onSelect={() =>
                    runCommand(() => router.push(`/blog/${blog.slug}`))
                  }
                >
                  <span className='mr-2 h-4 w-4' />
                  <span>{blog.metadata.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading='Projects'>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/projects'))}
              >
                <span>Projects</span>
              </CommandItem>
              {projects.map((project: any) => (
                <CommandItem
                  key={project.id}
                  onSelect={() =>
                    runCommand(() => router.push(`/projects/${project.slug}`))
                  }
                >
                  <span className='mr-2 h-4 w-4' />
                  <span>{project.metadata.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading='Snippets'>
              <CommandItem
                onSelect={() => runCommand(() => router.push('/snippet'))}
              >
                <span>Snippets</span>
              </CommandItem>
              {snippets.map((snippet: any) => (
                <CommandItem
                  key={snippet.id}
                  onSelect={() =>
                    runCommand(() => router.push(`/snippets/${snippet.slug}`))
                  }
                >
                  <span className='mr-2 h-4 w-4' />
                  <span>{snippet.metadata.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandGroup>

          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <span className='mr-2 h-4 w-4' />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <span className='mr-2 h-4 w-4' />
              <span>Dark</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
