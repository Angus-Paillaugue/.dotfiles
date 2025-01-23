<script lang="ts">
  import type { BuildingMessage } from '.';
  import { Brain, LoaderCircle } from 'lucide-svelte';
  import * as Alert from '$lib/components/ui/alert/index.js';
  import { cn } from '$lib/utils';
  import { scale } from 'svelte/transition';
  import { Marked } from 'marked'
  import markedShiki from 'marked-shiki'
  import { createHighlighter } from 'shiki'
  import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerNotationFocus,
    transformerNotationErrorLevel,
    transformerMetaHighlight,
    transformerMetaWordHighlight
  } from '@shikijs/transformers'
  import { onMount } from 'svelte';

  interface Props {
    message: BuildingMessage;
  }
  let { message }: Props = $props();
  let highlighter = $state<unknown | null>(null);
  let marked = $state<Marked | null>(null);


  function parseMarkdown(content: string) {
    if(!marked) return content;
    return marked.parse(content);
  }

  let parsedMarkdownMessage = $derived(parseMarkdown(message.content));

  onMount(() => {
    const initialize = async () => {
      highlighter = await createHighlighter({
        // In this case, we include the "js" language specifier to ensure that
        // Shiki applies the appropriate syntax highlighting for Markdown code
        // blocks.
        langs: ['c', 'bash', 'sql'],
        themes: ['github-dark-dimmed']
      });

      marked = await new Marked()
        .use(
          markedShiki({
            async highlight(code, lang, props) {
              if(!highlighter) return code;
              const resolvedHighlighter = await highlighter;
              return await resolvedHighlighter.codeToHtml(code, {
                lang,
                theme: 'github-dark-dimmed',
                meta: { __raw: props.join(' ') }, // required by `transformerMeta*`
                transformers: [
                  transformerNotationDiff(),
                  transformerNotationHighlight(),
                  transformerNotationWordHighlight(),
                  transformerNotationFocus(),
                  transformerNotationErrorLevel(),
                  transformerMetaHighlight(),
                  transformerMetaWordHighlight()
                ]
              })
            }
          })
        )
    };

    initialize();

    return () => {
      highlighter?.dispose();
    };
  });
</script>

{#snippet profilePicture(role: BuildingMessage['role'])}
  {#if role === 'system'}
    <div
      class="flex size-8 shrink-0 flex-col items-center justify-center overflow-hidden rounded-full border border-border p-1.5 text-primary"
    >
      <Brain class="size-full" />
    </div>
  {/if}
{/snippet}

{#if message.error}
  <Alert.Root
    class={cn('md:w-fit', message.role === 'system' ? '' : 'ml-auto mt-2')}
    variant="destructive"
  >
    <Brain class="size-4" />
    <Alert.Title>Error!</Alert.Title>
    <Alert.Description>{message.error} This is an error message</Alert.Description>
  </Alert.Root>
{:else}
  <div
    class={cn(
      'flex w-fit items-start gap-2.5 text-primary-foreground md:w-fit md:max-w-[70%]',
      message.role !== 'system' && 'ml-auto mt-2'
    )}
    in:scale={{ duration: 300 }}
  >
    {@render profilePicture(message.role)}
    {#if message.content === ''}
      <span in:scale={{ duration: 300 }}>
        <LoaderCircle class="mt-1 size-6 animate-spin text-primary" />
      </span>
    {:else}
      <div
        class={cn(
          'flex flex-col whitespace-pre-wrap rounded-xl border-border bg-primary px-4 py-2 text-base font-normal',
          message.role === 'system' ? 'rounded-tl-none' : 'rounded-tr-none'
        )}
      >
        {@html parsedMarkdownMessage}
      </div>
    {/if}
  </div>
{/if}
