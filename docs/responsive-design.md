# Responsive behavior

Specs for how kit's responsive elements should behave as the viewport
resizes — one section per element. Add a new section here when another
element grows its own collapse/reflow behavior.

## Header/nav collapse

`page.dc.html` shows the site title plus a handful of controls in two different
rows, depending on scroll position. Both rows need to gracefully shrink down
to a hamburger menu as the viewport narrows. This doc is the spec for that
behavior — what should happen at every width, independent of any specific
site's title length.

#### The two rows

**Row 1 — corner elements**, visible only before scrolling: the site title
(`{{ siteName }} — Vertex Order`), sitting in-flow at the top of the page, and
a floating pill fixed to the top-right containing "Check out our other
lists ↗" plus the theme toggle. The title isn't part of the floating pill and
disappears naturally once the user scrolls (it isn't fixed), so it doesn't
compete for space the way the pill does.

**Row 2 — navbar**, a fixed bar that appears once scrolled: two groups.
- Left group: title, sort-order select, jump-to-series select, language
  toggle, display toggle, series-progress readout — left-justified, in that
  order, standard margin between each.
- Right group: "Check out our other lists ↗" + theme toggle — right-justified.

#### Edge-sticking rule (both rows)

At wide viewports, the left group is allowed to poke left of the centered
content column's left edge, and the right group/pill pokes right of its
right edge, by a fixed amount — this is what gives the title and the pill
their "floating in the margin" look. That amount is only available while
there's a big enough margin for it.

The right group is meant to read as the same floating widget shrinking into
the navbar on scroll, not two independently-tuned widgets — the anchor point
that should hold its screen position through that transition is the center
of the theme toggle icon (the rightmost element), not the group's outer
edge. But row 2's controls render smaller than row 1's (e.g. the theme
toggle is 26px in the navbar vs. 36px in the corner), so the margin/
stick-out *number* needed to keep that icon-center in place differs between
the two rows even though the visual anchor point doesn't. Don't copy row 1's
stick-out value onto row 2 expecting the same result — derive each row's
from its own elements' sizes, targeting the same icon-center position. The
left/title side doesn't have this problem since the title itself is the
same size in both rows.

Once the viewport narrows enough that this margin would clip the content:
- The left-justified content (title, or the left group in row 2) must
  **absolute-left-justify to the window edge** and continue moving inward
  1:1 with the shrinking window from that point on.
- The right-justified content (the pill, or the right group in row 2) must
  **absolute-right-justify to the window edge** the same way.

Neither side should ever fall back to sitting flush against the *content
column's* edge as an intermediate state — the content column is itself
centered and shrinks slower than the window in the band between "fully
stuck out" and "flush against the window," so anchoring to the column there
produces a non-1:1, "jumpy" motion instead of tracking the window.

#### Collapse priority — row 2 navbar (most kept → least kept)

Jump dropdown > series progress (only counts when there's progress to show —
a series with no progress data simply doesn't occupy this slot, which can
free room for "check out our other lists") > check out our other lists >
sort order > title > display toggles > theme toggle > languages.

When the remaining elements + their margins no longer fit, a hamburger menu
appears on the right and elements are peeled off lowest-priority-first into
it, in the order above.

**Hamburger cost**: adding the hamburger button itself costs roughly the
width of the theme toggle. That's why languages — the wider of the two —
is the one cut first, not the toggle: languages is the lowest-priority item,
and cutting it pays for the hamburger button with room to spare, which is
often enough net gain to let the theme toggle keep its spot for a while
longer before it, too, has to go.

**Never leave unused space**: cutting is priority-order-first, but after a
cut it isn't final — if a later cut (a bigger, higher-priority element)
frees more room than it needed, a smaller, lower-priority element that was
already cut comes back, provided it now fits. e.g. cutting the display
toggle to make room can free enough that the theme toggle — lower priority,
cut earlier — fits again and reappears, even though a higher-priority
element (display) stays hidden. Priority decides fight order, not who's
allowed to use free space.

#### Collapse priority — row 1 corner elements

Check out our other lists > theme toggle > title. Title ranks lowest despite
being visually first, because it isn't part of the floating/fixed content —
it scrolls away and stops costing space — and it's restated moments later at
the top of row 2, so hiding it first is the cheapest cut.

Row 1 only ever has these three elements, never the row-2-only controls
(order/jump/languages/display/progress) — its own fit calculation and
hamburger threshold must be based on its own three elements' widths, not
reuse row 2's thresholds.

#### Dynamic sizing requirement

The title's width varies by site name (e.g. "Wyrmwatch" vs. "Final
Fantasy"), so no fixed pixel breakpoint table can be correct for every site.
All fit/collapse decisions must be driven by the actual measured widths of
the elements (+ the margins between them) at the current font/zoom, not by
hardcoded viewport-width thresholds.
