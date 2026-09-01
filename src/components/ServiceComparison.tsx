"use client";

/* Master spec section 5, moved off the home page.

   The spec put all three of these tables on the home page behind tabs. They
   live here instead, one per service page: each table is entirely about one
   product, and these pages had no old-way-versus-with-idexi framing at all.
   The home page keeps the three summary sentences on the product cards in
   AIEnginesSection, whose hover chat bubbles carry one old-way/with-idexi
   pair each, and every card links here.

   Rendered as a real <table> rather than a grid of divs, because it is
   genuinely tabular: two columns, five paired rows, and a screen reader needs
   the column association to make sense of any single cell. */

type Product = "pass" | "flow" | "face";

const ROWS: Record<Product, Array<{ old: string; idexi: string }>> = {
  pass: [
    { old: "Manual approvals slow registration", idexi: "Delivered automatically, in minutes" },
    { old: "Generic tickets feel unprofessional", idexi: "Fully branded, with the guest's name" },
    // Spec read "VIP, general, press, staff — built in"; em dash removed per
    // the humanizer rules, wording otherwise unchanged.
    { old: "Categories managed by hand invite errors", idexi: "VIP, general, press and staff, all built in" },
    { old: "Screenshotted tickets get reused", idexi: "One encrypted QR, one entry only" },
    { old: "Sponsor visibility is an afterthought", idexi: "Sponsor branding on every ticket" },
  ],
  flow: [
    { old: "Scanning hardware is costly to maintain", idexi: "Any staff phone becomes a scanner" },
    { old: "Manual check-in creates long lines", idexi: "One scan confirms entry, under a second" },
    { old: "Tracking kits and meals is unreliable", idexi: "Every pickup logged automatically" },
    { old: "Staff can't identify VIP guests on the spot", idexi: "Status appears instantly with every scan" },
    { old: "Post-event data is incomplete", idexi: "A full journey report, generated automatically" },
  ],
  face: [
    { old: "Guests search folders for hours", idexi: "AI finds every guest within seconds" },
    { old: "Shared links compromise privacy", idexi: "Private galleries, guest's own code only" },
    { old: "Manual delivery isn't feasible at scale", idexi: "Every gallery delivered by email, automatically" },
    { old: "Sponsor exposure gets lost", idexi: "Every gallery branded for your sponsors" },
    { old: "The event ends without an impression", idexi: "Photos delivered within minutes" },
  ],
};

export default function ServiceComparison({ product }: { product: Product }) {
  return (
    <div className="service-section">
      <style>{comparisonCSS}</style>
      <h2 className="service-subsection-title">What changes</h2>

      <div className="compare-scroll">
        <table className="compare-table" data-product={product}>
          <thead>
            <tr>
              <th scope="col" className="compare-head compare-head-old">
                The old way
              </th>
              <th scope="col" className="compare-head compare-head-new">
                With idexi
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS[product].map((row) => (
              <tr key={row.old}>
                <td className="compare-cell compare-cell-old">{row.old}</td>
                <td className="compare-cell compare-cell-new">{row.idexi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const comparisonCSS = `
  /* The table can't shrink below readability, so it scrolls inside its own
     container rather than pushing the page sideways. */
  .compare-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .compare-table {
    width: 100%;
    min-width: 480px;
    border-collapse: separate;
    border-spacing: 0;
  }

  .compare-head {
    text-align: left;
    padding: 0.85rem 1.25rem;
    font-family: var(--st-font-display);
    font-weight: 600;
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .compare-head-old {
    color: var(--st-on-surface-variant);
    border-bottom: 1px solid var(--st-outline-variant);
  }

  .compare-head-new {
    border-bottom: 1px solid transparent;
    border-top-left-radius: var(--st-radius-lg);
    border-top-right-radius: var(--st-radius-lg);
  }

  .compare-cell {
    padding: 0.95rem 1.25rem;
    font-size: 0.97rem;
    line-height: 1.5;
    vertical-align: top;
  }

  .compare-cell-old {
    color: var(--st-on-surface-variant);
    border-bottom: 1px solid var(--st-outline-variant);
  }

  .compare-cell-new {
    font-weight: 500;
  }

  .compare-table tbody tr:last-child .compare-cell-new {
    border-bottom-left-radius: var(--st-radius-lg);
    border-bottom-right-radius: var(--st-radius-lg);
  }

  /* Only the "With idexi" column carries the product hue, which is what the
     spec asks for: the column recolors per product, the old-way column does
     not. */
  .compare-table[data-product='pass'] .compare-head-new,
  .compare-table[data-product='pass'] .compare-cell-new {
    background: var(--st-product-pass-container);
    color: var(--st-on-product-pass-container);
  }
  .compare-table[data-product='flow'] .compare-head-new,
  .compare-table[data-product='flow'] .compare-cell-new {
    background: var(--st-product-flow-container);
    color: var(--st-on-product-flow-container);
  }
  .compare-table[data-product='face'] .compare-head-new,
  .compare-table[data-product='face'] .compare-cell-new {
    background: var(--st-product-face-container);
    color: var(--st-on-product-face-container);
  }

  @media (max-width: 640px) {
    .compare-head,
    .compare-cell {
      padding: 0.8rem 1rem;
    }
  }
`;
