export class Sorting {
    static compareSeason(s1: Rest.SeasonJson, s2: Rest.SeasonJson): number {
        const x = s1.year.localeCompare(s2.year);
        if (x === 0) {
            return - s1.name.localeCompare(s2.name);
        }
        return - x;
    }
};
