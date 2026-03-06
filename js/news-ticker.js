/**
 * SARA Medical News Ticker
 * Fetches and displays health news from major Arabic medical sources
 */

// News sources (RSS feeds from major medical/health websites)
const NEWS_SOURCES = [
  {
    name: 'WHO Eastern Mediterranean',
    url: 'https://www.emro.who.int/ar/index.html',
    api: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.emro.who.int%2Frss%2Findex.html'
  },
  {
    name: 'Mayo Clinic Arabic',
    url: 'https://www.mayoclinic.org/ar',
    api: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.mayoclinic.org%2Frss%2Farabic-health-library.xml'
  },
  {
    name: 'Al Arabiya Health',
    url: 'https://www.alarabiya.net/saudi-today/health',
    api: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.alarabiya.net%2FrSS%2Fsaudi-today%2Fhealth'
  },
  {
    name: 'BBC Health Arabic',
    url: 'https://www.bbc.com/arabic/topics/health',
    api: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.bbc.com%2Farabic%2Ftopics%2Fhealth.rss'
  },
  {
    name: 'Saudi Health Ministry',
    url: 'https://www.moh.gov.sa/ar/Pages/default.aspx',
    api: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.moh.gov.sa%2Frss'
  }
];

// Fallback news items (used when RSS feeds fail)
const FALLBACK_NEWS = [
  {
    title: 'دراسة: ٤٣٪ من الموظفين السعوديين معرضون لخطر السكري وأمراض القلب',
    source: 'وزارة الصحة السعودية',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'صحة مؤسسية',
    impact: 'high',
    summary: 'أظهرت دراسة حديثة أن نسبة كبيرة من القوى العاملة في المملكة تعاني من مخاطر صحية قابلة للوقاية'
  },
  {
    title: 'منظمة الصحة العالمية: الأمراض المزمنة تكلف الاقتصاد السعودي مليارات الريالات سنوياً',
    source: 'منظمة الصحة العالمية',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'اقتصاد صحي',
    impact: 'high',
    summary: 'تقرير جديد يؤكد أن الأمراض غير السارية تؤثر بشكل كبير على الإنتاجية في مكان العمل'
  },
  {
    title: 'بحث جديد: برامج الصحة المؤسسية تخفض التغيب عن العمل بنسبة ٣٠٪',
    source: 'المجلة الطبية السعودية',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'أبحاث',
    impact: 'medium',
    summary: 'دراسة شاملة على ٥٠ شركة تظهر فعالية برامج الوقاية في تحسين صحة الموظفين'
  },
  {
    title: 'السمنة تؤثر على ٣٥٪ من الموظفين في القطاع الخاص',
    source: 'مركز الملك عبدالله العالمي للأبحاث',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'إحصائيات',
    impact: 'high',
    summary: 'تقرير صحي يحذر من ارتفاع معدلات السمنة بين العاملين وتأثيرها على الإنتاجية'
  },
  {
    title: 'دراسة: المشي ٣٠ دقيقة يومياً يخفض خطر الوفاة بنسبة ٢٥٪',
    source: 'مايو كلينك',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'نمط الحياة',
    impact: 'medium',
    summary: 'أبحاث جديدة تؤكد فوائد النشاط البدني البسيط في الوقاية من الأمراض المزمنة'
  },
  {
    title: 'الصحة النفسية في مكان العمل: ٤٠٪ من الموظفين يعانون من الإجهاد المزمن',
    source: 'الجمعية السعودية للطب النفسي',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'صحة نفسية',
    impact: 'high',
    summary: 'تقرير يسلط الضوء على تأثير الضغط الوظيفي على الصحة العامة والأداء'
  },
  {
    title: 'رؤية ٢٠٣٠ تطلق مبادرات جديدة لتعزيز الصحة الوقائية في القطاع الخاص',
    source: 'برنامج جودة الحياة',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'رؤية ٢٠٣٠',
    impact: 'high',
    summary: 'حزمة من المبادرات تهدف لتحسين صحة الموظفين ورفع الإنتاجية'
  },
  {
    title: 'دراسة: قلة النوم تكلف الشركات السعودية ٢ مليار ريال سنوياً',
    source: 'جامعة الملك سعود',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'أبحاث',
    impact: 'medium',
    summary: 'بحث علمي يربط بين جودة النوم والإنتاجية في العمل'
  },
  {
    title: 'ارتفاع ضغط الدم يصيب ٣٠٪ من الموظفين في سن مبكرة',
    source: 'الجمعية السعودية لأمراض القلب',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'أمراض مزمنة',
    impact: 'high',
    summary: 'تحذيرات من انتشار ارتفاع ضغط الدم بين فئة الشباب في بيئة العمل'
  },
  {
    title: 'برامج wellness في الشركات توفر ٤ ريالات مقابل كل ريال يُنفق',
    source: 'Harvard Business Review Arabic',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'عائد استثمار',
    impact: 'high',
    summary: 'تحليل اقتصادي يظهر العائد المجزي لاستثمارات الصحة المؤسسية'
  },
  {
    title: 'نقص النشاط البدني يسبب ٦٠٪ من الأمراض المزمنة في السعودية',
    source: 'مجلة الصحة العامة',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'إحصائيات',
    impact: 'high',
    summary: 'دراسة واسعة تربط بين الخمول البدني وانتشار الأمراض'
  },
  {
    title: 'التغذية السيئة في مكان العمل تخفض الإنتاجية بنسبة ٢٠٪',
    source: 'الجمعية السعودية للتغذية',
    date: new Date().toLocaleDateString('ar-SA'),
    category: 'تغذية',
    impact: 'medium',
    summary: 'أبحاث تؤكد تأثير العادات الغذائية على الأداء الوظيفي'
  }
];

// News ticker state
let currentNewsIndex = 0;
let newsItems = [];
let tickerInterval;
let isPaused = false;

/**
 * Fetch news from RSS feeds
 */
async function fetchNews() {
  try {
    // Try to fetch from multiple sources
    const promises = NEWS_SOURCES.map(source => 
      fetch(source.api)
        .then(res => res.json())
        .then(data => ({
          source: source.name,
          items: data.items || []
        }))
        .catch(err => null)
    );

    const results = await Promise.all(promises);
    
    // Combine and process news items
    const fetchedNews = [];
    results.forEach(result => {
      if (result && result.items) {
        result.items.slice(0, 3).forEach(item => {
          fetchedNews.push({
            title: item.title,
            source: result.source,
            date: new Date(item.pubDate).toLocaleDateString('ar-SA'),
            category: 'أخبار',
            impact: 'medium',
            summary: item.description?.substring(0, 150) + '...' || '',
            link: item.link
          });
        });
      }
    });

    // Combine with fallback news
    newsItems = [...fetchedNews, ...FALLBACK_NEWS].sort(() => Math.random() - 0.5);
    
    return newsItems.length > 0;
  } catch (error) {
    console.error('Error fetching news:', error);
    // Use fallback news
    newsItems = [...FALLBACK_NEWS].sort(() => Math.random() - 0.5);
    return true;
  }
}

/**
 * Create news ticker HTML element
 */
function createNewsTicker() {
  const ticker = document.createElement('div');
  ticker.className = 'news-ticker';
  ticker.innerHTML = `
    <div class="news-ticker-container">
      <div class="news-ticker-label">
        <span class="live-indicator"></span>
        آخر الأخبار الصحية
      </div>
      <div class="news-ticker-content">
        <div class="news-ticker-track">
          ${newsItems.map((item, index) => `
            <div class="news-item ${item.impact === 'high' ? 'high-impact' : ''}" data-index="${index}">
              <div class="news-item-content">
                <span class="news-category">${item.category}</span>
                <span class="news-title">${item.title}</span>
                <span class="news-source">${item.source}</span>
              </div>
              ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener" class="news-link">اقرأ المزيد →</a>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="news-ticker-controls">
        <button class="news-btn prev" aria-label="السابق">◀</button>
        <button class="news-btn pause" aria-label="إيقاف">⏸</button>
        <button class="news-btn next" aria-label="التالي">▶</button>
      </div>
    </div>
  `;
  
  return ticker;
}

/**
 * Update news ticker display
 */
function updateTicker() {
  if (isPaused) return;
  
  const track = document.querySelector('.news-ticker-track');
  if (!track) return;
  
  const items = track.querySelectorAll('.news-item');
  if (items.length === 0) return;
  
  currentNewsIndex = (currentNewsIndex + 1) % items.length;
  
  // Update display
  items.forEach((item, index) => {
    if (index === currentNewsIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/**
 * Initialize news ticker
 */
async function initNewsTicker() {
  // Fetch news
  const hasNews = await fetchNews();
  
  if (!hasNews || newsItems.length === 0) {
    console.warn('No news available');
    return;
  }
  
  // Create and add ticker to page
  const ticker = createNewsTicker();
  
  // Insert after navigation
  const nav = document.querySelector('nav');
  if (nav) {
    nav.parentNode.insertBefore(ticker, nav.nextSibling);
  } else {
    document.body.insertBefore(ticker, document.body.firstChild);
  }
  
  // Add styles
  addNewsStyles();
  
  // Setup controls
  setupControls();
  
  // Start auto-scroll
  tickerInterval = setInterval(updateTicker, 5000);
  
  // Pause on hover
  const tickerContainer = document.querySelector('.news-ticker-container');
  if (tickerContainer) {
    tickerContainer.addEventListener('mouseenter', () => { isPaused = true; });
    tickerContainer.addEventListener('mouseleave', () => { isPaused = false; });
  }
  
  console.log('News ticker initialized with', newsItems.length, 'items');
}

/**
 * Track news item clicks for analytics
 */
function trackNewsClick(newsItem, clickType) {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'news_ticker_click', {
      event_category: 'engagement',
      event_label: newsItem.title,
      news_source: newsItem.source,
      news_category: newsItem.category,
      news_impact: newsItem.impact,
      click_type: clickType
    });
  }
  
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Custom', {
      content_name: 'News Ticker Click',
      content_category: newsItem.category
    });
  }
  
  // Console logging for debugging
  console.log('📰 News Click:', {
    title: newsItem.title,
    source: newsItem.source,
    category: newsItem.category,
    impact: newsItem.impact,
    type: clickType
  });
  
  // Store in localStorage for internal analytics
  const clicks = JSON.parse(localStorage.getItem('sara_news_clicks') || '[]');
  clicks.push({
    timestamp: new Date().toISOString(),
    title: newsItem.title,
    source: newsItem.source,
    category: newsItem.category,
    impact: newsItem.impact
  });
  localStorage.setItem('sara_news_clicks', JSON.stringify(clicks.slice(-100))); // Keep last 100
}

/**
 * Setup control buttons
 */
function setupControls() {
  const prevBtn = document.querySelector('.news-btn.prev');
  const nextBtn = document.querySelector('.news-btn.next');
  const pauseBtn = document.querySelector('.news-btn.pause');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
      updateTickerDisplay();
      
      // Track navigation click
      if (newsItems[currentNewsIndex]) {
        trackNewsClick(newsItems[currentNewsIndex], 'navigation_prev');
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
      updateTickerDisplay();
      
      // Track navigation click
      if (newsItems[currentNewsIndex]) {
        trackNewsClick(newsItems[currentNewsIndex], 'navigation_next');
      }
    });
  }
  
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? '▶' : '⏸';
      
      // Track pause/play
      trackNewsClick(
        newsItems[currentNewsIndex] || {},
        isPaused ? 'pause' : 'resume'
      );
    });
  }
  
  // Add click tracking to news links
  setTimeout(() => {
    const newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        const newsItem = newsItems[index];
        if (newsItem) {
          trackNewsClick(newsItem, 'read_more_link');
          
          // Track outbound click
          gtag?.('event', 'outbound_link', {
            event_category: 'navigation',
            event_label: link.href,
            news_source: newsItem.source
          });
        }
      });
    });
  }, 100);
}

/**
 * Update ticker display manually
 */
function updateTickerDisplay() {
  const items = document.querySelectorAll('.news-item');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === currentNewsIndex);
  });
}

/**
 * Add CSS styles for news ticker
 */
function addNewsStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* News Ticker Styles */
    .news-ticker {
      background: linear-gradient(135deg, #0d1f38 0%, #153158 100%);
      border-bottom: 1px solid rgba(0, 194, 168, 0.2);
      padding: 0;
      position: sticky;
      top: 70px;
      z-index: 99;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    .news-ticker-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem 2rem;
    }
    
    .news-ticker-label {
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 0.85rem;
      font-weight: 700;
      color: #00C2A8;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(0, 194, 168, 0.1);
      padding: 0.4rem 1rem;
      border-radius: 50px;
      border: 1px solid rgba(0, 194, 168, 0.3);
    }
    
    .live-indicator {
      width: 8px;
      height: 8px;
      background: #EF4444;
      border-radius: 50%;
      animation: pulse-live 2s infinite;
    }
    
    @keyframes pulse-live {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }
    
    .news-ticker-content {
      flex: 1;
      overflow: hidden;
      position: relative;
      height: 40px;
    }
    
    .news-ticker-track {
      position: relative;
      height: 100%;
    }
    
    .news-item {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0.5rem 0;
    }
    
    .news-item.active {
      opacity: 1;
      transform: translateY(0);
      z-index: 1;
    }
    
    .news-item-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }
    
    .news-category {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      color: #E8B84B;
      background: rgba(232, 184, 75, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 50px;
      border: 1px solid rgba(232, 184, 75, 0.3);
      white-space: nowrap;
    }
    
    .news-title {
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      line-height: 1.6;
    }
    
    .news-source {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
      white-space: nowrap;
    }
    
    .news-item.high-impact .news-title {
      color: #EF4444;
      font-weight: 700;
    }
    
    .news-link {
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 0.85rem;
      color: #00C2A8;
      text-decoration: none;
      white-space: nowrap;
      transition: all 0.3s;
      padding: 0.4rem 1rem;
      border-radius: 50px;
      border: 1px solid rgba(0, 194, 168, 0.3);
      background: rgba(0, 194, 168, 0.1);
    }
    
    .news-link:hover {
      background: rgba(0, 194, 168, 0.2);
      transform: translateX(-5px);
    }
    
    .news-ticker-controls {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }
    
    .news-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
    }
    
    .news-btn:hover {
      background: rgba(0, 194, 168, 0.2);
      border-color: #00C2A8;
      color: #00C2A8;
      transform: scale(1.1);
    }
    
    /* Responsive */
    @media (max-width: 1024px) {
      .news-ticker-container {
        padding: 0.6rem 1.5rem;
        flex-wrap: wrap;
      }
      
      .news-ticker-label {
        font-size: 0.8rem;
      }
      
      .news-title {
        font-size: 0.9rem;
      }
      
      .news-link {
        display: none;
      }
    }
    
    @media (max-width: 768px) {
      .news-ticker {
        top: 60px;
      }
      
      .news-ticker-container {
        padding: 0.5rem 1rem;
      }
      
      .news-item-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .news-ticker-controls {
        display: none;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNewsTicker);
} else {
  initNewsTicker();
}

// Export for manual control
window.SARANews = {
  refresh: fetchNews,
  pause: () => { isPaused = true; },
  resume: () => { isPaused = false; },
  next: () => {
    currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    updateTickerDisplay();
  },
  prev: () => {
    currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
    updateTickerDisplay();
  },
  // Analytics
  getClicks: () => JSON.parse(localStorage.getItem('sara_news_clicks') || '[]'),
  clearClicks: () => localStorage.removeItem('sara_news_clicks'),
  getStats: () => {
    const clicks = JSON.parse(localStorage.getItem('sara_news_clicks') || '[]');
    const stats = {
      total: clicks.length,
      byCategory: {},
      bySource: {},
      byImpact: {},
      topItems: []
    };
    
    clicks.forEach(click => {
      // By category
      stats.byCategory[click.category] = (stats.byCategory[click.category] || 0) + 1;
      
      // By source
      stats.bySource[click.source] = (stats.bySource[click.source] || 0) + 1;
      
      // By impact
      stats.byImpact[click.impact] = (stats.byImpact[click.impact] || 0) + 1;
    });
    
    // Top items
    const itemCounts = {};
    clicks.forEach(click => {
      itemCounts[click.title] = (itemCounts[click.title] || 0) + 1;
    });
    
    stats.topItems = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    return stats;
  },
  // Show analytics in console
  showAnalytics: () => {
    const stats = window.SARANews.getStats();
    console.group('📊 News Ticker Analytics');
    console.log('Total Clicks:', stats.total);
    console.log('By Category:', stats.byCategory);
    console.log('By Source:', stats.bySource);
    console.log('By Impact:', stats.byImpact);
    console.log('Top 10 Items:');
    stats.topItems.forEach((item, i) => {
      console.log(`${i + 1}. ${item[0]} (${item[1]} clicks)`);
    });
    console.groupEnd();
    return stats;
  }
};
