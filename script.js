// ======== Firebase ========
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrPR-5-IaSD7-ij1oj3Y4M9ARQBMK66eo",
  authDomain: "levels-409ba.firebaseapp.com",
  databaseURL: "https://levels-409ba-default-rtdb.firebaseio.com",
  projectId: "levels-409ba",
  storageBucket: "levels-409ba.appspot.com",
  messagingSenderId: "54945336454",
  appId: "1:54945336454:web:51e6f513c1d2a91e23d507",
  measurementId: "G-ZWME5X472Z"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ======== بيانات المسابقة ========
let currentUser = null;
let currentLevel = 1;
let currentQuestionIndex = 0;
let correctAnswers = 0;

const questions = [
  // مستوى 1
  { level: 1, question: "ما هي عاصمة مصر؟", options: ["القاهرة","الإسكندرية","أسوان","الأقصر"], answer: "القاهرة" },
  { level: 1, question: "كم عدد أيام الأسبوع؟", options: ["5","6","7","8"], answer: "7" },
  { level: 1, question: "ما لون السماء في النهار؟", options: ["أحمر","أزرق","أخضر","أصفر"], answer: "أزرق" },
  { level: 1, question: "كم هو مجموع 2+3؟", options: ["4","5","6","7"], answer: "5" },
  { level: 1, question: "ما هو الحيوان الذي يطلق عليه ملك الغابة؟", options: ["الأسد","النمر","الفيل","الدب"], answer: "الأسد" },
  // مستوى 2
  { level: 2, question: "ما هي عاصمة فرنسا؟", options: ["باريس","برلين","لندن","مدريد"], answer: "باريس" },
  { level: 2, question: "أي كوكب يعرف بالكوكب الأحمر؟", options: ["المريخ","الزهرة","الأرض","المشتري"], answer: "المريخ" },
  { level: 2, question: "2 * 6 =", options: ["10","12","14","16"], answer: "12" },
  { level: 2, question: "أي من التالي لغة برمجة؟", options: ["HTML","Python","CSS","HTTP"], answer: "Python" },
  { level: 2, question: "درجة تجمد الماء؟", options: ["0","100","-1","50"], answer: "0" },
  // مستوى 3
  { level: 3, question: "من كتب 'روميو وجولييت'؟", options: ["شكسبير","همنغواي","أورويل","ديكنز"], answer: "شكسبير" },
  { level: 3, question: "ما هو الرمز الكيميائي للذهب؟", options: ["Au","Ag","Gd","Go"], answer: "Au" },
  { level: 3, question: "12 / 4 =", options: ["2","3","4","5"], answer: "3" },
  { level: 3, question: "HTML تعني؟", options: ["لغة ترميز النصوص الفائقة","لغة الآلة النصية العالية","Hyperloop Text Markup","None"], answer: "لغة ترميز النصوص الفائقة" },
  { level: 3, question: "الأرض تدور حول؟", options: ["القمر","الشمس","المريخ","الزهرة"], answer: "الشمس" }
];

const levels = [
  { level: 1, requiredPercent: 70 },
  { level: 2, requiredPercent: 80 },
  { level: 3, requiredPercent: 90 }
];

// ======== تسجيل المستخدم ========
window.registerOrLogin = async function(){
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if(!username || !password){ showMessage('أدخل الاسم وكلمة السر'); return; }

  const userRef = ref(db, 'users/' + username);
  try {
    const snapshot = await get(userRef);
    if(snapshot.exists()){
      const data = snapshot.val();
      if(data.password===password){
        currentUser = data;
        showMessage('تم تسجيل الدخول بنجاح');
        showLevelsPage();
      } else {
        showMessage('الاسم موجود، كلمة المرور خاطئة');
      }
    } else {
      currentUser = { 
        username,
        password, 
        unlockedLevels: [1],
        scores: {},
        answers: {}
      };
      await set(userRef, currentUser);
      showMessage('تم التسجيل بنجاح');
      showLevelsPage();
    }
  } catch(e){ console.error(e); showMessage('خطأ في الاتصال بـ Firebase'); }
}

// ======== عرض المستويات ========
window.showLevelsPage=function(){
  hideAllPages();
  document.getElementById('levelsPage').style.display='block';
  const container=document.getElementById('levelsContainer');
  container.innerHTML='';
  levels.forEach(lvl=>{
    const box=document.createElement('div');
    box.classList.add('level-box');
    if(currentUser.unlockedLevels.includes(lvl.level)){
      box.classList.add('unlocked');
      box.innerHTML=`<span>المستوى ${lvl.level}</span><br>🎯`;
      box.onclick=()=>startLevel(lvl.level);
    } else {
      box.classList.add('locked');
      box.innerHTML=`<span>المستوى ${lvl.level}</span>`;
    }
    container.appendChild(box);
  });
}

// ======== بدء المستوى ========
window.startLevel=function(level){
  currentLevel=level;
  currentQuestionIndex=0;
  correctAnswers=0;
  hideAllPages();
  document.getElementById('quiz').style.display='block';
  document.getElementById('levelTitle').innerText='المستوى '+level;
  showQuestion();
}

// ======== عرض السؤال ========
function showQuestion(){
  const levelQuestions=questions.filter(q=>q.level===currentLevel);
  if(currentQuestionIndex>=levelQuestions.length){ showResult(); return; }
  const q=levelQuestions[currentQuestionIndex];
  let html=`<p>${q.question}</p>`;
  q.options.forEach(opt=>{
    html+=`<label class="option"><input type="radio" name="answer" value="${opt}"> ${opt}</label>`;
  });
  document.getElementById('questionContainer').innerHTML=html;
}

// ======== السؤال التالي ========
window.nextQuestion=function(){
  const levelQuestions=questions.filter(q=>q.level===currentLevel);
  const selected=document.querySelector('input[name="answer"]:checked');
  if(!selected){ showMessage('اختر إجابة'); return; }

  // حفظ الإجابة
  if(!currentUser.answers[currentLevel]) currentUser.answers[currentLevel]={};
  currentUser.answers[currentLevel]['question'+currentQuestionIndex] = {
    selected: selected.value,
    correct: selected.value===levelQuestions[currentQuestionIndex].answer
  };

  if(selected.value===levelQuestions[currentQuestionIndex].answer) correctAnswers++;
  currentQuestionIndex++;
  showQuestion();
}

// ======== عرض النتيجة ========
function showResult(){
  const levelQuestions=questions.filter(q=>q.level===currentLevel);
  const percent=(correctAnswers/levelQuestions.length)*100;
  hideAllPages();
  document.getElementById('result').style.display='block';
  document.getElementById('scoreText').innerText=`لقد حصلت على ${percent}%`;

  currentUser.scores[currentLevel]=percent;
  if(percent>=levels.find(l=>l.level===currentLevel).requiredPercent){
    if(currentLevel<levels.length && !currentUser.unlockedLevels.includes(currentLevel+1)){
      currentUser.unlockedLevels.push(currentLevel+1);
    }
  } else {
    showMessage('لم تحقق النسبة المطلوبة، حاول مرة أخرى');
  }

  saveProgressToFirebase();
  setTimeout(showLevelsPage,1000);
}

// ======== حفظ البيانات في Firebase ========
function saveProgressToFirebase(){
  if(!currentUser) return;
  const userRef = ref(db,'users/'+currentUser.username);
  set(userRef,currentUser)
    .then(()=>console.log("تم الحفظ في Firebase"))
    .catch((error)=>console.error(error));
}

// ======== لوحة المتصدرين ========
window.showLeaderboard=async function(){
  hideAllPages();
  document.getElementById('leaderboardPage').style.display='block';
  const tbody=document.getElementById('leaderboardBody');
  tbody.innerHTML='';

  const snapshot = await get(ref(db,'users'));
  const users = snapshot.val() || {};
  const userList = Object.values(users);
  userList.forEach(u=>{
    u.total=Object.values(u.scores||{}).reduce((a,b)=>a+b,0);
  });
  userList.sort((a,b)=>b.total-b.total);

  userList.forEach(u=>{
    const row=document.createElement('tr');
    let levelIcons='';
    levels.forEach(lvl=>{
      levelIcons+=u.unlockedLevels.includes(lvl.level)?'✅':'❌';
    });
    row.innerHTML=`
      <td>${u.username}</td>
      <td>${levelIcons}</td>
      <td><button onclick="viewAnswers('${u.username}',${currentLevel})">عرض الإجابات</button></td>
    `;
    tbody.appendChild(row);
  });
}

// ======== عرض إجابات المستخدم ========
window.viewAnswers=async function(username,level){
  const snapshot = await get(ref(db,'users/'+username+'/answers/'+level));
  const ans = snapshot.val() || {};
  let html=`<h3>إجابات ${username} المستوى ${level}</h3><ul>`;
  Object.keys(ans).forEach(q=>{
    html+=`<li>${q}: ${ans[q].selected} - ${ans[q].correct?'✅':'❌'}</li>`;
  });
  html+='</ul>';
  document.getElementById('answersContainer').innerHTML=html;
  hideAllPages();
  document.getElementById('answersPage').style.display='block';
}

// ======== مساعدة ========
function hideAllPages(){
  ['loginPage','levelsPage','quiz','result','leaderboardPage','answersPage'].forEach(id=>{
    document.getElementById(id).style.display='none';
  });
}

function showMessage(msg){
  const msgBox=document.getElementById('msgBox');
  if(msgBox){
    msgBox.innerText=msg;
    setTimeout(()=>{msgBox.innerText='';},3000);
  } else {
    alert(msg);
  }
}
