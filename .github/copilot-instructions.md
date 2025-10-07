<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# HTTP Attack Detection System - Copilot Instructions

## Project Overview
This is a web-based demonstration of an HTTP-based attack detection system that uses a hybrid multi-layer architecture combining rule-based detection and machine learning for identifying various types of URL-based cyber attacks.

## Architecture
- **Frontend-only demo:** Pure HTML, CSS, and JavaScript
- **No backend required:** All functionality is simulated in the browser
- **Visualization-focused:** Interactive workflow diagrams and analytics dashboards

## Key Components

### 1. Detection System
- Rule-Based Engine (Layer 1): Fast path pattern matching
- ML Detection Engine (Layer 2): Random Forest Classifier simulation
- Hybrid scoring system combining both layers
- Support for 11+ attack types

### 2. User Interface
- Home: Overview and attack type showcase
- Workflow: Animated system architecture visualization
- Demo: Live detection simulation with PCAP/URL input
- Dashboard: Analytics with Chart.js visualizations

## Coding Conventions

### HTML
- Semantic HTML5 elements
- Accessible markup (ARIA labels where needed)
- BEM-like class naming for components
- Data attributes for JavaScript selectors

### CSS
- CSS custom properties (variables) for theming
- Mobile-first responsive design
- Flexbox and Grid for layouts
- Smooth transitions and animations
- Dark theme with gradients

### JavaScript
- ES6+ features (arrow functions, template literals, etc.)
- Modular function organization
- Event delegation where appropriate
- Async/await for simulated operations
- Chart.js for data visualization

## Code Style
- 4-space indentation
- Single quotes for strings
- Semicolons required
- Descriptive variable and function names
- Comments for complex logic
- JSDoc for public functions

## Attack Types Supported
1. SQL Injection (multiple variants)
2. Cross-Site Scripting (XSS)
3. Directory Traversal
4. Command Injection
5. Server-Side Request Forgery (SSRF)
6. Local/Remote File Inclusion (LFI/RFI)
7. Brute Force / Credential Stuffing
8. HTTP Parameter Pollution
9. XML External Entity (XXE) Injection
10. Web Shell Uploads
11. Typosquatting / URL Spoofing

## Design Principles
- **Performance:** Lightweight, no heavy dependencies
- **Usability:** Intuitive navigation and clear feedback
- **Visual Appeal:** Modern, animated, professional UI
- **Responsiveness:** Works on desktop, tablet, and mobile
- **Accessibility:** Keyboard navigation and screen reader support

## When Adding Features
- Keep the demo nature in mind (simulated data)
- Maintain consistency with existing UI patterns
- Add animations for visual feedback
- Update README.md with new features
- Ensure responsive design is maintained
- Add toast notifications for user actions

## Testing Considerations
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify responsive breakpoints
- Check animation performance
- Validate CSV/JSON export functionality
- Ensure modal and navigation work correctly

## Future Backend Integration Notes
When converting to production:
- Replace sample data with API calls
- Implement actual PCAP parsing (scapy/pyshark)
- Connect to real ML models (scikit-learn)
- Set up time-series database (InfluxDB/TimescaleDB)
- Add authentication and authorization
- Implement WebSocket for real-time updates
