// https://leetcode.com/problems/remove-interval
// A set of real numbers can be represented as the union of several disjoint intervals, where each interval is in the form [a, b). A real number x is in the set if one of its intervals [a, b) contains x (i.e. a <= x < b).
// You are given a sorted list of disjoint intervals intervals representing a set of real numbers as described above, where intervals[i] = [ai, bi] represents the interval [ai, bi). You are also given another interval toBeRemoved.
// Return the set of real numbers with the interval toBeRemoved removed from intervals. In other words, return the set of real numbers such that every x in the set is in intervals but not in toBeRemoved. Your answer should be a sorted list of disjoint intervals as described above.

// Example1:
// Input: intervals = [[0,2],[3,4],[5,7]], toBeRemoved = [1,6]
// Output: [[0,1],[6,7]]

function removeInterval(intervals: number[][], toBeRemoved: number[]): number[][] {
    let res: number[][] = []
    const [s, e] = toBeRemoved;

    for (const [a, b] of intervals) {
        if (b <= s || a >= e) { // 没有交集
            res.push([a, b])
            continue
        }
        if (a >= s && b <= e) continue // 包含在被删除的区间内
        if (a < s && b > s) { // a < s < b, s到b是要被删除的区间
            res.push([a, s])
        }
        if (a < e && b > e) { // a < e < b, a到e是要被删除的区间
            res.push([e, b])
        }
    }

    return res
};
