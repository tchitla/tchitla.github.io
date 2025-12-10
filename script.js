// --- QUIZ DATA ---
// You can edit these questions!
const questions = [
    {
        sender: "Security Team &lt;alert@g00gle.com&gt;",
        subject: "URGENT: Your password has expired",
        body: "Dear User, your password expired today. Click here immediately to keep your account: <span style='color:blue; text-decoration:underline;'>www.google-security-check.com</span>",
        isSafe: "Fake",
        explanation: "Look at the sender! It says 'g00gle.com' (zeros instead of 'o'). Also, the link goes to a fake website, not real Google."
    },
    {
        sender: "Netflix &lt;info@mailer.netflix.com&gt;",
        subject: "New sign-in to your account",
        body: "Hi, we noticed a new sign-in to your Netflix account from a new device. If this was you, you don't need to do anything.",
        isSafe: "Real",
        explanation: "This is a standard notification. The sender domain matches the real company, and they are NOT asking you to click a link or enter a password."
    },
    {
        sender: "HR Department &lt;staff@schoo1.edu&gt;",
        subject: "Action Required: Update Direct Deposit",
        body: "Please login to the portal to confirm your bank details for the next paycheck. Failure to do so will delay payment.",
        isSafe: "Fake",
        explanation: "The sender domain is misspelled (schoo1.edu). This is a common scam to steal banking information from employees."
    },
    {
        sender: "Amazon.com &lt;auto-confirm@amazon.com&gt;",
        subject: "Your order has shipped",
        body: "Hi! Your package #44921 is on its way. Track your package here or view your order details in the app.",
        isSafe: "Real",
        explanation: "The sender is correct (amazon.com) and the email provides tracking info without demanding urgent personal data."
    },
    {
        sender: "CEO &lt;ceo-office-private@gmail.com&gt;",
        subject: "Urgent Wire Transfer",
        body: "I am in a meeting and can't talk. I need you to process a wire transfer for a vendor immediately. I will explain later.",
        isSafe: "Fake",
        explanation: "This is 'CEO Fraud.' A real CEO would use a company email address, not a generic @gmail.com address for business."
    }
];

// --- VARIABLES ---
let currentQuestion = 0;
let score = 0;

// --- FUNCTIONS ---

// 1. Load the current question onto the screen
function loadQuestion() {
    // Check if quiz is over
    if (currentQuestion >= questions.length) {
        showFinalResult();
        return;
    }

    // Update Progress Bar
    const progressPercent = ((currentQuestion) / questions.length) * 100;
    document.getElementById("progress").style.width = progressPercent + "%";
    document.getElementById("question-number").innerText = `Question ${currentQuestion + 1} of ${questions.length}`;

    // Inject Email Content
    const q = questions[currentQuestion];
    document.getElementById("email-display").innerHTML = `
        <div class="email-header">
            <strong>From:</strong> <span class="sender-address">${q.sender}</span><br>
            <strong>Subject:</strong> ${q.subject}
        </div>
        <p>${q.body}</p>
    `;

    // Reset UI state
    document.getElementById("feedback").classList.add("hidden");
    document.querySelector(".controls").style.display = "flex";
}

// 2. Check the user's answer
function checkAnswer(userChoice) {
    const q = questions[currentQuestion];
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackText = document.getElementById("feedback-text");
    const feedbackBox = document.getElementById("feedback");

    // Hide the buttons so they can't click twice
    document.querySelector(".controls").style.display = "none";
    feedbackBox.classList.remove("hidden");

    if (userChoice === q.isSafe) {
        // Correct Answer
        score++;
        feedbackTitle.innerText = "✅ Correct!";
        feedbackTitle.style.color = "#4ade80"; // Green
    } else {
        // Wrong Answer
        feedbackTitle.innerText = "❌ Incorrect";
        feedbackTitle.style.color = "#ef4444"; // Red
    }

    feedbackText.innerText = q.explanation;
}

// 3. Move to next question
function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

// 4. End the quiz
function showFinalResult() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("final-score").innerText = score;
    
    // Custom message based on score
    const msg = document.getElementById("final-message");
    if (score === 5) {
        msg.innerText = "🏆 Perfect Score! You are a Cybersecurity Expert.";
    } else if (score >= 3) {
        msg.innerText = "👍 Good job! But watch out for those tricky ones.";
    } else {
        msg.innerText = "⚠️ Be careful! You might need more training.";
    }
}

// Start the quiz when the page loads
loadQuestion();
