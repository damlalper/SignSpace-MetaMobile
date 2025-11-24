import { Joint } from '../hooks/useHandTracking';

export const calculateSimilarity = (userJoints: Record<string, Joint>, targetJoints: Record<string, any>): number => {
    if (!userJoints || !targetJoints) return 0;

    let totalDistance = 0;
    let jointCount = 0;

    // Simplified comparison: check specific key joints
    const keyJoints = ['index_tip', 'wrist'];

    keyJoints.forEach(key => {
        if (userJoints[key] && targetJoints[key]) {
            const u = userJoints[key].position;
            const t = targetJoints[key].position;
            const distance = Math.sqrt(
                Math.pow(u.x - t.x, 2) +
                Math.pow(u.y - t.y, 2) +
                Math.pow(u.z - t.z, 2)
            );
            totalDistance += distance;
            jointCount++;
        }
    });

    if (jointCount === 0) return 0;

    const avgDistance = totalDistance / jointCount;
    // Normalize score: 0 distance = 1.0 score, > 0.2 distance = 0.0 score
    const score = Math.max(0, 1 - (avgDistance / 0.2));

    return score;
};
