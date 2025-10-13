import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import {
    getDatabase,
    ref,
    get,
    set,
    update,
  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDrPR-5-IaSD7-ij1oj3Y4M9ARQBMK66eo",
    authDomain: "levels-409ba.firebaseapp.com",
    databaseURL: "https://levels-409ba-default-rtdb.firebaseio.com",
    projectId: "levels-409ba",
    storageBucket: "levels-409ba.firebasestorage.app",
    messagingSenderId: "54945336454",
    appId: "1:54945336454:web:51e6f513c1d2a91e23d507",
    measurementId: "G-ZWME5X472Z"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  document.addEventListener('DOMContentLoaded', () => {

  let currentUser = null,
      currentLevel = 1,
      currentQuestionIndex = 0,
      currentQuestions = [],
      answering = false,
      correctAnswers = 0;

  let userCoins = 0;

  const levelsData = {
    1: { questions: 5, passRate: 0.9 },
    2: { questions: 5, passRate: 0.9 },
    3: { questions: 5, passRate: 0.9 },
    4: { questions: 5, passRate: 0.9 },
    5: { questions: 5, passRate: 0.9 },
    6: { questions: 5, passRate: 0.9 },
    7: { questions: 5, passRate: 0.9 },
    8: { questions: 5, passRate: 0.9 },
    9: { questions: 5, passRate: 0.9 },
    10: { questions: 5, passRate: 0.9 },
    11: { questions: 5, passRate: 1.0 },
  };

  const questionsData = {
    1: [
      { q: "ما هو لون السماء؟", options: ["أزرق", "أخضر", "أحمر", "أسود"], answer: 0, tip: "لون السماء في النهار أزرق" },
      { q: "كم عدد أيام الأسبوع؟", options: ["5", "6", "7", "8"], answer: 2, tip: "أيام الأسبوع 7" },
      { q: "أين توجد الأهرامات؟", options: ["مصر", "اليونان", "اليابان", "أمريكا"], answer: 0, tip: "في مصر" },
      { q: "كم عدد أصابع اليد؟", options: ["4", "5", "6", "7"], answer: 1, tip: "خمسة أصابع" },
      { q: "أقرب كوكب للشمس؟", options: ["الزهرة", "الأرض", "عطارد", "المريخ"], answer: 2, tip: "عطارد" },
    ],
    2: [
      { q: "ما هو أكبر محيط؟", options: ["الهادي", "الأطلسي", "الهندي", "المتجمد"], answer: 0, tip: "الهادي" },
      { q: "أين تقع باريس؟", options: ["ألمانيا", "فرنسا", "إيطاليا", "إسبانيا"], answer: 1, tip: "فرنسا" },
      { q: "رمز الماء؟", options: ["H2O", "CO2", "O2", "NaCl"], answer: 0, tip: "H2O" },
      { q: "مؤسس فيسبوك؟", options: ["إيلون ماسك", "مارك زوكربيرغ", "بيل غيتس", "ستيف جوبز"], answer: 1, tip: "مارك زوكربيرغ" },
      { q: "أسرع حيوان؟", options: ["السلحفاة", "الفهد", "الأسد", "الحصان"], answer: 1, tip: "الفهد" },
    ],
    3: [
      { q: "أطول نهر؟", options: ["النيل", "الأمازون", "الدانوب", "الغانج"], answer: 0, tip: "النيل" },
      { q: "عاصمة اليابان؟", options: ["أوساكا", "طوكيو", "كيوتو", "ناغويا"], answer: 1, tip: "طوكيو" },
      { q: "عدد الكواكب؟", options: ["7", "8", "9", "10"], answer: 1, tip: "8 كواكب" },
      { q: "أسرع حيوان بري؟", options: ["الأسد", "الفهد", "الظباء", "الذئب"], answer: 1, tip: "الفهد" },
      { q: "الغاز الرئيسي في الهواء؟", options: ["الأكسجين", "النيتروجين", "الهيدروجين", "ثاني أكسيد الكربون"], answer: 1, tip: "النيتروجين" },
    ],
    4: [
      { q: "ما هو أكبر قارة؟", options: ["أفريقيا", "آسيا", "أوروبا", "أمريكا"], answer: 1, tip: "آسيا" },
      { q: "عاصمة فرنسا؟", options: ["لندن", "باريس", "روما", "مدريد"], answer: 1, tip: "باريس" },
      { q: "كم عدد الساعات في اليوم؟", options: ["20", "24", "30", "12"], answer: 1, tip: "24 ساعة" },
      { q: "أكبر بحيرة؟", options: ["فيكتوريا", "ميشيغان", "بايكال", "تشاد"], answer: 2, tip: "بايكال" },
      { q: "رمز الكهرباء؟", options: ["V", "A", "Ω", "W"], answer: 0, tip: "فولت" },
    ],
    5: [
      { q: "أين تقع الصين؟", options: ["أفريقيا", "آسيا", "أوروبا", "أمريكا"], answer: 1, tip: "آسيا" },
      { q: "عاصمة ألمانيا؟", options: ["برلين", "فيينا", "أمستردام", "زيورخ"], answer: 0, tip: "برلين" },
      { q: "كم عدد الألوان في قوس قزح؟", options: ["5", "6", "7", "8"], answer: 2, tip: "7 ألوان" },
      { q: "أسرع طائر؟", options: ["النسر", "الصقر", "الطائر الطنان", "البجعة"], answer: 1, tip: "الصقر" },
      { q: "رمز الحديد؟", options: ["Fe", "Au", "Ag", "Cu"], answer: 0, tip: "Fe" },
    ],
    6: [
      { q: "ما هو أكبر دولة؟", options: ["الصين", "روسيا", "كندا", "الولايات المتحدة"], answer: 1, tip: "روسيا" },
      { q: "عاصمة إيطاليا؟", options: ["ميلانو", "روما", "فينيسيا", "فلورنسا"], answer: 1, tip: "روما" },
      { q: "كم عدد الأسنان في الفم؟", options: ["28", "30", "32", "34"], answer: 2, tip: "32 سن" },
      { q: "أعمق نقطة في الأرض؟", options: ["خندق ماريانا", "خندق بورتوريكو", "خندق جابان", "خندق بيرينغ"], answer: 0, tip: "خندق ماريانا" },
      { q: "رمز الذهب؟", options: ["Fe", "Au", "Ag", "Cu"], answer: 1, tip: "Au" },
    ],
    7: [
      { q: "أين تقع أستراليا؟", options: ["أفريقيا", "آسيا", "أوروبا", "أوقيانوسيا"], answer: 3, tip: "أوقيانوسيا" },
      { q: "عاصمة البرازيل؟", options: ["ريو دي جانيرو", "ساو باولو", "برازيليا", "بوينس آيرس"], answer: 2, tip: "برازيليا" },
      { q: "كم عدد القارات؟", options: ["5", "6", "7", "8"], answer: 2, tip: "7 قارات" },
      { q: "أطول جبل؟", options: ["إيفرست", "كيليمنجارو", "أرارات", "فيجي"], answer: 0, tip: "إيفرست" },
      { q: "رمز الفضة؟", options: ["Fe", "Au", "Ag", "Cu"], answer: 2, tip: "Ag" },
    ],
    8: [
      { q: "ما هو أكبر صحراء؟", options: ["الصحراء الكبرى", "غوبي", "كالاهاري", "أتاكاما"], answer: 0, tip: "الصحراء الكبرى" },
      { q: "عاصمة كندا؟", options: ["تورونتو", "فانكوفر", "أوتاوا", "مونتريال"], answer: 2, tip: "أوتاوا" },
      { q: "كم عدد الدقائق في الساعة؟", options: ["50", "60", "70", "80"], answer: 1, tip: "60 دقيقة" },
      { q: "أسرع سمكة؟", options: ["السلمون", "القرش الأبيض", "السيف", "الأسماك الطائرة"], answer: 2, tip: "السيف" },
      { q: "رمز النحاس؟", options: ["Fe", "Au", "Ag", "Cu"], answer: 3, tip: "Cu" },
    ],
    9: [
      { q: "أين تقع الهند؟", options: ["أفريقيا", "آسيا", "أوروبا", "أمريكا"], answer: 1, tip: "آسيا" },
      { q: "عاصمة المكسيك؟", options: ["مكسيكو سيتي", "غوادالاخارا", "مونتيري", "بوينس آيرس"], answer: 0, tip: "مكسيكو سيتي" },
      { q: "كم عدد الأشهر في السنة؟", options: ["10", "11", "12", "13"], answer: 2, tip: "12 شهر" },
      { q: "أكبر جزيرة؟", options: ["غرينلاند", "أستراليا", "بورنيو", "مدغشقر"], answer: 1, tip: "أستراليا" },
      { q: "رمز الألمنيوم؟", options: ["Al", "Fe", "Au", "Ag"], answer: 0, tip: "Al" },
    ],
    10: [
      { q: "ما هو أكبر بحر؟", options: ["البحر الأحمر", "البحر الأبيض المتوسط", "البحر الأسود", "بحر الصين"], answer: 3, tip: "بحر الصين" },
      { q: "عاصمة جنوب أفريقيا؟", options: ["كيب تاون", "جوهانسبرغ", "بريتوريا", "ديربان"], answer: 2, tip: "بريتوريا" },
      { q: "كم عدد الأيام في السنة؟", options: ["360", "365", "366", "370"], answer: 1, tip: "365 يوم" },
      { q: "أسرع حشرة؟", options: ["النحلة", "الفراشة", "الذبابة", "الخنفساء"], answer: 0, tip: "النحلة" },
      { q: "رمز الزئبق؟", options: ["Hg", "Fe", "Au", "Ag"], answer: 0, tip: "Hg" },
    ],
    11: [
      { q: "ما هو أكبر كوكب؟", options: ["المشتري", "زحل", "أورانوس", "نبتون"], answer: 0, tip: "المشتري" },
      { q: "عاصمة روسيا؟", options: ["موسكو", "سانت بطرسبرغ", "كييف", "مينسك"], answer: 0, tip: "موسكو" },
      { q: "كم عدد العناصر في الجدول الدوري؟", options: ["100", "118", "120", "130"], answer: 1, tip: "118 عنصر" },
      { q: "أعلى قمة جبلية؟", options: ["إيفرست", "كانشينجونغا", "لوتسه", "ماكالو"], answer: 0, tip: "إيفرست" },
      { q: "رمز البلاتين؟", options: ["Pt", "Fe", "Au", "Ag"], answer: 0, tip: "Pt" },
    ],
  };

  // عناصر DOM
  const loginSection = document.getElementById("login-section");
  const levelsDiv = document.getElementById("levels");
  const questionBox = document.getElementById("question-box");
  const answersDiv = document.getElementById("answers");
  const leaderboardCard = document.getElementById("leaderboard");
  const lbList = document.getElementById("leaderboard-list");
  const reviewBox = document.getElementById("review-box");
  const reviewTitle = document.getElementById("review-title");
  const reviewContent = document.getElementById("review-content");
  const leaderboardBtn = document.getElementById("leaderboard-btn");
  const backToLevelsBtn = document.getElementById("back-to-levels-btn");
  const backLevelsBtn = document.getElementById("back-levels-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const closeLeaderboardBtn = document.getElementById("close-leaderboard-btn");

  const toastEl = document.getElementById("toast"),
        toastTitle = document.getElementById("toast-title"),
        toastMsg = document.getElementById("toast-msg");

  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");
  const duoMessageEl = document.getElementById("duo-message");
  const coinCountEl = document.getElementById("coin-count");

  // =========================
  // تسجيل دخول المستخدم
  // =========================
  document.getElementById("login-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      showToast("تنبيه", "يرجى إدخال اسم المستخدم وكلمة المرور", "warn");
      return;
    }

    const userRef = ref(db, "users/" + username);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      if (data.password === password) {
        currentUser = { username, passedLevels: data.passedLevels || [], coins: data.coins || 0 };
        userCoins = data.coins || 0;
        coinCountEl.textContent = userCoins;
        showToast("🎉", "تم تسجيل الدخول بنجاح", "ok");
        showLevels();
      } else {
        showToast("خطأ", "كلمة المرور غير صحيحة", "warn");
      }
    } else {
      await set(userRef, { password, passedLevels: [], coins: 0 });
      currentUser = { username, passedLevels: [], coins: 0 };
      userCoins = 0;
      coinCountEl.textContent = 0;
      showToast("✅", "تم إنشاء الحساب", "ok");
      showLevels();
    }
  });

  // =========================
  // عرض المستويات
  // =========================
  function showLevels() {
    if (!currentUser) return;
    loginSection.classList.remove("show");
    levelsDiv.classList.add("show", "fade-in");
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (leaderboardBtn) leaderboardBtn.style.display = "inline-block";
    if (backToLevelsBtn) backToLevelsBtn.style.display = "none";

    levelsDiv.innerHTML = "";
    Object.keys(levelsData).forEach((lvl) => {
      const card = document.createElement("div");
      card.className = "level-card";

      if (currentUser.passedLevels.includes(+lvl)) {
        card.classList.add("passed");
        card.textContent = "المستوى " + lvl + " - تم الإنجاز";
      } else if (+lvl === Math.max(...currentUser.passedLevels, 0) + 1) {
        card.classList.add("open");
        card.addEventListener("click", () => startLevel(+lvl));
        card.textContent = "المستوى " + lvl + " (+ " + lvl + " جنيه)";
      } else {
        card.classList.add("locked");
        card.textContent = "المستوى " + lvl + " (+ " + lvl + " جنيه)";
      }

      levelsDiv.appendChild(card);
    });
  }

  // =========================
  // بدء المستوى
  // =========================
  function startLevel(level) {
    currentLevel = level;
    currentQuestions = questionsData[level];
    currentQuestionIndex = 0;
    correctAnswers = 0;

    if (level === 11) {
      const password = prompt("أدخل كلمة المرور للمستوى 11:");
      if (password !== "admin") {
        showToast("خطأ", "كلمة المرور غير صحيحة", "warn");
        showLevels();
        return;
      }
    }

    levelsDiv.classList.remove("show");
    questionBox.classList.add("show");

    showQuestion();
  }

  // =========================
  // عرض السؤال
  // =========================
  function showQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById("question-text").textContent = q.q;
    answersDiv.innerHTML = "";

    const progressPercent = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById("progress").style.width = progressPercent + "%";

    document.getElementById("tip").textContent = q.tip;
    document.getElementById("tip").style.display = "block";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.addEventListener("click", () => checkAnswer(i));
      answersDiv.appendChild(btn);
    });
  }

  // =========================
  // التحقق من الإجابة
  // =========================
  function checkAnswer(i) {
    if (answering) return;
    answering = true;

    const q = currentQuestions[currentQuestionIndex];
    const buttons = answersDiv.querySelectorAll("button");
    buttons.forEach((b) => (b.disabled = true));

    if (i === q.answer) {
      correctSound.play();
      correctAnswers++;
    } else {
      wrongSound.play();
    }

    setTimeout(() => {
      answering = false;
      currentQuestionIndex++;
      if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
      } else {
        endLevel();
      }
    }, 1000);
  }

  // =========================
  // إنهاء المستوى
  // =========================
  async function endLevel() {
    questionBox.classList.remove("show");
    levelsDiv.classList.add("show");

    const passRate = correctAnswers / currentQuestions.length;

    if (passRate >= levelsData[currentLevel].passRate) {
      if (!currentUser.passedLevels.includes(currentLevel)) {
        currentUser.passedLevels.push(currentLevel);
        userCoins += currentLevel;
        coinCountEl.textContent = userCoins;
        // Floating coin animation
        const coinFloat = document.getElementById("coin-float");
        coinFloat.textContent = "+" + currentLevel;
        coinFloat.classList.add("show");
        setTimeout(() => {
          coinFloat.classList.remove("show");
        }, 1000);
      }
      await update(ref(db, "users/" + currentUser.username), {
        passedLevels: currentUser.passedLevels,
        coins: userCoins,
      });
      showLevels();
      showToast("👏", "أحسنت! أنهيت المستوى " + currentLevel, "ok");
    } else {
      showToast("خطأ", "لم تحقق النسبة المطلوبة (" + Math.round(levelsData[currentLevel].passRate * 100) + "%)، حاول مرة أخرى", "warn");
    }
  }

  // =========================
  // توست (رسائل التنبيه)
  // =========================
  function showToast(title, msg, type = "ok") {
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toastEl.className = "toast show " + type;

    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 3000);
  }

  // =========================
  // زر الخروج
  // =========================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      currentUser = null;
      userCoins = 0;
      loginSection.classList.add("show");
      levelsDiv.classList.remove("show");
      if (logoutBtn) logoutBtn.style.display = "none";
    });
  }

  // =========================
  // لوحة المتصدرين
  // =========================
  leaderboardBtn.addEventListener("click", async () => {
    leaderboardCard.classList.add("show");
    levelsDiv.classList.remove("show");

    lbList.innerHTML = "جارٍ التحميل...";

    const snapshot = await get(ref(db, "users"));
    if (snapshot.exists()) {
      const users = Object.entries(snapshot.val()).map(([u, data]) => ({
        name: u,
        coins: data.coins || 0,
        levels: data.passedLevels || [],
      }));
      users.sort((a, b) => b.coins - a.coins);

      lbList.innerHTML = "";
      users.forEach((user, idx) => {
        const div = document.createElement("div");
        div.className = "leader-user";
        div.innerHTML = `
          <span>${idx + 1}. ${user.name} - 🪙 ${user.coins}</span>
          <div class="levels">${user.levels.map(l=>`<span class="level-chip">${l}</span>`).join("")}</div>
        `;
        lbList.appendChild(div);
      });
    } else {
      lbList.innerHTML = "لا يوجد متصدرين بعد.";
    }
  });

  closeLeaderboardBtn.addEventListener("click", () => {
    leaderboardCard.classList.remove("show");
    levelsDiv.classList.add("show");
  });

  backLevelsBtn.addEventListener("click", () => {
    questionBox.classList.remove("show");
    levelsDiv.classList.add("show");
  });

  });
