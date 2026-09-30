// tests/vectors.test.js — normative cross-language vectors (ADR-015).
import { readFileSync } from 'node:fs';
import { test, eq, approx } from './_t.js';
import { linearScale } from '../src/scales/linear.js';
import { ticks } from '../src/utils/math.js';
import { lttb, minMaxDecimate } from '../src/data/decimate.js';
import { RingBuffer } from '../src/data/ringbuffer.js';
import { formatNumber } from '../src/core/Scene.js';

const V = JSON.parse(readFileSync(new URL('../vectors/lombokcharts-vectors-v1.json', import.meta.url), 'utf8'));
const same = (a, b, what) => { eq(a.length, b.length, what + ' length'); a.forEach((x, i) => approx(x, b[i], 1e-9, `${what}[${i}]`)); };

test(`linearScale vectors (${V.linearScale.length})`, () => {
  for (const c of V.linearScale) { const s = linearScale(c.domain, c.range); same(c.inputs.map(s), c.expected, 'scale'); same(c.range.map(s.invert), c.invert, 'invert'); }
});
test(`ticks vectors (${V.ticks.length})`, () => { for (const c of V.ticks) same(ticks(c.min, c.max, c.count), c.expected, 'ticks'); });
test(`lttb vectors (${V.lttb.length})`, () => {
  for (const c of V.lttb) { const r = lttb(c.xs, c.ys, c.n, c.threshold); eq(r.count, c.expected.count); same(Array.from(r.xs), c.expected.xs, 'xs'); same(Array.from(r.ys), c.expected.ys, 'ys'); }
});
test(`minMaxDecimate vectors (${V.minMaxDecimate.length})`, () => {
  for (const c of V.minMaxDecimate) { const r = minMaxDecimate(c.xs, c.ys, c.n, c.threshold); eq(r.count, c.expected.count); same(Array.from(r.xs), c.expected.xs, 'xs'); same(Array.from(r.ys), c.expected.ys, 'ys'); }
});
test(`ringBuffer vectors (${V.ringBuffer.length})`, () => {
  for (const c of V.ringBuffer) { const rb = new RingBuffer(c.capacity); for (let i = 0; i < c.pushes; i++) rb.push(i, i * 10); const o = rb.toArrays(); eq(rb.size, c.expected.size); same(Array.from(o.xs), c.expected.xs, 'xs'); same(Array.from(o.ys), c.expected.ys, 'ys'); }
});
test(`formatNumber vectors (${V.formatNumber.length})`, () => { for (const c of V.formatNumber) eq(formatNumber(c.input), c.expected, String(c.input)); });
