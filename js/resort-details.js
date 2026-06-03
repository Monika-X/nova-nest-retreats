(function () {
    const pfx = [
        'Azure', 'Emerald', 'Sapphire', 'Golden', 'Crystal', 'Coral', 'Amber', 'Silver',
        'Ruby', 'Topaz', 'Jade', 'Opal', 'Turquoise', 'Cobalt', 'Ivory', 'Onyx',
        'Pearl', 'Indigo', 'Citrine', 'Platinum', 'Sunset', 'Sunrise', 'Midnight',
        'Dawn', 'Royal', 'Imperial', 'Grand', 'Majestic', 'Elite', 'Premier',
        'Prestige', 'Luxe', 'Serene', 'Tranquil', 'Mystic', 'Celestial', 'Horizon',
        'Cascade', 'Radiant', 'Zenith'
    ];
    const noun = ['Ocean', 'Beach', 'Island', 'Mountain', 'Jungle', 'Lake', 'Valley', 'Bay', 'Cliff', 'Garden'];
    const type = ['Resort', 'Lodge', 'Retreat', 'Villas', 'Hotel', 'Sanctuary', 'Haven', 'Palace', 'Estate', 'Oasis'];
    const locations = [
        { name: 'Maldives', cat: 'island', min: 18000, max: 95000 },
        { name: 'Bali, Indonesia', cat: 'jungle', min: 6000, max: 45000 },
        { name: 'Goa, India', cat: 'beachfront', min: 4000, max: 35000 },
        { name: 'Kerala, India', cat: 'jungle', min: 3500, max: 25000 },
        { name: 'Swiss Alps', cat: 'mountain', min: 20000, max: 80000 },
        { name: 'Singapore', cat: 'city', min: 18000, max: 70000 },
        { name: 'Bora Bora', cat: 'island', min: 28000, max: 100000 },
        { name: 'Phuket, Thailand', cat: 'beachfront', min: 5000, max: 40000 },
        { name: 'Dubai, UAE', cat: 'city', min: 15000, max: 90000 },
        { name: 'Santorini, Greece', cat: 'beachfront', min: 12000, max: 75000 },
        { name: 'Seychelles', cat: 'island', min: 22000, max: 85000 },
        { name: 'Coorg, India', cat: 'mountain', min: 3000, max: 18000 },
        { name: 'Manali, India', cat: 'mountain', min: 2500, max: 15000 },
        { name: 'Andaman Islands', cat: 'beachfront', min: 5000, max: 32000 },
        { name: 'Sri Lanka', cat: 'jungle', min: 5000, max: 35000 },
        { name: 'Rajasthan, India', cat: 'city', min: 8000, max: 55000 },
        { name: 'Ooty, India', cat: 'mountain', min: 2800, max: 14000 },
        { name: 'Tuscany, Italy', cat: 'city', min: 16000, max: 72000 },
        { name: 'Langkawi, Malaysia', cat: 'island', min: 6000, max: 42000 },
        { name: 'Queenstown, NZ', cat: 'mountain', min: 14000, max: 65000 }
    ];
    const badges = [
        { text: 'Best Seller', cls: 'badge-emerald' },
        { text: 'Trending', cls: 'badge-warning' },
        { text: 'Exclusive Deal', cls: 'badge-ocean' },
        { text: 'Top Rated', cls: 'badge-emerald' },
        { text: 'Flash Sale', cls: 'badge-warning' },
        { text: 'Most Popular', cls: 'badge-emerald' },
        { text: "Editor's Pick", cls: 'badge-ocean' },
        { text: 'Award Winner', cls: 'badge-emerald' },
        { text: 'Member Deal', cls: 'badge-warning' },
        { text: 'New Arrival', cls: 'badge-ocean' },
        null, null, null, null, null
    ];
    const imgs = [
        '1582719478250-c89cae4dc85b', '1571896349842-33c89424de2d',
        '1566073771259-6a8506099945', '1522798514-97ceb8c4f1c8',
        '1544365558-35aa4afcf11f', '1498307833015-e7b400441eb8',
        '1520250497591-112f2f40a3f4', '1551882547-ff40c63fe5fa',
        '1578683010236-d716f9a3f461', '1540541338287-41700207dee6',
        '1537996194471-e657df975ab4', '1615880484746-a134be9a6ecf',
        '1506905925346-21bda4d32df4', '1445019980597-93fa8acb246c',
        '1518684079-3c830dcef090', '1542838132-92c53300491e',
        '1613395877344-13d4a8e0d49e', '1504701954957-2010ec3bcec1',
        '1499793983690-e29da59ef1c2', '1610641818989-c2051b5e2cfd'
    ];
    const ratingPool = [3.5, 4.0, 4.2, 4.5, 4.7, 4.8, 5.0];
    const categoryDetails = {
        island: {
            intro: 'A private island-style retreat shaped around turquoise water, bright skies, and slow luxury.',
            detail: 'Expect lagoon-facing spaces, boat transfers, sunset dining, reef activities, and calm corners designed for uninterrupted downtime.',
            amenities: ['Private Pool', 'Lagoon Access', 'Sunset Deck', 'Spa Access', 'Airport Transfer', 'Fine Dining'],
            attractions: [['House Reef', 'Snorkeling Spot', '0.8 km away'], ['Sunset Sandbank', 'Private Picnic', '2.4 km away']]
        },
        jungle: {
            intro: 'A nature-led hideaway surrounded by greenery, quiet trails, and restorative resort comforts.',
            detail: 'Ideal for wellness breaks, slow mornings, guided walks, local dining, and poolside evenings after exploring the region.',
            amenities: ['Nature Trails', 'Infinity Pool', 'Yoga Deck', 'Organic Meals', 'Spa Access', 'High-speed WiFi'],
            attractions: [['Forest Trail', 'Guided Walk', '1.5 km away'], ['Local Market', 'Culture Stop', '4.0 km away']]
        },
        beachfront: {
            intro: 'A coastal resort made for sea views, easy beach access, fresh dining, and relaxed days.',
            detail: 'Enjoy beach clubs, water sports, sunrise walks, seafood dinners, and comfortable rooms close to the shoreline.',
            amenities: ['Beach Access', 'Water Sports', 'Sea View Room', 'Room Service', 'Mini Bar', 'Airport Transfer'],
            attractions: [['Main Beach', 'Swimming & Dining', '0.3 km away'], ['Old Town Walk', 'Shopping & Cafes', '3.2 km away']]
        },
        mountain: {
            intro: 'A cool-weather retreat with mountain views, cozy rooms, and scenic outdoor experiences.',
            detail: 'Designed for travelers who want fresh air, valley viewpoints, guided trails, warm meals, and peaceful evenings.',
            amenities: ['Valley View', 'Heated Rooms', 'Guided Treks', 'Bonfire', 'High-speed WiFi', 'Room Service'],
            attractions: [['Viewpoint Trail', 'Scenic Hike', '1.8 km away'], ['Local Cafe Row', 'Food & Coffee', '2.7 km away']]
        },
        city: {
            intro: 'A polished urban luxury stay close to dining, shopping, nightlife, and cultural highlights.',
            detail: 'Best for travelers who want premium rooms, fast access, rooftop spaces, business amenities, and curated city experiences.',
            amenities: ['City View', 'Rooftop Pool', 'Business Lounge', 'Fine Dining', 'High-speed WiFi', 'Airport Transfer'],
            attractions: [['Museum District', 'Culture Stop', '2.1 km away'], ['Luxury Mall', 'Shopping', '1.4 km away']]
        }
    };

    function buildResorts() {
        const list = [];
        for (let i = 0; i < 400; i++) {
            const loc = locations[i % 20];
            const range = loc.max - loc.min;
            const raw = loc.min + ((i * 1237 + i * i * 19) % range);
            const price = Math.round(raw / 500) * 500;
            const name = `${pfx[i % pfx.length]} ${noun[Math.floor(i / 4) % noun.length]} ${type[Math.floor(i / 40) % type.length]}`;
            list.push({
                id: i + 1,
                name,
                location: loc.name,
                cat: loc.cat,
                price,
                badge: badges[i % badges.length],
                rating: ratingPool[i % ratingPool.length],
                reviews: 20 + ((i * 37 + 117) % 780),
                img: imgs[i % imgs.length]
            });
        }
        return list;
    }

    function fmt(value) {
        return '\u20b9' + Number(value).toLocaleString('en-IN');
    }

    function starsHtml(rating, reviews) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += rating >= i ? '<span>★</span>' : '<span class="text-muted">★</span>';
        }
        return `${stars}<span class="text-muted ml-2">(${reviews} Reviews)</span>`;
    }

    function amenityIcon() {
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald"><path d="M20 6 9 17l-5-5"></path></svg>';
    }

    function setText(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    }

    const params = new URLSearchParams(window.location.search);
    const selectedId = parseInt(params.get('id') || '1', 10);
    const resorts = buildResorts();
    const resort = resorts.find(item => item.id === selectedId) || resorts[0];
    const details = categoryDetails[resort.cat] || categoryDetails.beachfront;
    const badge = resort.badge || { text: 'Premium', cls: 'badge-emerald' };
    const galleryIds = [resort.img, imgs[resort.id % imgs.length], imgs[(resort.id + 3) % imgs.length]];

    window.NOVA_RESORT_PRICE = resort.price;
    window.NOVA_SELECTED_RESORT = resort;

    document.title = `${resort.name} - Nova Nest Retreats`;
    setText('nav span.text-white', resort.name);
    setText('h1.text-4xl', resort.name);

    const titleBadge = document.querySelector('.flex.items-center.gap-3.mb-2 .badge');
    if (titleBadge) {
        titleBadge.className = `badge ${badge.cls || 'badge-emerald'}`;
        titleBadge.textContent = badge.text;
    }

    const ratingEl = document.querySelector('.flex.items-center.text-warning.text-sm');
    if (ratingEl) ratingEl.innerHTML = starsHtml(resort.rating, resort.reviews);

    const locationEl = document.querySelector('p.text-emerald.font-medium');
    if (locationEl) {
        locationEl.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>' + resort.location;
    }

    document.querySelectorAll('.gallery-img').forEach((img, index) => {
        img.src = `https://images.unsplash.com/photo-${galleryIds[index]}?auto=format&fit=crop&w=${index === 0 ? '1200' : '800'}&q=80`;
        img.alt = `${resort.name} ${index === 0 ? 'main view' : 'gallery view'}`;
    });

    const aboutHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.trim() === 'About this resort');
    const aboutBlock = aboutHeading ? aboutHeading.parentElement : null;
    if (aboutBlock) {
        const paragraphs = aboutBlock.querySelectorAll('p');
        if (paragraphs[0]) paragraphs[0].textContent = `${details.intro} ${resort.name} brings Nova Nest comfort to ${resort.location}, with a nightly rate from ${fmt(resort.price)}.`;
        if (paragraphs[1]) paragraphs[1].textContent = details.detail;
    }

    const amenitiesGrid = document.querySelector('.amenities-grid');
    if (amenitiesGrid) {
        amenitiesGrid.innerHTML = details.amenities.map(item => `
            <div class="amenity-item">
                ${amenityIcon()}
                <span class="text-sm font-medium">${item}</span>
            </div>
        `).join('');
    }

    const attractionsGrid = document.querySelector('.attractions-grid');
    if (attractionsGrid) {
        attractionsGrid.innerHTML = details.attractions.map(item => `
            <div class="flex items-center justify-between p-4 bg-primary rounded-lg border border-glass attraction-item">
                <div>
                    <div class="font-bold text-white mb-1">${item[0]}</div>
                    <div class="text-xs text-muted">${item[1]}</div>
                </div>
                <div class="text-sm text-emerald bg-emerald-900 bg-opacity-30 px-3 py-1 rounded-full">${item[2]}</div>
            </div>
        `).join('');
    }

    const priceHero = document.querySelector('.booking-card .text-3xl.font-display.font-bold');
    if (priceHero) priceHero.textContent = fmt(resort.price);

    const similar = resorts.filter(item => item.id !== resort.id && item.cat === resort.cat).slice(0, 3);
    document.querySelectorAll('section.bg-primary.border-t .card-resort').forEach((card, index) => {
        const item = similar[index] || resorts[index + 1];
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const location = card.querySelector('.text-xs.text-muted');
        const price = card.querySelector('.font-bold.text-emerald');
        const link = card.querySelector('a');

        if (img) {
            img.src = `https://images.unsplash.com/photo-${item.img}?auto=format&fit=crop&w=800&q=80`;
            img.alt = item.name;
        }
        if (title) title.textContent = item.name;
        if (location) location.textContent = item.location;
        if (price) price.innerHTML = `${fmt(item.price)}<span class="text-xs font-normal text-muted">/n</span>`;
        if (link) link.href = `resort-details.html?id=${item.id}`;
    });

    // Wishlist & Share Functionality
    const wishlistBtn = document.querySelector('[aria-label="Save to Wishlist"]');
    const shareBtn = document.querySelector('[aria-label="Share"]');

    if (wishlistBtn) {
        const heartSvg = wishlistBtn.querySelector('svg');
        const updateHeartVisuals = (saved) => {
            if (saved) {
                heartSvg.setAttribute('fill', '#ef4444');
                heartSvg.setAttribute('stroke', '#ef4444');
            } else {
                heartSvg.setAttribute('fill', 'none');
                heartSvg.setAttribute('stroke', 'currentColor');
            }
        };

        let wishlist = JSON.parse(localStorage.getItem('novanest_wishlist')) || [];
        let isSaved = wishlist.some(item => {
            if (typeof item === 'object' && item !== null) {
                return String(item.id) === String(resort.id);
            }
            return String(item) === String(resort.id);
        });
        updateHeartVisuals(isSaved);

        wishlistBtn.addEventListener('click', () => {
            wishlist = JSON.parse(localStorage.getItem('novanest_wishlist')) || [];
            const index = wishlist.findIndex(item => {
                if (typeof item === 'object' && item !== null) {
                    return String(item.id) === String(resort.id);
                }
                return String(item) === String(resort.id);
            });
            isSaved = index > -1;
            if (isSaved) {
                wishlist.splice(index, 1);
                localStorage.setItem('novanest_wishlist', JSON.stringify(wishlist));
                updateHeartVisuals(false);
                if (window.showToast) window.showToast('Removed from Wishlist');
            } else {
                wishlist.push(resort);
                localStorage.setItem('novanest_wishlist', JSON.stringify(wishlist));
                updateHeartVisuals(true);
                if (window.showToast) window.showToast('Added to Wishlist');
            }
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: resort.name,
                    text: `Check out ${resort.name} in ${resort.location} on Nova Nest Retreats!`,
                    url: window.location.href
                }).catch(err => console.log('Error sharing:', err));
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    if (window.showToast) window.showToast('Link copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy link:', err);
                    if (window.showToast) window.showToast('Could not copy link.');
                });
            }
        });
    }
})();
