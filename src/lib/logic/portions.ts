import type { Nutrition, NutritionTargets } from '$lib/data';
import { targetMidpoint } from './targets';

export function applyCalorieBump(targets: NutritionTargets, calorieBump: number): NutritionTargets {
	return {
		...targets,
		caloriesMin: targets.caloriesMin + calorieBump,
		caloriesMax: targets.caloriesMax + calorieBump
	};
}

export function clampPortionMultiplier(multiplier: number): number {
	return Math.min(1.8, Math.max(0.65, multiplier));
}

export function calculatePortionScale(
	averageDailyNutrition: Pick<Nutrition, 'calories'>,
	targets: Pick<NutritionTargets, 'caloriesMin' | 'caloriesMax'>
): number {
	if (averageDailyNutrition.calories <= 0) {
		return 1;
	}

	return clampPortionMultiplier(targetMidpoint(targets) / averageDailyNutrition.calories);
}
