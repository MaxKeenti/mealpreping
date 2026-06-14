import type { ActivityLevel, Appetite, Goal, NutritionTargets, UserProfile } from '$lib/data';

const activityKcalPerKg: Record<ActivityLevel, number> = {
	low: 33,
	moderate: 36.5,
	high: 40
};

const goalKcalPerKg: Record<Goal, number> = {
	gain: 5.5,
	maintain: 0,
	cut: -5.5
};

const appetiteKcalPerKg: Record<Appetite, number> = {
	low: -1.5,
	medium: 0,
	high: 0.75,
	insatiable: 1.5
};

const proteinGramsPerKg: Record<Goal, { min: number; max: number }> = {
	gain: { min: 1.6, max: 2 },
	maintain: { min: 1.4, max: 1.8 },
	cut: { min: 1.8, max: 2.2 }
};

export interface TargetOptions {
	calorieBump?: number;
}

export function calculateNutritionTargets(
	profile: Pick<UserProfile, 'weightKg' | 'goal' | 'activityLevel' | 'appetite'>,
	options: TargetOptions = {}
): NutritionTargets {
	if (profile.weightKg <= 0) {
		throw new Error('weightKg must be greater than zero');
	}

	const perKg =
		activityKcalPerKg[profile.activityLevel] +
		goalKcalPerKg[profile.goal] +
		appetiteKcalPerKg[profile.appetite];
	const calorieSpreadPerKg = 2.9;
	const calorieBump = options.calorieBump ?? 0;
	const proteinRange = proteinGramsPerKg[profile.goal];

	return {
		caloriesMin: roundTo(profile.weightKg * (perKg - calorieSpreadPerKg) + calorieBump, 50),
		caloriesMax: roundTo(profile.weightKg * (perKg + calorieSpreadPerKg) + calorieBump, 50),
		proteinMin: roundTo(profile.weightKg * proteinRange.min, 5),
		proteinMax: roundTo(profile.weightKg * proteinRange.max, 5)
	};
}

export function targetMidpoint(targets: Pick<NutritionTargets, 'caloriesMin' | 'caloriesMax'>): number {
	return (targets.caloriesMin + targets.caloriesMax) / 2;
}

export function roundTo(value: number, increment: number): number {
	return Math.round(value / increment) * increment;
}
