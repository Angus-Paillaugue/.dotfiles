<script>
	import Code from '$lib/components/icons/Code.svelte';
	import Smiley from '$lib/components/icons/Smiley.svelte';
	import { annotate } from 'rough-notation';
	import { onMount } from 'svelte';

	onMount(() => {
		annotate(document.querySelector('h1 span'), { type: 'circle' }).show();
	});
</script>

<section id="home" class="bg-primary/10">
	<div
		class="max-w-screen-xl mx-auto px-2 md:px-8 lg:px-12 pt-32 pb-20 sm:pb-30 sm:pt-[160px] md:pt-[200px] md:pb-[100px] lg:pt-[280px] lg:pb-[200px] flex flex-col gap-20 min-h-[400px] items-center"
	>
		<h1 class="group/heading lg:w-[80%]">
			Hi, I'm <span class="relative">
				Angus
				<svg style="position: absolute; top: 0px; left: 0px; overflow: visible; pointer-events: none; width: 100px; height: 100px;"><path d="M676.5555870810176 295.3237425730275 C687.8610262820282 293.827503588933, 703.4800896763264 296.3206581370359, 714.9106498832829 298.13559457553663 C726.3412100902393 299.9505310140374, 736.3915744072798 302.14143740996576, 745.1389483227565 306.2133612040321 C753.8863222382332 310.2852849980984, 763.5583007041979 316.13462408920213, 767.3948933761434 322.5671373399346 C771.2314860480889 328.9996505906671, 770.6867718545398 338.32992173766763, 768.1585043544295 344.8084407084269 C765.6302368543193 351.2869596791861, 760.0474412967209 356.60734931478424, 752.2252883754823 361.43825116448994 C744.4031354542436 366.26915301419564, 732.3225991744309 371.13363514685165, 721.2255868269976 373.793851806661 C710.1285744795643 376.45406846647035, 697.9245123469875 377.7837102046708, 685.6432142908824 377.39955112334616 C673.3619162347773 377.0153920420215, 657.9180182017768 374.798321862803, 647.5377984903672 371.48889731871327 C637.1575787789576 368.17947277462355, 629.3917040747519 363.49064722086166, 623.3618960224247 357.54300385880794 C617.3320879700975 351.5953604967542, 611.7510651198431 342.42050734107204, 611.3589501764037 335.80303714639075 C610.9668352329643 329.18556695170946, 615.4253230640936 323.57958727531354, 621.0092063617884 317.8381826907204 C626.5930896594832 312.0967781061272, 634.5412749271668 305.26610999041765, 644.8622499625728 301.35460963883185 C655.1832249979789 297.44310928724605, 675.3797749057178 295.42283166421083, 682.935056574225 294.36918058120546 C690.4903382427322 293.3155294982001, 690.2699203918546 294.1216374265233, 690.1939399736162 295.0327031407996" fill="none" stroke="currentColor" stroke-width="2" style="stroke-dashoffset: 402.882px; stroke-dasharray: 402.882px; animation: 407.605ms ease-out forwards rough-notation-dash;"></path></svg>
			</span>
			<Smiley class="inline-block text-sm size-12 rotate-[16deg] transition-transform group-hover/heading:rotate-[25deg] group-hover/heading:scale-125 duration-500 ease-back-out" />
			- A fullstack web developer
			<Code class="inline-block text-sm w-12 rotate-[-25deg] transition-transform group-hover/heading:rotate-[-16deg] group-hover/heading:scale-125 duration-500 ease-back-out delay-200" />
			living in Toulouse.
		</h1>
		<p class="text-lg ml-auto lg:w-[50%]">
			This personal website is my own little space on the internet where I want to share my work,
			interests and passions with others, without having to please the algorithms of social media
			platforms or follow any other rules. I hope you enjoy exploring my digital living room as much
			as I enjoyed creating it.
		</p>
	</div>
</section>
