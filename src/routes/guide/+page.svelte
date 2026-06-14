<script lang="ts">
	// Ported from the original standalone HTML guide (docs / dist). Content kept;
	// the warm inline palette dropped in favour of the app's liquid-glass tokens and
	// reflowed for mobile with a sticky in-page section nav. Print button removed (D21).
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

<main id="guide-main" class="page">
	<header class="card hero">
		<p class="eyebrow">Mexico City · Cheap Nutrition · Meal Prep</p>
		<h1>Meal Prep Plan for Cheap, Nutritious Weight Gain</h1>
		<p class="muted">
			A practical weekend-cooking system for a tall, skinny, high-appetite person becoming
			independent in Mexico City. Built around cheap staples, reheatable meals, and your available
			appliances.
		</p>
		<div class="stat-grid" aria-label="Personal targets">
			<div class="stat"><strong>1.94 m</strong><span class="muted">Height</span></div>
			<div class="stat"><strong>69 kg</strong><span class="muted">Current weight</span></div>
			<div class="stat"><strong>2,800–3,200</strong><span class="muted">Starting kcal/day</span></div>
			<div class="stat"><strong>110–140 g</strong><span class="muted">Protein/day target</span></div>
		</div>
	</header>

	<section id="goal" class="card">
		<h2>1. Main goal</h2>
		<p>
			The goal is not to eat as little as possible. At your height and weight, the smarter goal is to
			eat <strong>cheaply enough while consistently gaining weight</strong>.
		</p>
		<div class="grid">
			<div class="panel">
				<span class="tag">Starting target</span>
				<h3>Daily intake</h3>
				<ul>
					<li><strong>Calories:</strong> about 2,800–3,200 kcal/day.</li>
					<li><strong>Protein:</strong> about 110–140 g/day.</li>
					<li><strong>Weight goal:</strong> gain 0.25–0.5 kg per week.</li>
				</ul>
			</div>
			<div class="panel">
				<span class="tag">Tracking rule</span>
				<h3>Two-week experiment</h3>
				<ol>
					<li>Weigh yourself in the morning after using the bathroom.</li>
					<li>Track the weekly average, not a single random day.</li>
					<li>If weight is not increasing after 2 weeks, add 300–500 kcal/day.</li>
				</ol>
			</div>
		</div>
		<p class="callout">
			<strong>Important:</strong> do not accidentally meal prep like you are dieting. Your meals need
			to be large, calorie-dense, and easy to repeat.
		</p>
	</section>

	<section id="system" class="card">
		<h2>2. The core food system</h2>
		<p>
			Every meal should be built from simple modules. This makes food cheaper, easier to prep, and
			less boring.
		</p>
		<p class="formula">Carb base + protein anchor + sauce + calorie booster + fruit/vegetable</p>
		<div class="grid grid-3">
			<div class="panel">
				<span class="tag">Carb base</span>
				<ul>
					<li>Rice</li>
					<li>Potatoes</li>
					<li>Oats</li>
					<li>Pasta</li>
					<li>Tortillas</li>
					<li>Bolillo or bread</li>
				</ul>
			</div>
			<div class="panel">
				<span class="tag">Protein anchor</span>
				<ul>
					<li>Eggs</li>
					<li>Beans or lentils</li>
					<li>Chicken thighs/legs</li>
					<li>Tuna or sardines</li>
					<li>Milk/yogurt</li>
					<li>Cheese when budget allows</li>
				</ul>
			</div>
			<div class="panel">
				<span class="tag">Calorie booster</span>
				<ul>
					<li>Peanut butter</li>
					<li>Peanuts</li>
					<li>Whole milk</li>
					<li>Oil</li>
					<li>Crema or mayo</li>
					<li>Avocado when affordable</li>
				</ul>
			</div>
		</div>
	</section>

	<section id="appliances" class="card">
		<h2>3. Appliance strategy</h2>
		<div class="table-wrap">
			<table>
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
			</table>
		</div>
	</section>

	<section id="weekend" class="card">
		<h2>4. Weekend meal prep workflow</h2>
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
			<div class="panel">
				<h3>Salsa roja</h3>
				<ul>
					<li>Tomatoes</li>
					<li>Onion</li>
					<li>Garlic</li>
					<li>Chile de árbol, chipotle, or jalapeño</li>
					<li>Salt and lime</li>
				</ul>
			</div>
			<div class="panel">
				<h3>Creamy chipotle sauce</h3>
				<ul>
					<li>Crema, yogurt, mayo, or a mix</li>
					<li>Chipotle</li>
					<li>Lime</li>
					<li>Garlic</li>
					<li>Salt</li>
				</ul>
			</div>
		</div>
	</section>

	<section id="weekday" class="card">
		<h2>5. Weekday meal templates</h2>
		<div class="grid grid-3">
			<div class="panel">
				<span class="tag">Breakfast</span>
				<h3>High-calorie oats</h3>
				<ul>
					<li>100 g oats</li>
					<li>400–500 ml whole milk</li>
					<li>1 banana</li>
					<li>1–2 tbsp peanut butter</li>
					<li>Cinnamon or sugar if desired</li>
				</ul>
				<p><strong>Why:</strong> cheap, fast, high-calorie, and easy to repeat.</p>
			</div>
			<div class="panel">
				<span class="tag">Lunch</span>
				<h3>Rice bowl</h3>
				<ul>
					<li>1.5–2 cups cooked rice</li>
					<li>1 cup lentils or beans</li>
					<li>150–250 g cooked chicken</li>
					<li>Salsa</li>
					<li>3–6 tortillas</li>
				</ul>
				<p><strong>Why:</strong> this should be your main workhorse meal.</p>
			</div>
			<div class="panel">
				<span class="tag">Dinner</span>
				<h3>Grill assembly</h3>
				<ul>
					<li>Chicken tacos</li>
					<li>Bean/chicken quesadillas</li>
					<li>Loaded potatoes</li>
					<li>Tuna rice bowl</li>
					<li>Chicken torta</li>
				</ul>
				<p><strong>Why:</strong> same prep, different form.</p>
			</div>
		</div>
		<h3>Emergency meals</h3>
		<div class="grid">
			<div class="panel">
				<ul>
					<li>Egg tacos: eggs + tortillas + salsa.</li>
					<li>Tuna rice: rice + tuna + mayo/crema + salsa.</li>
					<li>Oats: oats + milk + banana + peanut butter.</li>
				</ul>
			</div>
			<div class="panel">
				<ul>
					<li>Bean quesadillas: tortillas + beans + cheese if available.</li>
					<li>Pasta + sardines/tuna + tomato sauce.</li>
					<li>Peanut butter banana sandwich + milk.</li>
				</ul>
			</div>
		</div>
	</section>

	<section id="first-week" class="card">
		<h2>6. Default first week</h2>
		<h3>Sunday prep</h3>
		<div class="table-wrap">
			<table>
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
			</table>
		</div>
		<h3>Weekday dinner rotation</h3>
		<div class="grid grid-3">
			<div class="panel"><strong>Monday</strong><p>Chicken tacos with salsa.</p></div>
			<div class="panel"><strong>Tuesday</strong><p>Loaded potatoes with lentils/chicken.</p></div>
			<div class="panel"><strong>Wednesday</strong><p>Bean/chicken quesadillas.</p></div>
			<div class="panel"><strong>Thursday</strong><p>Tuna rice bowl with creamy sauce.</p></div>
			<div class="panel"><strong>Friday</strong><p>Chicken/lentil torta or tacos.</p></div>
		</div>
		<p class="callout">
			<strong>Daily non-negotiable:</strong> breakfast + lunch + dinner + one calorie-dense snack. For
			you, snacks are part of the meal plan, not “extras.”
		</p>
	</section>

	<section id="shopping" class="card">
		<h2>7. Shopping list</h2>
		<div class="grid">
			<div>
				<h3>Core groceries</h3>
				<div class="table-wrap">
					<table>
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
					</table>
				</div>
			</div>
			<div>
				<h3>Flavor and vegetables</h3>
				<div class="table-wrap">
					<table>
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
					</table>
				</div>
			</div>
		</div>
	</section>

	<section id="safety" class="card">
		<h2>8. Food safety rules</h2>
		<p class="callout">
			Rice, chicken, and cooked legumes are great for meal prep, but they need proper cooling and
			storage.
		</p>
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
	</section>

	<section id="adjust" class="card">
		<h2>9. How to adjust when weight is not going up</h2>
		<p>
			If your average weight does not rise after 2 weeks, add one of these daily. Do not change
			everything at once.
		</p>
		<div class="grid grid-3">
			<div class="panel">
				<span class="tag">Easy liquid calories</span>
				<ul>
					<li>500 ml whole milk</li>
					<li>Milk + oats + banana</li>
					<li>Milk with peanut butter on the side</li>
				</ul>
			</div>
			<div class="panel">
				<span class="tag">Cheap solid calories</span>
				<ul>
					<li>4 extra tortillas</li>
					<li>1 extra cup of rice</li>
					<li>1 extra potato</li>
					<li>1 peanut butter sandwich</li>
				</ul>
			</div>
			<div class="panel">
				<span class="tag">Protein/calorie boost</span>
				<ul>
					<li>2 extra eggs</li>
					<li>Extra lentils/beans</li>
					<li>Extra chicken portion</li>
					<li>1 spoonful oil in rice/lentils</li>
				</ul>
			</div>
		</div>
		<p class="callout">
			<strong>Simple rule:</strong> if the scale is not moving, add one daily calorie booster and
			check again after one week.
		</p>
	</section>

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
		top: 0.5rem;
		background: var(--accent);
		color: white;
		padding: 0.6rem 0.9rem;
		border-radius: var(--radius);
		z-index: 100;
	}
	.skip-link:focus {
		left: 0.75rem;
	}

	.guide-nav {
		position: sticky;
		top: 0;
		z-index: 50;
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		padding: 0.6rem 0.75rem;
		background: var(--surface-strong);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
		border-bottom: 1px solid var(--line);
	}
	.guide-nav a {
		white-space: nowrap;
		text-decoration: none;
		color: inherit;
		font-weight: 600;
		font-size: 0.9rem;
		padding: 0.4rem 0.7rem;
		border: 1px solid var(--line);
		border-radius: 999px;
	}
	.guide-nav a:hover,
	.guide-nav a:focus {
		background: var(--accent);
		border-color: transparent;
		color: white;
	}

	/* Scroll a tapped section clear of the sticky nav. */
	section {
		scroll-margin-top: 3.5rem;
	}

	.hero h1 {
		letter-spacing: -0.03em;
	}

	.stat-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.6rem;
		margin-top: 1rem;
	}
	.stat {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.75rem;
		background: var(--fill);
	}
	.stat strong {
		display: block;
		font-size: 1.2rem;
		color: var(--accent);
	}
	.stat span {
		font-size: 0.85rem;
	}

	.grid {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1fr;
	}

	.panel {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.9rem;
		background: var(--fill);
	}
	.panel h3 {
		margin-top: 0;
	}

	.tag {
		display: inline-block;
		border-radius: 999px;
		background: color-mix(in srgb, var(--accent) 18%, transparent);
		color: var(--accent);
		font-weight: 700;
		font-size: 0.75rem;
		padding: 0.2rem 0.55rem;
		margin-bottom: 0.5rem;
	}

	.formula {
		font-weight: 700;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 12%, transparent);
		border-radius: var(--radius);
		padding: 0.8rem;
	}

	.callout {
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.9rem;
	}

	.guide-nav + .page section ul,
	.timeline,
	section ul,
	section ol {
		padding-left: 1.25rem;
	}

	.timeline {
		display: grid;
		gap: 0.7rem;
		list-style: none;
		padding-left: 0;
		counter-reset: step;
	}
	.timeline li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.8rem;
		align-items: start;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.9rem;
		background: var(--fill);
	}
	.timeline li::before {
		counter-increment: step;
		content: counter(step);
		width: 1.9rem;
		height: 1.9rem;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: var(--accent);
		color: white;
		font-weight: 800;
	}
	.timeline h3 {
		margin: 0 0 0.2rem;
	}
	.timeline p {
		margin: 0;
	}

	.table-wrap {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		overflow: hidden;
	}
	th,
	td {
		padding: 0.6rem;
		border-bottom: 1px solid var(--line);
		text-align: left;
		vertical-align: top;
	}
	th {
		background: color-mix(in srgb, var(--accent) 14%, transparent);
		color: var(--accent);
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	tr:last-child td {
		border-bottom: none;
	}

	.disclaimer {
		display: block;
		font-size: 0.88rem;
		padding: 0 0.25rem;
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
