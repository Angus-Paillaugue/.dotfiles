<script>
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import * as Alert from '$lib/components/ui/alert';
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from '$lib/components/ui/button';
    import { LoaderCircle } from "lucide-svelte";
    import { enhance, applyAction } from '$app/forms';

    const { form } = $props();
    let isSendingForm = $state(false);
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>


<div class="pt-10 flex flex-col items-center justify-center p-2">
    <Card class="max-w-md w-full">
        <CardHeader>
            <CardTitle>Log-in</CardTitle>
        </CardHeader>
        <CardContent>

            <form
                class="flex flex-col gap-6"
                method="POST"
                use:enhance={() => {
				isSendingForm = true;
				return async ({ result }) => {
					await applyAction(result);
					isSendingForm = false;
				};
			}}
            >
                <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="username">Username</Label>
                    <Input type="text" id="username" placeholder="username" />
                </div>
                <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="password" />
                </div>

                <Button disabled={isSendingForm} type="submit" class="flex flex-row items-center gap-2">
                    {#if isSendingForm}
                        <LoaderCircle class="size-4 animate-spin" />
                    {/if}
                    Log-in
                </Button>

                {#if form?.success == false}
                    <Alert.Root variant="destructive">
                        <Alert.Title class="m-0">{form.message}</Alert.Title>
                    </Alert.Root>
                {/if}
            </form>
        </CardContent>
    </Card>
</div>
