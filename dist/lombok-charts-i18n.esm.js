/* LombokCharts v0.1.6 | Apache-2.0 | https://github.com/codinglombok/LombokCharts */

// src/i18n/locales.js
var LOCALES = {
  zh: { noData: "\u65E0\u6570\u636E", chart: "\u56FE\u8868", summary: "{title}\uFF1A{type} \u56FE\uFF0C{series} \u4E2A\u7CFB\u5217\uFF0C{points} \u4E2A\u6570\u636E\u70B9\u3002" },
  hi: { noData: "\u0915\u094B\u0908 \u0921\u0947\u091F\u093E \u0928\u0939\u0940\u0902", chart: "\u091A\u093E\u0930\u094D\u091F", summary: "{title}: {type} \u091A\u093E\u0930\u094D\u091F, {series} \u0936\u094D\u0930\u0943\u0902\u0916\u0932\u093E, {points} \u0921\u0947\u091F\u093E \u092C\u093F\u0902\u0926\u0941\u0964" },
  es: { noData: "Sin datos", chart: "Gr\xE1fico", summary: "{title}: gr\xE1fico {type} con {series} series y {points} puntos de datos." },
  fr: { noData: "Aucune donn\xE9e", chart: "Graphique", summary: "{title} : graphique {type} avec {series} s\xE9ries et {points} points de donn\xE9es." },
  ar: { noData: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A", chart: "\u0645\u062E\u0637\u0637", summary: "{title}: \u0645\u062E\u0637\u0637 {type} \u064A\u0636\u0645 {series} \u0633\u0644\u0633\u0644\u0629 \u0648{points} \u0646\u0642\u0637\u0629 \u0628\u064A\u0627\u0646\u0627\u062A." },
  bn: { noData: "\u0995\u09CB\u09A8\u09CB \u09A1\u09C7\u099F\u09BE \u09A8\u09C7\u0987", chart: "\u099A\u09BE\u09B0\u09CD\u099F", summary: "{title}: {type} \u099A\u09BE\u09B0\u09CD\u099F, {series}\u099F\u09BF \u09B8\u09BF\u09B0\u09BF\u099C, {points}\u099F\u09BF \u09A1\u09C7\u099F\u09BE \u09AA\u09AF\u09BC\u09C7\u09A8\u09CD\u099F\u0964" },
  pt: { noData: "Sem dados", chart: "Gr\xE1fico", summary: "{title}: gr\xE1fico {type} com {series} s\xE9ries e {points} pontos de dados." },
  ru: { noData: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445", chart: "\u0414\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u0430", summary: "{title}: \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u0430 {type}, \u0440\u044F\u0434\u043E\u0432: {series}, \u0442\u043E\u0447\u0435\u043A \u0434\u0430\u043D\u043D\u044B\u0445: {points}." },
  ur: { noData: "\u06A9\u0648\u0626\u06CC \u0688\u06CC\u0679\u0627 \u0646\u06C1\u06CC\u06BA", chart: "\u0686\u0627\u0631\u0679", summary: "{title}: {type} \u0686\u0627\u0631\u0679\u060C {series} \u0633\u0644\u0633\u0644\u06D2\u060C {points} \u0688\u06CC\u0679\u0627 \u067E\u0648\u0627\u0626\u0646\u0679\u0633\u06D4" },
  id: { noData: "Tidak ada data", chart: "Grafik", summary: "{title}: grafik {type} dengan {series} seri, {points} titik data." },
  de: { noData: "Keine Daten", chart: "Diagramm", summary: "{title}: {type}-Diagramm mit {series} Reihen und {points} Datenpunkten." },
  ja: { noData: "\u30C7\u30FC\u30BF\u306A\u3057", chart: "\u30C1\u30E3\u30FC\u30C8", summary: "{title}: {type} \u30C1\u30E3\u30FC\u30C8\u3001{series} \u7CFB\u5217\u3001{points} \u30C7\u30FC\u30BF\u30DD\u30A4\u30F3\u30C8\u3002" },
  sw: { noData: "Hakuna data", chart: "Chati", summary: "{title}: chati ya {type} yenye mfululizo {series} na alama za data {points}." },
  mr: { noData: "\u0921\u0947\u091F\u093E \u0928\u093E\u0939\u0940", chart: "\u0924\u0915\u094D\u0924\u093E", summary: "{title}: {type} \u0924\u0915\u094D\u0924\u093E, {series} \u092E\u093E\u0932\u093F\u0915\u093E, {points} \u0921\u0947\u091F\u093E \u092C\u093F\u0902\u0926\u0942." },
  te: { noData: "\u0C21\u0C47\u0C1F\u0C3E \u0C32\u0C47\u0C26\u0C41", chart: "\u0C1A\u0C3E\u0C30\u0C4D\u0C1F\u0C4D", summary: "{title}: {type} \u0C1A\u0C3E\u0C30\u0C4D\u0C1F\u0C4D, {series} \u0C36\u0C4D\u0C30\u0C47\u0C23\u0C41\u0C32\u0C41, {points} \u0C21\u0C47\u0C1F\u0C3E \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41." },
  tr: { noData: "Veri yok", chart: "Grafik", summary: "{title}: {series} seri ve {points} veri noktas\u0131 i\xE7eren {type} grafi\u011Fi." },
  ta: { noData: "\u0BA4\u0BB0\u0BB5\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8", chart: "\u0BB5\u0BBF\u0BB3\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BAE\u0BCD", summary: "{title}: {type} \u0BB5\u0BBF\u0BB3\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BAE\u0BCD, {series} \u0BA4\u0BCA\u0B9F\u0BB0\u0BCD\u0B95\u0BB3\u0BCD, {points} \u0BA4\u0BB0\u0BB5\u0BC1\u0BAA\u0BCD \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD." },
  vi: { noData: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u", chart: "Bi\u1EC3u \u0111\u1ED3", summary: "{title}: bi\u1EC3u \u0111\u1ED3 {type} v\u1EDBi {series} chu\u1ED7i, {points} \u0111i\u1EC3m d\u1EEF li\u1EC7u." },
  ko: { noData: "\uB370\uC774\uD130 \uC5C6\uC74C", chart: "\uCC28\uD2B8", summary: "{title}: {type} \uCC28\uD2B8, {series}\uAC1C \uC2DC\uB9AC\uC988, {points}\uAC1C \uB370\uC774\uD130 \uD3EC\uC778\uD2B8." },
  // Nusantara pack
  jv: { noData: "Ora ana data", chart: "Grafik", summary: "{title}: grafik {type} kanthi {series} seri, {points} titik data." },
  su: { noData: "Euweuh data", chart: "Grafik", summary: "{title}: grafik {type} kalawan {series} s\xE9ri, {points} titik data." },
  ms: { noData: "Tiada data", chart: "Carta", summary: "{title}: carta {type} dengan {series} siri, {points} titik data." }
};
export {
  LOCALES
};
