// Copyright 2025 codinglombok
// Licensed under the Apache License, Version 2.0 (see LICENSE or
// http://www.apache.org/licenses/LICENSE-2.0).
// scripts/gen-vectors.mjs — regenerate vectors/lombokcharts-vectors-v1.json from the canonical
// JS implementation. Ports of the pure core must reproduce
// every expected value. Run only when the SPEC intentionally changes.
import { writeFileSync } from 'node:fs';
import { linearScale } from '../src/scales/linear.js';
import { ticks } from '../src/utils/math.js';
import { lttb, minMaxDecimate } from '../src/data/decimate.js';
import { RingBuffer } from '../src/data/ringbuffer.js';
import { formatNumber } from '../src/core/Scene.js';

const series = (n) => {
  const xs = [], ys = [];
  for (let i = 0; i < n; i++) { xs.push(i); ys.push(Math.round(Math.sin(i / 3) * 1000) / 1000 + (i === 17 ? 5 : 0)); }
  return { xs, ys };
};
const arr = (t, n) => Array.from(t).slice(0, n);

const v = { spec: 'LombokCharts core', version: 1, linearScale: [], ticks: [], lttb: [], minMaxDecimate: [], ringBuffer: [], formatNumber: [] };

for (const [domain, range, inputs] of [
  [[0, 100], [0, 500], [0, 25, 50, 100, 120]],
  [[-10, 10], [400, 0], [-10, 0, 5, 10]],
  [[5, 5], [0, 100], [5, 4.5, 5.5]],
]) {
  const s = linearScale(domain, range);
  v.linearScale.push({ domain, range, inputs, expected: inputs.map(s), invert: [range[0], range[1]].map(s.invert) });
}
for (const [min, max, count] of [[0, 100, 6], [0, 1, 5], [-3.2, 7.9, 6], [0, 1234567, 6], [10, 10, 6]]) {
  v.ticks.push({ min, max, count, expected: ticks(min, max, count) });
}
for (const [n, threshold] of [[50, 10], [50, 50], [50, 2], [200, 25]]) {
  const { xs, ys } = series(n);
  const r = lttb(xs, ys, n, threshold);
  v.lttb.push({ n, threshold, xs, ys, expected: { count: r.count, xs: arr(r.xs, r.count), ys: arr(r.ys, r.count) } });
}
{
  const { xs, ys } = series(60);
  const r = minMaxDecimate(xs, ys, 60, 12);
  v.minMaxDecimate.push({ n: 60, threshold: 12, xs, ys, expected: { count: r.count, xs: arr(r.xs, r.count), ys: arr(r.ys, r.count) } });
}
for (const [capacity, pushes] of [[4, 3], [4, 10], [1, 5]]) {
  const rb = new RingBuffer(capacity);
  for (let i = 0; i < pushes; i++) rb.push(i, i * 10);
  const o = rb.toArrays();
  v.ringBuffer.push({ capacity, pushes, note: 'push(i, i*10) for i in 0..pushes-1', expected: { size: rb.size, xs: arr(o.xs, o.count), ys: arr(o.ys, o.count) } });
}
for (const x of [0, 7, -7, 3.14159, 0.5, 999, 1000, 1500, -2500, 1e6, 2.25e6, 1e9, 3.5e9]) v.formatNumber.push({ input: x, expected: formatNumber(x) });

writeFileSync(new URL('../vectors/lombokcharts-vectors-v1.json', import.meta.url), JSON.stringify(v, null, 1) + '\n');
console.log('wrote vectors/lombokcharts-vectors-v1.json');
