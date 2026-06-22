<script lang="ts">
	import { Callout, Card, Panel, Stat, Table } from '$lib/components/ui';
	import { appState } from '$lib/state/appState.svelte';
	import { m } from '$lib/paraglide/messages';

	const locale = $derived(appState.profile?.locale ?? 'en');
	const sections = $derived([
		{ id: 'goal', label: m.guide_goal({}, { locale }) },
		{ id: 'system', label: m.guide_system({}, { locale }) },
		{ id: 'appliances', label: m.guide_appliances({}, { locale }) },
		{ id: 'weekend', label: m.guide_weekend({}, { locale }) },
		{ id: 'weekday', label: m.guide_weekday({}, { locale }) },
		{ id: 'first-week', label: m.guide_first_week({}, { locale }) },
		{ id: 'shopping', label: m.guide_shopping({}, { locale }) },
		{ id: 'safety', label: m.guide_safety({}, { locale }) },
		{ id: 'adjust', label: m.guide_adjust({}, { locale }) }
	]);

	function t(en: string, es: string): string {
		return locale === 'es' ? es : en;
	}
</script>

<svelte:head><title>{m.nav_guide({}, { locale })} — {m.app_title({}, { locale })}</title></svelte:head>

<a class="skip-link" href="#guide-main">{m.guide_skip({}, { locale })}</a>

<nav class="guide-nav" aria-label={m.guide_sections({}, { locale })}>
	{#each sections as section (section.id)}
		<a href="#{section.id}">{section.label}</a>
	{/each}
</nav>

<main id="guide-main" class="page guide-page">
	<Card as="header" class="hero">
		<p class="eyebrow">{m.guide_eyebrow({}, { locale })}</p>
		<h1>{m.guide_title({}, { locale })}</h1>
		<p class="muted">
			{m.guide_intro({}, { locale })}
		</p>
		<div class="stat-grid" aria-label={t('Personal targets', 'Objetivos personales')}>
			<Stat value="1.94 m" label={m.height({}, { locale })} />
			<Stat value="69 kg" label={m.current_weight({}, { locale })} />
			<Stat value="2,800–3,200" label={m.starting_kcal({}, { locale })} />
			<Stat value="110–140 g" label={m.protein_target({}, { locale })} />
		</div>
	</Card>

	<Card id="goal" title={m.guide_goal_title({}, { locale })}>
		<p>
			{m.guide_goal_body({}, { locale })}
		</p>
		<div class="grid">
			<Panel tag={t('Starting target', 'Objetivo inicial')} title={t('Daily intake', 'Consumo diario')}>
				<ul>
					<li><strong>{m.calories({}, { locale })}:</strong> {t('about 2,800–3,200 kcal/day.', 'aprox. 2,800–3,200 kcal/dia.')}</li>
					<li><strong>{m.protein({}, { locale })}:</strong> {t('about 110–140 g/day.', 'aprox. 110–140 g/dia.')}</li>
					<li><strong>{t('Weight goal', 'Meta de peso')}:</strong> {t('gain 0.25–0.5 kg per week.', 'subir 0.25–0.5 kg por semana.')}</li>
				</ul>
			</Panel>
			<Panel tag={t('Tracking rule', 'Regla de seguimiento')} title={t('Two-week experiment', 'Experimento de dos semanas')}>
				<ol>
					<li>{t('Weigh yourself in the morning after using the bathroom.', 'Pesate por la manana despues de ir al bano.')}</li>
					<li>{t('Track the weekly average, not a single random day.', 'Sigue el promedio semanal, no un dia suelto.')}</li>
					<li>{t('If weight is not increasing after 2 weeks, add 300–500 kcal/day.', 'Si el peso no sube despues de 2 semanas, agrega 300–500 kcal/dia.')}</li>
				</ol>
			</Panel>
		</div>
		<Callout>
			<strong>{t('Important', 'Importante')}:</strong> {t('do not accidentally meal prep like you are dieting. Your meals need to be large, calorie-dense, and easy to repeat.', 'no prepares comida como si estuvieras a dieta. Tus comidas deben ser grandes, densas en calorias y faciles de repetir.')}
		</Callout>
	</Card>

	<Card id="system" title={m.guide_core_title({}, { locale })}>
		<p>
			{m.guide_core_body({}, { locale })}
		</p>
		<p class="formula">{m.guide_formula({}, { locale })}</p>
		<div class="grid grid-3">
			<Panel tag={t('Carb base', 'Base de carbohidrato')}>
				<ul>
					<li>{t('Rice', 'Arroz')}</li>
					<li>{t('Potatoes', 'Papas')}</li>
					<li>{t('Oats', 'Avena')}</li>
					<li>Pasta</li>
					<li>Tortillas</li>
					<li>{t('Bolillo or bread', 'Bolillo o pan')}</li>
				</ul>
			</Panel>
			<Panel tag={t('Protein anchor', 'Proteina base')}>
				<ul>
					<li>{t('Eggs', 'Huevos')}</li>
					<li>{t('Beans or lentils', 'Frijoles o lentejas')}</li>
					<li>{t('Chicken thighs/legs', 'Muslos o piernas de pollo')}</li>
					<li>{t('Tuna or sardines', 'Atun o sardinas')}</li>
					<li>{t('Milk/yogurt', 'Leche/yogur')}</li>
					<li>{t('Cheese when budget allows', 'Queso si el presupuesto alcanza')}</li>
				</ul>
			</Panel>
			<Panel tag={t('Calorie booster', 'Extra calorico')}>
				<ul>
					<li>{t('Peanut butter', 'Crema de cacahuate')}</li>
					<li>{t('Peanuts', 'Cacahuates')}</li>
					<li>{t('Whole milk', 'Leche entera')}</li>
					<li>{t('Oil', 'Aceite')}</li>
					<li>{t('Crema or mayo', 'Crema o mayonesa')}</li>
					<li>{t('Avocado when affordable', 'Aguacate cuando sea accesible')}</li>
				</ul>
			</Panel>
		</div>
	</Card>

	<Card id="appliances" title={m.guide_appliances_title({}, { locale })}>
		<Table>
			<thead>
				<tr><th>{t('Appliance', 'Aparato')}</th><th>{t('Best use', 'Mejor uso')}</th><th>{t('Notes', 'Notas')}</th></tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>{t('Rice cooker', 'Olla arrocera')}</strong></td>
					<td>{t('Rice, lentils, simple bean-like stews, oatmeal-style batches', 'Arroz, lentejas, guisos simples tipo frijol, tandas estilo avena')}</td>
					<td>{t('Lentils are easier than beans because they cook faster and usually do not need soaking.', 'Las lentejas son mas faciles que los frijoles porque se cocinan mas rapido y normalmente no necesitan remojo.')}</td>
				</tr>
				<tr>
					<td><strong>{t('Air fryer / small oven', 'Freidora de aire / horno pequeno')}</strong></td>
					<td>{t('Chicken thighs/legs, potatoes, roasted vegetables', 'Muslos/piernas de pollo, papas, verduras rostizadas')}</td>
					<td>{t('Use on weekends for bulk protein and carb prep.', 'Usalos el fin de semana para preparar proteina y carbohidratos en volumen.')}</td>
				</tr>
				<tr>
					<td><strong>{t('Blender', 'Licuadora')}</strong></td>
					<td>{t('Salsas, creamy sauces, smoothies when available', 'Salsas, cremas, licuados cuando se pueda')}</td>
					<td>{t('Make sauces on weekends so weekday food tastes fresh.', 'Haz salsas el fin de semana para que la comida entre semana sepa fresca.')}</td>
				</tr>
				<tr>
					<td><strong>{t('Microwave', 'Microondas')}</strong></td>
					<td>{t('Reheating rice bowls, lentils, chicken, potatoes, oats', 'Recalentar bowls de arroz, lentejas, pollo, papas, avena')}</td>
					<td>{t('Your main weekday reheating tool.', 'Tu herramienta principal para recalentar entre semana.')}</td>
				</tr>
				<tr>
					<td><strong>{t('Electric grill', 'Parrilla electrica')}</strong></td>
					<td>{t('Tortillas, quesadillas, tortas, crisping chicken/potatoes', 'Tortillas, quesadillas, tortas, dorar pollo/papas')}</td>
					<td>{t('This makes reheated food feel freshly cooked.', 'Esto hace que la comida recalentada se sienta recien hecha.')}</td>
				</tr>
			</tbody>
		</Table>
	</Card>

	<Card id="weekend" title={m.guide_weekend_title({}, { locale })}>
		<p>
			{m.guide_weekend_body({}, { locale })}
		</p>
		<ol class="timeline">
			<li>
				<h3>{t('Cook a big rice batch', 'Cocina una tanda grande de arroz')}</h3>
				<p>
					{t('Use about 3 cups of dry rice. Add salt, garlic/onion powder, and a little oil or butter if available. Portion after cooking.', 'Usa unas 3 tazas de arroz seco. Agrega sal, ajo/cebolla en polvo y un poco de aceite o mantequilla si hay. Porciona despues de cocinar.')}
				</p>
			</li>
			<li>
				<h3>{t('Cook lentils or beans', 'Cocina lentejas o frijoles')}</h3>
				<p>
					{t('Lentils are the easiest option. Cook 500 g–1 kg with water, onion/garlic, cumin, chipotle, tomato, or bay leaf. Salt after they soften.', 'Las lentejas son la opcion mas facil. Cocina 500 g–1 kg con agua, cebolla/ajo, comino, chipotle, jitomate o laurel. Sala despues de que se ablanden.')}
				</p>
			</li>
			<li>
				<h3>{t('Cook chicken thighs/legs', 'Cocina muslos o piernas de pollo')}</h3>
				<p>
					{t('Use 1.5–2.5 kg. Season with salt, pepper, garlic, paprika, lime, oil, salsa, chipotle, or adobo. Shred or portion after cooking.', 'Usa 1.5–2.5 kg. Sazona con sal, pimienta, ajo, paprika, limon, aceite, salsa, chipotle o adobo. Deshebra o porciona despues de cocinar.')}
				</p>
			</li>
			<li>
				<h3>{t('Roast potatoes', 'Rostiza papas')}</h3>
				<p>
					{t('Cook 1.5–2 kg of potatoes as cubes, wedges, or whole baked potatoes. Add oil and salt. Reheat in microwave, then crisp on the electric grill if desired.', 'Cocina 1.5–2 kg de papas en cubos, gajos o enteras. Agrega aceite y sal. Recalienta en microondas y dora en la parrilla si quieres.')}
				</p>
			</li>
			<li>
				<h3>{t('Blend two sauces', 'Licua dos salsas')}</h3>
				<p>
					{t('Make one bright salsa and one creamy sauce. Sauces are the easiest way to prevent meal-prep boredom.', 'Haz una salsa fresca y una salsa cremosa. Las salsas son la forma mas facil de evitar aburrirte.')}
				</p>
			</li>
		</ol>
		<div class="grid">
			<Panel title="Salsa roja">
				<ul>
					<li>{t('Tomatoes', 'Jitomates')}</li>
					<li>{t('Onion', 'Cebolla')}</li>
					<li>{t('Garlic', 'Ajo')}</li>
					<li>Chile de árbol, chipotle, or jalapeño</li>
					<li>{t('Salt and lime', 'Sal y limon')}</li>
				</ul>
			</Panel>
			<Panel title={t('Creamy chipotle sauce', 'Salsa cremosa de chipotle')}>
				<ul>
					<li>{t('Crema, yogurt, mayo, or a mix', 'Crema, yogur, mayonesa o una mezcla')}</li>
					<li>Chipotle</li>
					<li>{t('Lime', 'Limon')}</li>
					<li>{t('Garlic', 'Ajo')}</li>
					<li>{t('Salt', 'Sal')}</li>
				</ul>
			</Panel>
		</div>
	</Card>

	<Card id="weekday" title={m.guide_weekday_title({}, { locale })}>
		<div class="grid grid-3">
			<Panel tag={m.breakfast({}, { locale })} title={t('High-calorie oats', 'Avena alta en calorias')}>
				<ul>
					<li>{t('100 g oats', '100 g de avena')}</li>
					<li>{t('400–500 ml whole milk', '400–500 ml de leche entera')}</li>
					<li>{t('1 banana', '1 platano')}</li>
					<li>{t('1–2 tbsp peanut butter', '1–2 cucharadas de crema de cacahuate')}</li>
					<li>{t('Cinnamon or sugar if desired', 'Canela o azucar si quieres')}</li>
				</ul>
				<p><strong>{t('Why', 'Por que')}:</strong> {t('cheap, fast, high-calorie, and easy to repeat.', 'barata, rapida, alta en calorias y facil de repetir.')}</p>
			</Panel>
			<Panel tag={m.lunch({}, { locale })} title={t('Rice bowl', 'Bowl de arroz')}>
				<ul>
					<li>{t('1.5–2 cups cooked rice', '1.5–2 tazas de arroz cocido')}</li>
					<li>{t('1 cup lentils or beans', '1 taza de lentejas o frijoles')}</li>
					<li>{t('150–250 g cooked chicken', '150–250 g de pollo cocido')}</li>
					<li>Salsa</li>
					<li>{t('3–6 tortillas', '3–6 tortillas')}</li>
				</ul>
				<p><strong>{t('Why', 'Por que')}:</strong> {t('this should be your main workhorse meal.', 'esta debe ser tu comida base principal.')}</p>
			</Panel>
			<Panel tag={m.dinner({}, { locale })} title={t('Grill assembly', 'Armado en parrilla')}>
				<ul>
					<li>{t('Chicken tacos', 'Tacos de pollo')}</li>
					<li>{t('Bean/chicken quesadillas', 'Quesadillas de frijol/pollo')}</li>
					<li>{t('Loaded potatoes', 'Papas cargadas')}</li>
					<li>{t('Tuna rice bowl', 'Bowl de atun con arroz')}</li>
					<li>{t('Chicken torta', 'Torta de pollo')}</li>
				</ul>
				<p><strong>{t('Why', 'Por que')}:</strong> {t('same prep, different form.', 'misma preparacion, forma distinta.')}</p>
			</Panel>
		</div>
		<h3>{m.emergency_meals({}, { locale })}</h3>
		<div class="grid">
			<Panel>
				<ul>
					<li>{t('Egg tacos: eggs + tortillas + salsa.', 'Tacos de huevo: huevos + tortillas + salsa.')}</li>
					<li>{t('Tuna rice: rice + tuna + mayo/crema + salsa.', 'Arroz con atun: arroz + atun + mayo/crema + salsa.')}</li>
					<li>{t('Oats: oats + milk + banana + peanut butter.', 'Avena: avena + leche + platano + crema de cacahuate.')}</li>
				</ul>
			</Panel>
			<Panel>
				<ul>
					<li>{t('Bean quesadillas: tortillas + beans + cheese if available.', 'Quesadillas de frijol: tortillas + frijoles + queso si hay.')}</li>
					<li>{t('Pasta + sardines/tuna + tomato sauce.', 'Pasta + sardinas/atun + salsa de jitomate.')}</li>
					<li>{t('Peanut butter banana sandwich + milk.', 'Sandwich de crema de cacahuate con platano + leche.')}</li>
				</ul>
			</Panel>
		</div>
	</Card>

	<Card id="first-week" title={m.guide_first_week_title({}, { locale })}>
		<h3>{t('Sunday prep', 'Preparacion del domingo')}</h3>
		<Table>
			<thead>
				<tr><th>{t('Prep item', 'Preparacion')}</th><th>{t('Amount', 'Cantidad')}</th><th>{t('Use during week', 'Uso en la semana')}</th></tr>
			</thead>
			<tbody>
				<tr><td>{t('Rice', 'Arroz')}</td><td>{t('3 cups dry', '3 tazas seco')}</td><td>{t('Lunch bowls, tuna rice, dinner base', 'Bowls, arroz con atun, base de cena')}</td></tr>
				<tr><td>{t('Lentils', 'Lentejas')}</td><td>700 g</td><td>{t('Bowls, tacos, soup, quesadillas', 'Bowls, tacos, sopa, quesadillas')}</td></tr>
				<tr><td>{t('Chicken thighs/legs', 'Muslos/piernas de pollo')}</td><td>2 kg</td><td>{t('Bowls, tacos, tortas, loaded potatoes', 'Bowls, tacos, tortas, papas cargadas')}</td></tr>
				<tr><td>{t('Potatoes', 'Papas')}</td><td>1.5 kg</td><td>{t('Dinners, sides, loaded potatoes', 'Cenas, acompanamientos, papas cargadas')}</td></tr>
				<tr><td>{t('Sauces', 'Salsas')}</td><td>{t('2 containers', '2 recipientes')}</td><td>{t('Add flavor and calories', 'Agregar sabor y calorias')}</td></tr>
				<tr><td>{t('Optional boiled eggs', 'Huevos cocidos opcionales')}</td><td>{t('10 eggs', '10 huevos')}</td><td>{t('Snacks, breakfast, emergency protein', 'Snacks, desayuno, proteina de emergencia')}</td></tr>
			</tbody>
		</Table>
		<h3>{t('Weekday dinner rotation', 'Rotacion de cenas')}</h3>
		<div class="grid grid-3">
			<Panel><strong>{t('Monday', 'Lunes')}</strong><p>{t('Chicken tacos with salsa.', 'Tacos de pollo con salsa.')}</p></Panel>
			<Panel><strong>{t('Tuesday', 'Martes')}</strong><p>{t('Loaded potatoes with lentils/chicken.', 'Papas cargadas con lentejas/pollo.')}</p></Panel>
			<Panel><strong>{t('Wednesday', 'Miercoles')}</strong><p>{t('Bean/chicken quesadillas.', 'Quesadillas de frijol/pollo.')}</p></Panel>
			<Panel><strong>{t('Thursday', 'Jueves')}</strong><p>{t('Tuna rice bowl with creamy sauce.', 'Bowl de arroz con atun y salsa cremosa.')}</p></Panel>
			<Panel><strong>{t('Friday', 'Viernes')}</strong><p>{t('Chicken/lentil torta or tacos.', 'Torta o tacos de pollo/lentejas.')}</p></Panel>
		</div>
		<Callout>
			<strong>{t('Daily non-negotiable', 'No negociable diario')}:</strong> {t('breakfast + lunch + dinner + one calorie-dense snack. For you, snacks are part of the meal plan, not “extras.”', 'desayuno + comida + cena + un snack denso en calorias. Para ti, los snacks son parte del plan, no extras.')}
		</Callout>
	</Card>

	<Card id="shopping" title={m.guide_shopping_title({}, { locale })}>
		<div class="grid">
			<div>
				<h3>{t('Core groceries', 'Compras base')}</h3>
				<Table>
					<thead>
						<tr><th>{t('Item', 'Articulo')}</th><th>{t('Suggested amount/week', 'Cantidad sugerida/semana')}</th></tr>
					</thead>
					<tbody>
						<tr><td>{t('Oats', 'Avena')}</td><td>1–1.5 kg</td></tr>
						<tr><td>{t('Rice', 'Arroz')}</td><td>1–2 kg</td></tr>
						<tr><td>{t('Lentils or beans', 'Lentejas o frijoles')}</td><td>{t('1–1.5 kg dry', '1–1.5 kg secos')}</td></tr>
						<tr><td>{t('Eggs', 'Huevos')}</td><td>24–36</td></tr>
						<tr><td>{t('Whole milk', 'Leche entera')}</td><td>7–10 L</td></tr>
						<tr><td>Tortillas</td><td>2–4 kg</td></tr>
						<tr><td>{t('Bananas', 'Platanos')}</td><td>2–3 kg</td></tr>
						<tr><td>{t('Chicken thighs/legs', 'Muslos/piernas de pollo')}</td><td>1.5–3 kg</td></tr>
						<tr><td>{t('Potatoes or pasta', 'Papas o pasta')}</td><td>1–2 kg</td></tr>
						<tr><td>{t('Tuna/sardines', 'Atun/sardinas')}</td><td>{t('3–6 cans', '3–6 latas')}</td></tr>
						<tr><td>{t('Peanut butter or peanuts', 'Crema de cacahuate o cacahuates')}</td><td>500 g–1 kg</td></tr>
					</tbody>
				</Table>
			</div>
			<div>
				<h3>{t('Flavor and vegetables', 'Sabor y verduras')}</h3>
				<Table>
					<thead>
						<tr><th>{t('Item', 'Articulo')}</th><th>{t('Purpose', 'Uso')}</th></tr>
					</thead>
					<tbody>
						<tr><td>{t('Tomatoes', 'Jitomates')}</td><td>{t('Salsa, rice bowls', 'Salsa, bowls de arroz')}</td></tr>
						<tr><td>{t('Onion and garlic', 'Cebolla y ajo')}</td><td>{t('Base flavor', 'Sabor base')}</td></tr>
						<tr><td>{t('Chiles/chipotle', 'Chiles/chipotle')}</td><td>{t('Salsas and sauces', 'Salsas')}</td></tr>
						<tr><td>{t('Cabbage', 'Col')}</td><td>{t('Cheap crunchy veg', 'Verdura crujiente barata')}</td></tr>
						<tr><td>{t('Carrots', 'Zanahorias')}</td><td>{t('Cheap vegetable', 'Verdura barata')}</td></tr>
						<tr><td>{t('Frozen vegetables', 'Verduras congeladas')}</td><td>{t('Convenient backup', 'Respaldo conveniente')}</td></tr>
						<tr><td>{t('Crema/yogurt/mayo', 'Crema/yogur/mayo')}</td><td>{t('Creamy sauce and calories', 'Salsa cremosa y calorias')}</td></tr>
						<tr><td>{t('Cheese', 'Queso')}</td><td>{t('Quesadillas, calories, flavor', 'Quesadillas, calorias, sabor')}</td></tr>
						<tr><td>{t('Avocado', 'Aguacate')}</td><td>{t('Great when affordable', 'Bueno cuando alcanza')}</td></tr>
						<tr><td>{t('Bolillos or bread', 'Bolillos o pan')}</td><td>{t('Tortas, sandwiches', 'Tortas, sandwiches')}</td></tr>
					</tbody>
				</Table>
			</div>
		</div>
	</Card>

	<Card id="safety" title={m.guide_safety_title({}, { locale })}>
		<Callout>
			{t('Rice, chicken, and cooked legumes are great for meal prep, but they need proper cooling and storage.', 'El arroz, pollo y legumbres cocidas son excelentes para meal prep, pero necesitan enfriarse y guardarse bien.')}
		</Callout>
		<ul>
			<li>{t('Refrigerate cooked food within 1–2 hours.', 'Refrigera la comida cocida en 1–2 horas.')}</li>
			<li>{t('Do not leave rice or chicken out overnight.', 'No dejes arroz o pollo fuera toda la noche.')}</li>
			<li>{t('Keep only 2–3 days of food in the fridge if possible.', 'Mantén solo 2–3 dias de comida en el refri si se puede.')}</li>
			<li>{t('Freeze Thursday/Friday meals if you have freezer access.', 'Congela comidas de jueves/viernes si tienes congelador.')}</li>
			<li>{t('Reheat food until steaming hot.', 'Recalienta hasta que salga vapor.')}</li>
			<li>{t('Store sauces separately when possible.', 'Guarda salsas por separado cuando se pueda.')}</li>
			<li>{t('Do not reheat the same container over and over. Portion first.', 'No recalientes el mismo recipiente una y otra vez. Porciona primero.')}</li>
			<li>{t('If you do not have freezer access, prep 3–4 days max and do a smaller midweek batch.', 'Si no tienes congelador, prepara maximo 3–4 dias y haz una tanda pequena a media semana.')}</li>
		</ul>
	</Card>

	<Card id="adjust" title={m.guide_adjust_title({}, { locale })}>
		<p>
			{t('If your average weight does not rise after 2 weeks, add one of these daily. Do not change everything at once.', 'Si tu peso promedio no sube despues de 2 semanas, agrega una de estas opciones cada dia. No cambies todo a la vez.')}
		</p>
		<div class="grid grid-3">
			<Panel tag={t('Easy liquid calories', 'Calorias liquidas faciles')}>
				<ul>
					<li>{t('500 ml whole milk', '500 ml de leche entera')}</li>
					<li>{t('Milk + oats + banana', 'Leche + avena + platano')}</li>
					<li>{t('Milk with peanut butter on the side', 'Leche con crema de cacahuate aparte')}</li>
				</ul>
			</Panel>
			<Panel tag={t('Cheap solid calories', 'Calorias solidas baratas')}>
				<ul>
					<li>{t('4 extra tortillas', '4 tortillas extra')}</li>
					<li>{t('1 extra cup of rice', '1 taza extra de arroz')}</li>
					<li>{t('1 extra potato', '1 papa extra')}</li>
					<li>{t('1 peanut butter sandwich', '1 sandwich de crema de cacahuate')}</li>
				</ul>
			</Panel>
			<Panel tag={t('Protein/calorie boost', 'Extra de proteina/calorias')}>
				<ul>
					<li>{t('2 extra eggs', '2 huevos extra')}</li>
					<li>{t('Extra lentils/beans', 'Mas lentejas/frijoles')}</li>
					<li>{t('Extra chicken portion', 'Porcion extra de pollo')}</li>
					<li>{t('1 spoonful oil in rice/lentils', '1 cucharada de aceite en arroz/lentejas')}</li>
				</ul>
			</Panel>
		</div>
		<Callout>
			<strong>{t('Simple rule', 'Regla simple')}:</strong> {t('if the scale is not moving, add one daily calorie booster and check again after one week.', 'si la bascula no se mueve, agrega un extra calorico diario y revisa de nuevo despues de una semana.')}
		</Callout>
	</Card>

	<footer class="muted disclaimer">
		{m.guide_disclaimer({}, { locale })}
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
