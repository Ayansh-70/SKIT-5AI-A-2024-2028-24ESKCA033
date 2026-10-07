import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 6 Core Essential Entities verified directly from Mongoose models
const entities = [
  {
    id: 'Institute',
    title: 'INSTITUTE',
    collection: 'institutes',
    subtitle: 'Tenant Organization & Campus Authority',
    headerBg: '#1E3A8A', // Deep Navy
    x: 160,
    y: 150,
    w: 640,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: '', name: 'name', type: 'String', desc: 'Official Institute Name' },
      { key: 'UQ', name: 'email', type: 'String', desc: 'Official Domain Email' },
      { key: '', name: 'phone', type: 'String', desc: 'Contact Phone Number' },
      { key: '', name: 'city, state', type: 'String', desc: 'Geographic Campus Location' },
      { key: '', name: 'status', type: 'Enum', desc: 'PENDING | APPROVED | REJECTED' }
    ]
  },
  {
    id: 'User',
    title: 'USER',
    collection: 'users',
    subtitle: 'Core Authentication & RBAC Account',
    headerBg: '#0F766E', // Deep Teal
    x: 1400,
    y: 150,
    w: 640,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Scoping)' },
      { key: 'UQ', name: 'email', type: 'String', desc: 'Unique Login Email' },
      { key: '', name: 'name', type: 'String', desc: 'Registered Full Name' },
      { key: '', name: 'role', type: 'Enum', desc: 'STUDENT | ALUMNI | INSTITUTE_ADMIN' },
      { key: '', name: 'password', type: 'String', desc: 'Bcrypt Hashed (Salt rounds: 10)' },
      { key: '', name: 'status', type: 'Enum', desc: 'ACTIVE | PENDING | BLOCKED' }
    ]
  },
  {
    id: 'StudentProfile',
    title: 'STUDENT_PROFILE',
    collection: 'studentprofiles',
    subtitle: 'Academic Profile & Skill Portfolio',
    headerBg: '#0369A1', // Marine Slate
    x: 160,
    y: 650,
    w: 640,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK/UQ', name: 'user', type: 'ObjectId', desc: 'Ref -> User (Student Role, 1:1)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy)' },
      { key: 'IDX', name: 'rollNumber', type: 'String', desc: 'Institutional Enrollment ID' },
      { key: '', name: 'branch, batch', type: 'String', desc: 'Department & Graduation Year' },
      { key: '', name: 'skills', type: 'Array[String]', desc: 'Technical & Domain Competencies' }
    ]
  },
  {
    id: 'AlumniProfile',
    title: 'ALUMNI_PROFILE',
    collection: 'alumniprofiles',
    subtitle: 'Career Profile & Verified Credentials',
    headerBg: '#3730A3', // Indigo
    x: 1400,
    y: 650,
    w: 640,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK/UQ', name: 'user', type: 'ObjectId', desc: 'Ref -> User (Alumni Role, 1:1)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Alma Mater)' },
      { key: '', name: 'currentCompany, currentRole', type: 'String', desc: 'Current Professional Title' },
      { key: '', name: 'experienceYears', type: 'Number', desc: 'Total Industry Experience' },
      { key: '', name: 'verificationStatus', type: 'Enum', desc: 'PENDING | VERIFIED | REJECTED' },
      { key: 'FK', name: 'verifiedBy', type: 'ObjectId', desc: 'Ref -> User (Institute Admin)' }
    ]
  },
  {
    id: 'ConnectionRequest',
    title: 'CONNECTION_REQUEST',
    collection: 'connectionrequests',
    subtitle: 'Associative Networking Entity (M:N)',
    headerBg: '#581C87', // Dark Purple
    x: 160,
    y: 1150,
    w: 640,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK', name: 'student', type: 'ObjectId', desc: 'Ref -> User (Student Requester)' },
      { key: 'FK', name: 'alumni', type: 'ObjectId', desc: 'Ref -> User (Target Alumni)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Scoping)' },
      { key: '', name: 'status', type: 'Enum', desc: 'PENDING | ACCEPTED | REJECTED' },
      { key: '', name: 'message', type: 'String', desc: 'Introduction Note' }
    ]
  },
  {
    id: 'Opportunity',
    title: 'OPPORTUNITY',
    collection: 'opportunities',
    subtitle: 'Jobs, Internships & Alumni Referrals',
    headerBg: '#065F46', // Deep Emerald
    x: 1400,
    y: 1150,
    w: 640,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK', name: 'postedBy', type: 'ObjectId', desc: 'Ref -> User (Alumni / Admin)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Scoping)' },
      { key: '', name: 'title, company', type: 'String', desc: 'Position & Organization Name' },
      { key: '', name: 'type, mode', type: 'Enum', desc: 'INTERNSHIP / JOB • REMOTE / ONSITE' },
      { key: '', name: 'deadline', type: 'Date', desc: 'Application Closing Date' },
      { key: '', name: 'status', type: 'Enum', desc: 'PENDING | APPROVED | CLOSED' }
    ]
  }
];

// Calculate heights
entities.forEach(ent => {
  const headerHeight = 66;
  const colHeaderHeight = 36;
  const rowHeight = 36;
  const paddingBottom = 16;
  ent.h = headerHeight + colHeaderHeight + (ent.attributes.length * rowHeight) + paddingBottom;
});

// Relationships with CLEAN segmented paths
const relationships = [
  // 1. Institute <--> User (hosts / manages users)
  {
    id: 'rel_inst_user',
    fromCard: '1',
    toCard: '0..N',
    label: 'hosts &amp; manages users (1 : N)',
    labelX: 1100,
    labelY: 290,
    labelW: 250,
    segments: [
      { d: 'M 800 290 L 930 290', arrow: false },
      { d: 'M 1270 290 L 1400 290', arrow: true }
    ]
  },
  // 2. Institute <--> StudentProfile (enrolled in)
  {
    id: 'rel_inst_student',
    fromCard: '1',
    toCard: '0..N',
    label: 'enrolled in institute (1 : N)',
    labelX: 480,
    labelY: 567,
    labelW: 240,
    segments: [
      { d: 'M 480 484 L 480 538', arrow: false },
      { d: 'M 480 596 L 480 650', arrow: true }
    ]
  },
  // 3. User <--> AlumniProfile (1:1 Alumni Profile)
  {
    id: 'rel_user_alumni',
    fromCard: '1',
    toCard: '0..1',
    label: 'has alumni profile (1 : 1)',
    labelX: 1720,
    labelY: 585,
    labelW: 230,
    segments: [
      { d: 'M 1720 520 L 1720 556', arrow: false },
      { d: 'M 1720 614 L 1720 650', arrow: true }
    ]
  },
  // 4. User <--> StudentProfile (1:1 Student Profile)
  {
    id: 'rel_user_student',
    fromCard: '1',
    toCard: '0..1',
    label: 'has student profile (1 : 1)',
    labelX: 1100,
    labelY: 575,
    labelW: 240,
    segments: [
      { d: 'M 1400 420 L 1100 420 L 1100 546', arrow: false },
      { d: 'M 1100 604 L 1100 730 L 800 730', arrow: true }
    ]
  },
  // 5. StudentProfile <--> ConnectionRequest (sends connection)
  {
    id: 'rel_student_connection',
    fromCard: '1',
    toCard: '0..N',
    label: 'sends request as student (1 : N)',
    labelX: 480,
    labelY: 1067,
    labelW: 260,
    segments: [
      { d: 'M 480 984 L 480 1038', arrow: false },
      { d: 'M 480 1096 L 480 1150', arrow: true }
    ]
  },
  // 6. AlumniProfile <--> Opportunity (posts opportunity)
  {
    id: 'rel_alumni_opportunity',
    fromCard: '1',
    toCard: '0..N',
    label: 'posts career opportunity (1 : N)',
    labelX: 1720,
    labelY: 1085,
    labelW: 260,
    segments: [
      { d: 'M 1720 1020 L 1720 1056', arrow: false },
      { d: 'M 1720 1114 L 1720 1150', arrow: true }
    ]
  },
  // 7. AlumniProfile <--> ConnectionRequest (receives connection)
  {
    id: 'rel_alumni_connection',
    fromCard: '1',
    toCard: '0..N',
    label: 'receives &amp; responds to request (1 : N)',
    labelX: 1100,
    labelY: 1050,
    labelW: 300,
    segments: [
      { d: 'M 1400 860 L 1100 860 L 1100 1020', arrow: false },
      { d: 'M 1100 1080 L 1100 1240 L 800 1240', arrow: true }
    ]
  }
];

function generateSimpleSvg() {
  const canvasW = 2200;
  const canvasH = 1680;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasW} ${canvasH}" width="${canvasW}" height="${canvasH}" style="background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <!-- Arrow Marker -->
    <marker id="arrowDark" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1E293B" />
    </marker>
  </defs>

  <!-- Pure White Canvas Background -->
  <rect width="${canvasW}" height="${canvasH}" fill="#FFFFFF"/>

  <!-- ==================== REPORT HEADER ==================== -->
  <g id="headerBanner" transform="translate(160, 45)">
    <rect x="0" y="0" width="1880" height="76" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.6"/>
    <rect x="0" y="0" width="8" height="76" rx="4" fill="#1E3A8A"/>
    <text x="32" y="34" font-size="25" font-weight="800" fill="#0F172A" letter-spacing="-0.3">Entity Relationship Diagram - AlumniConnect</text>
    <text x="32" y="60" font-size="14.5" font-weight="500" fill="#475569">Core Database Schema • Institute-Based Alumni-Student Networking System • B.Tech Project Report Architecture</text>
    
    <rect x="1560" y="16" width="290" height="44" rx="4" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.2"/>
    <text x="1575" y="36" font-size="12" font-weight="700" fill="#1E40AF">VIVA &amp; REPORT READY</text>
    <text x="1575" y="51" font-size="11" font-weight="500" fill="#3B82F6">Essential Entities &amp; Verified Mongoose Schemas</text>
  </g>

  <!-- ==================== RELATIONSHIP LINES & LABELS ==================== -->
  <g id="relationshipLines">
`;

  relationships.forEach(rel => {
    const halfW = rel.labelW / 2;
    svg += `    <!-- Relationship: ${rel.id} -->\n`;
    
    // Draw segmented paths
    rel.segments.forEach(seg => {
      const markerAttr = seg.arrow ? 'marker-end="url(#arrowDark)"' : '';
      svg += `    <path d="${seg.d}" fill="none" stroke="#334155" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" ${markerAttr}/>\n`;
    });

    // Draw label pill (pure white background, solid crisp 2px border, perfectly visible)
    svg += `    <g transform="translate(${rel.labelX}, ${rel.labelY})">
      <rect x="-${halfW}" y="-17" width="${rel.labelW}" height="34" rx="17" fill="#FFFFFF" stroke="#334155" stroke-width="2"/>
      <text x="0" y="5.5" font-size="12.5" font-weight="700" fill="#0F172A" text-anchor="middle">${rel.label}</text>
      <!-- Source Cardinality -->
      <circle cx="-${halfW + 15}" cy="0" r="12" fill="#0F172A"/>
      <text x="-${halfW + 15}" y="4.5" font-size="10.5" font-weight="800" fill="#FFFFFF" text-anchor="middle">${rel.fromCard}</text>
      <!-- Target Cardinality -->
      <circle cx="${halfW + 15}" cy="0" r="12" fill="#1E3A8A"/>
      <text x="${halfW + 15}" y="4.5" font-size="10.5" font-weight="800" fill="#FFFFFF" text-anchor="middle">${rel.toCard}</text>
    </g>\n\n`;
  });

  svg += `  </g>\n\n  <!-- ==================== ENTITY TABLES ==================== -->\n  <g id="entityTables">\n`;

  entities.forEach(ent => {
    const rx = 6;
    svg += `
    <!-- Entity Card: ${ent.id} -->
    <g id="entity_${ent.id}" transform="translate(${ent.x}, ${ent.y})">
      <!-- Container Box -->
      <rect x="0" y="0" width="${ent.w}" height="${ent.h}" rx="${rx}" fill="#FFFFFF" stroke="#334155" stroke-width="2"/>
      
      <!-- Card Title Bar -->
      <path d="M 0 ${rx} Q 0 0 ${rx} 0 L ${ent.w - rx} 0 Q ${ent.w} 0 ${ent.w} ${rx} L ${ent.w} 66 L 0 66 Z" fill="${ent.headerBg}" />
      <text x="22" y="34" font-size="20" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">${ent.title}</text>
      <text x="22" y="54" font-size="12.5" font-weight="500" fill="#E2E8F0" opacity="0.95">${ent.subtitle} • [${ent.collection}]</text>

      <!-- Table Column Headers -->
      <rect x="0" y="66" width="${ent.w}" height="36" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
      <text x="20" y="89" font-size="12" font-weight="700" fill="#334155">KEY</text>
      <text x="95" y="89" font-size="12" font-weight="700" fill="#334155">ATTRIBUTE NAME</text>
      <text x="320" y="89" font-size="12" font-weight="700" fill="#334155">DATA TYPE</text>
      <text x="440" y="89" font-size="12" font-weight="700" fill="#334155">CONSTRAINTS / NOTES</text>

      <!-- Attributes Rows -->
`;

    ent.attributes.forEach((attr, idx) => {
      const rowY = 102 + (idx * 36);
      const isEven = idx % 2 === 0;
      const rowBg = isEven ? '#FFFFFF' : '#F8FAFC';

      svg += `      <g id="row_${ent.id}_${attr.name.replace(/[^a-zA-Z0-9_]/g, '_')}">
        <rect x="0" y="${rowY}" width="${ent.w}" height="36" fill="${rowBg}"/>
        <line x1="0" y1="${rowY + 36}" x2="${ent.w}" y2="${rowY + 36}" stroke="#E2E8F0" stroke-width="1"/>
`;

      // Key Badges
      if (attr.key === 'PK') {
        svg += `        <rect x="16" y="${rowY + 7}" width="32" height="22" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.2"/>
        <text x="32" y="${rowY + 22}" font-size="11" font-weight="800" fill="#92400E" text-anchor="middle">PK</text>\n`;
      } else if (attr.key.includes('FK')) {
        const badgeColor = attr.key.includes('UQ') ? '#EDE9FE' : '#DBEAFE';
        const strokeColor = attr.key.includes('UQ') ? '#7C3AED' : '#2563EB';
        const textColor = attr.key.includes('UQ') ? '#5B21B6' : '#1E40AF';
        const badgeW = attr.key.length > 2 ? 56 : 32;
        svg += `        <rect x="14" y="${rowY + 7}" width="${badgeW}" height="22" rx="4" fill="${badgeColor}" stroke="${strokeColor}" stroke-width="1.2"/>
        <text x="${14 + badgeW / 2}" y="${rowY + 22}" font-size="10.5" font-weight="800" fill="${textColor}" text-anchor="middle">${attr.key}</text>\n`;
      } else if (attr.key === 'UQ') {
        svg += `        <rect x="16" y="${rowY + 7}" width="32" height="22" rx="4" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.2"/>
        <text x="32" y="${rowY + 22}" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">UQ</text>\n`;
      } else if (attr.key === 'IDX') {
        svg += `        <rect x="15" y="${rowY + 7}" width="34" height="22" rx="4" fill="#E2E8F0" stroke="#475569" stroke-width="1.2"/>
        <text x="32" y="${rowY + 22}" font-size="10.5" font-weight="800" fill="#1E293B" text-anchor="middle">IDX</text>\n`;
      }

      // Attribute Name
      const isKey = attr.key !== '';
      const nameColor = isKey ? '#0F172A' : '#1E293B';
      const weight = isKey ? '700' : '600';
      svg += `        <text x="95" y="${rowY + 23}" font-size="14.5" font-weight="${weight}" fill="${nameColor}">${attr.name}</text>\n`;

      // Data Type
      svg += `        <text x="320" y="${rowY + 23}" font-size="13.5" font-weight="600" fill="#0369A1">${attr.type}</text>\n`;

      // Description / Constraints
      svg += `        <text x="440" y="${rowY + 23}" font-size="13" font-weight="500" fill="#475569">${attr.desc}</text>\n`;
      svg += `      </g>\n`;
    });

    svg += `    </g>\n`;
  });

  svg += `  </g>\n\n  <!-- ==================== SUMMARY FOOTER & LEGEND ==================== -->
  <g id="legendFooter" transform="translate(160, 1530)">
    <rect x="0" y="0" width="1880" height="98" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
    
    <text x="24" y="28" font-size="13" font-weight="700" fill="#0F172A">KEY CONSTRAINTS &amp; CARDINALITY SUMMARY:</text>
    <text x="24" y="52" font-size="12" font-weight="500" fill="#334155">• <tspan font-weight="700">1 : N (One-to-Many):</tspan> An Institute hosts many Users, Students, Alumni, and Opportunities.</text>
    <text x="24" y="74" font-size="12" font-weight="500" fill="#334155">• <tspan font-weight="700">1 : 1 (One-to-One):</tspan> Each User account has strictly one StudentProfile or AlumniProfile (enforced by unique index on user_id).</text>

    <text x="780" y="28" font-size="13" font-weight="700" fill="#0F172A">NETWORKING &amp; SECURITY:</text>
    <text x="780" y="52" font-size="12" font-weight="500" fill="#334155">• <tspan font-weight="700">M : N Relationship:</tspan> Mediated by ConnectionRequest associative entity linking Student User &amp; Alumni User.</text>
    <text x="780" y="74" font-size="12" font-weight="500" fill="#334155">• <tspan font-weight="700">Verification Gate:</tspan> AlumniProfile must have verificationStatus = 'VERIFIED' (approved by Admin) for discovery.</text>

    <text x="1560" y="28" font-size="13" font-weight="700" fill="#0F172A">ACADEMIC AUDIT:</text>
    <text x="1560" y="52" font-size="12" font-weight="500" fill="#475569">MERN Stack Architecture</text>
    <text x="1560" y="74" font-size="12" font-weight="500" fill="#475569">B.Tech Project Report Specification</text>
  </g>
</svg>`;

  return svg;
}

// Write the SVG file
const svgContent = generateSimpleSvg();
const svgPath = path.join(__dirname, 'er_diagram_simple.svg');
fs.writeFileSync(svgPath, svgContent, 'utf8');
console.log(`Simplified SVG successfully written to: ${svgPath}`);

// Also copy SVG to root
const rootSvgPath = path.join(__dirname, '../../er_diagram_simple.svg');
fs.writeFileSync(rootSvgPath, svgContent, 'utf8');
console.log(`Simplified SVG successfully copied to root: ${rootSvgPath}`);

// Write HTML wrapper
const htmlPath = path.join(__dirname, 'render_simple.html');
const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Simplified ER Diagram - AlumniConnect</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #FFFFFF; display: flex; justify-content: center; align-items: center; }
    svg { display: block; width: 2200px; height: 1680px; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log(`HTML wrapper successfully written to: ${htmlPath}`);

// Automatically render PNG directly via Edge headless
const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const rootPng = path.resolve(__dirname, '../../er_diagram_simple.png');
const docsPng = path.resolve(__dirname, 'er_diagram_simple.png');
const tempProfile = path.resolve(__dirname, 'temp_edge_profile_' + Date.now());

console.log('Rendering high-resolution PNG with Edge headless...');
execFileSync(edgeExe, [
  '--headless=new',
  '--user-data-dir=' + tempProfile,
  '--screenshot=' + rootPng,
  '--window-size=2200,1680',
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
console.log('Done!');
