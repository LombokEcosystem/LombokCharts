// Copyright 2025 codinglombok
// Licensed under the Apache License, Version 2.0 (see LICENSE or
// http://www.apache.org/licenses/LICENSE-2.0).
// src/i18n/locales.js
// Opt-in locale catalogs (pure data, no side effects), kept out of the main bundle.
// Core-20 world languages (minus the built-in 'en') plus a Nusantara pack (jv, su, ms).
//
//   import { registerLocales } from 'lombokcharts';
//   import { LOCALES } from 'lombokcharts/i18n';
//   registerLocales(LOCALES);             // or registerLocales({ id: LOCALES.id })

/** @type {Record<string, {noData:string, chart:string, summary:string}>} */
export const LOCALES = {
  zh: { noData: '无数据', chart: '图表', summary: '{title}：{type} 图，{series} 个系列，{points} 个数据点。' },
  hi: { noData: 'कोई डेटा नहीं', chart: 'चार्ट', summary: '{title}: {type} चार्ट, {series} श्रृंखला, {points} डेटा बिंदु।' },
  es: { noData: 'Sin datos', chart: 'Gráfico', summary: '{title}: gráfico {type} con {series} series y {points} puntos de datos.' },
  fr: { noData: 'Aucune donnée', chart: 'Graphique', summary: '{title} : graphique {type} avec {series} séries et {points} points de données.' },
  ar: { noData: 'لا توجد بيانات', chart: 'مخطط', summary: '{title}: مخطط {type} يضم {series} سلسلة و{points} نقطة بيانات.' },
  bn: { noData: 'কোনো ডেটা নেই', chart: 'চার্ট', summary: '{title}: {type} চার্ট, {series}টি সিরিজ, {points}টি ডেটা পয়েন্ট।' },
  pt: { noData: 'Sem dados', chart: 'Gráfico', summary: '{title}: gráfico {type} com {series} séries e {points} pontos de dados.' },
  ru: { noData: 'Нет данных', chart: 'Диаграмма', summary: '{title}: диаграмма {type}, рядов: {series}, точек данных: {points}.' },
  ur: { noData: 'کوئی ڈیٹا نہیں', chart: 'چارٹ', summary: '{title}: {type} چارٹ، {series} سلسلے، {points} ڈیٹا پوائنٹس۔' },
  id: { noData: 'Tidak ada data', chart: 'Grafik', summary: '{title}: grafik {type} dengan {series} seri, {points} titik data.' },
  de: { noData: 'Keine Daten', chart: 'Diagramm', summary: '{title}: {type}-Diagramm mit {series} Reihen und {points} Datenpunkten.' },
  ja: { noData: 'データなし', chart: 'チャート', summary: '{title}: {type} チャート、{series} 系列、{points} データポイント。' },
  sw: { noData: 'Hakuna data', chart: 'Chati', summary: '{title}: chati ya {type} yenye mfululizo {series} na alama za data {points}.' },
  mr: { noData: 'डेटा नाही', chart: 'तक्ता', summary: '{title}: {type} तक्ता, {series} मालिका, {points} डेटा बिंदू.' },
  te: { noData: 'డేటా లేదు', chart: 'చార్ట్', summary: '{title}: {type} చార్ట్, {series} శ్రేణులు, {points} డేటా పాయింట్లు.' },
  tr: { noData: 'Veri yok', chart: 'Grafik', summary: '{title}: {series} seri ve {points} veri noktası içeren {type} grafiği.' },
  ta: { noData: 'தரவு இல்லை', chart: 'விளக்கப்படம்', summary: '{title}: {type} விளக்கப்படம், {series} தொடர்கள், {points} தரவுப் புள்ளிகள்.' },
  vi: { noData: 'Không có dữ liệu', chart: 'Biểu đồ', summary: '{title}: biểu đồ {type} với {series} chuỗi, {points} điểm dữ liệu.' },
  ko: { noData: '데이터 없음', chart: '차트', summary: '{title}: {type} 차트, {series}개 시리즈, {points}개 데이터 포인트.' },
  // Nusantara pack
  jv: { noData: 'Ora ana data', chart: 'Grafik', summary: '{title}: grafik {type} kanthi {series} seri, {points} titik data.' },
  su: { noData: 'Euweuh data', chart: 'Grafik', summary: '{title}: grafik {type} kalawan {series} séri, {points} titik data.' },
  ms: { noData: 'Tiada data', chart: 'Carta', summary: '{title}: carta {type} dengan {series} siri, {points} titik data.' },
};
