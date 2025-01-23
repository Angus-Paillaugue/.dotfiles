<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "$lib/components/ui/card"
	import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "$lib/components/ui/dropdown-menu"
	import { Input } from "$lib/components/ui/input";
	import { SheetTrigger, SheetContent, Sheet } from "$lib/components/ui/sheet"
	import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "$lib/components/ui/table"
	import { Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users } from "lucide-svelte";
</script>

<div class="flex min-h-screen w-full flex-col">
	<header class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="##" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Package2 class="h-6 w-6" />
				<span class="sr-only">Acme Inc</span>
			</a>
			<a href="##" class="text-foreground hover:text-foreground transition-colors">
				Dashboard
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Orders
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Products
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Customers
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Analytics
			</a>
		</nav>
		<Sheet>
			<SheetTrigger asChild let:builder>
				<Button
					variant="outline"
					size="icon"
					class="shrink-0 md:hidden"
					builders={[builder]}
				>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="##" class="flex items-center gap-2 text-lg font-semibold">
						<Package2 class="h-6 w-6" />
						<span class="sr-only">Acme Inc</span>
					</a>
					<a href="##" class="hover:text-foreground"> Dashboard </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Orders </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Products </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Customers </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Analytics </a>
				</nav>
			</SheetContent>
		</Sheet>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<form class="ml-auto flex-1 sm:flex-initial">
				<div class="relative">
					<Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
					<Input
						type="search"
						placeholder="Search products..."
						class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
					/>
				</div>
			</form>
			<DropdownMenu>
				<DropdownMenuTrigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="secondary"
						size="icon"
						class="rounded-full"
					>
						<CircleUser class="h-5 w-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</header>
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
			<Card
				data-x-chunk-name="dashboard-01-chunk-0"
				data-x-chunk-description="A card showing the total revenue in USD and the percentage difference from last month."
			>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
					<DollarSign class="text-muted-foreground h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">$45,231.89</div>
					<p class="text-muted-foreground text-xs">+20.1% from last month</p>
				</CardContent>
			</Card>
			<Card
				data-x-chunk-name="dashboard-01-chunk-1"
				data-x-chunk-description="A card showing the total subscriptions and the percentage difference from last month."
			>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Subscriptions</CardTitle>
					<Users class="text-muted-foreground h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">+2350</div>
					<p class="text-muted-foreground text-xs">+180.1% from last month</p>
				</CardContent>
			</Card>
			<Card
				data-x-chunk-name="dashboard-01-chunk-2"
				data-x-chunk-description="A card showing the total sales and the percentage difference from last month."
			>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Sales</CardTitle>
					<CreditCard class="text-muted-foreground h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">+12,234</div>
					<p class="text-muted-foreground text-xs">+19% from last month</p>
				</CardContent>
			</Card>
			<Card
				data-x-chunk-name="dashboard-01-chunk-3"
				data-x-chunk-description="A card showing the total active users and the percentage difference from last hour."
			>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Active Now</CardTitle>
					<Activity class="text-muted-foreground h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">+573</div>
					<p class="text-muted-foreground text-xs">+201 since last hour</p>
				</CardContent>
			</Card>
		</div>
		<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
			<Card
				class="xl:col-span-2"
				data-x-chunk-name="dashboard-01-chunk-4"
				data-x-chunk-description="A card showing a table of recent transactions with a link to view all transactions."
			>
				<CardHeader class="flex flex-row items-center">
					<div class="grid gap-2">
						<CardTitle>Transactions</CardTitle>
						<CardDescription>Recent transactions from your store.</CardDescription>
					</div>
					<Button href="##" size="sm" class="ml-auto gap-1">
						View All
						<ArrowUpRight class="h-4 w-4" />
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer</TableHead>
								<TableHead class="xl:table.-column hidden">Type</TableHead>
								<TableHead class="xl:table.-column hidden">Status</TableHead>
								<TableHead class="xl:table.-column hidden">Date</TableHead>
								<TableHead class="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>
									<div class="font-medium">Liam Johnson</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										liam@example.com
									</div>
								</TableCell>
								<TableCell class="xl:table.-column hidden">Sale</TableCell>
								<TableCell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Approved</Badge>
								</TableCell>
								<TableCell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-23
								</TableCell>
								<TableCell class="text-right">$250.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div class="font-medium">Olivia Smith</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										olivia@example.com
									</div>
								</TableCell>
								<TableCell class="xl:table.-column hidden">Refund</TableCell>
								<TableCell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Declined</Badge>
								</TableCell>
								<TableCell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-24
								</TableCell>
								<TableCell class="text-right">$150.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div class="font-medium">Noah Williams</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										noah@example.com
									</div>
								</TableCell>
								<TableCell class="xl:table.-column hidden">
									Subscription
								</TableCell>
								<TableCell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Approved</Badge>
								</TableCell>
								<TableCell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-25
								</TableCell>
								<TableCell class="text-right">$350.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div class="font-medium">Emma Brown</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										emma@example.com
									</div>
								</TableCell>
								<TableCell class="xl:table.-column hidden">Sale</TableCell>
								<TableCell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Approved</Badge>
								</TableCell>
								<TableCell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-26
								</TableCell>
								<TableCell class="text-right">$450.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div class="font-medium">Liam Johnson</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										liam@example.com
									</div>
								</TableCell>
								<TableCell class="xl:table.-column hidden">Sale</TableCell>
								<TableCell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Approved</Badge>
								</TableCell>
								<TableCell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-27
								</TableCell>
								<TableCell class="text-right">$550.00</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	</main>
</div>
