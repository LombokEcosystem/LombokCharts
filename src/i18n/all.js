// Copyright 2025 codinglombok
// Licensed under the Apache License, Version 2.0 (see LICENSE or
// http://www.apache.org/licenses/LICENSE-2.0).
// src/i18n/all.js — entry for the script-tag add-on build (dist/lombok-charts-i18n.umd*.js).
// Load it after lombok-charts.umd.js: it registers every catalog in LOCALES into the
// global LombokCharts, and also exposes them as the global LombokChartsI18n.LOCALES.
import { LOCALES } from './locales.js';

const LC = typeof globalThis !== 'undefined' ? globalThis.LombokCharts : undefined;
if (LC && typeof LC.registerLocales === 'function') LC.registerLocales(LOCALES);

export { LOCALES };
