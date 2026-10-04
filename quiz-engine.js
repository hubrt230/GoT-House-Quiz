/* Pure scoring and state functions used directly by the interface. */
(function(global){'use strict';
function valid(quiz,s){return !!(s&&Array.isArray(s.answers)&&s.answers.length<=quiz.questions.length&&s.answers.every((a,i)=>Number.isInteger(a)&&a>=0&&a<quiz.questions[i].answers.length)&&Number.isInteger(s.step)&&s.step>=0&&s.step<=Math.min(s.answers.length,quiz.questions.length));}
function rank(quiz,answers){return quiz.results.map((r,index)=>{let max=0,earned=0;quiz.questions.forEach((q,i)=>{max+=Math.max(...q.answers.map(a=>a.weights[r.id]||0));earned+=q.answers[answers[i]]?.weights[r.id]||0});return {id:r.id,score:max?earned/max:0,index}}).sort((a,b)=>b.score-a.score||a.index-b.index)}
function move(quiz,state,action,value){const s={answers:[...state.answers],step:state.step};if(action==='reset')return {answers:[],step:0};if(action==='answer'){if(s.step>=quiz.questions.length||!Number.isInteger(value)||!quiz.questions[s.step].answers[value])return s;s.answers[s.step]=value;}if(action==='next'&&s.answers[s.step]!==undefined)s.step=Math.min(quiz.questions.length,s.step+1);if(action==='back')s.step=Math.max(0,s.step-1);return s;}
const api={rank,valid,move};global.GOT_ENGINE=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
