const WEIGHTS = {
    attention: 0.15,
    trust: 0.20,
    clarity: 0.20,
    cta: 0.15,
    friction: 0.15,
    proof: 0.15
};



const generateBtn =
    document.getElementById("generateBtn");

const printBtn =
    document.getElementById("printBtn");


printBtn.addEventListener(
    "click",
    () => window.print()
);



function checkedCount(selector) {

    return document.querySelectorAll(
        `${selector}:checked`
    ).length;

}

function calculateScore(
    selector,
    total
) {

    return Math.round(
        (checkedCount(selector) / total) * 100
    );

}

function calculateFriction() {

    const total = 5;

    const checked =
        checkedCount(".friction");

    return Math.round(
        100 - ((checked / total) * 100)
    );

}

function getGrade(score) {

    if(score >= 90)
        return "Excellent";

    if(score >= 75)
        return "Strong";

    if(score >= 60)
        return "Average";

    if(score >= 40)
        return "Weak";

    return "Critical";

}

function getGradeColor(score) {
    if(score >= 75)
        return "var(--success)";

    if(score >= 60)
        return "var(--warning)";

    return "var(--danger)";
}

function getGradeClass(score) {
    if(score >= 75)
        return "grade-good";

    if(score >= 60)
        return "grade-warning";

    return "grade-danger";
}

function updateGauge(score) {

    const gauge =
        document.querySelector(".gauge");

    const degrees =
        score * 3.6;

    const color = getGradeColor(score);

    gauge.style.background =
        `conic-gradient(
            ${color} 0deg,
            ${color} ${degrees}deg,
            #e5e7eb ${degrees}deg
        )`;

    document.getElementById(
        "overallScore"
    ).textContent = score;

}


function radarPoint(
    cx,
    cy,
    radius,
    angle,
    value
){

    const r =
        radius * (value / 100);

    const rad =
        (angle - 90) *
        Math.PI / 180;

    return {

        x:
        cx + r * Math.cos(rad),

        y:
        cy + r * Math.sin(rad)

    };

}

function drawRadar(
    attention,
    trust,
    clarity,
    cta,
    friction,
    proof
){

    const centerX = 250;
    const centerY = 250;

    const radius = 200;

    const values = [

        attention,
        trust,
        clarity,
        cta,
        friction,
        proof

    ];

    const angles = [

        0,
        60,
        120,
        180,
        240,
        300

    ];

    const points =
        values
        .map((value,index)=>{

            const p =
                radarPoint(
                    centerX,
                    centerY,
                    radius,
                    angles[index],
                    value
                );

            return `${p.x},${p.y}`;

        })
        .join(" ");

    document
    .getElementById("radarData")
    .setAttribute(
        "points",
        points
    );

}

function updateRadarLabels(
    attention,
    trust,
    clarity,
    cta,
    friction,
    proof
){
    document.getElementById("radarLabelAttention").textContent = "Attention";
    document.getElementById("radarLabelTrust").textContent = "Trust";
    document.getElementById("radarLabelClarity").textContent = "Clarity";
    document.getElementById("radarLabelCta").textContent = "CTA";
    document.getElementById("radarLabelFriction").textContent = "Friction";
    document.getElementById("radarLabelProof").textContent = "Proof";
}



function metricClass(score){

    if(score >= 75)
        return "good";

    if(score >= 50)
        return "medium";

    return "bad";

}

function updateMetricColors(
    scores
){

    const metrics =
        document.querySelectorAll(
            ".metric"
        );

    metrics.forEach(
        (metric,index)=>{

            metric.classList.remove(
                "good",
                "medium",
                "bad"
            );

            metric.classList.add(
                metricClass(
                    scores[index]
                )
            );

        }
    );

}


function renderList(
    elementId,
    items
){

    const list =
        document.getElementById(
            elementId
        );

    list.innerHTML = "";

    if(items.length === 0){

        list.innerHTML =
            "<li>No issues detected.</li>";

        return;

    }

    items.forEach(item=>{

        const li =
            document.createElement("li");

        li.textContent =
            item;

        list.appendChild(li);

    });

}


function createSummary(score){

    if(score >= 90){

        return "Excellent conversion readiness. This landing page is highly optimized and prepared for scaling traffic.";

    }

    if(score >= 75){

        return "Strong landing page performance. A few targeted improvements could further increase conversions.";

    }

    if(score >= 60){

        return "Average conversion readiness. Several opportunities exist to improve trust, clarity, and conversion flow.";

    }

    if(score >= 40){

        return "Weak conversion readiness. Significant improvements are recommended before investing heavily in traffic.";

    }

    return "Critical conversion issues detected. Major optimization work is required.";

}


function saveAudit(data){

    localStorage.setItem(
        "scopeconnectAudit",
        JSON.stringify(data)
    );

}


function restoreAudit(){

    const saved =
        localStorage.getItem(
            "scopeconnectAudit"
        );

    if(!saved) return;

    try{

        const data =
            JSON.parse(saved);

        console.log(
            "Previous Audit:",
            data
        );

    }
    catch(error){

        console.error(error);

    }

}

restoreAudit();


generateBtn.addEventListener(
    "click",
    generateAudit
);

function generateAudit(){

    

    const business =
        document.getElementById(
            "businessName"
        ).value || "-";

    const industry =
        document.getElementById(
            "industry"
        ).value || "-";

    const audience =
        document.getElementById(
            "audience"
        ).value || "-";

    const goal =
        document.getElementById(
            "goal"
        ).value || "-";

   

    const attention =
        calculateScore(
            ".attention",
            6
        );

    const trust =
        calculateScore(
            ".trust",
            6
        );

    const clarity =
        calculateScore(
            ".clarity",
            5
        );

    const cta =
        calculateScore(
            ".cta",
            5
        );

    const friction =
        calculateFriction();

    const proof =
        calculateScore(
            ".proof",
            5
        );


    const overall =
        Math.round(

            attention *
            WEIGHTS.attention +

            trust *
            WEIGHTS.trust +

            clarity *
            WEIGHTS.clarity +

            cta *
            WEIGHTS.cta +

            friction *
            WEIGHTS.friction +

            proof *
            WEIGHTS.proof

        );

   

    document.getElementById(
        "attentionScore"
    ).textContent = attention;

    document.getElementById(
        "trustScore"
    ).textContent = trust;

    document.getElementById(
        "clarityScore"
    ).textContent = clarity;

    document.getElementById(
        "ctaScore"
    ).textContent = cta;

    document.getElementById(
        "frictionScore"
    ).textContent = friction;

    document.getElementById(
        "proofScore"
    ).textContent = proof;

    const gradeEl =
        document.getElementById("grade");

    const gradeText =
        getGrade(overall);

    gradeEl.textContent = gradeText;
    gradeEl.className = "";
    gradeEl.classList.add(
        getGradeClass(overall)
    );

    updateGauge(overall);

   

    document.getElementById(
        "summaryBusiness"
    ).textContent = business;

    document.getElementById(
        "summaryIndustry"
    ).textContent = industry;

    document.getElementById(
        "summaryAudience"
    ).textContent = audience;

    document.getElementById(
        "summaryGoal"
    ).textContent = goal;

   

    drawRadar(
        attention,
        trust,
        clarity,
        cta,
        friction,
        proof
    );

    updateRadarLabels(
        attention,
        trust,
        clarity,
        cta,
        friction,
        proof
    );

   

    updateMetricColors([
        attention,
        trust,
        clarity,
        cta,
        friction,
        proof
    ]);

   

    const critical = [];

    if(attention < 40)
        critical.push(
            "Attention score is critically low."
        );

    if(trust < 40)
        critical.push(
            "Trust signals are insufficient."
        );

    if(clarity < 40)
        critical.push(
            "Offer and messaging lack clarity."
        );

    if(cta < 40)
        critical.push(
            "Call-to-action effectiveness is poor."
        );

    if(friction < 40)
        critical.push(
            "Too much friction exists in the conversion path."
        );

    if(proof < 40)
        critical.push(
            "Social proof and credibility signals are weak."
        );

    

    const quickWins = [];

    if(trust < 70)
        quickWins.push(
            "Add testimonials and client logos."
        );

    if(cta < 70)
        quickWins.push(
            "Move CTA above the fold."
        );

    if(proof < 70)
        quickWins.push(
            "Add a case study section."
        );

    if(attention < 70)
        quickWins.push(
            "Improve headline and hero section."
        );

   

    const recommendations = [];

    if(attention < 60)
        recommendations.push(
            "Strengthen the value proposition and headline."
        );

    if(trust < 60)
        recommendations.push(
            "Add trust badges, reviews, and testimonials."
        );

    if(clarity < 60)
        recommendations.push(
            "Focus on one primary offer and simplify messaging."
        );

    if(cta < 60)
        recommendations.push(
            "Use stronger CTA copy and increase visibility."
        );

    if(friction < 60)
        recommendations.push(
            "Reduce form fields and remove distractions."
        );

    if(proof < 60)
        recommendations.push(
            "Show measurable results and success stories."
        );

   

    if(critical.length === 0)
        critical.push(
            "No critical issues detected. Keep monitoring performance and refining the page."
        );

    if(quickWins.length === 0)
        quickWins.push(
            "Maintain current optimizations and continue testing small improvements."
        );

    if(recommendations.length === 0)
        recommendations.push(
            "Review page performance periodically and update messaging as needed."
        );

    renderList(
        "criticalIssues",
        critical
    );

    renderList(
        "quickWins",
        quickWins
    );

    renderList(
        "recommendations",
        recommendations
    );

  

    document.getElementById(
        "executiveSummary"
    ).textContent =
        createSummary(
            overall
        );

   

    document.getElementById(
        "auditDate"
    ).textContent =
        "Generated: " +
        new Date()
        .toLocaleString();

  

    saveAudit({

        business,
        industry,
        audience,
        goal,

        attention,
        trust,
        clarity,
        cta,
        friction,
        proof,

        overall

    });

  
    document
    .getElementById("report")
    .classList.remove(
        "hidden"
    );

    document
    .getElementById("report")
    .scrollIntoView({
        behavior:"smooth"
    });

}