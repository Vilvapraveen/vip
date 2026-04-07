import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { apiRequest, formatCurrency } from "../api";
import { supportPromises } from "../store/mockStore";

const checkoutInitialState = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  shippingAddress: "",
  deliveryCity: "",
  deliveryState: "Tamil Nadu",
  deliveryPincode: "",
  paymentMethod: "UPI",
  orderNotes: "",
};

function createIdempotencyKey() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `vx-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function CheckoutPage({
  cartItems,
  catalogMode,
  catalogMessage,
  onClearCart,
  onRemoveItem,
  onUpdateQuantity,
  savedProfile,
  onSaveProfile,
}) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(() => ({
    ...checkoutInitialState,
    ...(savedProfile || {}),
  }));
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldSaveDetails, setShouldSaveDetails] = useState(Boolean(savedProfile?.customerEmail));
  const [idempotencyKey, setIdempotencyKey] = useState(createIdempotencyKey);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  const deliveryFee = subtotal >= 1500 || subtotal === 0 ? 0 : 79;
  const totalAmount = subtotal + deliveryFee;
  const estimatedArrival = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
    "en-IN",
    { day: "numeric", month: "short", year: "numeric" }
  );

  useEffect(() => {
    if (savedProfile?.customerEmail) {
      setFormState((current) => ({
        ...current,
        ...savedProfile,
      }));
      setShouldSaveDetails(true);
    }
  }, [savedProfile]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const submittedProfile = { ...formState };
      const response = await apiRequest("/api/store/orders", {
        method: "POST",
        idempotencyKey,
        body: JSON.stringify({
          ...formState,
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      setSuccessMessage(
        `${response?.message || "Order placed successfully."} Reference: ${
          response?.orderReference || "VX-LIVE"
        } for ${formatCurrency(response?.totalAmount || totalAmount)}`
      );
      if (onSaveProfile) {
        onSaveProfile(shouldSaveDetails ? submittedProfile : null);
      }
      setFormState(shouldSaveDetails ? { ...checkoutInitialState, ...submittedProfile } : checkoutInitialState);
      setIdempotencyKey(createIdempotencyKey());
      onClearCart();
      window.setTimeout(() => navigate("/shop"), 2200);
    } catch (requestError) {
      const errorMessage = String(requestError?.message || "");
      const isConnectivityIssue =
        requestError instanceof TypeError || /fetch|network|load failed/i.test(errorMessage);

      setError(
        isConnectivityIssue
          ? "We could not reach the order service. Your cart was not submitted, so please retry once connectivity is back."
          : errorMessage || "Unable to place order right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!cartItems.length) {
    return (
      <section className="section-block">
        <div className="container">
          <div className="content-panel empty-panel">
            <p className="eyebrow mb-2">Checkout</p>
            <h1 className="display-6 mb-3">Your cart is empty right now.</h1>
            <p className="section-copy">
              Add a few products from the marketplace feed to test the cart and order flow.
            </p>
            <NavLink to="/shop" className="btn-market">
              Browse products
            </NavLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow mb-2">Checkout</p>
            <h1 className="display-6 mb-2">A cleaner, trust-forward order flow.</h1>
          </div>
          <p className="section-copy">
            {catalogMode === "live"
              ? "Orders will be sent to the backend when it is running."
              : `${catalogMessage} Orders still require the backend checkout API before they can be confirmed.`}
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <form className="content-panel checkout-form-panel" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full name</label>
                  <input
                    className="form-control"
                    value={formState.customerName}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        customerName: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    value={formState.customerEmail}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        customerEmail: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    inputMode="tel"
                    pattern="[0-9+()\\-\\s]{10,20}"
                    value={formState.customerPhone}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        customerPhone: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Payment method</label>
                  <select
                    className="form-select"
                    value={formState.paymentMethod}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        paymentMethod: event.target.value,
                      }))
                    }
                  >
                    <option value="UPI">UPI</option>
                    <option value="COD">Cash on Delivery</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Shipping address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={formState.shippingAddress}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        shippingAddress: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <input
                    className="form-control"
                    value={formState.deliveryCity}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        deliveryCity: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <input
                    className="form-control"
                    value={formState.deliveryState}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        deliveryState: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Pincode</label>
                  <input
                    className="form-control"
                    inputMode="numeric"
                    pattern="[0-9]{4,10}"
                    value={formState.deliveryPincode}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        deliveryPincode: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="toggle-pill checkout-toggle">
                    <input
                      type="checkbox"
                      checked={shouldSaveDetails}
                      onChange={(event) => setShouldSaveDetails(event.target.checked)}
                    />
                    Save these delivery details for the next visit
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">Order notes</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={formState.orderNotes}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        orderNotes: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="cta-row">
                <button type="submit" className="btn-market" disabled={isSubmitting}>
                  {isSubmitting ? "Placing order..." : "Place order"}
                </button>
                {successMessage ? <span className="text-success">{successMessage}</span> : null}
                {error ? <span className="text-danger">{error}</span> : null}
              </div>
            </form>
          </div>

          <div className="col-lg-5">
            <div className="content-panel checkout-summary">
              <div className="summary-header">
                <h2 className="h4 mb-0">Order summary</h2>
                <button type="button" className="btn btn-link text-danger p-0" onClick={onClearCart}>
                  Clear cart
                </button>
              </div>

              <div className="cart-stack">
                {cartItems.map((item) => (
                  <article className="cart-row" key={item.id}>
                    <img src={item.imageUrl} alt={item.name} className="cart-thumb" />
                    <div className="cart-copy">
                      <strong>{item.name}</strong>
                      <p className="text-secondary small mb-2">{formatCurrency(item.price)}</p>
                      <div className="quantity-row">
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-danger"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="summary-breakdown">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </div>
                <div className="summary-line">
                  <span>Delivery</span>
                  <strong>{deliveryFee ? formatCurrency(deliveryFee) : "Free"}</strong>
                </div>
                <div className="summary-line total-line">
                  <span>Total</span>
                  <strong>{formatCurrency(totalAmount)}</strong>
                </div>
                <div className="summary-line">
                  <span>Estimated arrival</span>
                  <strong>{estimatedArrival}</strong>
                </div>
              </div>

              <div className="support-grid">
                {supportPromises.map((promise) => (
                  <article className="support-card" key={promise.title}>
                    <h3 className="h5">{promise.title}</h3>
                    <p>{promise.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
