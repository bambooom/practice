// https://leetcode.com/problems/separate-squares-ii/
// You are given a 2D integer array squares. Each squares[i] = [xi, yi, li] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.
// Find the minimum y-coordinate value of a horizontal line such that the total area covered by squares above the line equals the total area covered by squares below the line.
// Answers within 10^-5 of the actual answer will be accepted.
// Note: Squares may overlap. Overlapping areas should be counted only once in this version.

// Example 1:
// Input: squares = [[0,0,1],[2,2,1]]
// Output: 1.00000
// Explanation:
// Any horizontal line between y = 1 and y = 2 results in an equal split, with 1 square unit above and 1 square unit below. The minimum y-value is 1.

// Example 2:
// Input: squares = [[0,0,2],[1,1,1]]
// Output: 1.00000
// Explanation:
// Since the blue square overlaps with the red square, it will not be counted again. Thus, the line y = 1 splits the squares into two equal parts.

// Constraints:
// 1 <= squares.length <= 5 * 10^4
// squares[i] = [xi, yi, li]
// squares[i].length == 3
// 0 <= xi, yi <= 10^9
// 1 <= li <= 10^9
// The total area of all the squares will not exceed 10^15.

// https://leetcode.com/problems/separate-squares-ii/solutions/7492982/find-the-horizontal-line-in-n-log-n-by-s-mh32/?envType=daily-question&envId=2026-01-14
// Since squares may overlap, we cannot sum individual areas. Instead, we compute the union area using a sweep line algorithm along the y-axis.
// Consider squares [x, y, l]:
// 1. Each square contributes:
//   - A start event at y
//   - An end event at y + l
// 2. We sweep from bottom to top:
//   - Track which x-intervals are currently active
//   - Active width * vertical distance, gives area for that slice
// 3. First sweep: Compute the total union area
// 4. Second sweep:
//   - Accumulate area again
//   - When accumulated area reaches totalArea / 2,
//     interpolate inside that vertical segment:
//        splitY = prevY + (remainingArea / activeWidth)
//     This splitY is the required answer.
function separateSquaresII(squares: number[][]): number {
  if (!squares || squares.length === 0) return 0;

  // Fast path: all squares aligned
  const baseY = squares[0][1];
  const baseL = squares[0][2];
  let same = true;

  for (let i = 1; i < squares.length; i++) {
    if (squares[i][1] !== baseY || squares[i][2] !== baseL) {
      same = false;
      break;
    }
  }

  if (same) {
    // All squares have the same y-coordinate and side length.
    // Return the average of the y-coordinate and the side length divided by 2.
    return baseY + baseL / 2;
  }

  // Buld sweep events
  const events: number[][] = [];
  const xSet = new Set<number>();

  for (const [x, y, l] of squares) {
    // Add start and end events for each square
    events.push([y, 0, x, x + l]); // start
    events.push([y + l, 1, x, x + l]); // end
    // Add x-coordinates to the set for compression
    xSet.add(x);
    xSet.add(x + l);
  }

  events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1])); // sort by y, then by start/end

  // x coordinates compression
  const xs = [...xSet].sort((a, b) => a - b);
  const xIndex = new Map<number, number>();
  xs.forEach((x, i) => {
    xIndex.set(x, i); // x -> index
  });

  const widths: number[] = [];
  for (let i = 0; i < xs.length - 1; i++) {
    widths.push(xs[i + 1] - xs[i]); // width between two x coordinates
  }

  // First sweep: total area
  let intervals = new Array(widths.length).fill(0);
  let activeWidth = 0;
  let totalArea = 0;
  let prevY = events[0][0];

  for (const [y, type, x1, x2] of events) {
    if (y > prevY) {
      // Calculate the area for the current vertical slice
      totalArea += activeWidth * (y - prevY);
    }

    const l = xIndex.get(x1)!;
    const r = xIndex.get(x2)!;
    const delta = type === 0 ? 1 : -1;

    for (let i = l; i < r; i++) {
      const wasActive = intervals[i] > 0;
      intervals[i] += delta;
      const isActive = intervals[i] > 0;

      if (!wasActive && isActive) {
        activeWidth += widths[i];
      } else if (wasActive && !isActive) {
        activeWidth -= widths[i];
      }
    }
    prevY = y;
  }

  // Second sweep: find split line
  intervals.fill(0);
  activeWidth = 0;
  prevY = events[0][0];
  let currArea = 0;
  const halfArea = totalArea / 2;

  for (const [y, type, x1, x2] of events) {
    if (y > prevY) {
      // Calculate the area for the current vertical slice
      const area = activeWidth * (y - prevY);
      if (currArea + area >= halfArea) {
        // The current vertical slice contributes more than half of the total area.
        // Interpolate the split line inside the vertical slice.
        return prevY + (halfArea - currArea) / activeWidth;
      }
      currArea += area;
    }

    const l = xIndex.get(x1)!;
    const r = xIndex.get(x2)!;
    const delta = type === 0 ? 1 : -1;

    for (let i = l; i < r; i++) {
      const wasActive = intervals[i] > 0;
      intervals[i] += delta;
      const isActive = intervals[i] > 0;

      if (!wasActive && isActive) {
        activeWidth += widths[i];
      } else if (wasActive && !isActive) {
        activeWidth -= widths[i];
      }
    }

    prevY = y;
  }

  // If no split line is found, return the y-coordinate of the last event.
  return events[events.length - 1][0];
}

// https://leetcode.com/problems/separate-squares-ii/solutions/6476380/line-sweep-approach-on-log-n-beats-100-b-ks64/?envType=daily-question&envId=2026-01-14
function separateSquaresII2(squares: number[][]): number {
  // Check for empty input
  if (!squares || squares.length === 0) return 0;

  // Special case: If all squares have the same y-coordinate and height
  // We can solve it more efficiently
  const sampleY = squares[0][1];
  const sampleL = squares[0][2];
  let allSameYAndL = true;

  for (let i = 1; i < squares.length; i++) {
    if (squares[i][1] !== sampleY || squares[i][2] !== sampleL) {
      allSameYAndL = false;
      break;
    }
  }

  if (allSameYAndL) {
    // If all squares have the same y and length, the answer is simple:
    // The halfway point will be exactly at y + length/2
    return sampleY + sampleL / 2;
  }

  // For the general case, use the efficient line sweep algorithm
  // Create events for each square's bottom and top edges
  const events = [];

  for (const [x, y, l] of squares) {
    events.push([y, 0, x, x + l]); // Bottom edge (start)
    events.push([y + l, 1, x, x + l]); // Top edge (end)
  }

  // Sort events by y-coordinate
  events.sort((a, b) => a[0] - b[0]);

  // Collect unique x-coordinates in a more memory-efficient way
  const xSet = new Set<number>();
  for (const [x, , l] of squares) {
    xSet.add(x);
    xSet.add(x + l);
  }
  const sortedX: number[] = [...xSet].sort((a, b) => a - b);

  // Create mapping from x-coordinate to index for faster lookups
  const xToIndex = new Map<number, number>();
  for (let i = 0; i < sortedX.length; i++) {
    xToIndex.set(sortedX[i], i);
  }

  const n = sortedX.length;
  const intervals = new Array(n - 1).fill(0);

  // Calculate width lookup for quick access
  const widths = new Array(n - 1);
  for (let i = 0; i < n - 1; i++) {
    widths[i] = sortedX[i + 1] - sortedX[i];
  }

  // First pass: calculate total area more efficiently
  let totalArea = 0;
  let prevY = events[0][0];
  let activeWidth = 0;

  for (const [y, type, left, right] of events) {
    // Add area between current and previous y-coordinate
    if (y > prevY) {
      totalArea += activeWidth * (y - prevY);
    }

    // Get indices efficiently using the map
    const leftIndex = xToIndex.get(left)!;
    const rightIndex = xToIndex.get(right)!;

    // Update intervals and active width
    for (let i = leftIndex; i < rightIndex; i++) {
      const wasActive = intervals[i] > 0;
      intervals[i] += type === 0 ? 1 : -1;
      const isActive = intervals[i] > 0;

      if (!wasActive && isActive) {
        activeWidth += widths[i];
      } else if (wasActive && !isActive) {
        activeWidth -= widths[i];
      }
    }

    prevY = y;
  }

  // Reset for second pass
  intervals.fill(0);
  let currentArea = 0;
  prevY = events[0][0];
  activeWidth = 0;

  // Second pass: find the y-coordinate where area is split equally
  const halfTotalArea = totalArea / 2;

  for (const [y, type, left, right] of events) {
    // Calculate area between current and previous y-coordinate
    if (y > prevY) {
      const segmentArea = activeWidth * (y - prevY);

      // Check if adding this area exceeds half the total
      if (currentArea + segmentArea >= halfTotalArea) {
        // Calculate the exact y-coordinate
        if (activeWidth > 0) {
          const neededArea = halfTotalArea - currentArea;
          return prevY + neededArea / activeWidth;
        }
        return prevY;
      }

      currentArea += segmentArea;
    }

    // Get indices efficiently using the map
    const leftIndex = xToIndex.get(left)!;
    const rightIndex = xToIndex.get(right)!;

    // Update intervals and active width
    for (let i = leftIndex; i < rightIndex; i++) {
      const wasActive = intervals[i] > 0;
      intervals[i] += type === 0 ? 1 : -1;
      const isActive = intervals[i] > 0;

      if (!wasActive && isActive) {
        activeWidth += widths[i];
      } else if (wasActive && !isActive) {
        activeWidth -= widths[i];
      }
    }

    prevY = y;
  }

  return events[events.length - 1][0];
}
