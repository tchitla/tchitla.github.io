// --- QUIZ DATA ---
const questionsSource = [
    // --- PHISHING EMAILS (Type: 'email') ---
    {
        type: "email",
        category: "Phishing",
        sender: "Security Team &lt;alert@g00gle.com&gt;",
        subject: "URGENT: Your password has expired",
        body: "Dear User, your password expired today. Click here immediately to keep your account: <span style='color:blue; text-decoration:underline;'>www.google-security-check.com</span>",
        isSafe: "Fake",
        explanation: "Look at the sender! 'g00gle.com' uses zeros. Also, real security alerts rarely demand immediate links."
    },
    {
        type: "email",
        category: "Phishing",
        sender: "HR Department &lt;staff@schoo1.edu&gt;",
        subject: "Action Required: Update Direct Deposit",
        body: "Please login to the portal to confirm your bank details for the next paycheck. Failure to do so will delay payment.",
        isSafe: "Fake",
        explanation: "The sender domain is misspelled (schoo1.edu). Scammers often swap 'l' for '1'."
    },
    {
        type: "email",
        category: "Phishing",
        sender: "CEO &lt;ceo-office-private@gmail.com&gt;",
        subject: "Urgent Wire Transfer",
        body: "I am in a meeting and can't talk. I need you to process a wire transfer for a vendor immediately.",
        isSafe: "Fake",
        explanation: "CEO Fraud: A real CEO would use a company email address, not a private Gmail account."
    },
    {
        type: "email",
        category: "Social",
        sender: "Instagram DM",
        subject: "From: BestFriend_22",
        body: "OMG is this you in this video?? 😲 click here to watch: bit.ly/weird-video",
        isSafe: "Fake",
        explanation: "If a friend sends a vague message with a weird link, their account was likely hacked. Do not click."
    },
    // --- SAFE EMAILS (Type: 'email') ---
    {
        type: "email",
        category: "Safety",
        sender: "Netflix &lt;info@mailer.netflix.com&gt;",
        subject: "New sign-in to your account",
        body: "Hi, we noticed a new sign-in to your Netflix account. If this was you, you don't need to do anything.",
        isSafe: "Real",
        explanation: "The sender domain is correct (netflix.com), and they aren't asking for passwords or money."
    },
    {
        type: "email",
        category: "Safety",
        sender: "Amazon.com &lt;auto-confirm@amazon.com&gt;",
        subject: "Your order has shipped",
        body: "Hi! Your package #44921 is on its way. Track your package here or view your order details in the app.",
        isSafe: "Real",
        explanation: "Standard shipping notification from a verified domain with no urgent threats."
    },
    
    // --- SYSTEM ALERTS (Type: 'system') ---
    // These will look like computer popups, NOT emails
    {
        type: "system",
        category: "Password",
        title: "Create New Password",
        body: "You are setting a new password. You choose: <strong>'P@ssword1'</strong>.<br><br>Is this secure?",
        isSafe: "Fake",
        explanation: "Weak! 'Password' is the most common password. Changing letters to symbols (@) is easy for hackers to guess."
    },
    {
        type: "system",
        category: "Password",
        title: "Create New Password",
        body: "You are setting a new password. You choose: <strong>'Tr0ub4dor&3'</strong> (12 chars).<br><br>Is this secure?",
        isSafe: "Real",
        explanation: "Strong! It is long, uses numbers/symbols, and isn't a dictionary word."
    },
    {
        type: "system",
        category: "Network",
        title: "Wi-Fi Connection",
        body: "Network Name: <strong>'Free_Airport_WiFi'</strong><br>Security: None (Open)<br><br>Do you want to connect to do banking?",
        isSafe: "Fake",
        explanation: "Never do banking on 'Open' public Wi-Fi. Hackers can easily intercept your data."
    },
    {
        type: "system",
        category: "Updates",
        title: "Windows Security",
        body: "A critical security update is available. Install now?<br><br><em>(Verified Publisher: Microsoft Corporation)</em>",
        isSafe: "Real",
        explanation: "Always install system updates. They patch security holes that hackers use."
    }
];

// --- VARIABLES ---
let questions = [];
let currentQuestion = 0;
let score = 0;

// --- FUNCTIONS ---

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    questions = shuffle([...questionsSource]); 
    currentQuestion = 0;
    score = 0;
    document.getElementById("result-box").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showFinalResult();
        return;
    }

    // Update Progress
    const progressPercent = ((currentQuestion) / questions.length) * 100;
    document.getElementById("progress").style.width = progressPercent + "%";
    document.getElementById("question-number").innerText = `Question ${currentQuestion + 1}`;

    const q = questions[currentQuestion];
    const displayBox = document.getElementById("scenario-display");

    // --- UI SWITCHER LOGIC ---
    // If it's an EMAIL, show the Email Design
    if (q.type === "email") {
        displayBox.className = "scenario-card email-design"; // Apply Email CSS
        displayBox.innerHTML = `
            <div class="email-header">
                <strong>From:</strong> <span class="sender-address">${q.sender}</span><br>
                <strong>Subject:</strong> ${q.subject}
            </div>
            <div class="email-body">${q.body}</div>
        `;
    } 
    // If it's a SYSTEM MSG, show the Popup Design
    else {
        displayBox.className = "scenario-card system-design"; // Apply System CSS
        displayBox.innerHTML = `
            <div class="system-header">
                <span class="sys-icon">🛡️</span> ${q.title}
            </div>
            <div class="system-body">${q.body}</div>
        `;
    }

    // Reset Buttons
    document.getElementById("feedback").classList.add("hidden");
    document.querySelector(".controls").style.display = "flex";
}

function checkAnswer(userChoice) {
    const q = questions[currentQuestion];
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackText = document.getElementById("feedback-text");
    const feedbackBox = document.getElementById("feedback");

    document.querySelector(".controls").style.display = "none";
    feedbackBox.classList.remove("hidden");

    if (userChoice === q.isSafe) {
        score++;
        feedbackTitle.innerText = "✅ Correct!";
        feedbackTitle.className = "correct-text";
    } else {
        feedbackTitle.innerText = "❌ Incorrect";
        feedbackTitle.className = "wrong-text";
    }
    feedbackText.innerText = q.explanation;
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function showFinalResult() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
    
    document.getElementById("final-score").innerText = score;
    document.getElementById("total-questions").innerText = questions.length;
    
    const msg = document.getElementById("final-message");
    if (score === questions.length) {
        msg.innerText = "🏆 Perfect Score! You are a Cyber Guardian.";
    } else if (score >= questions.length * 0.7) {
        msg.innerText = "👍 Good job! You know your stuff.";
    } else {
        msg.innerText = "⚠️ Be careful! Review your safety basics.";
    }
}

startQuiz();
