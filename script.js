let previousSectionId = 'omoi';

const isEnglish = document.documentElement.lang === 'en';

const singleMenuData = {
  food: isEnglish ? [
    { name: 'Edomae Nigiri Selection', price: 'Market Price', desc: 'Seasonal wild fish meticulously hand-pressed using traditional Edomae techniques.' },
    { name: 'Signature ENN Roll', price: '¥3,800', desc: 'Luxurious roll filled with sea urchin (Uni), house-cured salmon roe, and selected bluefin tuna.' },
    { name: 'Snow Crab, Uni & Caviar', price: '¥4,500', desc: 'Sweet snow crab served with rich sea urchin and caviar in a special small dish.' },
    { name: 'Kinki Fish Shabu-Shabu', price: '¥5,200', desc: 'Premium Hokkaido Kinki (thorny head) fish prepared in a delicate dashi hot pot broth.' }
  ] : [
    { name: '江戸前仕立て 握り各種', price: '時価', desc: '旬の天然魚を伝統の江戸前技法で一貫一貫丁寧に握ります。' },
    { name: '極みのえんロール', price: '¥3,800', desc: '馬糞雲丹、自家製いくら、厳選本マグロを贅沢に巻き上げた名物逸品巻き。' },
    { name: 'ズワイ蟹と雲丹とキャビア', price: '¥4,500', desc: '甘み豊かなズワイ蟹に濃厚な雲丹とキャビアを添えた特別小鉢。' },
    { name: '吉次のしゃぶしゃぶ', price: '¥5,200', desc: '北海道産・高級魚吉次（キンキ）の豊かな脂を贅沢に出汁しゃぶで。' }
  ],
  drink: isEnglish ? [
    { name: 'Hitakami Junmai Daiginjo "Gourd"', price: 'Market Price', desc: 'Miyagi Ishinomaki’s specialty sake crafted specifically for sushi. Elegant gourd bottle.' },
    { name: 'DATE SEVEN Premium Sake', price: 'Market Price', desc: 'An exclusive annual collaboration sake brewed jointly by 7 renowned Miyagi breweries.' },
    { name: 'Jikon Junmai Daiginjo', price: 'From ¥2,200', desc: 'Rare premium sake with a fresh fruity aroma and exceptionally crisp finish.' },
    { name: 'Isojiman / Zaku Satoshi', price: 'From ¥1,800', desc: 'Acclaimed top-tier sakes that pair seamlessly with sushi fat and seasoned rice.' }
  ] : [
    { name: '日高見（ひたかみ）純米大吟醸 瓢箪', price: '時価', desc: '宮城・石巻の平孝酒造が誇る鮨専用酒。美しい瓢箪ボトルと極上の切れ味。' },
    { name: 'DATE SEVEN（デートセブン）', price: '時価', desc: '宮城県の蔵元7社が合同で醸す、年に一度の限定プレミアム日本酒。' },
    { name: '而今（じこん）純米大吟醸', price: '¥2,200 〜', desc: '入手困難とされる銘酒。果実のような華やかな香りと澄んだ透明感。' },
    { name: '磯自慢 / 作（ざく）智', price: '¥1,800 〜', desc: 'ミシュラン掲載店で愛される最高峰。鮨の脂と酢飯の酸味に完璧に寄り添う一献。' }
  ]
};

// [핵심 Fix] 햄버거 버튼 눌렀을 때 로비 열기
function openLobby(evt) {
  if (evt) evt.stopPropagation();
  const lobbyScreen = document.getElementById('lobby-screen');
  if (lobbyScreen) {
    lobbyScreen.classList.remove('is-closed');
  }
}

// 로비 닫기
function closeLobby() {
  const lobbyScreen = document.getElementById('lobby-screen');
  if (lobbyScreen) {
    lobbyScreen.classList.add('is-closed');
  }
}

// 헤더 로고 클릭 시 시작페이지로 돌아가기
function goToStartPage() {
  const startPage = document.getElementById('start-page');
  const lobbyScreen = document.getElementById('lobby-screen');
  if (startPage) {
    startPage.classList.remove('is-hidden', 'is-light-expanding');
  }
  if (lobbyScreen) {
    lobbyScreen.classList.add('is-closed');
  }
}

// [오프닝 연출] 클릭 시 빛이 2.4초 동안 은은하게 확산되고, 다 차오르자마자 딜레이 0초로 로비 진입
function startLightExpansion(event) {
  if (event) event.stopPropagation();
  
  const startPage = document.getElementById('start-page');
  const lobbyScreen = document.getElementById('lobby-screen');
  
  if (!startPage || startPage.classList.contains('is-light-expanding')) return;

  // 1. 2.4초 동안 은은하고 품격 있게 스포트라이트 확산
  startPage.classList.add('is-light-expanding');

  // 2. 2.4초(2400ms) 빛 확산 완료 지점에 딜레이 0초로 로비 즉시 연결
  setTimeout(() => {
    startPage.classList.add('is-hidden');
    if (lobbyScreen) {
      lobbyScreen.classList.remove('is-closed');
    }
  }, 500);
}

// 스크롤 시 다크 테마 전환
function updateHeaderTheme(container) {
  const pageHeader = document.querySelector('.page-header');
  if (!pageHeader || !container) return;

  const currentSectionId = container.id;

  if (currentSectionId === 'omoi' || currentSectionId === 'waza') {
    const darkWrapper = container.querySelector('.omoi-main-wrapper, .waza-main-wrapper');
    if (darkWrapper) {
      const rect = darkWrapper.getBoundingClientRect();
      if (rect.top <= 80) {
        pageHeader.classList.add('is-dark');
      } else {
        pageHeader.classList.remove('is-dark');
      }
    }
  } else {
    pageHeader.classList.remove('is-dark');
  }
}

// 메뉴/섹션 이동
function navigateToSection(sectionId) {
  previousSectionId = sectionId;
  const allSections = document.querySelectorAll('.section-block');
  
  allSections.forEach(sec => {
    sec.classList.remove('is-active');
    sec.scrollTop = 0;
  });

  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    targetElement.classList.add('is-active');
    initIntersectionObserver(targetElement);
    
    targetElement.onscroll = function () {
      updateHeaderTheme(targetElement);
    };

    updateHeaderTheme(targetElement);

    if (sectionId === 'menu') {
      renderSingleMenu('food');
    }
  }

  closeLobby();
}

function switchCategory(evt, cat) {
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => btn.classList.remove('active'));
  if (evt && evt.target) {
    evt.target.classList.add('active');
  }
  renderSingleMenu(cat);
}

function renderSingleMenu(cat) {
  const listContainer = document.getElementById('singleMenuList');
  if (!listContainer) return;

  const items = singleMenuData[cat] || [];
  listContainer.innerHTML = items.map(item => `
    <div class="course-item">
      <div class="course-main-row">
        <h3 class="course-name">${item.name}</h3>
        <div class="course-price">${item.price}</div>
      </div>
      <div class="course-desc-box">
        ${item.desc}
      </div>
    </div>
  `).join('');
}

function initIntersectionObserver(container) {
  const reveals = container.querySelectorAll('.reveal');
  reveals.forEach(el => el.classList.remove('is-visible'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    root: container,
    threshold: 0.05
  });

  reveals.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", function () {
  renderSingleMenu('food');
  const activeSection = document.querySelector('.section-block.is-active');
  if (activeSection) {
    initIntersectionObserver(activeSection);
  }
});

flatpickr("#customDatePicker", {
  locale: isEnglish ? "default" : "ja",
  dateFormat: "Y/m/d",
  minDate: "today",
  disableMobile: "true"
});