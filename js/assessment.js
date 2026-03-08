/**
 * SARA Health Assessment Engine
 * 44-Condition Health Risk Assessment
 */

// State
let currentSection = 1;
const totalSections = 6;
let assessmentData = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateProgress();
});

// Navigation
function changeSection(direction) {
  // Validate current section
  if (!validateSection(currentSection)) {
    alert('يرجى الإجابة على جميع الأسئلة في هذا القسم');
    return;
  }

  // Hide current section
  document.querySelector(`[data-section="${currentSection}"]`).style.display = 'none';
  
  // Update section
  currentSection += direction;
  
  // Show new section
  document.querySelector(`[data-section="${currentSection}"]`).style.display = 'block';
  
  // Update buttons
  updateButtons();
  updateProgress();
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update buttons visibility
function updateButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  prevBtn.style.display = currentSection === 1 ? 'none' : 'block';
  
  if (currentSection === totalSections) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  } else {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  }
}

// Update progress bar
function updateProgress() {
  const progress = ((currentSection - 1) / totalSections) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
  document.getElementById('progressNumber').textContent = Math.round(progress) + '%';
  document.getElementById('progressText').textContent = `القسم ${currentSection} من ${totalSections}`;
}

// Validate section
function validateSection(sectionNum) {
  const section = document.querySelector(`[data-section="${sectionNum}"]`);
  const requiredInputs = section.querySelectorAll('[required]');
  
  for (let input of requiredInputs) {
    if (input.type === 'radio') {
      const name = input.name;
      const checked = section.querySelector(`input[name="${name}"]:checked`);
      if (!checked) return false;
    } else if (!input.value.trim()) {
      return false;
    }
  }
  
  return true;
}

// Submit assessment
async function submitAssessment() {
  if (!validateSection(currentSection)) {
    alert('يرجى الإجابة على جميع الأسئلة');
    return;
  }
  
  // Disable submit
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'جاري الحساب...';
  
  // Collect data
  const form = document.getElementById('healthAssessment');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Calculate BMI
  const heightM = (data.height / 100);
  data.bmi = (data.weight / (heightM * heightM)).toFixed(1);
  
  // Calculate SARA Score
  const score = calculateSARAScore(data);
  data.sara_score = score.score;
  data.risk_level = score.riskLevel;
  data.risk_categories = score.categories;
  
  // Add timestamp and source
  data.assessment_date = new Date().toISOString();
  data.source = 'website_assessment';
  
  // Store in localStorage
  localStorage.setItem('sara_assessment_data', JSON.stringify(data));
  
  // Send to Formspree (update with your Form ID)
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      // Show results
      showResults(score, data);
      
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'assessment_complete', {
          event_category: 'conversion',
          score: score.score,
          risk_level: score.riskLevel
        });
      }
    } else {
      throw new Error('Failed to submit');
    }
  } catch (error) {
    console.error('Assessment error:', error);
    // Still show results even if submission fails
    showResults(score, data);
  }
}

// Calculate SARA Score (0-100)
function calculateSARAScore(data) {
  let score = 100;
  const categories = {
    cardiovascular: 100,
    metabolic: 100,
    mental: 100,
    lifestyle: 100
  };
  
  // Cardiovascular Health (25% weight)
  if (data.high_bp === 'yes') score -= 10;
  if (data.high_cholesterol === 'yes') score -= 8;
  if (data.heart_family === 'yes') score -= 5;
  if (data.exercise === 'never') { score -= 10; categories.cardiovascular -= 25; }
  if (data.exercise === '1-2') { score -= 5; categories.cardiovascular -= 15; }
  
  // Metabolic Health (30% weight)
  if (data.diabetes === 'yes') score -= 15;
  if (data.insulin_resistance === 'yes') score -= 10;
  if (data.fast_food === '6+') { score -= 10; categories.metabolic -= 30; }
  if (data.fast_food === '3-5') { score -= 5; categories.metabolic -= 15; }
  
  // BMI Impact
  const bmi = parseFloat(data.bmi);
  if (bmi >= 30) { score -= 10; categories.metabolic -= 20; }
  else if (bmi >= 25) { score -= 5; categories.metabolic -= 10; }
  
  // Mental Health (20% weight)
  if (data.stress_level === 'very_high') { score -= 10; categories.mental -= 25; }
  if (data.stress_level === 'high') { score -= 5; categories.mental -= 15; }
  if (data.sleep_hours === 'less5') { score -= 10; categories.mental -= 20; }
  if (data.sleep_hours === '5-6') { score -= 5; categories.mental -= 10; }
  if (data.burnout === 'often') score -= 8;
  
  // Lifestyle (25% weight)
  if (data.smoking === 'yes') score -= 15;
  if (data.coffee === '5+') score -= 5;
  if (data.water === 'less1') { score -= 10; categories.lifestyle -= 25; }
  if (data.water === '1-2') { score -= 5; categories.lifestyle -= 15; }
  
  // Age factor
  if (data.age === 'over50') score -= 5;
  
  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score));
  
  // Determine risk level
  let riskLevel, riskLabel, riskColor;
  if (score >= 80) {
    riskLevel = 'low';
    riskLabel = 'منخفض الخطورة';
    riskColor = '#34D399';
  } else if (score >= 60) {
    riskLevel = 'moderate';
    riskLabel = 'متوسط الخطورة';
    riskColor = '#FBBF24';
  } else if (score >= 40) {
    riskLevel = 'high';
    riskLabel = 'عالِ الخطورة';
    riskColor = '#F97316';
  } else {
    riskLevel = 'critical';
    riskLabel = 'حرج';
    riskColor = '#EF4444';
  }
  
  return {
    score,
    riskLevel,
    riskLabel,
    riskColor,
    categories
  };
}

// Show results
function showResults(score, data) {
  // Hide form
  document.getElementById('assessmentForm').style.display = 'none';
  
  // Show results container
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.style.display = 'block';
  
  // Calculate stroke offset for circle animation
  const circumference = 2 * Math.PI * 90; // r=90
  const offset = circumference - (score / 100) * circumference;
  
  // Generate recommendations
  const recommendations = generateRecommendations(data, score);
  
  // Inject results HTML
  resultsContainer.innerHTML = `
    <div class="results-header">
      <div class="score-circle">
        <svg width="200" height="200">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${score.riskColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${score.riskColor};stop-opacity:0.7" />
            </linearGradient>
          </defs>
          <circle class="score-circle-track" cx="100" cy="100" r="90"></circle>
          <circle class="score-circle-fill" cx="100" cy="100" r="90" style="stroke-dashoffset: ${circumference}" data-offset="${offset}"></circle>
        </svg>
        <div class="score-number">${score.score}</div>
      </div>
      <h2 class="score-label" style="color:${score.riskColor}">${score.riskLabel}</h2>
      <p class="score-description">
        نتيجتك الصحية هي ${score.score} من 100. ${getRiskDescription(score.riskLevel)}
      </p>
    </div>

    <div class="results-grid">
      <div class="result-card">
        <div class="result-card-icon">❤️</div>
        <div class="result-card-value" style="color:${getCategoryColor(score.categories.cardiovascular)}">${score.categories.cardiovascular}</div>
        <div class="result-card-label">صحة القلب</div>
      </div>
      <div class="result-card">
        <div class="result-card-icon">🍽️</div>
        <div class="result-card-value" style="color:${getCategoryColor(score.categories.metabolic)}">${score.categories.metabolic}</div>
        <div class="result-card-label">الأيض والتمثيل</div>
      </div>
      <div class="result-card">
        <div class="result-card-icon">🧠</div>
        <div class="result-card-value" style="color:${getCategoryColor(score.categories.mental)}">${score.categories.mental}</div>
        <div class="result-card-label">الصحة النفسية</div>
      </div>
      <div class="result-card">
        <div class="result-card-icon">🚶</div>
        <div class="result-card-value" style="color:${getCategoryColor(score.categories.lifestyle)}">${score.categories.lifestyle}</div>
        <div class="result-card-label">نمط الحياة</div>
      </div>
    </div>

    <div class="recommendations">
      <h3>📋 توصيات مخصصة لك</h3>
      ${recommendations.map(rec => `
        <div class="recommendation-item">
          <div class="rec-icon">${rec.icon}</div>
          <div class="rec-content">
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="cta-box">
      <h3>🎯 جاهز لتحسين صحتك؟</h3>
      <p>
        انضم إلى برنامج SARA لمدة 90 يوماً - برنامج مخصص لتعديل نمط الحياة<br>
        مع متابعة مستمرة ونتائج قابلة للقياس
      </p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem">
        <a href="https://wa.me/966555056545?text=أود الانضمام لبرنامج SARA بعد التقييم" 
           class="btn-submit" style="text-decoration:none;display:inline-block">
          💬 احجز استشارة مجانية
        </a>
        <a href="b2b-lead-form.html" 
           class="btn-prev" style="text-decoration:none;display:inline-block;background:rgba(255,255,255,0.1);color:#fff;border:2px solid rgba(255,255,255,0.2)">
          اطلب عرض لشركتك ←
        </a>
      </div>
    </div>

    <div style="text-align:center;margin-top:2rem">
      <button onclick="location.reload()" class="btn-prev" style="background:transparent;border:1px solid rgba(255,255,255,0.2)">
        🔄 إعادة التقييم
      </button>
    </div>
  `;
  
  // Animate score circle after a short delay
  setTimeout(() => {
    const circleFill = resultsContainer.querySelector('.score-circle-fill');
    if (circleFill) {
      circleFill.style.strokeDashoffset = circleFill.getAttribute('data-offset');
    }
  }, 100);
  
  // Scroll to top to see results
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Get risk description
function getRiskDescription(riskLevel) {
  const descriptions = {
    low: 'ممتاز! استمر في الحفاظ على نمط حياتك الصحي. نوصي بالفحوصات الدورية.',
    moderate: 'جيد، ولكن هناك مجال للتحسن. برنامج SARA يمكن أن يساعدك في الوصول لمستوى أفضل.',
    high: 'هناك مخاطر صحية تحتاج للاهتمام. نوصي ببرنامج SARA المكثف لتحسين صحتك.',
    critical: 'مخاطر صحية عالية. نوصي بالتواصل الفوري مع فريق SARA لبرنامج مكثف.'
  };
  return descriptions[riskLevel];
}

// Get category color
function getCategoryColor(categoryScore) {
  if (categoryScore >= 80) return '#34D399';
  if (categoryScore >= 60) return '#FBBF24';
  if (categoryScore >= 40) return '#F97316';
  return '#EF4444';
}

// Generate personalized recommendations
function generateRecommendations(data, score) {
  const recs = [];
  
  // Exercise recommendations
  if (data.exercise === 'never' || data.exercise === '1-2') {
    recs.push({
      icon: '🚶',
      title: 'زيادة النشاط البدني',
      description: 'ابدأ بـ 15 دقيقة مشي يومياً، وزد المدة تدريجياً إلى 30 دقيقة. هدفك 10,000 خطوة يومياً.'
    });
  }
  
  // Nutrition recommendations
  if (data.fast_food === '3-5' || data.fast_food === '6+') {
    recs.push({
      icon: '🍽️',
      title: 'تحسين التغذية',
      description: 'قلل الوجبات السريعة تدريجياً. استبدلها بوجبات منزلية صحية. اتبع قاعدة نصف الطبق خضار.'
    });
  }
  
  // BMI recommendations
  const bmi = parseFloat(data.bmi);
  if (bmi >= 25) {
    recs.push({
      icon: '⚖️',
      title: 'إدارة الوزن',
      description: `مؤشر كتلة جسمك ${bmi}. برنامج SARA يساعدك في الوصول لوزن صحي خلال 90 يوماً.`
    });
  }
  
  // Sleep recommendations
  if (data.sleep_hours === 'less5' || data.sleep_hours === '5-6') {
    recs.push({
      icon: '😴',
      title: 'تحسين النوم',
      description: 'استهدف 7-8 ساعات نوم ليلاً. تجنب الشاشات قبل النوم بساعة. حافظ على جدول نوم منتظم.'
    });
  }
  
  // Stress recommendations
  if (data.stress_level === 'high' || data.stress_level === 'very_high') {
    recs.push({
      icon: '🧘',
      title: 'إدارة التوتر',
      description: 'مارس تمارين التنفس 5 دقائق يومياً. خذ فترات راحة منتظمة. مارس الهوايات التي تستمتع بها.'
    });
  }
  
  // Smoking recommendations
  if (data.smoking === 'yes') {
    recs.push({
      icon: '🚭',
      title: 'الإقلاع عن التدخين',
      description: 'التدخين يزيد مخاطر القلب والسرطان. تواصل مع طبيبك لبرنامج إقلاع مناسب.'
    });
  }
  
  // Water recommendations
  if (data.water === 'less1' || data.water === '1-2') {
    recs.push({
      icon: '💧',
      title: 'زيادة شرب الماء',
      description: 'اشرب 2-3 لتر ماء يومياً. احمل زجاجة ماء معك. اشرب قبل كل وجبة.'
    });
  }
  
  // If score is good, add maintenance recommendation
  if (score.score >= 80) {
    recs.push({
      icon: '✅',
      title: 'الحفاظ على العادات الصحية',
      description: 'أداؤك ممتاز! استمر في عاداتك الصحية واحرص على الفحوصات الدورية كل 6 أشهر.'
    });
  }
  
  return recs;
}
