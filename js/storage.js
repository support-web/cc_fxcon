// FX学習コンテンツ - LocalStorage管理

const STORAGE_KEY = 'fx_mvp_progress';

// 初期データ
const defaultProgress = {
  completedLessons: [],
  completedQuizzes: [],
  lastLesson: null,
  lastSeen: [],
  quizScores: {}
};

// 進捗データを取得
function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...defaultProgress, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Progress data load error:', e);
  }
  return { ...defaultProgress };
}

// 進捗データを保存
function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Progress data save error:', e);
  }
}

// レッスンを完了済みにする
function completeLesson(slug) {
  const progress = getProgress();
  if (!progress.completedLessons.includes(slug)) {
    progress.completedLessons.push(slug);
  }
  progress.lastLesson = slug;
  saveProgress(progress);
}

// クイズを完了済みにする
function completeQuiz(slug, score) {
  const progress = getProgress();
  if (!progress.completedQuizzes.includes(slug)) {
    progress.completedQuizzes.push(slug);
  }
  progress.quizScores[slug] = {
    score: score,
    answeredAt: new Date().toISOString()
  };
  saveProgress(progress);
}

// 最近見たレッスンを記録
function recordLastSeen(slug) {
  const progress = getProgress();
  // 既に存在する場合は削除
  progress.lastSeen = progress.lastSeen.filter(s => s !== slug);
  // 先頭に追加
  progress.lastSeen.unshift(slug);
  // 最大10件に制限
  progress.lastSeen = progress.lastSeen.slice(0, 10);
  progress.lastLesson = slug;
  saveProgress(progress);
}

// レッスンが完了済みか確認
function isLessonCompleted(slug) {
  const progress = getProgress();
  return progress.completedLessons.includes(slug);
}

// クイズが完了済みか確認
function isQuizCompleted(slug) {
  const progress = getProgress();
  return progress.completedQuizzes.includes(slug);
}

// クイズスコアを取得
function getQuizScore(slug) {
  const progress = getProgress();
  return progress.quizScores[slug] || null;
}

// 完了したレッスン数を取得
function getCompletedLessonCount() {
  const progress = getProgress();
  return progress.completedLessons.length;
}

// 完了したクイズ数を取得
function getCompletedQuizCount() {
  const progress = getProgress();
  return progress.completedQuizzes.length;
}

// 最後に見たレッスンを取得
function getLastLesson() {
  const progress = getProgress();
  return progress.lastLesson;
}

// 最近見たレッスン一覧を取得
function getLastSeenLessons() {
  const progress = getProgress();
  return progress.lastSeen;
}

// バッジの取得状況を確認
function getBadges() {
  const progress = getProgress();
  const badges = [];

  // はじめの一歩（レッスン1本完了）
  badges.push({
    id: 'first-step',
    name: 'はじめの一歩',
    description: 'レッスンを1本完了',
    icon: '🎯',
    unlocked: progress.completedLessons.length >= 1
  });

  // 基礎クリア（レッスン5本完了）
  badges.push({
    id: 'basic-clear',
    name: '基礎クリア',
    description: 'レッスンを5本完了',
    icon: '📚',
    unlocked: progress.completedLessons.length >= 5
  });

  // 安全運転（リスク章のレッスン完了）
  const riskLessons = ['leverage-risk', 'losscut'];
  const completedRiskLessons = riskLessons.filter(slug =>
    progress.completedLessons.includes(slug)
  );
  badges.push({
    id: 'safe-driver',
    name: '安全運転',
    description: 'リスク章を完了',
    icon: '🛡️',
    unlocked: completedRiskLessons.length === riskLessons.length
  });

  // クイズマスター（クイズ5問完了）
  badges.push({
    id: 'quiz-master',
    name: 'クイズマスター',
    description: 'クイズを5セット完了',
    icon: '🏆',
    unlocked: progress.completedQuizzes.length >= 5
  });

  // コンプリート（全レッスン完了）
  badges.push({
    id: 'complete',
    name: 'コンプリート',
    description: '全レッスンを完了',
    icon: '👑',
    unlocked: progress.completedLessons.length >= 10
  });

  return badges;
}

// 進捗をリセット（デバッグ用）
function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
