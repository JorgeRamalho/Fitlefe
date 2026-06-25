/* ============================================
   FitLife Shop — Carrinho & Produtos
   ============================================ */

const PRODUCTS = [
  {
    id: 'whey-chocolate',
    name: 'Whey Protein Chocolate',
    emoji: '🍫',
    category: 'proteinas',
    price: 129.90,
    oldPrice: 159.90,
    weight: '900g',
    badge: 'Mais Vendido',
    image: 'https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?w=400&q=80',
    description: '24g de proteína por dose. Absorção rápida, ideal pós-treino.'
  },
  {
    id: 'whey-baunilha',
    name: 'Whey Protein Baunilha',
    emoji: '🥛',
    category: 'proteinas',
    price: 129.90,
    weight: '900g',
    image: 'https://images.unsplash.com/photo-1693996045346-d0a9b9470909?w=400&q=80',
    description: 'Proteína concentrada com aminoácidos essenciais e baixo teor de gordura.'
  },
  {
    id: 'creatina',
    name: 'Creatina Monohidratada',
    emoji: '⚡',
    category: 'performance',
    price: 89.90,
    weight: '300g',
    badge: 'Essencial',
    image: 'https://images.unsplash.com/photo-1774793476310-fd7d843184c5?w=400&q=80',
    description: 'Pureza certificada. Aumenta força, potência e recuperação muscular.'
  },
  {
    id: 'bcaa',
    name: 'BCAA 2:1:1',
    emoji: '💪',
    category: 'performance',
    price: 79.90,
    oldPrice: 99.90,
    weight: '300g',
    image: 'https://images.unsplash.com/photo-1774935989990-5b46f7ad7f3e?w=400&q=80',
    description: 'Leucina, isoleucina e valina para reduzir fadiga e preservar massa magra.'
  },
  {
    id: 'pre-treino',
    name: 'Pré-Treino Explosão',
    emoji: '🔥',
    category: 'performance',
    price: 99.90,
    weight: '300g',
    image: 'https://images.unsplash.com/photo-1775199603089-e953f3716737?w=400&q=80',
    description: 'Energia, foco e pump. Cafeína + beta-alanina para treinos intensos.'
  },
  {
    id: 'multivitaminico',
    name: 'Multivitamínico Fit',
    emoji: '💊',
    category: 'vitaminas',
    price: 59.90,
    weight: '120 cáps',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    description: 'Complexo completo de vitaminas e minerais para imunidade e energia diária.'
  },
  {
    id: 'omega3',
    name: 'Ômega 3 EPA/DHA',
    emoji: '🐟',
    category: 'vitaminas',
    price: 69.90,
    weight: '120 cáps',
    image: 'https://images.unsplash.com/photo-1670850756988-a1943aa0e554?w=400&q=80',
    description: 'Saúde cardiovascular, cerebral e anti-inflamatório natural.'
  },
  {
    id: 'barra-proteina',
    name: 'Barra de Proteína',
    emoji: '🍫',
    category: 'snacks',
    price: 12.90,
    weight: '60g',
    badge: 'Snack',
    image: 'https://images.unsplash.com/photo-1742860866012-fc167d8366bf?w=400&q=80',
    description: '20g de proteína, baixo açúcar. Perfeita para lanche pré ou pós-treino.'
  },
  {
    id: 'pasta-amendoim',
    name: 'Pasta de Amendoim',
    emoji: '🥜',
    category: 'snacks',
    price: 34.90,
    weight: '500g',
    image: 'https://images.unsplash.com/photo-1691480208637-6ed63aac6694?w=400&q=80',
    description: '100% amendoim, sem açúcar. Gorduras boas e proteína vegetal.'
  },
  {
    id: 'glutamina',
    name: 'Glutamina Pure',
    emoji: '🛡️',
    category: 'performance',
    price: 74.90,
    weight: '300g',
    image: 'https://images.unsplash.com/photo-1775200279682-cf9af4cb2e4e?w=400&q=80',
    description: 'Recuperação muscular e saúde intestinal. Pós-treino ou antes de dormir.'
  },
  {
    id: 'coqueteleira',
    name: 'Coqueteleira FitLife',
    emoji: '🥤',
    category: 'acessorios',
    price: 29.90,
    weight: '600ml',
    image: 'https://images.unsplash.com/photo-1775199603318-7f8a9a63b40d?w=400&q=80',
    description: 'Anti-vazamento, BPA free. Logo FitLife em alto relevo.'
  },
  {
    id: 'luva-treino',
    name: 'Luva de Treino Pro',
    emoji: '🧤',
    category: 'acessorios',
    price: 49.90,
    weight: 'Par',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80',
    description: 'Pegada reforçada, palma acolchoada. Proteção e conforto na musculação.'
  }
];

const CATEGORIES = [
  { id: 'todos', label: 'Todos', emoji: '🛒' },
  { id: 'proteinas', label: 'Proteínas', emoji: '🥛' },
  { id: 'performance', label: 'Performance', emoji: '⚡' },
  { id: 'vitaminas', label: 'Vitaminas', emoji: '💊' },
  { id: 'snacks', label: 'Snacks', emoji: '🍫' },
  { id: 'acessorios', label: 'Acessórios', emoji: '🎒' }
];

let cart = [];
let activeCategory = 'todos';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderFilters();
  renderProducts();
  initCartDrawer();
  initSearch();
});

function renderFilters() {
  const container = document.getElementById('shopFilters');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button
      type="button"
      class="shop__filter ${cat.id === activeCategory ? 'shop__filter--active' : ''}"
      data-category="${cat.id}"
    >${cat.emoji} ${cat.label}</button>
  `).join('');

  container.querySelectorAll('.shop__filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      container.querySelectorAll('.shop__filter').forEach(b =>
        b.classList.toggle('shop__filter--active', b.dataset.category === activeCategory)
      );
      renderProducts();
    });
  });
}

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchCategory = activeCategory === 'todos' || p.category === activeCategory;
    const matchSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });
}

function renderProducts() {
  const grid = document.getElementById('shopGrid');
  const empty = document.getElementById('shopEmpty');
  if (!grid) return;

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty?.classList.add('shop__empty--visible');
    return;
  }

  empty?.classList.remove('shop__empty--visible');

  grid.innerHTML = filtered.map(product => `
    <article class="card product-card fade-in fade-in--visible" data-product-id="${product.id}">
      <div class="product-card__image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-card__image" loading="lazy">
        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        <span class="product-card__category">${getCategoryLabel(product.category)}</span>
      </div>
      <div class="product-card__body">
        <span class="product-card__emoji">${product.emoji}</span>
        <h3 class="product-card__title">${product.name}</h3>
        <p class="product-card__desc">${product.description}</p>
        <div class="product-card__meta">
          <div>
            <span class="product-card__price">R$ ${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="product-card__price-old">R$ ${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
          <span class="product-card__weight">${product.weight}</span>
        </div>
        <div class="product-card__actions">
          <div class="product-card__qty" data-qty-wrap="${product.id}">
            <button type="button" class="product-card__qty-btn" data-qty-minus="${product.id}" aria-label="Diminuir">−</button>
            <span class="product-card__qty-value" data-qty-value="${product.id}">1</span>
            <button type="button" class="product-card__qty-btn" data-qty-plus="${product.id}" aria-label="Aumentar">+</button>
          </div>
          <button type="button" class="btn btn--primary product-card__add" data-add-cart="${product.id}">
            Adicionar 🛒
          </button>
        </div>
      </div>
    </article>
  `).join('');

  bindProductEvents();
}

function bindProductEvents() {
  document.querySelectorAll('[data-qty-minus]').forEach(btn => {
    btn.addEventListener('click', () => updateProductQty(btn.dataset.qtyMinus, -1));
  });

  document.querySelectorAll('[data-qty-plus]').forEach(btn => {
    btn.addEventListener('click', () => updateProductQty(btn.dataset.qtyPlus, 1));
  });

  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = PRODUCTS.find(p => p.id === btn.dataset.addCart);
      const qtyEl = document.querySelector(`[data-qty-value="${btn.dataset.addCart}"]`);
      const qty = parseInt(qtyEl?.textContent || '1', 10);
      if (product) addToCart(product, qty);
      if (qtyEl) qtyEl.textContent = '1';
    });
  });
}

function updateProductQty(productId, delta) {
  const el = document.querySelector(`[data-qty-value="${productId}"]`);
  if (!el) return;
  const current = parseInt(el.textContent, 10);
  el.textContent = Math.max(1, Math.min(99, current + delta));
}

function getCategoryLabel(id) {
  return CATEGORIES.find(c => c.id === id)?.label || id;
}

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',');
}

function addToCart(product, qty = 1) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  saveCart();
  updateCartUI();
  showToast(`${product.emoji} ${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function saveCart() {
  localStorage.setItem('fitlife-cart', JSON.stringify(cart));
}

function loadCart() {
  try {
    const saved = localStorage.getItem('fitlife-cart');
    if (saved) cart = JSON.parse(saved);
  } catch {
    cart = [];
  }
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const count = getCartCount();

  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle('cart-btn__count--visible', count > 0);
  }

  renderCartItems();

  const subtotalEl = document.getElementById('cartSubtotal');
  if (subtotalEl) {
    subtotalEl.textContent = `R$ ${formatPrice(getCartTotal())}`;
  }
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-drawer__empty">
        <div class="cart-drawer__empty-icon">🛒</div>
        <p>Seu carrinho está vazio</p>
        <p style="font-size: var(--text-sm); margin-top: var(--space-sm);">Adicione suplementos e aproveite!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-cart-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item__image">
      <div class="cart-item__info">
        <div class="cart-item__name">${item.emoji} ${item.name}</div>
        <div class="cart-item__price">R$ ${formatPrice(item.price * item.qty)}</div>
        <div class="cart-item__controls">
          <button type="button" class="cart-item__qty-btn" data-cart-minus="${item.id}">−</button>
          <span class="cart-item__qty">${item.qty}</span>
          <button type="button" class="cart-item__qty-btn" data-cart-plus="${item.id}">+</button>
          <button type="button" class="cart-item__remove" data-cart-remove="${item.id}">Remover</button>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('[data-cart-minus]').forEach(btn => {
    btn.addEventListener('click', () => updateCartQty(btn.dataset.cartMinus, -1));
  });

  container.querySelectorAll('[data-cart-plus]').forEach(btn => {
    btn.addEventListener('click', () => updateCartQty(btn.dataset.cartPlus, 1));
  });

  container.querySelectorAll('[data-cart-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.cartRemove));
  });
}

function initCartDrawer() {
  const openBtn = document.getElementById('cartBtn');
  const closeBtn = document.getElementById('cartClose');
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  const checkoutBtn = document.getElementById('cartCheckout');

  const open = () => {
    overlay?.classList.add('cart-overlay--open');
    drawer?.classList.add('cart-drawer--open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    overlay?.classList.remove('cart-overlay--open');
    drawer?.classList.remove('cart-drawer--open');
    document.body.style.overflow = '';
  };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);

  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Adicione produtos ao carrinho primeiro');
      return;
    }
    close();
    showToast('🎉 Pedido enviado! Retire na recepção da FitLife.');
    cart = [];
    saveCart();
    updateCartUI();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initSearch() {
  const input = document.getElementById('shopSearch');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });
}

function showToast(message) {
  let toast = document.getElementById('shopToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shopToast';
    toast.className = 'shop-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('shop-toast--visible');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('shop-toast--visible');
  }, 3000);
}
