// FX学習コンテンツ - メインアプリケーション

// URLパラメータを取得
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// レッスンをslugで検索
function getLessonBySlug(slug) {
  return lessons.find(l => l.slug === slug);
}

// 用語をslugで検索
function getTermBySlug(slug) {
  return glossaryTerms.find(t => t.slug === slug);
}

// HTML エスケープ
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===================================
// ホームページ
// ===================================
function initHomePage() {
  renderContinueCard();
  renderRecommendedLesson();
}

function renderContinueCard() {
  const container = document.getElementById('continue-card');
  if (!container) return;

  const lastSlug = getLastLesson();
  if (lastSlug) {
    const lesson = getLessonBySlug(lastSlug);
    if (lesson && !isLessonCompleted(lastSlug)) {
      container.innerHTML = `
        <a href="lesson.html?slug=${lesson.slug}" class="card card--clickable">
          <div class="card__header">
            <div class="card__icon">📖</div>
            <div class="card__content">
              <div class="card__title">${escapeHtml(lesson.title)}</div>
              <div class="card__meta">
                <span>${escapeHtml(lesson.category)}</span>
                <span>${lesson.readingTime}分</span>
              </div>
            </div>
          </div>
        </a>
      `;
      container.parentElement.classList.remove('hidden');
      return;
    }
  }
  container.parentElement.classList.add('hidden');
}

function renderRecommendedLesson() {
  const container = document.getElementById('recommended-lesson');
  if (!container) return;

  // 未完了のレッスンからランダムに選択
  const incompleteLessons = lessons.filter(l => !isLessonCompleted(l.slug));
  if (incompleteLessons.length > 0) {
    const lesson = incompleteLessons[Math.floor(Math.random() * incompleteLessons.length)];
    container.innerHTML = `
      <a href="lesson.html?slug=${lesson.slug}" class="card card--clickable">
        <div class="card__header">
          <div class="card__icon">💡</div>
          <div class="card__content">
            <div class="card__title">${escapeHtml(lesson.title)}</div>
            <div class="card__meta">
              <span>${escapeHtml(lesson.category)}</span>
              <span>${lesson.readingTime}分</span>
            </div>
          </div>
        </div>
      </a>
    `;
  } else {
    // 全レッスン完了
    container.innerHTML = `
      <div class="card">
        <div class="card__content">
          <div class="card__title">おめでとうございます！</div>
          <div class="card__description">すべてのレッスンを完了しました。</div>
        </div>
      </div>
    `;
  }
}

// ===================================
// 学習コース一覧ページ
// ===================================
function initLearnPage() {
  renderCategoryFilter();
  renderLessonList('all');
}

function renderCategoryFilter() {
  const container = document.getElementById('category-filter');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <button class="filter-tab ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
      ${escapeHtml(cat.name)}
    </button>
  `).join('');

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
      container.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      renderLessonList(e.target.dataset.category);
    }
  });
}

function renderLessonList(category) {
  const container = document.getElementById('lesson-list');
  if (!container) return;

  let filteredLessons = lessons;
  if (category !== 'all') {
    filteredLessons = lessons.filter(l => l.category === category);
  }

  container.innerHTML = filteredLessons.map(lesson => {
    const completed = isLessonCompleted(lesson.slug);
    return `
      <a href="lesson.html?slug=${lesson.slug}" class="card card--clickable">
        <div class="card__header">
          <div class="card__icon">${completed ? '✅' : '📖'}</div>
          <div class="card__content">
            <div class="card__title">${escapeHtml(lesson.title)}</div>
            <div class="card__meta">
              <span>${escapeHtml(lesson.category)}</span>
              <span>${lesson.readingTime}分</span>
              ${completed ? '<span class="card__badge card__badge--completed">完了</span>' : ''}
            </div>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// ===================================
// レッスン詳細ページ
// ===================================
function initLessonPage() {
  const slug = getUrlParam('slug');
  if (!slug) {
    window.location.href = 'learn.html';
    return;
  }

  const lesson = getLessonBySlug(slug);
  if (!lesson) {
    window.location.href = 'learn.html';
    return;
  }

  recordLastSeen(slug);
  renderLesson(lesson);
  setupLessonCompletion(lesson);
}

function renderLesson(lesson) {
  document.title = `${lesson.title} | FX学習`;

  const container = document.getElementById('lesson-content');
  if (!container) return;

  container.innerHTML = `
    <div class="lesson">
      <div class="lesson__header">
        <span class="lesson__category">${escapeHtml(lesson.category)}</span>
        <h1 class="lesson__title">${escapeHtml(lesson.title)}</h1>
        <div class="lesson__meta">
          <span>約${lesson.readingTime}分で読めます</span>
        </div>
      </div>

      <div class="lesson__content">
        ${lesson.content}
      </div>

      <div class="key-points">
        <div class="key-points__title">重要ポイント</div>
        <ul class="key-points__list">
          ${lesson.keyPoints.map(point => `
            <li class="key-points__item">${escapeHtml(point)}</li>
          `).join('')}
        </ul>
      </div>

      <div class="risk-note">
        <div class="risk-note__title">⚠️ リスクについて</div>
        <div class="risk-note__text">
          FXは元本保証のない金融商品です。レバレッジ取引により、預けた証拠金以上の損失が発生する可能性があります。
          投資の最終判断はご自身で行ってください。
        </div>
      </div>

      <div class="btn-group">
        <a href="quiz.html?slug=${lesson.slug}" class="btn btn--primary btn--block">
          3問クイズに挑戦する
        </a>
        <button id="complete-btn" class="btn btn--secondary btn--block" ${isLessonCompleted(lesson.slug) ? 'disabled' : ''}>
          ${isLessonCompleted(lesson.slug) ? '✓ 完了済み' : 'レッスンを完了にする'}
        </button>
      </div>
    </div>

    <div class="cta-banner">
      <div class="cta-banner__title">学んだ知識を活かしてみませんか？</div>
      <div class="cta-banner__text">
        FXを始めるには口座開設が必要です。まずはデモ口座で練習から始めることをおすすめします。
      </div>
      <a href="#" class="cta-banner__btn" onclick="trackCTA('lesson_footer')">
        口座開設を検討する →
      </a>
    </div>
  `;
}

function setupLessonCompletion(lesson) {
  const btn = document.getElementById('complete-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!isLessonCompleted(lesson.slug)) {
      completeLesson(lesson.slug);
      btn.textContent = '✓ 完了済み';
      btn.disabled = true;
    }
  });
}

// ===================================
// クイズページ
// ===================================
let currentQuizState = {
  lesson: null,
  currentQuestion: 0,
  answers: [],
  showingResult: false
};

function initQuizPage() {
  const slug = getUrlParam('slug');
  if (!slug) {
    window.location.href = 'learn.html';
    return;
  }

  const lesson = getLessonBySlug(slug);
  if (!lesson || !lesson.quiz) {
    window.location.href = 'learn.html';
    return;
  }

  currentQuizState = {
    lesson: lesson,
    currentQuestion: 0,
    answers: [],
    showingResult: false
  };

  document.title = `クイズ: ${lesson.title} | FX学習`;
  renderQuiz();
}

function renderQuiz() {
  const container = document.getElementById('quiz-content');
  if (!container) return;

  const { lesson, currentQuestion, answers } = currentQuizState;
  const quiz = lesson.quiz;

  // 結果表示
  if (currentQuestion >= quiz.length) {
    renderQuizResult(container);
    return;
  }

  const q = quiz[currentQuestion];
  const answered = answers[currentQuestion] !== undefined;

  container.innerHTML = `
    <div class="quiz">
      <div class="quiz__progress">
        ${quiz.map((_, i) => {
          let cls = '';
          if (i < currentQuestion) {
            cls = answers[i] === quiz[i].answerIndex ? 'correct' : 'wrong';
          } else if (i === currentQuestion) {
            cls = 'active';
          }
          return `<div class="quiz__progress-item ${cls}"></div>`;
        }).join('')}
      </div>

      <div class="quiz__question-number">問題 ${currentQuestion + 1} / ${quiz.length}</div>
      <div class="quiz__question">${escapeHtml(q.q)}</div>

      <div class="quiz__choices">
        ${q.choices.map((choice, i) => {
          let cls = '';
          if (answered) {
            if (i === q.answerIndex) cls = 'correct';
            else if (i === answers[currentQuestion]) cls = 'wrong';
          }
          return `
            <button class="quiz__choice ${cls}" data-index="${i}" ${answered ? 'disabled' : ''}>
              <span class="quiz__choice-marker">${['A', 'B', 'C', 'D'][i]}</span>
              ${escapeHtml(choice)}
            </button>
          `;
        }).join('')}
      </div>

      ${answered ? `
        <div class="quiz__explanation">
          <div class="quiz__explanation-title">
            ${answers[currentQuestion] === q.answerIndex ? '✓ 正解！' : '✗ 不正解'}
          </div>
          ${escapeHtml(q.explain)}
        </div>
        <div class="btn-group">
          <button id="next-btn" class="btn btn--primary btn--block">
            ${currentQuestion < quiz.length - 1 ? '次の問題へ' : '結果を見る'}
          </button>
        </div>
      ` : ''}
    </div>
  `;

  // イベントリスナー
  if (!answered) {
    container.querySelectorAll('.quiz__choice').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
    });
  } else {
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentQuizState.currentQuestion++;
        renderQuiz();
      });
    }
  }
}

function handleAnswer(index) {
  currentQuizState.answers[currentQuizState.currentQuestion] = index;
  renderQuiz();
}

function renderQuizResult(container) {
  const { lesson, answers } = currentQuizState;
  const quiz = lesson.quiz;
  const score = answers.filter((a, i) => a === quiz[i].answerIndex).length;

  // クイズ完了を記録
  completeQuiz(lesson.slug, score);

  let message = '';
  if (score === quiz.length) {
    message = '素晴らしい！全問正解です！';
  } else if (score >= quiz.length / 2) {
    message = 'よくできました！';
  } else {
    message = 'もう一度レッスンを復習してみましょう';
  }

  container.innerHTML = `
    <div class="quiz">
      <div class="quiz-result">
        <div class="quiz-result__score">${score}/${quiz.length}</div>
        <div class="quiz-result__label">正解</div>
        <div class="quiz-result__message">${message}</div>
      </div>

      <div class="btn-group">
        ${getNextLesson(lesson) ? `
          <a href="lesson.html?slug=${getNextLesson(lesson).slug}" class="btn btn--primary btn--block">
            次のレッスンへ
          </a>
        ` : ''}
        <a href="lesson.html?slug=${lesson.slug}" class="btn btn--secondary btn--block">
          レッスンを復習する
        </a>
        <button class="btn btn--outline btn--block" onclick="shareResult(${score}, ${quiz.length})">
          結果をシェアする
        </button>
      </div>

      ${score >= 2 ? `
        <div class="cta-banner mt-24">
          <div class="cta-banner__title">クイズ合格おめでとうございます！</div>
          <div class="cta-banner__text">
            基礎知識が身についてきましたね。次のステップとして、デモ口座で実際の取引を体験してみませんか？
          </div>
          <a href="#" class="cta-banner__btn" onclick="trackCTA('quiz_result')">
            口座開設を検討する →
          </a>
        </div>
      ` : ''}
    </div>
  `;
}

function getNextLesson(currentLesson) {
  const currentIndex = lessons.findIndex(l => l.slug === currentLesson.slug);
  if (currentIndex < lessons.length - 1) {
    return lessons[currentIndex + 1];
  }
  return null;
}

function shareResult(score, total) {
  const text = `FX学習クイズで${score}/${total}問正解しました！ #FX学習`;
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({ text, url }).catch(() => {});
  } else {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  }
}

// ===================================
// 用語辞典ページ
// ===================================
function initGlossaryPage() {
  renderGlossaryCategoryFilter();
  renderGlossaryList('all');
  setupGlossarySearch();
}

function renderGlossaryCategoryFilter() {
  const container = document.getElementById('glossary-category-filter');
  if (!container) return;

  container.innerHTML = glossaryCategories.map(cat => `
    <button class="filter-tab ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
      ${escapeHtml(cat.name)}
    </button>
  `).join('');

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
      container.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      renderGlossaryList(e.target.dataset.category);
    }
  });
}

function renderGlossaryList(category, searchQuery = '') {
  const container = document.getElementById('glossary-list');
  if (!container) return;

  let filteredTerms = glossaryTerms;

  if (category !== 'all') {
    filteredTerms = filteredTerms.filter(t => t.category === category);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTerms = filteredTerms.filter(t =>
      t.term.toLowerCase().includes(query) ||
      t.definition.toLowerCase().includes(query)
    );
  }

  if (filteredTerms.length === 0) {
    container.innerHTML = `
      <div class="card">
        <div class="card__content">
          <div class="card__description text-center">該当する用語が見つかりませんでした</div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredTerms.map(term => `
    <a href="term.html?slug=${term.slug}" class="card card--clickable">
      <div class="card__content">
        <div class="card__title">${escapeHtml(term.term)}</div>
        <div class="card__description">${escapeHtml(term.definition)}</div>
        <div class="card__meta mt-8">
          <span>${escapeHtml(term.category)}</span>
        </div>
      </div>
    </a>
  `).join('');
}

function setupGlossarySearch() {
  const input = document.getElementById('glossary-search');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const activeCategory = document.querySelector('.filter-tab.active')?.dataset.category || 'all';
      renderGlossaryList(activeCategory, e.target.value);
    }, 200);
  });
}

// ===================================
// 用語詳細ページ
// ===================================
function initTermPage() {
  const slug = getUrlParam('slug');
  if (!slug) {
    window.location.href = 'glossary.html';
    return;
  }

  const term = getTermBySlug(slug);
  if (!term) {
    window.location.href = 'glossary.html';
    return;
  }

  document.title = `${term.term} | FX学習 用語辞典`;
  renderTerm(term);
}

function renderTerm(term) {
  const container = document.getElementById('term-content');
  if (!container) return;

  const relatedLessonsHtml = term.relatedLessons && term.relatedLessons.length > 0
    ? `
      <div class="term__section">
        <div class="term__section-title">関連レッスン</div>
        <div class="term__section-content">
          ${term.relatedLessons.map(slug => {
            const lesson = getLessonBySlug(slug);
            if (lesson) {
              return `<a href="lesson.html?slug=${slug}" class="card card--clickable mb-8">
                <div class="card__content">
                  <div class="card__title">${escapeHtml(lesson.title)}</div>
                </div>
              </a>`;
            }
            return '';
          }).join('')}
        </div>
      </div>
    `
    : '';

  container.innerHTML = `
    <div class="term">
      <h1 class="term__title">${escapeHtml(term.term)}</h1>
      <div class="term__definition">${escapeHtml(term.definition)}</div>

      <div class="term__section">
        <div class="term__section-title">わかりやすく言うと</div>
        <div class="term__section-content">${escapeHtml(term.analogy)}</div>
      </div>

      <div class="term__section">
        <div class="term__section-title">よくある誤解</div>
        <div class="term__section-content">${escapeHtml(term.misconceptions)}</div>
      </div>

      ${relatedLessonsHtml}
    </div>
  `;
}

// ===================================
// マイページ
// ===================================
function initMyPage() {
  renderProgressStats();
  renderBadges();
  renderRecentLessons();
  renderPwaGuide();
}

function renderProgressStats() {
  const container = document.getElementById('progress-stats');
  if (!container) return;

  const lessonCount = getCompletedLessonCount();
  const quizCount = getCompletedQuizCount();
  const totalLessons = lessons.length;

  container.innerHTML = `
    <div class="progress-stat">
      <div class="progress-stat__value">${lessonCount}</div>
      <div class="progress-stat__label">完了レッスン</div>
    </div>
    <div class="progress-stat">
      <div class="progress-stat__value">${quizCount}</div>
      <div class="progress-stat__label">完了クイズ</div>
    </div>
  `;

  // プログレスバー
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    const percentage = (lessonCount / totalLessons) * 100;
    progressBar.innerHTML = `
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width: ${percentage}%"></div>
      </div>
      <div class="text-sm text-muted mt-8">${lessonCount} / ${totalLessons} レッスン完了</div>
    `;
  }
}

function renderBadges() {
  const container = document.getElementById('badges');
  if (!container) return;

  const badges = getBadges();

  container.innerHTML = badges.map(badge => `
    <div class="badge ${!badge.unlocked ? 'badge--locked' : ''}">
      <div class="badge__icon">${badge.unlocked ? badge.icon : '🔒'}</div>
      <div class="badge__name">${escapeHtml(badge.name)}</div>
    </div>
  `).join('');
}

function renderRecentLessons() {
  const container = document.getElementById('recent-lessons');
  if (!container) return;

  const recentSlugs = getLastSeenLessons().slice(0, 3);

  if (recentSlugs.length === 0) {
    container.innerHTML = `
      <div class="card">
        <div class="card__content">
          <div class="card__description text-center">まだレッスンを見ていません</div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = recentSlugs.map(slug => {
    const lesson = getLessonBySlug(slug);
    if (!lesson) return '';
    return `
      <a href="lesson.html?slug=${lesson.slug}" class="card card--clickable">
        <div class="card__content">
          <div class="card__title">${escapeHtml(lesson.title)}</div>
          <div class="card__meta">
            <span>${escapeHtml(lesson.category)}</span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

function renderPwaGuide() {
  const container = document.getElementById('pwa-guide');
  if (!container) return;

  // すでにPWAモードで表示されている場合は非表示
  if (window.matchMedia('(display-mode: standalone)').matches) {
    container.classList.add('hidden');
    return;
  }

  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  let guideText = '';
  if (isIos) {
    guideText = 'Safari下部の「共有」ボタン → 「ホーム画面に追加」で、アプリのように使えます。';
  } else if (isAndroid) {
    guideText = 'ブラウザのメニュー → 「ホーム画面に追加」で、アプリのように使えます。';
  } else {
    guideText = 'ブラウザのメニューから「ホーム画面に追加」で、アプリのように使えます。';
  }

  container.innerHTML = `
    <div class="card">
      <div class="card__content">
        <div class="card__title">📱 ホーム画面に追加</div>
        <div class="card__description">${guideText}</div>
      </div>
    </div>
  `;
}

// ===================================
// CTA トラッキング
// ===================================
function trackCTA(placement) {
  // GA4イベント送信（GA4が設定されている場合）
  if (typeof gtag !== 'undefined') {
    gtag('event', 'cta_open_account_click', {
      placement: placement
    });
  }
  console.log('CTA clicked:', placement);
}

// ===================================
// 初期化
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // ページごとの初期化
  const page = document.body.dataset.page;

  switch (page) {
    case 'home':
      initHomePage();
      break;
    case 'learn':
      initLearnPage();
      break;
    case 'lesson':
      initLessonPage();
      break;
    case 'quiz':
      initQuizPage();
      break;
    case 'glossary':
      initGlossaryPage();
      break;
    case 'term':
      initTermPage();
      break;
    case 'me':
      initMyPage();
      break;
  }

  // アクティブタブの設定
  setActiveTab();
});

function setActiveTab() {
  const path = window.location.pathname;
  const tabs = document.querySelectorAll('.tab-nav__item');

  tabs.forEach(tab => {
    tab.classList.remove('active');
    const href = tab.getAttribute('href');

    if (path.includes('index') || path.endsWith('/')) {
      if (href.includes('index')) tab.classList.add('active');
    } else if (path.includes('learn') || path.includes('lesson')) {
      if (href.includes('learn')) tab.classList.add('active');
    } else if (path.includes('quiz')) {
      if (href.includes('quiz')) tab.classList.add('active');
    } else if (path.includes('glossary') || path.includes('term')) {
      if (href.includes('glossary')) tab.classList.add('active');
    } else if (path.includes('me')) {
      if (href.includes('me')) tab.classList.add('active');
    }
  });
}
