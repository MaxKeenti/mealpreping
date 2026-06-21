<script lang="ts">
	import { Callout, Card, Panel, Stat, Table } from '$lib/components/ui';

	const sections = [
		{ id: 'goal', label: 'Goal' },
		{ id: 'system', label: 'Core System' },
		{ id: 'appliances', label: 'Appliances' },
		{ id: 'weekend', label: 'Weekend Prep' },
		{ id: 'weekday', label: 'Weekday Meals' },
		{ id: 'first-week', label: 'First Week' },
		{ id: 'shopping', label: 'Shopping List' },
		{ id: 'safety', label: 'Food Safety' },
		{ id: 'adjust', label: 'Adjustments' }
	];
</script>

<svelte:head><title>Guide — Mealpreping</title></svelte:head>

<a class="skip-link" href="#guide-main">Skip to content</a>

<nav class="guide-nav" aria-label="Guide sections">
	{#each sections as section (section.id)}
		<a href="#{section.id}">{section.label}</a>
	{/each}
</nav>

<main id="guide-main" class="page guide-page">
	<Card as="header" class="hero">
		<p class="eyebrow">Mexico City · Cheap Nutrition · Meal Prep</p>
		<h1>Meal Prep Plan for Cheap, Nutritious Weight Gain</h1>
		<p class="muted">
			A practical weekend-cooking system for a tall, skinny, high-appetite person becoming
			independent in Mexico City. Built around cheap staples, reheatable meals, and your available
			appliances.
		</p>
		<div class="stat-grid" aria-label="Personal targets">
			<Stat value="1.94 m" label="Height" />
			<Stat value="69 kg" label="Current weight" />
			<Stat value="2,800–3,200" label="Starting kcal/day" />
			<Stat value="110–140 g" label="Protein/day target" />
		</div>
	</Card>

	<Card id="goal" title="1. Main goal">
		<p>
			The goal is not to eat as little as possible. At your height and weight, the smarter goal is to
			eat <strong>cheaply enough while consistently gaining weight</strong>.
		</p>
		<div class="grid">
			<Panel tag="Starting target" title="Daily intake">
				<ul>
					<li><strong>Calories:</strong> about 2,800–3,200 kcal/day.</li>
					<li><strong>Protein:</strong> about 110–140 g/day.</li>
					<li><strong>Weight goal:</strong> gain 0.25–0.5 kg per week.</li>
				</ul>
			</Panel>
			<Panel tag="Tracking rule" title="Two-week experiment">
				<ol>
					<li>Weigh yourself in the morning after using the bathroom.</li>
					<li>Track the weekly average, not a single random day.</li>
					<li>If weight is not increasing after 2 weeks, add 300–500 kcal/day.</li>
				</ol>
			</Panel>
		</div>
		<Callout>
			<strong>Important:</strong> do not accidentally meal prep like you are dieting. Your meals need
			to be large, calorie-dense, and easy to repeat.
		</Callout>
	</Card>

	<Card id="system" title="2. The core food system">
		<p>
			Every meal should be built from simple modules. This makes food cheaper, easier to prep, and
			less boring.
		</p>
		<p class="formula">Carb base + protein anchor + sauce + calorie booster + fruit/vegetable</p>
		<div class="grid grid-3">
			<Panel tag="Carb base">
				<ul>
					<li>Rice</li>
					<li>Potatoes</li>
					<li>Oats</li>
					<li>Pasta</li>
					<li>Tortillas</li>
					<li>Bolillo or bread</li>
				</ul>
			</Panel>
			<Panel tag="Protein anchor">
				<ul>
					<li>Eggs</li>
					<li>Beans or lentils</li>
					<li>Chicken thighs/legs</li>
					<li>Tuna or sardines</li>
					<li>Milk/yogurt</li>
					<li>Cheese when budget allows</li>
				</ul>
			</Panel>
			<Panel tag="Calorie booster">
				<ul>
					<li>Peanut butter</li>
					<li>Peanuts</li>
					<li>Whole milk</li>
					<li>Oil</li>
					<li>Crema or mayo</li>
					<li>Avocado when affordable</li>
				</ul>
			</Panel>
		</div>
	</Card>

	<Card id="appliances" title="3. Appliance strategy">
		<Table>
			<thead>
				<tr><th>Appliance</th><th>Best use</th><th>Notes</th></tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>Rice cooker</strong></td>
					<td>Rice, lentils, simple bean-like stews, oatmeal-style batches</td>
					<td>Lentils are easier than beans because they cook faster and usually do not need soaking.</td>
				</tr>
				<tr>
					<td><strong>Air fryer / small oven</strong></td>
					<td>Chicken thighs/legs, potatoes, roasted vegetables</td>
					<td>Use on weekends for bulk protein and carb prep.</td>
				</tr>
				<tr>
					<td><strong>Blender</strong></td>
					<td>Salsas, creamy sauces, smoothies when available</td>
					<td>Make sauces on weekends so weekday food tastes fresh.</td>
				</tr>
				<tr>
					<td><strong>Microwave</strong></td>
					<td>Reheating rice bowls, lentils, chicken, potatoes, oats</td>
					<td>Your main weekday reheating tool.</td>
				</tr>
				<tr>
					<td><strong>Electric grill</strong></td>
					<td>Tortillas, quesadillas, tortas, crisping chicken/potatoes</td>
					<td>This makes reheated food feel freshly cooked.</td>
				</tr>
			</tbody>
		</Table>
	</Card>

	<Card id="weekend" title="4. Weekend meal prep workflow">
		<p>
			Cook modules, not 15 identical meals. Keep sauces and some bases separate so you can assemble
			different meals during the week.
		</p>
		<ol class="timeline">
			<li>
				<h3>Cook a big rice batch</h3>
				<p>
					Use about 3 cups of dry rice. Add salt, garlic/onion powder, and a little oil or butter
					if available. Portion after cooking.
				</p>
			</li>
			<li>
				<h3>Cook lentils or beans</h3>
				<p>
					Lentils are the easiest option. Cook 500 g–1 kg with water, onion/garlic, cumin, chipotle,
					tomato, or bay leaf. Salt after they soften.
				</p>
			</li>
			<li>
				<h3>Cook chicken thighs/legs</h3>
				<p>
					Use 1.5–2.5 kg. Season with salt, pepper, garlic, paprika, lime, oil, salsa, chipotle, or
					adobo. Shred or portion after cooking.
				</p>
			</li>
			<li>
				<h3>Roast potatoes</h3>
				<p>
					Cook 1.5–2 kg of potatoes as cubes, wedges, or whole baked potatoes. Add oil and salt.
					Reheat in microwave, then crisp on the electric grill if desired.
				</p>
			</li>
			<li>
				<h3>Blend two sauces</h3>
				<p>
					Make one bright salsa and one creamy sauce. Sauces are the easiest way to prevent meal-prep
					boredom.
				</p>
			</li>
		</ol>
		<div class="grid">
			<Panel title="Salsa roja">
				<ul>
					<li>Tomatoes</li>
					<li>Onion</li>
					<li>Garlic</li>
					<li>Chile de árbol, chipotle, or jalapeño</li>
					<li>Salt and lime</li>
				</ul>
			</Panel>
			<Panel title="Creamy chipotle sauce">
				<ul>
					<li>Crema, yogurt, mayo, or a mix</li>
					<li>Chipotle</li>
					<li>Lime</li>
					<li>Garlic</li>
					<li>Salt</li>
				</ul>
			</Panel>
		</div>
	</Card>

	<Card id="weekday" title="5. Weekday meal templates">
		<div class="grid grid-3">
			<Panel tag="Breakfast" title="High-calorie oats">
				<ul>
					<li>100 g oats</li>
					<li>400–500 ml whole milk</li>
					<li>1 banana</li>
					<li>1–2 tbsp peanut butter</li>
					<li>Cinnamon or sugar if desired</li>
				</ul>
				<p><strong>Why:</strong> cheap, fast, high-calorie, and easy to repeat.</p>
			</Panel>
			<Panel tag="Lunch" title="Rice bowl">
				<ul>
					<li>1.5–2 cups cooked rice</li>
					<li>1 cup lentils or beans</li>
					<li>150–250 g cooked chicken</li>
					<li>Salsa</li>
					<li>3–6 tortillas</li>
				</ul>
				<p><strong>Why:</strong> this should be your main workhorse meal.</p>
			</Panel>
			<Panel tag="Dinner" title="Grill assembly">
				<ul>
					<li>Chicken tacos</li>
					<li>Bean/chicken quesadillas</li>
					<li>Loaded potatoes</li>
					<li>Tuna rice bowl</li>
					<li>Chicken torta</li>
				</ul>
				<p><strong>Why:</strong> same prep, different form.</p>
			</Panel>
		</div>
		<h3>Emergency meals</h3>
		<div class="grid">
			<Panel>
				<ul>
					<li>Egg tacos: eggs + tortillas + salsa.</li>
					<li>Tuna rice: rice + tuna + mayo/crema + salsa.</li>
					<li>Oats: oats + milk + banana + peanut butter.</li>
				</ul>
			</Panel>
			<Panel>
				<ul>
					<li>Bean quesadillas: tortillas + beans + cheese if available.</li>
					<li>Pasta + sardines/tuna + tomato sauce.</li>
					<li>Peanut butter banana sandwich + milk.</li>
				</ul>
			</Panel>
		</div>
	</Card>

	<Card id="first-week" title="6. Default first week">
		<h3>Sunday prep</h3>
		<Table>
			<thead>
				<tr><th>Prep item</th><th>Amount</th><th>Use during week</th></tr>
			</thead>
			<tbody>
				<tr><td>Rice</td><td>3 cups dry</td><td>Lunch bowls, tuna rice, dinner base</td></tr>
				<tr><td>Lentils</td><td>700 g</td><td>Bowls, tacos, soup, quesadillas</td></tr>
				<tr><td>Chicken thighs/legs</td><td>2 kg</td><td>Bowls, tacos, tortas, loaded potatoes</td></tr>
				<tr><td>Potatoes</td><td>1.5 kg</td><td>Dinners, sides, loaded potatoes</td></tr>
				<tr><td>Sauces</td><td>2 containers</td><td>Add flavor and calories</td></tr>
				<tr><td>Optional boiled eggs</td><td>10 eggs</td><td>Snacks, breakfast, emergency protein</td></tr>
			</tbody>
		</Table>
		<h3>Weekday dinner rotation</h3>
		<div class="grid grid-3">
			<Panel><strong>Monday</strong><p>Chicken tacos with salsa.</p></Panel>
			<Panel><strong>Tuesday</strong><p>Loaded potatoes with lentils/chicken.</p></Panel>
			<Panel><strong>Wednesday</strong><p>Bean/chicken quesadillas.</p></Panel>
			<Panel><strong>Thursday</strong><p>Tuna rice bowl with creamy sauce.</p></Panel>
			<Panel><strong>Friday</strong><p>Chicken/lentil torta or tacos.</p></Panel>
		</div>
		<Callout>
			<strong>Daily non-negotiable:</strong> breakfast + lunch + dinner + one calorie-dense snack. For
			you, snacks are part of the meal plan, not “extras.”
		</Callout>
	</Card>

	<Card id="shopping" title="7. Shopping list">
		<div class="grid">
			<div>
				<h3>Core groceries</h3>
				<Table>
					<thead>
						<tr><th>Item</th><th>Suggested amount/week</th></tr>
					</thead>
					<tbody>
						<tr><td>Oats</td><td>1–1.5 kg</td></tr>
						<tr><td>Rice</td><td>1–2 kg</td></tr>
						<tr><td>Lentils or beans</td><td>1–1.5 kg dry</td></tr>
						<tr><td>Eggs</td><td>24–36</td></tr>
						<tr><td>Whole milk</td><td>7–10 L</td></tr>
						<tr><td>Tortillas</td><td>2–4 kg</td></tr>
						<tr><td>Bananas</td><td>2–3 kg</td></tr>
						<tr><td>Chicken thighs/legs</td><td>1.5–3 kg</td></tr>
						<tr><td>Potatoes or pasta</td><td>1–2 kg</td></tr>
						<tr><td>Tuna/sardines</td><td>3–6 cans</td></tr>
						<tr><td>Peanut butter or peanuts</td><td>500 g–1 kg</td></tr>
					</tbody>
				</Table>
			</div>
			<div>
				<h3>Flavor and vegetables</h3>
				<Table>
					<thead>
						<tr><th>Item</th><th>Purpose</th></tr>
					</thead>
					<tbody>
						<tr><td>Tomatoes</td><td>Salsa, rice bowls</td></tr>
						<tr><td>Onion and garlic</td><td>Base flavor</td></tr>
						<tr><td>Chiles/chipotle</td><td>Salsas and sauces</td></tr>
						<tr><td>Cabbage</td><td>Cheap crunchy veg</td></tr>
						<tr><td>Carrots</td><td>Cheap vegetable</td></tr>
						<tr><td>Frozen vegetables</td><td>Convenient backup</td></tr>
						<tr><td>Crema/yogurt/mayo</td><td>Creamy sauce and calories</td></tr>
						<tr><td>Cheese</td><td>Quesadillas, calories, flavor</td></tr>
						<tr><td>Avocado</td><td>Great when affordable</td></tr>
						<tr><td>Bolillos or bread</td><td>Tortas, sandwiches</td></tr>
					</tbody>
				</Table>
			</div>
		</div>
	</Card>

	<Card id="safety" title="8. Food safety rules">
		<Callout>
			Rice, chicken, and cooked legumes are great for meal prep, but they need proper cooling and
			storage.
		</Callout>
		<ul>
			<li>Refrigerate cooked food within 1–2 hours.</li>
			<li>Do not leave rice or chicken out overnight.</li>
			<li>Keep only 2–3 days of food in the fridge if possible.</li>
			<li>Freeze Thursday/Friday meals if you have freezer access.</li>
			<li>Reheat food until steaming hot.</li>
			<li>Store sauces separately when possible.</li>
			<li>Do not reheat the same container over and over. Portion first.</li>
			<li>If you do not have freezer access, prep 3–4 days max and do a smaller midweek batch.</li>
		</ul>
	</Card>

	<Card id="adjust" title="9. How to adjust when weight is not going up">
		<p>
			If your average weight does not rise after 2 weeks, add one of these daily. Do not change
			everything at once.
		</p>
		<div class="grid grid-3">
			<Panel tag="Easy liquid calories">
				<ul>
					<li>500 ml whole milk</li>
					<li>Milk + oats + banana</li>
					<li>Milk with peanut butter on the side</li>
				</ul>
			</Panel>
			<Panel tag="Cheap solid calories">
				<ul>
					<li>4 extra tortillas</li>
					<li>1 extra cup of rice</li>
					<li>1 extra potato</li>
					<li>1 peanut butter sandwich</li>
				</ul>
			</Panel>
			<Panel tag="Protein/calorie boost">
				<ul>
					<li>2 extra eggs</li>
					<li>Extra lentils/beans</li>
					<li>Extra chicken portion</li>
					<li>1 spoonful oil in rice/lentils</li>
				</ul>
			</Panel>
		</div>
		<Callout>
			<strong>Simple rule:</strong> if the scale is not moving, add one daily calorie booster and
			check again after one week.
		</Callout>
	</Card>

	<footer class="muted disclaimer">
		This document is a practical planning guide, not medical advice. If you experience digestive
		issues, rapid weight loss, intense fatigue, or difficulty gaining weight despite eating enough,
		consider checking in with a healthcare professional.
	</footer>
</main>

<style>
	.skip-link {
		position: absolute;
		left: -999px;
		top: var(--space-2);
		background: var(--accent);
		color: white;
		padding: 0.6rem 0.9rem;
		border-radius: var(--radius);
		z-index: 100;
	}

	.skip-link:focus-visible {
		left: var(--space-3);
	}

	.guide-nav {
		position: sticky;
		top: 0;
		z-index: 50;
		display: flex;
		gap: var(--space-2);
		overflow-x: auto;
		padding: 0.6rem var(--space-3);
		background: var(--surface-strong);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
		border-bottom: 1px solid var(--line);
	}

	.guide-nav a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		white-space: nowrap;
		text-decoration: none;
		color: inherit;
		font-weight: 700;
		font-size: var(--text-sm);
		padding: 0.45rem 0.75rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-full);
		background: color-mix(in srgb, var(--surface) 60%, transparent);
	}

	.guide-nav a:hover {
		background: var(--accent-soft);
		color: var(--accent);
	}

	:global(.guide-page section) {
		scroll-margin-top: 3.5rem;
	}

	.eyebrow {
		margin-top: 0;
		color: var(--accent);
		font-size: var(--text-xs);
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	:global(.hero) h1 {
		max-width: 11ch;
		font-size: var(--text-2xl);
	}

	.stat-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	.grid {
		display: grid;
		gap: var(--space-3);
		grid-template-columns: 1fr;
	}

	.formula {
		font-weight: 800;
		color: var(--accent);
		background: var(--accent-soft);
		border-radius: var(--radius);
		padding: var(--space-3);
	}

	:global(.guide-page section ul),
	:global(.guide-page section ol) {
		padding-left: 1.25rem;
	}

	:global(.guide-page section ul) {
		list-style: disc;
	}

	:global(.guide-page section ol) {
		list-style: decimal;
	}

	.timeline {
		display: grid;
		gap: var(--space-3);
		list-style: none;
		padding-left: 0;
		counter-reset: step;
	}

	.timeline li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-3);
		align-items: start;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: var(--space-3);
		background: var(--fill);
	}

	.timeline li::before {
		counter-increment: step;
		content: counter(step);
		width: 1.9rem;
		height: 1.9rem;
		display: grid;
		place-items: center;
		border-radius: var(--radius-full);
		background: var(--accent);
		color: white;
		font-weight: 800;
	}

	.timeline h3 {
		margin: 0 0 var(--space-1);
	}

	.timeline p {
		margin: 0;
	}

	.disclaimer {
		display: block;
		font-size: var(--text-sm);
		padding: 0 var(--space-1);
	}

	@media (min-width: 560px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.grid-3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.stat-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
