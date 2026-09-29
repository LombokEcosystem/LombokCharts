// tests/i18n.test.js
import { test, eq, ok } from './_t.js';
import { MESSAGES, resolveLocale, messages, summarize, isRTL, numberFormatter, registerLocale, registerLocales } from '../src/i18n/messages.js';
import { LOCALES } from '../src/i18n/locales.js';

const CORE20 = ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'pt', 'ru', 'ur', 'id', 'de', 'ja', 'sw', 'mr', 'te', 'tr', 'ta', 'vi', 'ko'];

test('only English is built in (other catalogs are opt-in)', () => {
  eq(Object.keys(MESSAGES).join(','), 'en');
  eq(resolveLocale('id-ID'), 'en', 'unregistered locale falls back to en');
});
test('opt-in catalogs cover Core-20 + Nusantara with all keys and placeholders', () => {
  for (const l of [...CORE20.filter((x) => x !== 'en'), 'jv', 'su', 'ms']) {
    const m = LOCALES[l]; ok(m, 'missing ' + l);
    for (const k of ['noData', 'chart', 'summary']) ok(typeof m[k] === 'string' && m[k].length > 0, `${l}.${k}`);
    for (const p of ['{title}', '{type}', '{series}', '{points}']) ok(m.summary.includes(p), `${l}.summary ${p}`);
  }
  eq(Object.keys(LOCALES).length, 22);
});
test('registerLocale validates catalogs', () => {
  let threw = false;
  try { registerLocale('xx', { noData: 'a', chart: 'b', summary: 'no placeholders' }); } catch { threw = true; }
  ok(threw, 'missing placeholders rejected');
  threw = false;
  try { registerLocale('', LOCALES.id); } catch { threw = true; }
  ok(threw, 'empty tag rejected');
  ok(!MESSAGES.xx, 'rejected catalog not stored');
});
test('registerLocales makes languages resolvable (region stripped)', () => {
  registerLocales(LOCALES);
  eq(resolveLocale('id-ID'), 'id'); eq(resolveLocale('pt_BR'), 'pt'); eq(resolveLocale('xx'), 'en'); eq(resolveLocale(undefined), 'en');
  eq(messages('de').noData, 'Keine Daten');
});
test('summarize fills placeholders', () => {
  eq(summarize('id', { title: 'Omzet', type: 'bar', series: 2, points: 8 }), 'Omzet: grafik bar dengan 2 seri, 8 titik data.');
  eq(summarize(undefined, { type: 'line', series: 1, points: 3 }), 'Chart: line chart with 1 series, 3 data points.');
});
test('RTL detection', () => { ok(isRTL('ar-EG')); ok(isRTL('ur')); ok(!isRTL('id')); ok(!isRTL()); });
test('numberFormatter uses Intl when a locale is given', () => {
  eq(numberFormatter(undefined), null);
  const f = numberFormatter('en-US'); ok(f); eq(f(1500), '1.5K'); eq(f(12.345), '12.35');
});
// The add-on registers into the global LombokCharts at import time (top-level await
// keeps it inside this synchronous harness).
const addonSeen = [];
{
  const saved = globalThis.LombokCharts;
  globalThis.LombokCharts = { registerLocales: (m) => addonSeen.push(...Object.keys(m)) };
  try { await import('../src/i18n/all.js'); } finally { globalThis.LombokCharts = saved; }
}
test('script-tag add-on registers into the global LombokCharts', () => {
  eq(addonSeen.length, 22); ok(addonSeen.includes('id') && addonSeen.includes('ms'));
});
