#!/usr/bin/env bash
# lombok doctor docs — ARCHITECTURE_UTAMA §5 / MASTERPLAN_UTAMA v3.4 §5 (+ ADR-019 checklist).
# Checks, from a repo root:
#   1. all 12 standard documents exist in docs/ (naming: <jenis>_<Repo>_v<ver>.md)
#   2. version in filenames == manifest version (rust/Cargo.toml, typescript/package.json or package.json)
#   3. SPEC_ contains the mandatory normative sentence verbatim
#   4. SHA-256 of vectors/<package>-vectors-v1.json == hash stated in SPEC_
# Usage: lombok-doctor-docs.sh <RepoName> [repo_root]
# LOCAL ONLY: the standard docs are private (gitignored) until the owner approves
# publishing them, so this check is not wired into CI.
set -u
REPO="${1:?usage: $0 <RepoName> [repo_root]}"
ROOT="${2:-.}"
PKG="$(echo "$REPO" | tr '[:upper:]' '[:lower:]')"
cd "$ROOT" || exit 2
fail=0
err() { echo "FAIL: $*"; fail=1; }

# --- manifest version
VER=""
if [ -f rust/Cargo.toml ]; then
  VER="$(grep -m1 '^version' rust/Cargo.toml | sed 's/.*"\(.*\)".*/\1/')"
elif [ -f typescript/package.json ]; then
  VER="$(grep -m1 '"version"' typescript/package.json | sed 's/.*: *"\(.*\)".*/\1/')"
elif [ -f package.json ]; then
  VER="$(grep -m1 '"version"' package.json | sed 's/.*: *"\(.*\)".*/\1/')"
fi
[ -n "$VER" ] || { err "cannot determine manifest version"; exit 1; }
echo "repo=$REPO version=$VER"
# Lenient mode (CI): release-please bumps the manifest before docs are renamed. When
# docs for $VER are missing but exactly one other documented version exists, check that
# version instead and only warn. Strict mode (default) is the pre-release gate.
if [ "${LOMBOK_DOCTOR_LENIENT_VERSION:-0}" = "1" ] && [ ! -f "docs/masterplan_${REPO}_v${VER}.md" ]; then
  DV="$(ls docs/masterplan_${REPO}_v*.md 2>/dev/null | sed "s#.*_v\(.*\)\.md#\1#")"
  if [ "$(echo "$DV" | grep -c .)" -eq 1 ]; then
    echo "WARN: docs are v$DV but manifest is v$VER — rename docs/*_v$DV.md before release"
    VER="$DV"
  fi
fi

# --- 1+2: 12 documents with matching version
DOCS="masterplan architecture changelog map structure_repo full_summary_project guide_how_to_use how_to_dist development_ide API Lang SPEC"
count=0
for d in $DOCS; do
  f="docs/${d}_${REPO}_v${VER}.md"
  if [ -f "$f" ]; then count=$((count+1)); else err "missing $f"; fi
done
echo "documents: $count/12"

# --- 3: normative sentence
SPEC="docs/SPEC_${REPO}_v${VER}.md"
S="This document is the normative cross-language contract. Every language port MUST produce byte-identical output for all specified inputs. Deviations from this specification are bugs."
if [ -f "$SPEC" ]; then
  grep -qF "$S" "$SPEC" || err "SPEC lacks mandatory normative sentence"

  # --- 4: vector hash
  VEC="vectors/${PKG}-vectors-v1.json"
  if [ -f "$VEC" ]; then
    ACTUAL="$(sha256sum "$VEC" | cut -d' ' -f1)"
    grep -q "$ACTUAL" "$SPEC" || err "vector SHA-256 in SPEC does not match $VEC (actual $ACTUAL)"
  else
    err "missing $VEC"
  fi
fi

# --- 5: license files present and consistent with manifest (needed for registry publish)
LIC=""
[ -f rust/Cargo.toml ] && LIC="$(grep -m1 '^license' rust/Cargo.toml | sed 's/.*"\(.*\)".*/\1/')"
if echo "$LIC" | grep -q " OR MIT"; then
  [ -f LICENSE-MIT ] || err "manifest license '$LIC' but LICENSE-MIT missing"
  [ -f LICENSE-APACHE ] || err "manifest license '$LIC' but LICENSE-APACHE missing"
elif [ -n "$LIC" ]; then
  [ -f LICENSE ] || err "LICENSE missing"
fi
for f in LICENSE LICENSE-APACHE; do
  [ -f "$f" ] && grep -q "Apache License" "$f" && [ "$(wc -c < "$f")" -gt 10000 ] || true
done
[ -f LICENSE ] && [ "$(wc -c < LICENSE)" -lt 1000 ] && err "LICENSE looks like a placeholder (<1000 bytes)"

# --- 6: PRINSIP_UNIVERSAL U1 — no ownership claims ("part of <application/framework>")
APPS='RAG[A-Za-z]*|Clarion|DocFlow|PDF|AgenticAuto|Miner|DNSProxy|Proxy'
for f in README.md docs/*.md; do
  [ -f "$f" ] || continue
  case "$f" in docs/map_*) continue;; esac
  hits="$(grep -n -i -E "(peran di rag|role in rag|(part of|bagian dari|modul dari|komponen dari)[^.]{0,20}Lombok(${APPS})\\b|khusus (untuk )?(rag|Lombok[A-Za-z]+))" "$f" | grep -v -i -E "bukan|tidak|not |never|jangan|salah|diperiksa|ditolak|dilarang" || true)"
  if [ -n "$hits" ]; then err "ownership claim in $f (U1): $(echo "$hits" | head -1 | cut -c1-120)"; fi
done
# masterplan doc must carry the universal-principles section (U1-U12)
MP="docs/masterplan_${REPO}_v${VER}.md"
if [ -f "$MP" ]; then
  grep -q "^## 2\. Prinsip Universal" "$MP" || err "masterplan lacks '## 2. Prinsip Universal' section"
  n="$(grep -c -E '^\| U(1[0-2]|[1-9]) \|' "$MP")"
  [ "$n" -eq 12 ] || err "universal evidence table has $n/12 rows"
fi

# --- 7: MASTERPLAN_UTAMA v3.4 §5.2 — universality checklist D1-D9 (min 6 ✅ to publish)
if [ -f "$MP" ]; then
  grep -q "Checklist Universalitas (ADR-019)" "$MP" || err "masterplan lacks 'Checklist Universalitas (ADR-019)' section"
  nd="$(grep -c -E '^\| D[1-9] ' "$MP")"
  [ "$nd" -eq 9 ] || err "universality checklist has $nd/9 rows"
  ok="$(grep -E '^\| D[1-9] ' "$MP" | grep -c '✅')"
  echo "universality: $ok/9 ✅"
  [ "$ok" -ge 6 ] || err "universality score $ok/9 < 6 (registry publish gate)"
fi
# README must answer "Why this library?" (MASTERPLAN_UTAMA v3.4 §5.3)
[ -f README.md ] && { grep -q -i -E "^## (Why this library|Mengapa library ini)" README.md || err "README lacks 'Why this library? / Mengapa library ini?' section"; }

[ $fail -eq 0 ] && echo "OK: lombok doctor docs passed" || { echo "lombok doctor docs FAILED"; exit 1; }
