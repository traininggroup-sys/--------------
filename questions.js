// نظام مجموعات كامل - Groups Only ✅
// بطل سرقة يا حرامي هتروح النار 😈

import { level1Groups } from './questions-level1Groups.js';
import { level2Groups } from './questions-level2Groups.js';
import { level3Groups } from './questions-level3Groups.js';
import { level4Groups } from './questions-level4Groups.js';
import { level5Groups } from './questions-level5Groups.js';
import { level6Groups } from './questions-level6Groups.js';
import { level7Groups } from './questions-level7Groups.js';
import { level8Groups } from './questions-level8Groups.js';
import { level9Groups } from './questions-level9Groups.js';
import { level10Groups } from './questions-level10Groups.js';
import { level11Groups } from './questions-level11Groups.js';
import { level12Groups } from './questions-level12Groups.js';
import { level13Groups } from './questions-level13Groups.js';
import { level14Groups } from './questions-level14Groups.js';
import { level15Groups } from './questions-level15Groups.js';
import { level16Groups } from './questions-level16Groups.js';
import { level17Groups } from './questions-level17Groups.js';
import { level18Groups } from './questions-level18Groups.js';
import { level19Groups } from './questions-level19Groups.js';
import { level20Groups } from './questions-level20Groups.js';
import { level21Groups } from './questions-level21Groups.js';
import { level22Groups } from './questions-level22Groups.js';
import { level23Groups } from './questions-level23Groups.js';
import { level24Groups } from './questions-level24Groups.js';
import { level25Groups } from './questions-level25Groups.js';




// جديد: تحميل مجموعة من مستوى معين
export async function loadGroupQuestions(level, groupName) {
  // Dynamic load - Groups Only System ✅
  window.allLevelsGroups = window.allLevelsGroups || {};
  
  // Auto-register existing imports
  window.allLevelsGroups[1] = level1Groups;
  window.allLevelsGroups[2] = level2Groups;
  window.allLevelsGroups[3] = level3Groups;
  window.allLevelsGroups[4] = level4Groups;
  window.allLevelsGroups[5] = level5Groups;
  window.allLevelsGroups[6] = level6Groups;
  window.allLevelsGroups[7] = level7Groups;
  window.allLevelsGroups[8] = level8Groups;
  window.allLevelsGroups[9] = level9Groups;
window.allLevelsGroups[10] = level10Groups;
window.allLevelsGroups[11] = level11Groups;
window.allLevelsGroups[12] = level12Groups;
window.allLevelsGroups[13] = level13Groups;
window.allLevelsGroups[14] = level14Groups;
window.allLevelsGroups[15] = level15Groups;
window.allLevelsGroups[16] = level16Groups;
window.allLevelsGroups[17] = level17Groups;
window.allLevelsGroups[18] = level18Groups;
window.allLevelsGroups[19] = level19Groups;
window.allLevelsGroups[20] = level20Groups;
window.allLevelsGroups[21] = level21Groups;
window.allLevelsGroups[22] = level22Groups;
window.allLevelsGroups[23] = level23Groups;
window.allLevelsGroups[24] = level24Groups;
window.allLevelsGroups[25] = level25Groups;


  
  if (!window.allLevelsGroups?.[level]?.[groupName]) {
    console.warn(`⚠️ No questions for level ${level} group '${groupName}'`);
    console.info(`💡 أضيفي questions-level${level}Groups.js أو املئي المصفوفات`);
    return [];
  }
  
  const questions = window.allLevelsGroups[level][groupName];
  console.log(`✅ Loaded ${questions.length} قس${questions.length > 10 ? 'م' : 'الة'}مة | level ${level} ➤ ${groupName}`);
  return questions;
}


// المجموعات الخمس الافتراضية
export const GROUP_NAMES = ['arabic', 'general', 'computer', 'english', 'educational'];
export const GROUP_TITLES = {
  arabic: 'عربي',
  general: 'معلومات عامة',
  computer: 'حاسب',
  english: 'إنجليزي',
  educational: 'تربوي',
  behavioral: 'الجدارات السلوكية والنفسية'  // ✅ للمستوى 15
};

// Config التحكم في المجموعات (افتراضي كلها إجبارية)
// Config لكل المستويات 1-25 ✅ SPECIAL LEVEL 15
export const levelsGroupsConfig = {};
for(let i=1; i<=25; i++) {
  if (i === 15) {
    // ✅ مستوى 15: behavioral فقط
    levelsGroupsConfig[15] = {
      groups: {
        behavioral: {mandatory: true, title: 'الجدارات السلوكية والنفسية'}
      }
    };
    continue;
  }
  levelsGroupsConfig[i] = {
    groups: {
      arabic: {mandatory: true},
      general: {mandatory: true}, 
      computer: {mandatory: true},
      english: {mandatory: false},      // اختياري
      educational: {mandatory: false}   // اختياري
    }
  };
}
window.levelsGroupsConfig = levelsGroupsConfig;
console.log('✅ Groups Config: كل المستويات 1-25 جاهزة! 🎉');

console.log('🚀 questions.js loaded - All levels ready (local only, level3-test merged)');