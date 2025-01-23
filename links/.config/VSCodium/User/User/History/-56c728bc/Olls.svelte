<script>
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import * as Alert from '$lib/components/ui/alert';
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from '$lib/components/ui/button';
    import { enhance } from '$app/forms';

    const { form } = $props();
    let isSendingForm = $state(false);
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>


<div class="h-screen flex flex-col items-center justify-center p-2">
    <Card class="max-w-md w-full">
        <CardHeader>
            <CardTitle>Log-in</CardTitle>
        </CardHeader>
        <CardContent>

            <form
                class="flex flex-col gap-6"
                method="POST"
            >
                <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="username">Username</Label>
                    <Input type="text" id="username" placeholder="username" />
                </div>
                <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="password" />
                </div>

                <Button>Log-in</Button>

                {#if form?.success == false}
                    <div class="alert alert-error">
                        <i class="bi bi-x-circle shrink-0 h-6 w-6"></i>
                        <span>{form.message}</span>
                    </div>
                {/if}
            </form>
        </CardContent>
    </Card>
</div>
