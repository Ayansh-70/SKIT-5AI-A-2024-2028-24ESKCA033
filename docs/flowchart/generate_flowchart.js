import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSimpleFlowchartSvg() {
  const width = 1240;
  const height = 1560;
  const cx = 600; // Center axis

  // 3 symmetric role columns
  const col1_cx = 230;  // Student
  const col2_cx = 600;  // Alumni
  const col3_cx = 970;  // Institute Admin

  const card_w = 320;
  const card_h = 220;
  const card_top = 646;
  const card_bot = card_top + card_h; // 866

  const loop_x = 1175; // Right-margin return loop

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      .title { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 30px; font-weight: 800; fill: #0F172A; }
      .subtitle { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; font-weight: 500; fill: #475569; }
      .term-text { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 20px; font-weight: 800; fill: #0F172A; letter-spacing: 1px; }
      .box-title { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 19px; font-weight: 700; fill: #0F172A; }
      .box-desc { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; font-weight: 500; fill: #475569; }
      .box-desc-bold { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; font-weight: 600; fill: #1E3A8A; }
      .diamond-title { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 18px; font-weight: 800; fill: #78350F; }
      .diamond-desc { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 600; fill: #92400E; }
      .role-hdr { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 17px; font-weight: 800; fill: #FFFFFF; letter-spacing: 0.5px; }
      .role-dash { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 15px; font-weight: 700; }
      .role-item { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 13.5px; font-weight: 500; fill: #1E293B; }
      .edge-label { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; font-weight: 800; }
      .stage-pill { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 11.5px; font-weight: 800; letter-spacing: 0.5px; }
    </style>

    <!-- Markers -->
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#334155" />
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#DC2626" />
    </marker>

    <!-- Clean Shadow Filter -->
    <filter id="boxShadow" x="-3%" y="-4%" width="106%" height="110%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0F172A" flood-opacity="0.05"/>
    </filter>
  </defs>

  <!-- Clean Canvas -->
  <rect width="${width}" height="${height}" fill="#FFFFFF"/>

  <!-- ==================== HEADER ==================== -->
  <g id="header-block">
    <text x="${cx}" y="52" text-anchor="middle" class="title">AlumniConnect — System Workflow Flowchart</text>
    <text x="${cx}" y="80" text-anchor="middle" class="subtitle">End-to-End Execution Flow: Authentication, Role-Based Access Control, and Database Operations</text>
    <line x1="80" y1="98" x2="1140" y2="98" stroke="#E2E8F0" stroke-width="1.8" />
  </g>

  <!-- ==================== 1. START ==================== -->
  <g id="node-start" filter="url(#boxShadow)">
    <rect x="${cx - 90}" y="118" width="180" height="46" rx="23" fill="#F8FAFC" stroke="#334155" stroke-width="2.2"/>
    <text x="${cx}" y="147" text-anchor="middle" class="term-text">START</text>
  </g>

  <!-- Arrow: Start -> Open App -->
  <line x1="${cx}" y1="164" x2="${cx}" y2="200" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 2. OPEN APPLICATION ==================== -->
  <g id="node-open-app" filter="url(#boxShadow)">
    <rect x="${cx - 260}" y="202" width="520" height="66" rx="8" fill="#FFFFFF" stroke="#475569" stroke-width="1.8"/>
    <text x="${cx}" y="230" text-anchor="middle" class="box-title">Open AlumniConnect Web Application</text>
    <text x="${cx}" y="253" text-anchor="middle" class="box-desc">Single Page Application (React 18 + Vite + Tailwind CSS)</text>
  </g>

  <!-- Arrow: Open App -> Login/Register -->
  <line x1="${cx}" y1="268" x2="${cx}" y2="306" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 3. LOGIN / REGISTER ==================== -->
  <g id="node-portal" filter="url(#boxShadow)">
    <rect x="${cx - 290}" y="308" width="580" height="68" rx="8" fill="#F8FAFC" stroke="#2563EB" stroke-width="1.8"/>
    <text x="${cx}" y="336" text-anchor="middle" class="box-title" fill="#1E3A8A">User Login / Registration Portal</text>
    <text x="${cx}" y="360" text-anchor="middle" class="box-desc-bold">User Login (Email &amp; Password)  |  New Institute Registration Request</text>
  </g>

  <!-- Arrow: Login/Register -> Verification -->
  <line x1="${cx}" y1="376" x2="${cx}" y2="414" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 4. AUTHENTICATION & VERIFICATION ==================== -->
  <g id="node-auth-verify" filter="url(#boxShadow)">
    <rect x="${cx - 310}" y="416" width="620" height="70" rx="8" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="1.8"/>
    <text x="${cx}" y="444" text-anchor="middle" class="box-title" fill="#1E3A8A">Authentication &amp; Token Verification</text>
    <text x="${cx}" y="468" text-anchor="middle" class="box-desc" fill="#1E40AF">Bcrypt Password Verification  •  JWT Token Generation  •  Account Status: ACTIVE</text>
  </g>

  <!-- Arrow: Verification -> Role Diamond -->
  <line x1="${cx}" y1="486" x2="${cx}" y2="520" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 5. IDENTIFY ROLE (DECISION DIAMOND) ==================== -->
  <g id="node-role-diamond" filter="url(#boxShadow)">
    <polygon points="${cx},522 ${cx + 170},568 ${cx},614 ${cx - 170},568" fill="#FEF3C7" stroke="#D97706" stroke-width="2.2"/>
    <text x="${cx}" y="562" text-anchor="middle" class="diamond-title">Identify User Role</text>
    <text x="${cx}" y="583" text-anchor="middle" class="diamond-desc">Role-Based Access Control (RBAC)</text>
  </g>

  <!-- ==================== 3-ROLE BRANCHING BUS ==================== -->
  <!-- Stem from diamond to bus -->
  <line x1="${cx}" y1="614" x2="${cx}" y2="638" stroke="#334155" stroke-width="2.2"/>
  <!-- Horizontal distribution bus spanning 3 columns -->
  <line x1="${col1_cx}" y1="638" x2="${col3_cx}" y2="638" stroke="#334155" stroke-width="2.2"/>

  <!-- Drop arrows into 3 cards -->
  <line x1="${col1_cx}" y1="638" x2="${col1_cx}" y2="${card_top - 2}" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>
  <line x1="${col2_cx}" y1="638" x2="${col2_cx}" y2="${card_top - 2}" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>
  <line x1="${col3_cx}" y1="638" x2="${col3_cx}" y2="${card_top - 2}" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 6. ROLE CARDS (3 PRIMARY ROLES) ==================== -->

  <!-- CARD 1: STUDENT -->
  <g id="card-student" filter="url(#boxShadow)">
    <rect x="${col1_cx - card_w/2}" y="${card_top}" width="${card_w}" height="${card_h}" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>
    <path d="M ${col1_cx - card_w/2} ${card_top + 8} A 8 8 0 0 1 ${col1_cx - card_w/2 + 8} ${card_top} L ${col1_cx + card_w/2 - 8} ${card_top} A 8 8 0 0 1 ${col1_cx + card_w/2} ${card_top + 8} L ${col1_cx + card_w/2} ${card_top + 42} L ${col1_cx - card_w/2} ${card_top + 42} Z" fill="#2563EB" />
    <text x="${col1_cx}" y="${card_top + 28}" text-anchor="middle" class="role-hdr">STUDENT</text>
    
    <rect x="${col1_cx - 120}" y="${card_top + 52}" width="240" height="26" rx="5" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
    <text x="${col1_cx}" y="${card_top + 70}" text-anchor="middle" class="role-dash" fill="#1E40AF">Student Dashboard</text>
    
    <line x1="${col1_cx - 135}" y1="${card_top + 88}" x2="${col1_cx + 135}" y2="${card_top + 88}" stroke="#E2E8F0" stroke-width="1"/>

    <text x="${col1_cx - 130}" y="${card_top + 118}" class="role-item">• Search Verified Alumni Directory</text>
    <text x="${col1_cx - 130}" y="${card_top + 150}" class="role-item">• Send Mentorship &amp; Guidance Requests</text>
    <text x="${col1_cx - 130}" y="${card_top + 182}" class="role-item">• Browse Approved Jobs &amp; Campus Events</text>
  </g>

  <!-- CARD 2: ALUMNI -->
  <g id="card-alumni" filter="url(#boxShadow)">
    <rect x="${col2_cx - card_w/2}" y="${card_top}" width="${card_w}" height="${card_h}" rx="8" fill="#FFFFFF" stroke="#0D9488" stroke-width="2"/>
    <path d="M ${col2_cx - card_w/2} ${card_top + 8} A 8 8 0 0 1 ${col2_cx - card_w/2 + 8} ${card_top} L ${col2_cx + card_w/2 - 8} ${card_top} A 8 8 0 0 1 ${col2_cx + card_w/2} ${card_top + 8} L ${col2_cx + card_w/2} ${card_top + 42} L ${col2_cx - card_w/2} ${card_top + 42} Z" fill="#0D9488" />
    <text x="${col2_cx}" y="${card_top + 28}" text-anchor="middle" class="role-hdr">ALUMNI</text>
    
    <rect x="${col2_cx - 120}" y="${card_top + 52}" width="240" height="26" rx="5" fill="#F0FDFA" stroke="#99F6E4" stroke-width="1"/>
    <text x="${col2_cx}" y="${card_top + 70}" text-anchor="middle" class="role-dash" fill="#115E59">Alumni Dashboard</text>
    
    <line x1="${col2_cx - 135}" y1="${card_top + 88}" x2="${col2_cx + 135}" y2="${card_top + 88}" stroke="#E2E8F0" stroke-width="1"/>

    <text x="${col2_cx - 130}" y="${card_top + 118}" class="role-item">• Complete &amp; Update Verified Profile</text>
    <text x="${col2_cx - 130}" y="${card_top + 150}" class="role-item">• Accept Guidance &amp; Referral Requests</text>
    <text x="${col2_cx - 130}" y="${card_top + 182}" class="role-item">• Post Job &amp; Internship Opportunities</text>
  </g>

  <!-- CARD 3: INSTITUTE ADMIN -->
  <g id="card-admin" filter="url(#boxShadow)">
    <rect x="${col3_cx - card_w/2}" y="${card_top}" width="${card_w}" height="${card_h}" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="2"/>
    <path d="M ${col3_cx - card_w/2} ${card_top + 8} A 8 8 0 0 1 ${col3_cx - card_w/2 + 8} ${card_top} L ${col3_cx + card_w/2 - 8} ${card_top} A 8 8 0 0 1 ${col3_cx + card_w/2} ${card_top + 8} L ${col3_cx + card_w/2} ${card_top + 42} L ${col3_cx - card_w/2} ${card_top + 42} Z" fill="#7C3AED" />
    <text x="${col3_cx}" y="${card_top + 28}" text-anchor="middle" class="role-hdr">INSTITUTE ADMIN</text>
    
    <rect x="${col3_cx - 120}" y="${card_top + 52}" width="240" height="26" rx="5" fill="#FAF5FF" stroke="#DDD6FE" stroke-width="1"/>
    <text x="${col3_cx}" y="${card_top + 70}" text-anchor="middle" class="role-dash" fill="#581C87">Admin Dashboard</text>
    
    <line x1="${col3_cx - 135}" y1="${card_top + 88}" x2="${col3_cx + 135}" y2="${card_top + 88}" stroke="#E2E8F0" stroke-width="1"/>

    <text x="${col3_cx - 130}" y="${card_top + 118}" class="role-item">• Manage Student &amp; Alumni Accounts</text>
    <text x="${col3_cx - 130}" y="${card_top + 150}" class="role-item">• Verify Pending Alumni Registrations</text>
    <text x="${col3_cx - 130}" y="${card_top + 182}" class="role-item">• Approve Opportunities &amp; Campus Events</text>
  </g>

  <!-- ==================== CONVERGENCE BUS ==================== -->
  <line x1="${col1_cx}" y1="${card_bot}" x2="${col1_cx}" y2="${card_bot + 30}" stroke="#334155" stroke-width="2.2"/>
  <line x1="${col2_cx}" y1="${card_bot}" x2="${col2_cx}" y2="${card_bot + 30}" stroke="#334155" stroke-width="2.2"/>
  <line x1="${col3_cx}" y1="${card_bot}" x2="${col3_cx}" y2="${card_bot + 30}" stroke="#334155" stroke-width="2.2"/>
  
  <line x1="${col1_cx}" y1="${card_bot + 30}" x2="${col3_cx}" y2="${card_bot + 30}" stroke="#334155" stroke-width="2.2"/>
  <line x1="${cx}" y1="${card_bot + 30}" x2="${cx}" y2="${card_bot + 68}" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 7. BACKEND REST API ==================== -->
  <g id="node-api" filter="url(#boxShadow)">
    <rect x="${cx - 310}" y="${card_bot + 70}" width="620" height="70" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.8"/>
    <text x="${cx}" y="${card_bot + 98}" text-anchor="middle" class="box-title" fill="#14532D">Backend REST API &amp; Security Middleware</text>
    <text x="${cx}" y="${card_bot + 122}" text-anchor="middle" class="box-desc" fill="#15803D">Express Router  •  JWT Auth Guard (protect)  •  Institute Data Isolation</text>
  </g>

  <!-- Arrow: REST API -> MongoDB -->
  <line x1="${cx}" y1="${card_bot + 140}" x2="${cx}" y2="${card_bot + 176}" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 8. MONGODB DATABASE ==================== -->
  <g id="node-db" filter="url(#boxShadow)">
    <rect x="${cx - 310}" y="${card_bot + 178}" width="620" height="70" rx="8" fill="#F0FDFA" stroke="#0D9488" stroke-width="1.8"/>
    <text x="${cx}" y="${card_bot + 206}" text-anchor="middle" class="box-title" fill="#115E59">MongoDB Database Operations (Mongoose ODM)</text>
    <text x="${cx}" y="${card_bot + 230}" text-anchor="middle" class="box-desc" fill="#0F766E">Atomic CRUD Operations on Users, Profiles, Requests &amp; Opportunities</text>
  </g>

  <!-- Arrow: MongoDB -> Response & UI -->
  <line x1="${cx}" y1="${card_bot + 248}" x2="${cx}" y2="${card_bot + 284}" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 9. RESPONSE & UI UPDATE ==================== -->
  <g id="node-response-ui" filter="url(#boxShadow)">
    <rect x="${cx - 310}" y="${card_bot + 286}" width="620" height="70" rx="8" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.8"/>
    <text x="${cx}" y="${card_bot + 314}" text-anchor="middle" class="box-title" fill="#1E3A8A">Standard JSON Response &amp; UI Synchronization</text>
    <text x="${cx}" y="${card_bot + 338}" text-anchor="middle" class="box-desc" fill="#1D4ED8">React State &amp; AuthContext Updated  •  Dynamic View Re-rendered</text>
  </g>

  <!-- Arrow: UI -> Decision Diamond -->
  <line x1="${cx}" y1="${card_bot + 356}" x2="${cx}" y2="${card_bot + 392}" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 10. DECISION: CONTINUE SESSION? ==================== -->
  <g id="node-session-diamond" filter="url(#boxShadow)">
    <polygon points="${cx},${card_bot + 394} ${cx + 170},${card_bot + 438} ${cx},${card_bot + 482} ${cx - 170},${card_bot + 438}" fill="#FEF3C7" stroke="#D97706" stroke-width="2.2"/>
    <text x="${cx}" y="${card_bot + 432}" text-anchor="middle" class="diamond-title">Continue Session?</text>
    <text x="${cx}" y="${card_bot + 453}" text-anchor="middle" class="diamond-desc">Next Action or Logout</text>
  </g>

  <!-- ==================== LOOPBACK PATH (YES) ==================== -->
  <path d="M ${cx + 170} ${card_bot + 438} L ${loop_x} ${card_bot + 438} L ${loop_x} 568 L ${cx + 172} 568" fill="none" stroke="#059669" stroke-width="2.6" stroke-dasharray="7 5" marker-end="url(#arrow-green)"/>
  
  <rect x="${cx + 185}" y="${card_bot + 418}" width="60" height="24" rx="5" fill="#ECFDF5" stroke="#10B981" stroke-width="1.2"/>
  <text x="${cx + 215}" y="${card_bot + 435}" text-anchor="middle" class="edge-label" fill="#047857">YES</text>

  <!-- Midpoint label badge -->
  <g transform="translate(${loop_x}, ${card_top + 160})">
    <rect x="-65" y="-18" width="130" height="36" rx="6" fill="#ECFDF5" stroke="#059669" stroke-width="1.4"/>
    <text x="0" y="-2" text-anchor="middle" font-size="12" font-weight="800" fill="#047857">NEXT ACTION</text>
    <text x="0" y="13" text-anchor="middle" font-size="11" font-weight="600" fill="#065F46">Loop to Dashboard</text>
  </g>

  <!-- ==================== LOGOUT PATH (NO) ==================== -->
  <line x1="${cx}" y1="${card_bot + 482}" x2="${cx}" y2="${card_bot + 534}" stroke="#DC2626" stroke-width="2.2" marker-end="url(#arrow-red)"/>
  <rect x="${cx + 12}" y="${card_bot + 494}" width="110" height="24" rx="5" fill="#FEF2F2" stroke="#EF4444" stroke-width="1.2"/>
  <text x="${cx + 67}" y="${card_bot + 511}" text-anchor="middle" class="edge-label" fill="#DC2626">NO (Logout)</text>

  <!-- ==================== 11. LOGOUT & TERMINATION ==================== -->
  <g id="node-logout" filter="url(#boxShadow)">
    <rect x="${cx - 240}" y="${card_bot + 536}" width="480" height="62" rx="8" fill="#FEF2F2" stroke="#DC2626" stroke-width="1.8"/>
    <text x="${cx}" y="${card_bot + 562}" text-anchor="middle" class="box-title" fill="#991B1B">User Logout &amp; Session Termination</text>
    <text x="${cx}" y="${card_bot + 584}" text-anchor="middle" class="box-desc" fill="#B91C1C">JWT Token Cleared  •  Redirected to Landing Page</text>
  </g>

  <!-- Arrow: Logout -> End -->
  <line x1="${cx}" y1="${card_bot + 598}" x2="${cx}" y2="${card_bot + 630}" stroke="#334155" stroke-width="2.2" marker-end="url(#arrow)"/>

  <!-- ==================== 12. END ==================== -->
  <g id="node-end" filter="url(#boxShadow)">
    <rect x="${cx - 90}" y="${card_bot + 632}" width="180" height="46" rx="23" fill="#F8FAFC" stroke="#334155" stroke-width="2.2"/>
    <text x="${cx}" y="${card_bot + 661}" text-anchor="middle" class="term-text">END</text>
  </g>

</svg>`;
}

// Generate files
const svgContent = generateSimpleFlowchartSvg();

// 1. Write docs/flowchart/flowchart.svg
const docsSvgPath = path.join(__dirname, 'flowchart.svg');
fs.writeFileSync(docsSvgPath, svgContent, 'utf8');
console.log(`Saved SVG to ${docsSvgPath}`);

// 2. Write root flowchart.svg
const rootSvgPath = path.resolve(__dirname, '../../flowchart.svg');
fs.writeFileSync(rootSvgPath, svgContent, 'utf8');
console.log(`Saved SVG to ${rootSvgPath}`);

// 3. Write HTML wrapper for Edge rendering
const htmlPath = path.join(__dirname, 'render_flowchart.html');
const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AlumniConnect Flowchart</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #FFFFFF; display: flex; justify-content: center; align-items: center; }
    svg { display: block; width: 1240px; height: 1560px; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

// 4. Render PNG via Microsoft Edge headless
const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const rootPng = path.resolve(__dirname, '../../flowchart.png');
const docsPng = path.resolve(__dirname, 'flowchart.png');
const tempProfile = path.resolve(__dirname, 'temp_edge_profile_' + Date.now());

console.log('Rendering high-resolution PNG using Edge headless...');
execFileSync(edgeExe, [
  '--headless=new',
  '--user-data-dir=' + tempProfile,
  '--screenshot=' + rootPng,
  '--window-size=1240,1560',
  '--hide-scrollbars',
  '--disable-gpu',
  'file:///' + htmlPath.replace(/\\/g, '/')
]);

fs.copyFileSync(rootPng, docsPng);
console.log(`PNG successfully written to: ${rootPng}`);
console.log(`PNG successfully copied to: ${docsPng}`);

// Cleanup temp profile
try {
  fs.rmSync(tempProfile, { recursive: true, force: true });
} catch (e) {}

console.log('Flowchart generation completed successfully!');
