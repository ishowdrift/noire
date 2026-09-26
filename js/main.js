/**
 * NOIRÉ — Core Application Logic
 * State management, interactive cart drawer, wishlist, live search, 
 * micro-interactions, accessibility listeners, and routing.
 */

(function () {
  'use strict';

  // --- 1. STATE INITIALIZATION ---
  const CART_STORAGE_KEY = 'noire_cart_v1';
  const WISHLIST_STORAGE_KEY = 'noire_wishlist_v1';
  const FREE_SHIPPING_THRESHOLD = 250;

  let cart = [];
  let wishlist = [];

  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    cart = savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.error('Could not access localStorage for cart:', e);
    cart = [];
  }

  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (e) {
    console.error('Could not access localStorage for wishlist:', e);
    wishlist = [];
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
    updateCartUI();
  }

  function saveWishlist() {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
    updateWishlistUI();
  }

  // --- 2. TOAST SYSTEM ---
  function showToast(message, type = 'accent') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'volt' ? 'toast-volt' : ''}`;
    
    // Icon
    const iconSvg = type === 'volt' 
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3600);
  }

  // --- 3. CART OPERATIONS ---
  function addToCart(productId, size, quantity = 1) {
    const product = (typeof NOIRE_PRODUCTS !== 'undefined') 
      ? NOIRE_PRODUCTS.find(p => p.id === productId) 
      : null;

    if (!product) {
      showToast('Product not found.', 'volt');
      return;
    }

    if (!size) {
      showToast('Please select a size first.', 'volt');
      return;
    }

    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: size,
        image: product.primaryImage,
        category: product.categoryLabel,
        quantity: quantity
      });
    }

    saveCart();
    showToast(`Added to bag: ${product.name} [Size ${size}]`);
    openCart();
  }

  function updateCartQuantity(productId, size, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
        showToast('Item removed from bag.');
      }
      saveCart();
    }
  }

  function removeFromCart(productId, size) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
    if (itemIndex > -1) {
      const removed = cart.splice(itemIndex, 1)[0];
      saveCart();
      showToast(`Removed ${removed.name} from bag.`);
    }
  }

  function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function updateCartUI() {
    const badge = document.getElementById('header-cart-count');
    const totalCount = getCartItemCount();

    if (badge) {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
      badge.style.transform = 'scale(1.25)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
    }

    const cartBody = document.getElementById('cart-drawer-body');
    const cartFooter = document.getElementById('cart-drawer-footer');
    const cartCountTitle = document.getElementById('cart-header-count');
    const shippingBar = document.getElementById('shipping-bar-fill');
    const shippingText = document.getElementById('shipping-meter-text');

    if (cartCountTitle) {
      cartCountTitle.textContent = `(${totalCount})`;
    }

    const subtotal = getCartSubtotal();

    // Free Shipping Progress
    if (shippingBar && shippingText) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingBar.style.width = '100%';
        shippingBar.style.background = 'var(--color-signal-volt)';
        shippingText.innerHTML = `<strong>Complimentary Express Shipping</strong> Unlocked!`;
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
        shippingBar.style.width = `${progress}%`;
        shippingBar.style.background = 'var(--color-accent)';
        shippingText.innerHTML = `Add <strong>$${remaining.toFixed(0)}</strong> more for Complimentary Express Shipping`;
      }
    }

    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty-view">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.35">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p style="font-size: 1.1rem; font-weight: 600;">Your shopping bag is empty.</p>
          <p class="text-muted" style="font-size: 0.875rem;">Discover our latest releases from the After Dark collection.</p>
          <a href="shop.html" class="btn btn-primary btn-sm" style="margin-top: 1rem;">Explore Collection</a>
        </div>
      `;
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    if (cartFooter) cartFooter.style.display = 'flex';

    cartBody.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy">
        <div class="cart-item-details">
          <span class="cart-item-meta">${item.category}</span>
          <a href="product.html?id=${item.id}" class="cart-item-name">${item.name}</a>
          <span class="cart-item-meta">Size: <strong>${item.size}</strong></span>
          <div class="qty-control">
            <button class="qty-btn btn-qty-minus" aria-label="Decrease quantity" data-id="${item.id}" data-size="${item.size}">-</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn btn-qty-plus" aria-label="Increase quantity" data-id="${item.id}" data-size="${item.size}">+</button>
          </div>
        </div>
        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="btn-ghost btn-remove-item" style="padding: 0; font-size: 0.75rem; color: var(--color-text-muted);" aria-label="Remove item" data-id="${item.id}" data-size="${item.size}">
            Remove
          </button>
        </div>
      </div>
    `).join('');

    // Summary calculation
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  function openCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('site-backdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('site-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop && !document.getElementById('mobile-nav-drawer')?.classList.contains('open')) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // --- 4. WISHLIST OPERATIONS ---
  function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    const product = (typeof NOIRE_PRODUCTS !== 'undefined')
      ? NOIRE_PRODUCTS.find(p => p.id === productId)
      : null;

    if (index > -1) {
      wishlist.splice(index, 1);
      showToast(`Removed from wishlist: ${product ? product.name : ''}`);
    } else {
      wishlist.push(productId);
      showToast(`Saved to wishlist: ${product ? product.name : ''}`, 'volt');
    }
    saveWishlist();
  }

  function updateWishlistUI() {
    const badge = document.getElementById('header-wishlist-count');
    if (badge) {
      badge.textContent = wishlist.length;
      badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }

    // Update heart icons on cards
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const pid = btn.getAttribute('data-product-id');
      const isWishlisted = wishlist.includes(pid);
      if (isWishlisted) {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Add to wishlist');
      }
    });
  }

  // --- 5. SEARCH MODAL ---
  function openSearchModal() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input-main');
    if (modal) {
      modal.classList.add('open');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 150);
        renderSearchResults('');
      }
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function renderSearchResults(query) {
    const resultsContainer = document.getElementById('search-results-list');
    if (!resultsContainer || typeof NOIRE_PRODUCTS === 'undefined') return;

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      resultsContainer.innerHTML = `
        <div style="padding: 1.5rem 0; text-align: center; color: var(--color-text-muted); font-size: 0.875rem;">
          Type to search items, collections, or materials (e.g. "Obsidian", "Heavyweight", "Outerwear").
        </div>
      `;
      return;
    }

    const matches = NOIRE_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(trimmed) ||
      p.categoryLabel.toLowerCase().includes(trimmed) ||
      p.collectionLabel.toLowerCase().includes(trimmed) ||
      p.description.toLowerCase().includes(trimmed)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 2rem 0; text-align: center; color: var(--color-text-muted);">
          No garments found matching "<strong>${query}</strong>".
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map(p => `
      <a href="product.html?id=${p.id}" class="search-result-item">
        <img src="${p.primaryImage}" alt="${p.name}" class="search-result-thumb" loading="lazy">
        <div style="flex-grow: 1;">
          <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-accent); text-transform: uppercase;">
            ${p.categoryLabel} / ${p.collectionLabel}
          </div>
          <div style="font-weight: 600; font-size: 0.9375rem; color: var(--color-text-primary);">
            ${p.name}
          </div>
        </div>
        <div style="font-family: var(--font-mono); font-weight: 700; font-size: 0.9375rem;">
          $${p.price.toFixed(2)}
        </div>
      </a>
    `).join('');
  }

  // --- 6. MOBILE MENU ---
  function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('site-backdrop');
    if (!drawer) return;

    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // --- 7. EVENT DELEGATION & LISTENERS ---
  function initEventListeners() {
    // Header scroll reaction
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // Backdrop click closes all drawers
    const backdrop = document.getElementById('site-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        closeCart();
        const mobileDrawer = document.getElementById('mobile-nav-drawer');
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Mobile nav triggers
    const mobileBtn = document.getElementById('mobile-menu-trigger');
    const mobileCloseBtn = document.getElementById('mobile-menu-close');
    if (mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', toggleMobileMenu);

    // Cart trigger buttons
    const cartOpenBtns = document.querySelectorAll('[data-cart-open]');
    cartOpenBtns.forEach(btn => btn.addEventListener('click', openCart));

    const cartCloseBtn = document.getElementById('cart-drawer-close');
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

    // Search triggers
    const searchOpenBtns = document.querySelectorAll('[data-search-open]');
    searchOpenBtns.forEach(btn => btn.addEventListener('click', openSearchModal));

    const searchCloseBtn = document.getElementById('search-modal-close');
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearchModal);

    const searchInput = document.getElementById('search-input-main');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderSearchResults(e.target.value);
      });
    }

    // Keyboard Shortcuts (Cmd+K / Ctrl+K and Esc)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchModal = document.getElementById('search-modal');
        if (searchModal && searchModal.classList.contains('open')) {
          closeSearchModal();
        } else {
          openSearchModal();
        }
      }

      if (e.key === 'Escape') {
        closeSearchModal();
        closeCart();
        const mobileDrawer = document.getElementById('mobile-nav-drawer');
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          toggleMobileMenu();
        }
      }
    });

    // Cart items click delegation (+ / - / remove)
    const cartBody = document.getElementById('cart-drawer-body');
    if (cartBody) {
      cartBody.addEventListener('click', (e) => {
        const plusBtn = e.target.closest('.btn-qty-plus');
        const minusBtn = e.target.closest('.btn-qty-minus');
        const removeBtn = e.target.closest('.btn-remove-item');

        if (plusBtn) {
          updateCartQuantity(plusBtn.dataset.id, plusBtn.dataset.size, 1);
        } else if (minusBtn) {
          updateCartQuantity(minusBtn.dataset.id, minusBtn.dataset.size, -1);
        } else if (removeBtn) {
          removeFromCart(removeBtn.dataset.id, removeBtn.dataset.size);
        }
      });
    }

    // Checkout button simulation
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = `<span>Processing Secure Order...</span>`;
        setTimeout(() => {
          showToast('Order confirmed! Simulated demo transaction successful.', 'volt');
          cart = [];
          saveCart();
          checkoutBtn.disabled = false;
          checkoutBtn.innerHTML = `<span>Proceed to Checkout</span>`;
          closeCart();
        }, 1600);
      });
    }

    // Document-level delegation for wishlist toggle
    document.addEventListener('click', (e) => {
      const wishlistBtn = e.target.closest('[data-wishlist-btn]');
      if (wishlistBtn) {
        e.preventDefault();
        const pid = wishlistBtn.getAttribute('data-product-id');
        if (pid) toggleWishlist(pid);
      }
    });

    // Accordions
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const isOpen = item.classList.contains('open');

        // Close siblings if needed
        const parentAccordion = item.closest('.accordion');
        if (parentAccordion) {
          parentAccordion.querySelectorAll('.accordion-item.open').forEach(openItem => {
            if (openItem !== item) {
              openItem.classList.remove('open');
              const c = openItem.querySelector('.accordion-content');
              if (c) c.style.maxHeight = '0px';
            }
          });
        }

        if (isOpen) {
          item.classList.remove('open');
          content.style.maxHeight = '0px';
        } else {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    // Newsletter forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !input.value.includes('@')) {
          showToast('Please enter a valid email address.', 'volt');
          return;
        }
        showToast('Subscribed. You will receive private drop notices.');
        input.value = '';
      });
    });

    // Contact form validation
    const contactForm = document.getElementById('contact-inquiry-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();

        if (!name || !email || !message) {
          showToast('Please complete all required fields.', 'volt');
          return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Transmitting Message...';
        }

        setTimeout(() => {
          showToast('Inquiry received. Our atelier concierge will respond within 24h.', 'volt');
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Transmission';
          }
        }, 1200);
      });
    }
  }

  // --- 8. PAGE SPECIFIC CONTROLLERS ---

  // PDP Controller
  function initProductDetailPage() {
    const pdpRoot = document.getElementById('pdp-container');
    if (!pdpRoot || typeof NOIRE_PRODUCTS === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'prod-01';
    const product = NOIRE_PRODUCTS.find(p => p.id === productId) || NOIRE_PRODUCTS[0];

    // Set page title & metadata dynamically
    document.title = `${product.name} — NOIRÉ`;

    // Elements
    const titleEl = document.getElementById('pdp-title');
    const subtitleEl = document.getElementById('pdp-subtitle');
    const priceEl = document.getElementById('pdp-price');
    const descEl = document.getElementById('pdp-desc');
    const categoryEl = document.getElementById('pdp-category');
    const mainImg = document.getElementById('pdp-main-image');
    const thumbsContainer = document.getElementById('pdp-thumbs');
    const sizeOptionsContainer = document.getElementById('pdp-size-options');
    const specsTable = document.getElementById('pdp-specs-table');
    const relatedContainer = document.getElementById('pdp-related-grid');
    const wishlistBtn = document.getElementById('pdp-wishlist-btn');

    if (titleEl) titleEl.textContent = product.name;
    if (subtitleEl) subtitleEl.textContent = product.subtitle;
    if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
    if (descEl) descEl.textContent = product.description;
    if (categoryEl) categoryEl.textContent = `${product.categoryLabel} / ${product.collectionLabel}`;

    if (mainImg) {
      mainImg.src = product.primaryImage;
      mainImg.alt = `${product.name} - Front View`;
    }

    if (wishlistBtn) {
      wishlistBtn.setAttribute('data-product-id', product.id);
      if (wishlist.includes(product.id)) {
        wishlistBtn.classList.add('active');
      }
    }

    // Thumbs
    if (thumbsContainer && product.gallery && product.gallery.length > 0) {
      thumbsContainer.innerHTML = product.gallery.map((imgSrc, i) => `
        <button class="pdp-thumb-btn ${i === 0 ? 'active' : ''}" data-src="${imgSrc}" aria-label="View photo ${i + 1}">
          <img src="${imgSrc}" alt="${product.name} angle ${i + 1}" loading="lazy">
        </button>
      `).join('');

      thumbsContainer.querySelectorAll('.pdp-thumb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          thumbsContainer.querySelectorAll('.pdp-thumb-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (mainImg) {
            mainImg.src = btn.dataset.src;
          }
        });
      });
    }

    // Sizes
    let selectedSize = null;
    if (sizeOptionsContainer) {
      sizeOptionsContainer.innerHTML = product.sizes.map(s => `
        <button class="size-btn" ${!s.available ? 'disabled' : ''} data-size="${s.size}">
          ${s.size}
        </button>
      `).join('');

      const sizeBtns = sizeOptionsContainer.querySelectorAll('.size-btn');
      sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.disabled) return;
          sizeBtns.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedSize = btn.dataset.size;
          const label = document.getElementById('pdp-selected-size-label');
          if (label) label.textContent = selectedSize;
        });
      });

      // Default select first available size
      const firstAvail = product.sizes.find(s => s.available);
      if (firstAvail) {
        const defaultBtn = sizeOptionsContainer.querySelector(`[data-size="${firstAvail.size}"]`);
        if (defaultBtn) {
          defaultBtn.classList.add('selected');
          selectedSize = firstAvail.size;
          const label = document.getElementById('pdp-selected-size-label');
          if (label) label.textContent = selectedSize;
        }
      }
    }

    // Quantity selector
    let pdpQty = 1;
    const qtyDisplay = document.getElementById('pdp-qty-display');
    const qtyMinus = document.getElementById('pdp-qty-minus');
    const qtyPlus = document.getElementById('pdp-qty-plus');

    if (qtyMinus && qtyDisplay) {
      qtyMinus.addEventListener('click', () => {
        if (pdpQty > 1) {
          pdpQty--;
          qtyDisplay.textContent = pdpQty;
        }
      });
    }
    if (qtyPlus && qtyDisplay) {
      qtyPlus.addEventListener('click', () => {
        if (pdpQty < 10) {
          pdpQty++;
          qtyDisplay.textContent = pdpQty;
        }
      });
    }

    // Add to Bag CTA
    const addBagBtn = document.getElementById('pdp-add-bag-btn');
    if (addBagBtn) {
      addBagBtn.addEventListener('click', () => {
        if (!selectedSize) {
          showToast('Please choose a size.', 'volt');
          return;
        }
        addToCart(product.id, selectedSize, pdpQty);
      });
    }

    // Specs
    if (specsTable && product.specs) {
      specsTable.innerHTML = Object.entries(product.specs).map(([key, val]) => `
        <tr>
          <td style="text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}</td>
          <td><strong>${val}</strong></td>
        </tr>
      `).join('');
    }

    // Related products (same collection or category, excluding current)
    if (relatedContainer) {
      const related = NOIRE_PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection)).slice(0, 4);
      relatedContainer.innerHTML = related.map(renderProductCardHtml).join('');
    }
  }

  // Shop Catalog Page Controller
  function initShopPage() {
    const shopGrid = document.getElementById('shop-product-grid');
    if (!shopGrid || typeof NOIRE_PRODUCTS === 'undefined') return;

    const filterPills = document.querySelectorAll('[data-filter-category]');
    const sortSelect = document.getElementById('shop-sort-select');
    const countDisplay = document.getElementById('shop-product-count');

    const urlParams = new URLSearchParams(window.location.search);
    let activeCategory = urlParams.get('category') || (urlParams.get('filter') === 'wishlist' ? 'wishlist' : 'all');
    let currentSort = 'featured';

    // Highlight initial active pill
    filterPills.forEach(pill => {
      if (pill.dataset.filterCategory === activeCategory) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }

      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.filterCategory;
        applyFiltersAndSort();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFiltersAndSort();
      });
    }

    function applyFiltersAndSort() {
      let filtered = [...NOIRE_PRODUCTS];

      if (activeCategory === 'wishlist') {
        filtered = filtered.filter(p => wishlist.includes(p.id));
      } else if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
      }

      if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (currentSort === 'newest') {
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      } else {
        // Featured
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      }

      if (countDisplay) {
        const label = activeCategory === 'wishlist' ? 'saved wishlist piece' : 'piece';
        countDisplay.textContent = `Showing ${filtered.length} ${label}${filtered.length === 1 ? '' : 's'}`;
      }

      if (filtered.length === 0) {
        if (activeCategory === 'wishlist') {
          shopGrid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 4rem 0; text-align: center;">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.35; margin: 0 auto 1rem;">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <p style="font-size: 1.1rem; font-weight: 600;">Your wishlist is currently empty.</p>
              <p class="text-muted" style="margin-top: 0.5rem; font-size: 0.875rem;">Tap the heart icon on any piece to save it for your next order.</p>
              <a href="shop.html" class="btn btn-secondary btn-sm" style="margin-top: 1.25rem;">Browse All Silhouettes</a>
            </div>
          `;
        } else {
          shopGrid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 4rem 0; text-align: center;">
              <p class="text-muted">No pieces match this criteria.</p>
            </div>
          `;
        }
        return;
      }

      shopGrid.innerHTML = filtered.map(renderProductCardHtml).join('');
      updateWishlistUI();
    }

    applyFiltersAndSort();
  }

  // Helper to render consistent product card markup
  function renderProductCardHtml(product) {
    const isSaved = wishlist.includes(product.id);
    const secondaryImg = (product.gallery && product.gallery[1]) ? product.gallery[1] : '';

    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-card-media">
          <a href="product.html?id=${product.id}" aria-label="View ${product.name}">
            <img src="${product.primaryImage}" alt="${product.name}" class="product-card-img" loading="lazy">
            ${secondaryImg ? `<img src="${secondaryImg}" alt="${product.name} detail view" class="product-card-img-secondary" loading="lazy">` : ''}
          </a>
          <div class="product-card-badges">
            ${product.isNew ? `<span class="badge badge-volt">New Drop</span>` : ''}
            ${product.isFeatured ? `<span class="badge">Edition</span>` : ''}
          </div>
          <button class="product-card-wishlist ${isSaved ? 'active' : ''}" 
                  data-wishlist-btn 
                  data-product-id="${product.id}" 
                  aria-label="${isSaved ? 'Remove from wishlist' : 'Add to wishlist'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <div class="product-card-quick-actions">
            <a href="product.html?id=${product.id}" class="btn btn-primary btn-sm btn-full">
              View Silhouette
            </a>
          </div>
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${product.categoryLabel}</span>
          <h3 class="product-card-title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          <div class="product-card-price-row">
            <span class="product-card-price">$${product.price.toFixed(2)}</span>
            <div class="product-card-color-indicator">
              <span class="color-dot" style="background-color: ${product.colorHex};" title="${product.color}"></span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // --- 9. HOMEPAGE CONTROLLER ---
  function initHomePage() {
    const featuredGrid = document.getElementById('home-featured-grid');
    if (featuredGrid && typeof NOIRE_PRODUCTS !== 'undefined') {
      const featured = NOIRE_PRODUCTS.filter(p => p.isFeatured).slice(0, 6);
      featuredGrid.innerHTML = featured.map(renderProductCardHtml).join('');
      updateWishlistUI();
    }
  }

  // --- 10. DOM READY DISPATCHER ---
  document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    updateCartUI();
    updateWishlistUI();

    // Route checks
    const path = window.location.pathname.toLowerCase();
    if (path.includes('product.html') || document.getElementById('pdp-container')) {
      initProductDetailPage();
    } else if (path.includes('shop.html') || document.getElementById('shop-product-grid')) {
      initShopPage();
    } else if (path.endsWith('/') || path.includes('index.html') || !path.includes('.html')) {
      initHomePage();
    }
  });

  // Global exposure for debugging or extension if needed
  window.NOIRE = {
    addToCart,
    removeFromCart,
    toggleWishlist,
    showToast,
    openCart,
    closeCart,
    openSearchModal,
    closeSearchModal
  };

})();
