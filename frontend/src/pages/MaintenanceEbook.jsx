import { useMemo, useState } from 'react';
import { BookOpen, ShoppingCart, Plus, Minus, Trash2, CreditCard, Search, Sparkles } from 'lucide-react';

const EBOOKS = [
  {
    id: 'ebk-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 399,
    category: 'Self Growth',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
    blurb: 'Build better habits with practical, science-backed methods.'
  },
  {
    id: 'ebk-2',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 349,
    category: 'Finance',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&q=80',
    blurb: 'Timeless lessons on wealth, greed, and financial behavior.'
  },
  {
    id: 'ebk-3',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    price: 299,
    category: 'Finance',
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=80',
    blurb: 'A bestselling mindset shift for money, assets, and investing.'
  },
  {
    id: 'ebk-4',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    price: 449,
    category: 'Leadership',
    cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80',
    blurb: 'Powerful principles for personal and professional effectiveness.'
  },
  {
    id: 'ebk-5',
    title: 'Ikigai',
    author: 'Hector Garcia & Francesc Miralles',
    price: 299,
    category: 'Self Growth',
    cover: 'https://images.unsplash.com/photo-1455885666463-9ad48653f7ce?auto=format&fit=crop&w=500&q=80',
    blurb: 'Japanese wisdom for a meaningful, balanced, and joyful life.'
  },
  {
    id: 'ebk-6',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    price: 279,
    category: 'Self Growth',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=500&q=80',
    blurb: 'Classic success philosophy used by entrepreneurs worldwide.'
  },
  {
    id: 'ebk-7',
    title: 'Deep Work',
    author: 'Cal Newport',
    price: 359,
    category: 'Productivity',
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80',
    blurb: 'Master focus and produce high-value work in less time.'
  },
  {
    id: 'ebk-8',
    title: 'The Almanack of Naval Ravikant',
    author: 'Eric Jorgenson',
    price: 399,
    category: 'Business',
    cover: 'https://images.unsplash.com/photo-1509266272358-7701da638078?auto=format&fit=crop&w=500&q=80',
    blurb: 'Wisdom on wealth, happiness, leverage, and long-term thinking.'
  },
  {
    id: 'ebk-9',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    price: 379,
    category: 'Self Growth',
    cover: 'https://images.unsplash.com/photo-1515098506762-79e1384e9d8e?auto=format&fit=crop&w=500&q=80',
    blurb: 'A brutally honest approach to living a better life.'
  },
  {
    id: 'ebk-10',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 499,
    category: 'History',
    cover: 'https://images.unsplash.com/photo-1496104679561-38b3b4f4d5f4?auto=format&fit=crop&w=500&q=80',
    blurb: 'A brief history of humankind from evolution to modern society.'
  },
  {
    id: 'ebk-11',
    title: 'Start With Why',
    author: 'Simon Sinek',
    price: 339,
    category: 'Leadership',
    cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80',
    blurb: 'How great leaders inspire action and build loyal communities.'
  },
  {
    id: 'ebk-12',
    title: 'Zero to One',
    author: 'Peter Thiel',
    price: 329,
    category: 'Business',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80',
    blurb: 'Notes on startups and building truly innovative businesses.'
  }
];

function formatInr(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export default function MaintenanceEbook() {
  const [cart, setCart] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = useMemo(() => ['All', ...Array.from(new Set(EBOOKS.map(b => b.category)))], []);

  const visibleBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return EBOOKS.filter(book => {
      const inCategory = activeTab === 'All' || book.category === activeTab;
      const inSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query);
      return inCategory && inSearch;
    });
  }, [activeTab, searchQuery]);

  const items = useMemo(() => {
    return EBOOKS
      .map(book => ({ ...book, qty: cart[book.id] || 0 }))
      .filter(book => book.qty > 0);
  }, [cart]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const platformFee = subtotal > 0 ? 9 : 0;
  const total = subtotal + platformFee;

  const add = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id) =>
    setCart(prev => {
      const next = { ...prev };
      if (!next[id]) return prev;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  const clearItem = (id) =>
    setCart(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const handlePay = () => {
    if (!items.length) return;
    alert('Temporary maintenance template: connect this button to your Razorpay checkout flow.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080b12', color: '#f5f7fa', padding: '1.2rem' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 18,
          padding: '1rem 1.2rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, rgba(38,90,255,0.22), rgba(26,188,156,0.18))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.55rem', fontWeight: 800 }}>
              <BookOpen size={20} />
              Premium Ebook Collection
            </div>
            <p style={{ margin: '.35rem 0 0', color: '#d6deea', fontSize: '.92rem' }}>
              Discover bestselling books across business, finance, productivity, and personal growth.
            </p>
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.45rem',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: 999,
            padding: '.4rem .7rem',
            background: 'rgba(255,255,255,0.08)',
            color: '#d8ecff',
            fontSize: '.83rem',
            fontWeight: 700
          }}>
            <Sparkles size={14} />
            Trusted by 25,000+ readers
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,3fr) minmax(280px,1fr)', gap: '1rem' }}>
          <div>
            <div style={{
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.03)',
              padding: '.8rem',
              marginBottom: '.9rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(240px, 1.2fr) 2fr',
                gap: '.7rem',
                alignItems: 'center'
              }}>
                <div style={{
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 10,
                  overflow: 'hidden',
                  background: 'rgba(0,0,0,0.25)'
                }}>
                  <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#91a7c7' }} />
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, or category..."
                    style={{
                      width: '100%',
                      padding: '.62rem .7rem .62rem 2rem',
                      border: 0,
                      outline: 0,
                      background: 'transparent',
                      color: '#eef4ff',
                      fontSize: '.9rem'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '.45rem', overflowX: 'auto', paddingBottom: '.2rem' }}>
                  {tabs.map(tab => {
                    const active = tab === activeTab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                          border: `1px solid ${active ? 'rgba(43,144,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
                          background: active ? 'rgba(43,144,255,0.17)' : 'rgba(255,255,255,0.04)',
                          color: active ? '#d9ebff' : '#b7c6dd',
                          borderRadius: 999,
                          padding: '.45rem .75rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          fontSize: '.82rem',
                          fontWeight: 700
                        }}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '.9rem' }}>
              {visibleBooks.map(book => {
              const qty = cart[book.id] || 0;
              return (
                <div key={book.id} style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <img src={book.cover} alt={book.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                  <div style={{ padding: '.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      borderRadius: 999,
                      border: '1px solid rgba(43,144,255,0.4)',
                      color: '#9bccff',
                      background: 'rgba(43,144,255,0.14)',
                      fontSize: '.67rem',
                      padding: '.15rem .45rem',
                      marginBottom: '.4rem',
                      fontWeight: 700
                    }}>
                      {book.category}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{book.title}</h3>
                    <p style={{ margin: '.2rem 0 .5rem', color: '#9db0c7', fontSize: '.82rem' }}>by {book.author}</p>
                    <p style={{ margin: 0, color: '#c8d4e4', fontSize: '.82rem', minHeight: 44, flex: 1 }}>{book.blurb}</p>
                    <div style={{ marginTop: '.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: '#61dafb' }}>{formatInr(book.price)}</strong>
                      {qty === 0 ? (
                        <button onClick={() => add(book.id)} style={btnSmall()}>
                          <Plus size={14} /> Add
                        </button>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                          <button onClick={() => remove(book.id)} style={iconBtn()}><Minus size={14} /></button>
                          <span style={{ minWidth: 18, textAlign: 'center' }}>{qty}</span>
                          <button onClick={() => add(book.id)} style={iconBtn()}><Plus size={14} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
              })}
              {!visibleBooks.length && (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  border: '1px dashed rgba(255,255,255,0.22)',
                  borderRadius: 14,
                  padding: '1.5rem',
                  color: '#9db0c7'
                }}>
                  No books found for this search/filter.
                </div>
              )}
            </div>
          </div>

          <aside style={{
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            padding: '.9rem',
            alignSelf: 'start',
            position: 'sticky',
            top: 16
          }}>
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '.4rem' }}>
              <ShoppingCart size={18} /> Cart
            </h3>
            {!items.length ? (
              <p style={{ color: '#9db0c7', fontSize: '.9rem' }}>No ebooks selected yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '.6rem' }}>
                {items.map(item => (
                  <div key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '.45rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.5rem' }}>
                      <div>
                        <div style={{ fontSize: '.92rem', fontWeight: 600 }}>{item.title}</div>
                        <div style={{ color: '#8aa0bc', fontSize: '.8rem' }}>
                          {formatInr(item.price)} x {item.qty}
                        </div>
                      </div>
                      <button onClick={() => clearItem(item.id)} style={iconBtn()}><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '.9rem', borderTop: '1px solid rgba(255,255,255,0.09)', paddingTop: '.75rem' }}>
              <Row label="Subtotal" value={formatInr(subtotal)} />
              <Row label="Platform fee" value={formatInr(platformFee)} />
              <Row label="Total" value={formatInr(total)} strong />
            </div>

            <div style={{ marginTop: '.9rem' }}>
              <div style={{ fontSize: '.86rem', color: '#9db0c7', marginBottom: '.4rem' }}>Payment option</div>
              <label style={payOption(paymentMethod === 'razorpay')}>
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                />
                <span style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
                  <CreditCard size={15} /> Razorpay
                </span>
              </label>
            </div>

            <button
              onClick={handlePay}
              disabled={!items.length}
              style={{
                marginTop: '.9rem',
                width: '100%',
                border: 0,
                borderRadius: 12,
                padding: '.78rem .9rem',
                fontWeight: 800,
                cursor: items.length ? 'pointer' : 'not-allowed',
                background: items.length ? 'linear-gradient(135deg,#2b90ff,#1abc9c)' : 'rgba(255,255,255,0.12)',
                color: items.length ? '#fff' : '#9ea9b9'
              }}
            >
              Proceed to Razorpay
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '.22rem 0', fontWeight: strong ? 800 : 500 }}>
      <span style={{ color: strong ? '#f2f7ff' : '#9db0c7' }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function btnSmall() {
  return {
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 10,
    padding: '.33rem .6rem',
    background: 'rgba(255,255,255,0.09)',
    color: '#eaf2ff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '.25rem'
  };
}

function iconBtn() {
  return {
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 8,
    width: 26,
    height: 26,
    display: 'grid',
    placeItems: 'center',
    background: 'rgba(255,255,255,0.06)',
    color: '#d7e3f7',
    cursor: 'pointer'
  };
}

function payOption(active) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '.45rem',
    border: `1px solid ${active ? 'rgba(43,144,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
    borderRadius: 10,
    padding: '.55rem .65rem',
    background: active ? 'rgba(43,144,255,0.12)' : 'transparent',
    fontSize: '.9rem',
    cursor: 'pointer'
  };
}
