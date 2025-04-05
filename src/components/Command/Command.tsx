'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  CircleUserRound,
  Home,
  MoonStar,
  Rss,
  SquareArrowOutUpRight,
  SquareBottomDashedScissors,
  SunMoon,
  Tag,
  Target,
} from 'lucide-react'

export function CommandMenu({
  blogs,
  projects,
  snippets,
  tags,
}: {
  blogs: any[]
  projects: any[]
  snippets: any[]
  tags: any[]
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <CommandDialog
        className='top-[30%] sm:top-[50%]'
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          <CommandGroup heading='Links'>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/home'))}
            >
              <Home className='mr-2 h-4 w-4' />
              <span>Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/contact'))}
            >
              <CircleUserRound className='mr-2 h-4 w-4' />
              <span>Contact</span>
            </CommandItem>
            {/* <CommandItem
              onSelect={() => runCommand(() => router.push('/resume'))}
            >
              <Paperclip className='mr-2 h-4 w-4' />
              <span>Resume</span>
            </CommandItem> */}
            <CommandItem
              onSelect={() => runCommand(() => router.push('/blog'))}
            >
              <Rss className='mr-2 h-4 w-4' />
              <span>Blogs</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/projects'))}
            >
              <Target className='mr-2 h-4 w-4' />
              <span>Projects</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/snippet'))}
            >
              <SquareBottomDashedScissors className='mr-2 h-4 w-4' />
              <span>Snippets</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/tag'))}>
              <Tag className='mr-2 h-4 w-4' />
              <span>Tags</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Blogs'>
            {blogs.map((blog: any) => (
              <CommandItem
                key={blog.slug}
                onSelect={() =>
                  runCommand(() => router.push(`/blog/${blog.slug}`))
                }
              >
                <Rss className='mr-2 h-4 w-4' />
                <span>{blog.metadata.title}</span>
                <SquareArrowOutUpRight className='ml-2 h-4 w-4' />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Projects'>
            {projects.map((project: any) => (
              <CommandItem
                key={project.slug}
                onSelect={() =>
                  runCommand(() => router.push(`/projects/${project.slug}`))
                }
              >
                <Target className='mr-2 h-4 w-4' />
                <span>{project.metadata.title}</span>
                <SquareArrowOutUpRight className='ml-2 h-4 w-4' />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Snippets'>
            {snippets.map((snippet: any) => (
              <CommandItem
                key={snippet.slug}
                onSelect={() =>
                  runCommand(() => router.push(`/snippets/${snippet.slug}`))
                }
              >
                <SquareBottomDashedScissors className='mr-2 h-4 w-4' />
                <span>{snippet.metadata.title}</span>
                <SquareArrowOutUpRight className='ml-2 h-4 w-4' />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Tags'>
            {tags.map((tag: any) => (
              <CommandItem
                key={tag}
                onSelect={() => runCommand(() => router.push(`/tag/${tag}`))}
              >
                <Tag className='mr-2 h-4 w-4' />
                <span>{tag}</span>
                <SquareArrowOutUpRight className='ml-2 h-4 w-4' />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunMoon className='mr-2 h-4 w-4' />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonStar className='mr-2 h-4 w-4' />
              <span>Dark</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
