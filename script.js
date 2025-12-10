// --- QUIZ DATA ---
// A mix of Phishing, Password Security, and General Safety questions
const questionsSource = [
    {
        category: "Phishing",
        sender: "Security Team &lt;alert@g00gle.com&gt;",
        subject: "URGENT: Your password has expired",
        body: "Dear User, your password expired today. Click here immediately to keep your account: <span style='color:blue; text-decoration:underline;'>www.google-security-check.com</span>",
        isSafe: "Fake",
        explanation: "Look at the sender! It says 'g00gle.com' (zeros instead of 'o'). Also, urgency is a common trick."
    },
    {
        category: "Safety",
        sender: "Netflix &lt;info@mailer.netflix.com&gt;",
        subject: "New sign-in to your account",
        body: "Hi, we noticed a new sign-in to your Netflix account from a new device. If this was you, you don't need to do anything.",
        isSafe: "Real",
        explanation: "This is a standard notification. The sender domain is correct, and they are NOT asking for a password or money."
    },
    {
        category: "Phishing",
        sender: "HR Department &lt;staff@schoo1.edu&gt;",
        subject: "Action Required: Update Direct Deposit",
        body: "Please login to the portal to confirm your bank details for the next paycheck. Failure to do so will delay payment.",
        isSafe: "Fake",
        explanation: "The sender domain is misspelled (schoo1.edu). Scammers often swap 'l' for '1' to trick you."
    },
    {
        category: "Safety",
        sender: "Amazon.com &lt;auto-confirm@amazon.com&gt;",
        subject: "Your order has shipped",
        body: "Hi! Your package #44921 is on its way. Track your package here or view your order details in the app.",
        isSafe: "Real",
        explanation: "The sender is verified (amazon.com) and the email provides info without demanding urgent personal data."
    },
    {
        category: "Phishing",
        sender: "CEO &lt;ceo-office-private@gmail.com&gt;",
        subject: "Urgent Wire Transfer",
        body: "I am in a meeting and can't talk. I need you to process a wire transfer for a vendor immediately. I will explain later.",
        isSafe: "Fake",
        explanation: "This is 'CEO Fraud.' A real CEO would use a company email, not a private Gmail address, for business tasks."
    },
    {
        category: "Password",
        sender: "System Message",
        subject: "Password Check: 'P@ssword1'",
        body: "You are setting a new password. You choose 'P@ssword1'. Is this a secure choice?",
        isSafe: "Fake",
        explanation: "Weak Password! Even with symbols, 'Password' is the most common password in the world. It can be cracked in less than 1 second."
    },
    {
        category: "Password",
        sender: "System Message",
        subject: "Password Check: 'Tr0ub4dor&3'",
        body: "You are setting a new password. You choose 'Tr0ub4dor&3'. It is 11 characters long and random.",
        isSafe: "Real",
        explanation: "Strong Password! It is long, uses numbers/symbols, and isn't a common dictionary word."
    },
    {
        category: "Network",
        sender: "Wi-Fi Alert",
        subject: "Network: 'Free_Airport_WiFi'",
        body: "You are at the airport. You see an open network named 'Free_Airport_WiFi' that requires no password. Should you use it for banking?",
        isSafe: "Fake",
        explanation: "Never do banking on public Wi-Fi! 'Open' networks allow hackers to intercept your data. Use a VPN or wait until you get home."
    },
    {
        category: "Updates",
        sender: "Windows Update",
        subject: "System Update Available",
        body: "Your computer says a security update is ready to install. It might take 10 minutes. Should you do it?",
        isSafe: "Real",
        explanation: "Always update! Security updates patch holes that hackers use to get into your computer."
    },
    {
        category: "Social",
        sender: "Instagram DM",
        subject: "From: BestFriend_22",
        body: "OMG is this you in this video?? 😲 click here to watch: bit.ly/weird-video",
        isSafe: "Fake",
        explanation: "If a friend sends a weird link with generic text like 'Is this you?', their account was likely hacked. Don't click it!"
    }
];

// --- VARIABLES ---
let questions = []; // This will hold the shuffled questions
let currentQuestion = 0;
let score = 0;

// --- FUNCTIONS ---

// 0. Shuffle Function (Randomizes the order)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 1. Initialize Quiz (Shuffle and Start)
function startQuiz() {
    // Create a copy of the source questions so we don't mess up the original
    questions = shuffle([...questionsSource]); 
    currentQuestion = 0;
    score = 0;
    document.getElementById("result-box").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    loadQuestion();
}

// 2. Load the current question onto the screen
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

    // Inject Content
    const q = questions[currentQuestion];
    
    // Slight style change if it's not an email
    let headerText = `<strong>From:</strong> <span class="sender-address">${q.sender}</span><br><strong>Subject:</strong> ${q.subject}`;
    if (q.category !== "Phishing" && q.category !== "Safety") {
         // Simplify header for Password/Network questions
    }

    document.getElementById("email-display").innerHTML = `
        <div class="email-header">
            ${headerText}
        </div>
        <p>${q.body}</p>
    `;

    // Reset UI state
    document.getElementById("feedback").classList.add("hidden");
    document.querySelector(".controls").style.display = "flex";
}

// 3. Check the user's answer
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

// 4. Move to next question
function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

// 5. End the quiz
function showFinalResult() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("final-score").innerText = score;
    const total = questions.length;
    
    // Custom message based on score
    const msg = document.getElementById("final-message");
    if (score === total) {
        msg.innerText = "🏆 Perfect Score! You are a Cyber Guardian.";
    } else if (score >= total * 0.7) {
        msg.innerText = "👍 Good job! You know your stuff.";
    } else {
        msg.innerText = "⚠️ Be careful! You might need to review your safety basics.";
    }
}

// Start the quiz when the page loads
startQuiz();
