import { supportFaqs, supportHighlights } from "../store/mockStore";

export function SupportPage() {
  return (
    <section className="section-block">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow mb-2">Support</p>
            <h1 className="display-6 mb-2">Help, trust, and buyer guidance in one place.</h1>
          </div>
          <p className="section-copy">
            Marketplace-style websites feel easier to trust when shipping, payment, support, and return expectations are clearly visible.
          </p>
        </div>

        <div className="support-grid">
          {supportHighlights.map((item) => (
            <article className="support-card" key={item.title}>
              <h2 className="h4 mb-3">{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="detail-lower-grid mt-4">
          <article className="content-panel">
            <p className="eyebrow mb-2">Buyer protection</p>
            <h2 className="h3 mb-3">What this site now makes clearer for shoppers</h2>
            <div className="stack-gap">
              <div className="mini-metric">
                <strong>Returns</strong>
                <span>Support language is visible throughout shopping and checkout.</span>
              </div>
              <div className="mini-metric">
                <strong>Payments</strong>
                <span>Unsupported payment methods are blocked at backend validation level.</span>
              </div>
              <div className="mini-metric">
                <strong>Admin security</strong>
                <span>Login is throttled and backend headers are stricter than before.</span>
              </div>
            </div>
          </article>

          <article className="content-panel">
            <p className="eyebrow mb-2">Marketplace FAQ</p>
            <h2 className="h3 mb-3">Questions shoppers usually ask before buying</h2>
            <div className="faq-stack">
              {supportFaqs.map((faq) => (
                <article className="faq-card" key={faq.question}>
                  <strong>{faq.question}</strong>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
