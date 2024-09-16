// https://leetcode.com/problems/minimum-time-difference
// Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.

// Example 1:
// Input: timePoints = ["23:59","00:00"]
// Output: 1
// Example 2:
// Input: timePoints = ["00:00","23:59","00:00"]
// Output: 0

// https://leetcode.com/problems/minimum-time-difference/solutions/4421357/ts-sorting-solution/
// convert to minutes, and sort
function findMinDifference(timePoints: string[]): number {
  const getMinutes = (time: string) => {
    const [hour, minutes] = time.split(':');
    return +hour * 60 + +minutes;
  };

  timePoints.sort();
  const timeMinutes = timePoints.map((t) => getMinutes(t));
  timeMinutes.push(timeMinutes[0] + 24 * 60);

  let min = Infinity;

  for (let i = 1; i < timeMinutes.length; i++) {
    min = Math.min(min, timeMinutes[i] - timeMinutes[i - 1]);
  }

  return min;
}

// https://leetcode.com/problems/minimum-time-difference/solutions/5167656/minimum-time-difference/
function findMinDifference2(timePoints: string[]): number {
  // Helper function to convert "HH:MM" to minutes from start of the day
  function toMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Convert all time points to minutes
  const minutesArray = timePoints.map(toMinutes);

  // Sort the array of minutes
  minutesArray.sort((a, b) => a - b);

  let minDifference = Infinity;
  const n = minutesArray.length;

  // Calculate differences between consecutive time points
  for (let i = 1; i < n; i++) {
    const diff = minutesArray[i] - minutesArray[i - 1];
    minDifference = Math.min(minDifference, diff);
  }

  // Circular difference (between the last and first time point)
  const circularDiff = 24 * 60 - minutesArray[n - 1] + minutesArray[0];
  minDifference = Math.min(minDifference, circularDiff);

  return minDifference;
}
