// Copyright 2025 codinglombok
// Licensed under the Apache License, Version 2.0 (see LICENSE or
// http://www.apache.org/licenses/LICENSE-2.0).
// src/i18n/messages.js
// CONTRACT (pure logic, portable): built-in UI strings + locale-aware number labels.
//   resolveLocale(tag) -> supported BCP-47 base tag ('en' fallback)
//   messages(tag)      -> { noData, chart, summary }
//   registerLocale(tag, catalog) / registerLocales(map) -> add languages (opt-in)
//   summarize(tag, { title, type, series, points }) -> string
//   isRTL(tag)         -> boolean
//   numberFormatter(tag) -> (v:number) => string   (Intl compact when available)
// Only English is built in; 22 more catalogs (Core-20 + Nusantara) live in ./locales.js.

/**
 * Registered catalogs. Only English ships in the main bundle; add more with
 * registerLocale()/registerLocales() (see src/i18n/locales.js for 22 ready-made ones).
 * @type {Record<string, {noData:string, chart:string, summary:string}>}
 */
export const MESSAGES = {
  en: { noData: 'No data', chart: 'Chart', summary: '{title}: {type} chart with {series} series, {points} data points.' },
};

const KEYS = ['noData', 'chart', 'summary'];
const PLACEHOLDERS = ['{title}', '{type}', '{series}', '{points}'];

/**
 * Register (or replace) the catalog for one language.
 * @param {string} tag BCP-47 tag; only the base language is used ('pt-BR' -> 'pt')
 * @param {{noData:string, chart:string, summary:string}} catalog
 */
export function registerLocale(tag, catalog) {
  const base = String(tag || '').toLowerCase().split(/[-_]/)[0];
  if (!base) throw new Error('LombokCharts: registerLocale needs a language tag');
  for (const k of KEYS) {
    if (!catalog || typeof catalog[k] !== 'string' || !catalog[k]) throw new Error(`LombokCharts: locale '${base}' is missing '${k}'`);
  }
  for (const p of PLACEHOLDERS) {
    if (!catalog.summary.includes(p)) throw new Error(`LombokCharts: locale '${base}' summary is missing ${p}`);
  }
  MESSAGES[base] = { noData: catalog.noData, chart: catalog.chart, summary: catalog.summary };
}

/** Register several catalogs at once, e.g. registerLocales(LOCALES). @param {Record<string, any>} catalogs */
export function registerLocales(catalogs) {
  for (const tag of Object.keys(catalogs || {})) registerLocale(tag, catalogs[tag]);
}

const RTL = new Set(['ar', 'ur', 'he', 'fa']);

/** @param {string} [tag] BCP-47 tag such as 'id-ID' or 'pt-BR'. */
export function resolveLocale(tag) {
  if (!tag || typeof tag !== 'string') return 'en';
  const base = tag.toLowerCase().split(/[-_]/)[0];
  return Object.prototype.hasOwnProperty.call(MESSAGES, base) ? base : 'en';
}

/** @param {string} [tag] */
export function messages(tag) { return MESSAGES[resolveLocale(tag)]; }

/** @param {string} [tag] */
export function isRTL(tag) {
  return !!tag && RTL.has(String(tag).toLowerCase().split(/[-_]/)[0]);
}

/**
 * @param {string} [tag]
 * @param {{title?:string, type:string, series:number, points:number}} v
 */
export function summarize(tag, v) {
  const m = messages(tag);
  const vals = { title: v.title || m.chart, type: v.type, series: v.series, points: v.points };
  return m.summary.replace(/\{(\w+)\}/g, (_, k) => String(vals[k]));
}

/**
 * Locale-aware compact number label ("1,2 rb", "3.4M"). Falls back to null when
 * Intl is unavailable so callers can use the built-in formatter.
 * @param {string} tag
 * @returns {((v:number)=>string)|null}
 */
export function numberFormatter(tag) {
  if (!tag || typeof Intl === 'undefined' || !Intl.NumberFormat) return null;
  try {
    const compact = new Intl.NumberFormat(tag, { notation: 'compact', maximumFractionDigits: 1 });
    const plain = new Intl.NumberFormat(tag, { maximumFractionDigits: 2 });
    return (v) => (Math.abs(v) >= 1e3 ? compact.format(v) : plain.format(v));
  } catch {
    return null;
  }
}
