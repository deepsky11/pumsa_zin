// 1. 퀴즈 데이터 (선생님께서 원하시는 문제로 쉽게 수정 가능합니다)
const quizData = [
    {
        question: "다음 중 사람이나 사물의 이름을 나타내는 '명사'에 해당하는 단어는?",
        options: ["예쁘다", "하늘", "매우", "달리다"],
        correct: 1 // 배열은 0부터 시작하므로 '하늘'이 정답(인덱스 1)
    },
    {
        question: "'철수가 밥을 먹는다.'에서 문법적 관계를 나타내는 '조사'를 모두 고르시오.",
        options: ["철수, 밥", "가, 을", "먹는다", "철수가, 밥을"],
        correct: 1
    },
    {
        question: "동사와 형용사를 구별하는 방법으로 알맞지 않은 것은?",
        options: ["현재형 어미 '-는다/-ㄴ다'를 붙여본다.", "명령형 어미 '-어라/-아라'를 붙여본다.", "청유형 어미 '-자'를 붙여본다.", "관형사형 어미 '-은/-ㄴ'을 붙여본다."],
        correct: 3 // 동사와 형용사 모두 관형사형 어미가 붙을 수 있음
    },
    {
        question: "다음 밑줄 친 단어의 품사가 '부사'인 것은?",
        options: ["우와! 정말 멋지다.", "새 신발을 샀다.", "기차가 빨리 달린다.", "그는 학생이다."],
        correct: 2 // '빨리'가 동사 '달린다'를 수식
    },
    {
        question: "'수사'에 대한 설명으로 가장 알맞은 것은?",
        options: ["체언을 수식하는 말이다.", "사물의 수량이나 순서를 나타내는 말이다.", "주로 문장 맨 앞에서 독립적으로 쓰인다.", "사람이나 사물을 대신하여 가리키는 말이다."],
        correct: 1
    }
];

// 2. HTML 요소 가져오기
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressText = document.getElementById('progress-text');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');
const restartBtn = document.getElementById('restart-btn');

// 3. 퀴즈 상태 변수
let currentQuestionIndex = 0;
let score = 0;
let answered = false; // 중복 클릭 방지

// 4. 문제 불러오기 함수
function loadQuestion() {
    answered = false;
    nextBtn.classList.add('hidden'); // 다음 버튼 숨기기
    
    // 진행 상황 업데이트
    progressText.innerText = `문제 ${currentQuestionIndex + 1} / ${quizData.length}`;
    
    const currentQuiz = quizData[currentQuestionIndex];
    questionText.innerText = currentQuiz.question;
    
    // 이전 선택지 비우기
    optionsContainer.innerHTML = '';
    
    // 선택지 버튼 생성
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        
        // 클릭 이벤트 리스너 추가
        button.addEventListener('click', () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

// 5. 정답 확인 함수
function selectOption(selectedButton, selectedIndex) {
    if (answered) return; // 이미 답을 골랐으면 무시
    answered = true;
    
    const currentQuiz = quizData[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    
    if (selectedIndex === currentQuiz.correct) {
        selectedButton.classList.add('correct');
        score += 20; // 한 문제당 20점 (총 100점 만점)
    } else {
        selectedButton.classList.add('wrong');
        // 오답일 경우 정답도 표시
        allButtons[currentQuiz.correct].classList.add('correct');
    }
    
    // 다음 버튼 보이기
    nextBtn.classList.remove('hidden');
}

// 6. 결과 화면 표시 함수
function showResult() {
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    progressText.innerText = '결과 확인';
    
    scoreText.innerText = `${score}점 / 100점`;
    
    if (score === 100) {
        feedbackText.innerText = "완벽해요! 품사 마스터로 인정합니다. 👑";
    } else if (score >= 60) {
        feedbackText.innerText = "참 잘했어요! 조금만 더 복습하면 완벽할 거예요. 👍";
    } else {
        feedbackText.innerText = "괜찮아요! 교과서를 다시 한번 천천히 읽어볼까요? 💪";
    }
}

// 7. 다음 문제로 넘어가기
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// 8. 퀴즈 다시 시작하기
restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    loadQuestion();
});

// 9. 초기 실행
loadQuestion();
