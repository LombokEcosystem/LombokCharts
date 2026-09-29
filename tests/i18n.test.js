// tests/i18n.test.js
import { test, eq, ok } from './_t.js';
import { MESSAGES, resolveLocale, messages, summarize, isRTL, numberFormatter } from '../src/i18n/messages.js';

const CORE20 = ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'pt', 'ru', 'ur', 'id', 'de', 'ja', 'sw', 'mr', 'te', 'tr', 'ta', 'vi', 'ko'];

test('Core-20 + Nusantara catalogs are complete', () => {
  for (const l of [...CORE20, 'jv', 'su', 'ms']) {
    const m = MESSAGES[l]; ok(m, 'missing ' + l);
    for (const k of ['noData', 'chart', 'summary']) ok(typeof m[k] === 'string' && m[k].length > 0, `${l}.${k}`);
    for (const p of ['{title}', '{type}', '{series}', '{points}']) ok(m.summary.includes(p), `${l}.summary ${p}`);
  }
});
test('resolveLocale falls back to en and strips region', () => {
  eq(resolveLocale('id-ID'), 'id'); eq(resolveLocale('pt_BR'), 'pt'); eq(resolveLocale('xx'), 'en'); eq(resolveLocale(undefined), 'en');
});
test('summarize fills placeholders', () => {
  eq(summarize('id', { title: 'Omzet', type: 'bar', series: 2, points: 8 }), 'Omzet: grafik bar dengan 2 seri, 8 titik data.');
  eq(summarize(undefined, { type: 'line', series: 1, points: 3 }), 'Chart: line chart with 1 series, 3 data points.');
  eq(messages('de').noData, 'Keine Daten');
});
test('RTL detection', () => { ok(isRTL('ar-EG')); ok(isRTL('ur')); ok(!isRTL('id')); ok(!isRTL()); });
test('numberFormatter uses Intl when a locale is given', () => {
  eq(numberFormatter(undefined), null);
  const f = numberFormatter('en-US'); ok(f); eq(f(1500), '1.5K'); eq(f(12.345), '12.35');
});
