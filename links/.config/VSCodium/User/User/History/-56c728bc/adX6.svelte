<script>
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import * as Alert from '$lib/components/ui/alert';
    import { enhance } from '$app/forms';

    const { form } = $props();
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>


<div class="h-screen flex items-center justify-center max-w-md m-auto">
    <Card>
        <CardHeader>
            <CardTitle>Log-in</CardTitle>
        </CardHeader>
        <CardContent>

            <form class="flex flex-col gap-6" use:enhance method="POST">
                <h3>Log-in</h3>
                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" placeholder="Username" name="username" value="{form ? form.formData.username : ""}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" placeholder="Password" name="password" value="{form ? form.formData.password : ""}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                </div>

                <button class="w-full button-primary">Log-in</button>

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
