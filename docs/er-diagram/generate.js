import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data structure of all 10 verified models directly from the codebase
const entities = [
  {
    id: 'Institute',
    title: 'INSTITUTE',
    collection: 'institutes',
    category: 'Tenant Core & Accreditation',
    headerColor: '#1E3A8A', // Navy Blue
    x: 100,
    y: 160,
    w: 660,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: '', name: 'name', type: 'String', desc: 'Required, Trim, Institute Name' },
      { key: '', name: 'type', type: 'String', desc: 'University, Autonomous College, etc.' },
      { key: 'UQ', name: 'email', type: 'String', desc: 'Required, Unique, Official Institute Email' },
      { key: '', name: 'phone', type: 'String', desc: 'Required, Official Contact Number' },
      { key: '', name: 'website', type: 'String', desc: 'Official Website URL' },
      { key: '', name: 'address', type: 'String', desc: 'Required, Physical Campus Address' },
      { key: '', name: 'city / state / country', type: 'String', desc: 'Required Geographical Attributes' },
      { key: '', name: 'description', type: 'String', desc: 'Required, Institute Mission & Profile' },
      { key: '', name: 'status', type: 'Enum', desc: 'PENDING | APPROVED | REJECTED' },
      { key: '', name: 'rejectionReason', type: 'String', desc: 'Optional Super Admin Justification' },
      { key: 'FK', name: 'approvedBy', type: 'ObjectId', desc: 'Ref -> User (Super Admin ID)' },
      { key: 'FK', name: 'reviewedBy', type: 'ObjectId', desc: 'Ref -> User (Super Admin ID)' },
      { key: '', name: 'approvedAt', type: 'Date', desc: 'Platform Onboarding Timestamp' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' }
    ]
  },
  {
    id: 'User',
    title: 'USER',
    collection: 'users',
    category: 'Authentication & RBAC Identity',
    headerColor: '#0F766E', // Deep Teal
    x: 1100,
    y: 160,
    w: 700,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: '', name: 'name', type: 'String', desc: 'Required, Full Registered Name' },
      { key: 'UQ', name: 'email', type: 'String', desc: 'Required, Unique, Lowercase User Email' },
      { key: '', name: 'password', type: 'String', desc: 'Required, Bcrypt Hashed (select: false)' },
      { key: '', name: 'role', type: 'Enum', desc: 'SUPER_ADMIN | INSTITUTE_ADMIN | STUDENT | ALUMNI' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Null for SUPER_ADMIN)' },
      { key: '', name: 'designation', type: 'String', desc: 'Staff Title / Academic Position' },
      { key: '', name: 'status', type: 'Enum', desc: 'ACTIVE | INACTIVE | PENDING | BLOCKED | SUSPENDED' },
      { key: '', name: 'mustChangePassword', type: 'Boolean', desc: 'First-time Login Force Flag' },
      { key: '', name: 'resetPasswordToken', type: 'String', desc: 'SHA-256 Reset Token String' },
      { key: '', name: 'resetPasswordExpires', type: 'Date', desc: 'Reset Token Lifetime Expiry' },
      { key: '', name: 'emailVerified', type: 'Boolean', desc: 'Email Verification Status Flag' },
      { key: '', name: 'emailVerificationToken', type: 'String', desc: 'Verification Token Hash' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' }
    ]
  },
  {
    id: 'StudentProfile',
    title: 'STUDENT_PROFILE',
    collection: 'studentprofiles',
    category: 'Student Academic Records',
    headerColor: '#0369A1', // Marine Sky
    x: 100,
    y: 720,
    w: 660,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK/UQ', name: 'user', type: 'ObjectId', desc: 'Ref -> User (Student Role, 1:1 Unique)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Reference)' },
      { key: '', name: 'branch', type: 'String', desc: 'Required (e.g. CSE, IT, MECH)' },
      { key: '', name: 'batch', type: 'String', desc: 'Required Academic Batch (e.g. 2022-2026)' },
      { key: '', name: 'semester', type: 'String', desc: 'Required Current Semester' },
      { key: 'IDX', name: 'rollNumber', type: 'String', desc: 'Compound Unique with institute' },
      { key: '', name: 'skills / interests', type: 'Array[String]', desc: 'Technical Competencies & Interests' },
      { key: '', name: 'careerGoals', type: 'String', desc: 'Aspirations & Mentorship Targets' },
      { key: '', name: 'bio / location', type: 'String', desc: 'Personal Summary & Current City' },
      { key: '', name: 'linkedInUrl / githubUrl', type: 'String', desc: 'Professional Social Profiles' },
      { key: '', name: 'portfolioUrl', type: 'String', desc: 'Personal Web / Project Portfolio' },
      { key: '', name: 'profileCompleted', type: 'Boolean', desc: 'Onboarding Completion Flag' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' }
    ]
  },
  {
    id: 'AlumniProfile',
    title: 'ALUMNI_PROFILE',
    collection: 'alumniprofiles',
    category: 'Alumni Career & Verification',
    headerColor: '#4338CA', // Indigo
    x: 1100,
    y: 720,
    w: 700,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK/UQ', name: 'user', type: 'ObjectId', desc: 'Ref -> User (Alumni Role, 1:1 Unique)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Alma Mater Reference)' },
      { key: '', name: 'branch / batch', type: 'String', desc: 'Graduation Discipline & Passing Year' },
      { key: '', name: 'currentCompany', type: 'String', desc: 'Required Current Employer' },
      { key: '', name: 'currentRole', type: 'String', desc: 'Required Professional Title/Designation' },
      { key: '', name: 'experienceYears', type: 'Number', desc: 'Required Industry Experience (Min: 0)' },
      { key: '', name: 'skills / domain', type: 'Array / String', desc: 'Industry Skill Tags & Specialization' },
      { key: '', name: 'location', type: 'String', desc: 'Current Employment City / Country' },
      { key: '', name: 'linkedInUrl / githubUrl', type: 'String', desc: 'Verified External Links' },
      { key: '', name: 'canProvideReferral', type: 'Boolean', desc: 'Willingness to Refer Institute Students' },
      { key: '', name: 'canMentor', type: 'Boolean', desc: 'Willingness to Provide Career Mentorship' },
      { key: '', name: 'verificationStatus', type: 'Enum', desc: 'PENDING | VERIFIED | REJECTED' },
      { key: '', name: 'verificationReason', type: 'String', desc: 'Admin Feedback / Review Remark' },
      { key: 'FK', name: 'verifiedBy', type: 'ObjectId', desc: 'Ref -> User (Institute Admin)' },
      { key: '', name: 'verifiedAt', type: 'Date', desc: 'Official Verification Timestamp' },
      { key: '', name: 'profileCompleted', type: 'Boolean', desc: 'Profile Completion Flag' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' }
    ]
  },
  {
    id: 'ConnectionRequest',
    title: 'CONNECTION_REQUEST',
    collection: 'connectionrequests',
    category: 'Student-Alumni Networking',
    headerColor: '#6D28D9', // Deep Purple
    x: 2120,
    y: 160,
    w: 680,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK/IDX', name: 'student', type: 'ObjectId', desc: 'Ref -> User (Student Requester)' },
      { key: 'FK/IDX', name: 'alumni', type: 'ObjectId', desc: 'Ref -> User (Target Alumni)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Isolation)' },
      { key: '', name: 'status', type: 'Enum', desc: 'PENDING | ACCEPTED | REJECTED' },
      { key: '', name: 'message', type: 'String', desc: 'Introductory Student Request Note' },
      { key: '', name: 'respondedAt', type: 'Date', desc: 'Accept / Reject Decision Timestamp' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' },
      { key: 'UQ', name: '[student, alumni]', type: 'Composite Index', desc: 'Guarantees strictly 1 request pair' }
    ]
  },
  {
    id: 'GuidanceRequest',
    title: 'GUIDANCE_REQUEST',
    collection: 'guidancerequests',
    category: 'Mentorship & Referral Lifecycle',
    headerColor: '#7C3AED', // Violet
    x: 2120,
    y: 530,
    w: 680,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK', name: 'student', type: 'ObjectId', desc: 'Ref -> User (Student Applicant)' },
      { key: 'FK', name: 'alumni', type: 'ObjectId', desc: 'Ref -> User (Alumni Mentor/Referrer)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Scoping)' },
      { key: '', name: 'type', type: 'Enum', desc: 'MENTORSHIP | REFERRAL | INTERNSHIP_HELP | JOB_GUIDANCE | PROJECT_GUIDANCE | HIGHER_STUDIES | GENERAL_CAREER_ADVICE' },
      { key: '', name: 'title', type: 'String', desc: 'Required Inquiry Headline' },
      { key: '', name: 'message', type: 'String', desc: 'Required Comprehensive Query Details' },
      { key: '', name: 'status', type: 'Enum', desc: 'PENDING | ACCEPTED | REJECTED | COMPLETED | CANCELLED' },
      { key: '', name: 'responseMessage', type: 'String', desc: 'Alumni Advice / Referral Feedback' },
      { key: '', name: 'respondedAt / completedAt', type: 'Date', desc: 'Lifecycle Milestone Timestamps' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' }
    ]
  },
  {
    id: 'Opportunity',
    title: 'OPPORTUNITY',
    collection: 'opportunities',
    category: 'Jobs, Internships & Referrals',
    headerColor: '#047857', // Emerald Green
    x: 2120,
    y: 990,
    w: 680,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK', name: 'postedBy', type: 'ObjectId', desc: 'Ref -> User (Alumni or Admin Author)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Scoping)' },
      { key: 'FK', name: 'approvedBy', type: 'ObjectId', desc: 'Ref -> User (Admin Moderator)' },
      { key: '', name: 'title / company / role', type: 'String', desc: 'Required Job / Opening Identifiers' },
      { key: '', name: 'description', type: 'String', desc: 'Required Role Overview & Responsibilities' },
      { key: '', name: 'type', type: 'Enum', desc: 'INTERNSHIP | JOB | REFERRAL | HACKATHON | SCHOLARSHIP | PROJECT | HIGHER_STUDIES | OTHER' },
      { key: '', name: 'location / mode', type: 'String/Enum', desc: 'REMOTE | ONSITE | HYBRID' },
      { key: '', name: 'eligibility', type: 'String', desc: 'Academic Criteria & Eligible Batches' },
      { key: '', name: 'skillsRequired', type: 'Array[String]', desc: 'Required Skill Prerequisites' },
      { key: '', name: 'applicationLink', type: 'String', desc: 'External Portal / Referral Link' },
      { key: '', name: 'deadline', type: 'Date', desc: 'Application Cutoff Timestamp' },
      { key: '', name: 'status', type: 'Enum', desc: 'PENDING | APPROVED | REJECTED | CLOSED' },
      { key: '', name: 'rejectionReason', type: 'String', desc: 'Admin Moderation Reason' },
      { key: '', name: 'approvedAt', type: 'Date', desc: 'Official Approval Timestamp' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' }
    ]
  },
  {
    id: 'Announcement',
    title: 'ANNOUNCEMENT',
    collection: 'announcements',
    category: 'Institutional Notices & Bulletins',
    headerColor: '#C2410C', // Dark Orange
    x: 100,
    y: 1250,
    w: 660,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Scoping)' },
      { key: 'FK', name: 'createdBy', type: 'ObjectId', desc: 'Ref -> User (Institute Admin)' },
      { key: '', name: 'title', type: 'String', desc: 'Required Announcement Headline' },
      { key: '', name: 'message', type: 'String', desc: 'Required Full Announcement Body' },
      { key: '', name: 'category', type: 'Enum', desc: 'GENERAL | ACADEMIC | PLACEMENT | ALUMNI | EVENT | URGENT | OTHER' },
      { key: '', name: 'audience', type: 'Enum', desc: 'STUDENTS | ALUMNI | BOTH' },
      { key: '', name: 'isActive', type: 'Boolean', desc: 'Notice Display Toggle (Default: true)' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' }
    ]
  },
  {
    id: 'Event',
    title: 'EVENT',
    collection: 'events',
    category: 'Campus & Alumni Gatherings',
    headerColor: '#B45309', // Amber
    x: 100,
    y: 1680,
    w: 660,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Scoping)' },
      { key: 'FK', name: 'createdBy', type: 'ObjectId', desc: 'Ref -> User (Institute Admin)' },
      { key: '', name: 'title / description', type: 'String', desc: 'Required Event Name & Agenda' },
      { key: '', name: 'eventType', type: 'Enum', desc: 'WEBINAR | WORKSHOP | MEETUP | PLACEMENT_DRIVE | ALUMNI_TALK | NETWORKING | OTHER' },
      { key: '', name: 'date / time', type: 'Date / String', desc: 'Date, startTime, endTime' },
      { key: '', name: 'location / mode', type: 'String/Enum', desc: 'ONLINE | OFFLINE | HYBRID' },
      { key: '', name: 'meetingLink', type: 'String', desc: 'Online Webinar / Virtual Conference Link' },
      { key: '', name: 'audience', type: 'Enum', desc: 'STUDENTS | ALUMNI | BOTH' },
      { key: '', name: 'isActive', type: 'Boolean', desc: 'Event Activity Status (Default: true)' },
      { key: '', name: 'createdAt / updatedAt', type: 'Date', desc: 'Mongoose System Timestamps' }
    ]
  },
  {
    id: 'Notification',
    title: 'NOTIFICATION',
    collection: 'notifications',
    category: 'System Broadcasts & Feeds',
    headerColor: '#475569', // Slate
    x: 1100,
    y: 1420,
    w: 700,
    attributes: [
      { key: 'PK', name: '_id', type: 'ObjectId', desc: 'Primary Key' },
      { key: 'FK/IDX', name: 'recipient', type: 'ObjectId', desc: 'Ref -> User (Alert Recipient)' },
      { key: 'FK', name: 'institute', type: 'ObjectId', desc: 'Ref -> Institute (Tenancy Scoping)' },
      { key: '', name: 'type', type: 'Enum', desc: '14 Types: CONNECTION_*, GUIDANCE_*, OPPORTUNITY_*, ALUMNI_*, NEW_EVENT, NEW_ANNOUNCEMENT, GENERAL' },
      { key: '', name: 'title', type: 'String', desc: 'Required Alert Headline' },
      { key: '', name: 'message', type: 'String', desc: 'Required Alert Body Text' },
      { key: 'POLY', name: 'relatedModel', type: 'String', desc: 'Target Entity Name (e.g. Opportunity)' },
      { key: 'POLY', name: 'relatedId', type: 'ObjectId', desc: 'Target Document ObjectId' },
      { key: '', name: 'isRead', type: 'Boolean', desc: 'Read State Flag (Default: false)' },
      { key: 'IDX', name: 'createdAt', type: 'Date', desc: 'Compound Index { recipient: 1, createdAt: -1 }' },
      { key: '', name: 'updatedAt', type: 'Date', desc: 'Mongoose System Timestamp' }
    ]
  }
];

// Helper to compute card heights
entities.forEach(ent => {
  const headerHeight = 56;
  const colHeaderHeight = 28;
  const rowHeight = 25;
  const paddingBottom = 16;
  ent.h = headerHeight + colHeaderHeight + (ent.attributes.length * rowHeight) + paddingBottom;
});

// Relationships definition with dedicated color-coded routing
const relationships = [
  // 1. Institute <-> User (Tenancy)
  {
    id: 'rel_inst_user',
    color: '#2563EB',
    marker: 'arrowBlue',
    fromCard: '1',
    toCard: '0..N',
    label: 'hosts / manages users',
    path: 'M 760 250 L 1100 250',
    labelX: 930,
    labelY: 240,
    labelW: 190
  },
  // 2. User (Super Admin) -> Institute (Approves)
  {
    id: 'rel_superadmin_inst',
    color: '#0F766E',
    marker: 'arrowTeal',
    fromCard: '0..1',
    toCard: '0..N',
    label: 'approves / reviews (Super Admin)',
    path: 'M 1100 330 L 760 330',
    labelX: 930,
    labelY: 320,
    labelW: 230
  },
  // 3. User <-> StudentProfile (1:1)
  {
    id: 'rel_user_student',
    color: '#0284C7',
    marker: 'arrowSky',
    fromCard: '1',
    toCard: '0..1',
    label: '1:1 (Student Profile)',
    path: 'M 1100 420 L 920 420 L 920 770 L 760 770',
    labelX: 920,
    labelY: 580,
    labelW: 170
  },
  // 4. Institute <-> StudentProfile (Tenancy)
  {
    id: 'rel_inst_student',
    color: '#2563EB',
    marker: 'arrowBlue',
    fromCard: '1',
    toCard: '0..N',
    label: 'enrolled in institute',
    path: 'M 430 585 L 430 720',
    labelX: 430,
    labelY: 652,
    labelW: 170
  },
  // 5. User <-> AlumniProfile (1:1)
  {
    id: 'rel_user_alumni',
    color: '#4338CA',
    marker: 'arrowIndigo',
    fromCard: '1',
    toCard: '0..1',
    label: '1:1 (Alumni Profile)',
    path: 'M 1320 580 L 1320 720',
    labelX: 1320,
    labelY: 650,
    labelW: 170
  },
  // 6. User (Admin) -> AlumniProfile (Verification)
  {
    id: 'rel_admin_verify_alumni',
    color: '#7C3AED',
    marker: 'arrowViolet',
    fromCard: '1',
    toCard: '0..N',
    label: 'verifies alumni profile (Admin)',
    path: 'M 1620 580 L 1620 720',
    labelX: 1620,
    labelY: 650,
    labelW: 210
  },
  // 7. Institute <-> AlumniProfile (Tenancy)
  {
    id: 'rel_inst_alumni',
    color: '#2563EB',
    marker: 'arrowBlue',
    fromCard: '1',
    toCard: '0..N',
    label: 'alma mater institute',
    path: 'M 760 480 L 860 480 L 860 840 L 1100 840',
    labelX: 860,
    labelY: 820,
    labelW: 170
  },
  // 8. User (Student & Alumni) -> ConnectionRequest (M:N Associative)
  {
    id: 'rel_user_connection',
    color: '#6D28D9',
    marker: 'arrowPurple',
    fromCard: '1',
    toCard: '0..N',
    label: 'initiates / accepts connection',
    path: 'M 1800 250 L 2120 250',
    labelX: 1960,
    labelY: 240,
    labelW: 220
  },
  // 9. User (Student & Alumni) -> GuidanceRequest
  {
    id: 'rel_user_guidance',
    color: '#7C3AED',
    marker: 'arrowViolet',
    fromCard: '1',
    toCard: '0..N',
    label: 'requests / provides guidance',
    path: 'M 1800 370 L 1950 370 L 1950 610 L 2120 610',
    labelX: 1950,
    labelY: 490,
    labelW: 210
  },
  // 10. User (Author/Admin) -> Opportunity
  {
    id: 'rel_user_opportunity',
    color: '#047857',
    marker: 'arrowEmerald',
    fromCard: '1',
    toCard: '0..N',
    label: 'posts / approves opportunity',
    path: 'M 1800 480 L 1980 480 L 1980 1080 L 2120 1080',
    labelX: 1980,
    labelY: 780,
    labelW: 210
  },
  // 11. Institute -> Announcement
  {
    id: 'rel_inst_announcement',
    color: '#C2410C',
    marker: 'arrowOrange',
    fromCard: '1',
    toCard: '0..N',
    label: 'publishes notice bulletin',
    path: 'M 280 1185 L 280 1250',
    labelX: 280,
    labelY: 1215,
    labelW: 180
  },
  // 12. Institute -> Event
  {
    id: 'rel_inst_event',
    color: '#B45309',
    marker: 'arrowAmber',
    fromCard: '1',
    toCard: '0..N',
    label: 'schedules institutional event',
    path: 'M 280 1590 L 280 1680',
    labelX: 280,
    labelY: 1635,
    labelW: 200
  },
  // 13. User -> Notification
  {
    id: 'rel_user_notification',
    color: '#475569',
    marker: 'arrowSlate',
    fromCard: '1',
    toCard: '0..N',
    label: 'receives dispatched alerts',
    path: 'M 1450 1300 L 1450 1420',
    labelX: 1450,
    labelY: 1360,
    labelW: 190
  },
  // 14. Institute -> Notification
  {
    id: 'rel_inst_notification',
    color: '#2563EB',
    marker: 'arrowBlue',
    fromCard: '1',
    toCard: '0..N',
    label: 'scopes alerts by institute',
    path: 'M 760 1480 L 1100 1480',
    labelX: 930,
    labelY: 1470,
    labelW: 180
  }
];

function generateSvg() {
  const canvasW = 2950;
  const canvasH = 2280;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasW} ${canvasH}" width="${canvasW}" height="${canvasH}" style="background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <!-- Drop Shadow Filter for Entity Cards -->
    <filter id="cardShadow" x="-3%" y="-2%" width="106%" height="108%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.07"/>
    </filter>

    <!-- Colored Markers -->
    <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
    </marker>
    <marker id="arrowTeal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0F766E" />
    </marker>
    <marker id="arrowSky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
    </marker>
    <marker id="arrowIndigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#4338CA" />
    </marker>
    <marker id="arrowViolet" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#7C3AED" />
    </marker>
    <marker id="arrowPurple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#6D28D9" />
    </marker>
    <marker id="arrowEmerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#047857" />
    </marker>
    <marker id="arrowOrange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#C2410C" />
    </marker>
    <marker id="arrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#B45309" />
    </marker>
    <marker id="arrowSlate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
    </marker>
  </defs>

  <!-- Pure White Background -->
  <rect width="${canvasW}" height="${canvasH}" fill="#FFFFFF"/>

  <!-- Technical Blueprint Grid -->
  <g opacity="0.14">
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94A3B8" stroke-width="0.7"/>
    </pattern>
    <rect width="${canvasW}" height="${canvasH}" fill="url(#grid)" />
  </g>

  <!-- ==================== HEADER BANNER ==================== -->
  <g id="headerBanner">
    <rect x="100" y="36" width="2700" height="90" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
    <rect x="100" y="36" width="10" height="90" rx="5" fill="#1E3A8A"/>
    <text x="130" y="74" font-size="28" font-weight="800" fill="#0F172A" letter-spacing="-0.5">Entity Relationship Diagram - AlumniConnect</text>
    <text x="130" y="104" font-size="14.5" font-weight="500" fill="#475569">Verified Institute-Based Alumni-Student Networking Platform • Complete Mongoose Schema Model &amp; Relationship Architecture</text>
    <rect x="2480" y="56" width="300" height="50" rx="6" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.2"/>
    <text x="2495" y="78" font-size="12" font-weight="700" fill="#1D4ED8">ACADEMIC REPORT SPECIFICATION</text>
    <text x="2495" y="95" font-size="11" font-weight="600" fill="#2563EB">10 Verified Collections • Strict Multi-Tenancy</text>
  </g>

  <!-- ==================== RELATIONSHIP LINES ==================== -->
  <g id="relationshipLines">
`;

  // Draw relationship lines
  relationships.forEach(rel => {
    const halfW = (rel.labelW || 200) / 2;
    svg += `
    <!-- Relationship: ${rel.id} (${rel.label}) -->
    <path d="${rel.path}" fill="none" stroke="${rel.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${rel.marker})" opacity="0.9" />
    <g transform="translate(${rel.labelX}, ${rel.labelY})">
      <rect x="-${halfW}" y="-13" width="${rel.labelW || 200}" height="26" rx="13" fill="#FFFFFF" stroke="${rel.color}" stroke-width="1.2" filter="url(#cardShadow)"/>
      <text x="0" y="4" font-size="10.5" font-weight="600" fill="#0F172A" text-anchor="middle">${rel.label}</text>
      <!-- Source Cardinality -->
      <circle cx="-${halfW + 12}" cy="0" r="10" fill="#0F172A"/>
      <text x="-${halfW + 12}" y="3.5" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle">${rel.fromCard}</text>
      <!-- Target Cardinality -->
      <circle cx="${halfW + 12}" cy="0" r="10" fill="${rel.color}"/>
      <text x="${halfW + 12}" y="3.5" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle">${rel.toCard}</text>
    </g>
`;
  });

  svg += `  </g>\n\n  <!-- ==================== ENTITY TABLES ==================== -->\n  <g id="entityTables">\n`;

  // Draw each entity table card
  entities.forEach(ent => {
    const rx = 8;
    svg += `
    <!-- Entity: ${ent.id} -->
    <g id="entity_${ent.id}" transform="translate(${ent.x}, ${ent.y})">
      <!-- Container Box -->
      <rect x="0" y="0" width="${ent.w}" height="${ent.h}" rx="${rx}" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.6" filter="url(#cardShadow)"/>
      
      <!-- Top Title Bar -->
      <path d="M 0 ${rx} Q 0 0 ${rx} 0 L ${ent.w - rx} 0 Q ${ent.w} 0 ${ent.w} ${rx} L ${ent.w} 56 L 0 56 Z" fill="${ent.headerColor}" />
      <text x="20" y="30" font-size="16.5" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">${ent.title}</text>
      <text x="20" y="47" font-size="11.5" font-weight="500" fill="#E2E8F0" opacity="0.95">collection: "${ent.collection}" • [${ent.category}]</text>

      <!-- Table Header Row -->
      <rect x="0" y="56" width="${ent.w}" height="28" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
      <text x="16" y="74" font-size="10.5" font-weight="700" fill="#334155">KEY</text>
      <text x="76" y="74" font-size="10.5" font-weight="700" fill="#334155">ATTRIBUTE NAME</text>
      <text x="260" y="74" font-size="10.5" font-weight="700" fill="#334155">DATA TYPE</text>
      <text x="390" y="74" font-size="10.5" font-weight="700" fill="#334155">CONSTRAINTS / DESCRIPTIONS</text>

      <!-- Attributes Rows -->
`;

    ent.attributes.forEach((attr, idx) => {
      const rowY = 84 + (idx * 25);
      const isEven = idx % 2 === 0;
      const rowBg = isEven ? '#FFFFFF' : '#F8FAFC';

      svg += `      <g id="row_${ent.id}_${attr.name.replace(/[^a-zA-Z0-9_]/g, '_')}">
        <rect x="0" y="${rowY}" width="${ent.w}" height="25" fill="${rowBg}"/>
        <line x1="0" y1="${rowY + 25}" x2="${ent.w}" y2="${rowY + 25}" stroke="#F1F5F9" stroke-width="1"/>
`;

      // Key Badges
      if (attr.key === 'PK') {
        svg += `        <rect x="14" y="${rowY + 4}" width="26" height="17" rx="3" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
        <text x="27" y="${rowY + 16}" font-size="9" font-weight="800" fill="#B45309" text-anchor="middle">PK</text>\n`;
      } else if (attr.key.includes('FK')) {
        const badgeColor = attr.key.includes('UQ') ? '#EDE9FE' : '#DBEAFE';
        const strokeColor = attr.key.includes('UQ') ? '#7C3AED' : '#2563EB';
        const textColor = attr.key.includes('UQ') ? '#6D28D9' : '#1D4ED8';
        svg += `        <rect x="12" y="${rowY + 4}" width="${attr.key.length > 2 ? 46 : 26}" height="17" rx="3" fill="${badgeColor}" stroke="${strokeColor}" stroke-width="1"/>
        <text x="${attr.key.length > 2 ? 35 : 25}" y="${rowY + 16}" font-size="8.5" font-weight="800" fill="${textColor}" text-anchor="middle">${attr.key}</text>\n`;
      } else if (attr.key === 'UQ') {
        svg += `        <rect x="14" y="${rowY + 4}" width="26" height="17" rx="3" fill="#DCFCE7" stroke="#16A34A" stroke-width="1"/>
        <text x="27" y="${rowY + 16}" font-size="9" font-weight="800" fill="#15803D" text-anchor="middle">UQ</text>\n`;
      } else if (attr.key === 'IDX') {
        svg += `        <rect x="13" y="${rowY + 4}" width="28" height="17" rx="3" fill="#E2E8F0" stroke="#64748B" stroke-width="1"/>
        <text x="27" y="${rowY + 16}" font-size="8.5" font-weight="800" fill="#334155" text-anchor="middle">IDX</text>\n`;
      } else if (attr.key === 'POLY') {
        svg += `        <rect x="10" y="${rowY + 4}" width="38" height="17" rx="3" fill="#FFEDD5" stroke="#EA580C" stroke-width="1"/>
        <text x="29" y="${rowY + 16}" font-size="8" font-weight="800" fill="#C2410C" text-anchor="middle">POLY</text>\n`;
      }

      // Attribute Name
      const isKey = attr.key !== '';
      const nameColor = isKey ? '#0F172A' : '#1E293B';
      const weight = isKey ? '700' : '500';
      svg += `        <text x="76" y="${rowY + 16.5}" font-size="11.5" font-weight="${weight}" fill="${nameColor}">${attr.name}</text>\n`;

      // Data Type
      svg += `        <text x="260" y="${rowY + 16.5}" font-size="11" font-weight="600" fill="#0284C7">${attr.type}</text>\n`;

      // Description / Constraints
      svg += `        <text x="390" y="${rowY + 16.5}" font-size="10.5" font-weight="400" fill="#64748B">${attr.desc}</text>\n`;
      svg += `      </g>\n`;
    });

    svg += `    </g>\n`;
  });

  svg += `  </g>\n\n  <!-- ==================== LEGEND & ACADEMIC AUDIT SPECIFICATION ==================== -->
  <g id="legendBox" transform="translate(2120, 1550)">
    <rect x="0" y="0" width="680" height="540" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.6" filter="url(#cardShadow)"/>
    <path d="M 0 8 Q 0 0 8 0 L 672 0 Q 680 0 680 8 L 680 48 L 0 48 Z" fill="#334155"/>
    <text x="20" y="30" font-size="15" font-weight="800" fill="#FFFFFF">ER DIAGRAM NOTATION &amp; ARCHITECTURAL SPECIFICATION</text>
    
    <!-- Legend Section 1 -->
    <g transform="translate(24, 70)">
      <text x="0" y="0" font-size="12" font-weight="700" fill="#0F172A">1. KEY IDENTIFIERS &amp; INTEGRITY CONSTRAINTS</text>
      
      <rect x="0" y="14" width="30" height="18" rx="3" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
      <text x="15" y="27" font-size="9" font-weight="800" fill="#B45309" text-anchor="middle">PK</text>
      <text x="40" y="27" font-size="11" font-weight="500" fill="#334155">Primary Key: MongoDB Unique Object Identifier (_id)</text>

      <rect x="0" y="40" width="30" height="18" rx="3" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
      <text x="15" y="53" font-size="9" font-weight="800" fill="#1D4ED8" text-anchor="middle">FK</text>
      <text x="40" y="53" font-size="11" font-weight="500" fill="#334155">Foreign Key: Mongoose ObjectId reference (ref: Collection Model)</text>

      <rect x="0" y="66" width="30" height="18" rx="3" fill="#DCFCE7" stroke="#16A34A" stroke-width="1"/>
      <text x="15" y="79" font-size="9" font-weight="800" fill="#15803D" text-anchor="middle">UQ</text>
      <text x="40" y="79" font-size="11" font-weight="500" fill="#334155">Unique Field / Composite Index Constraint (e.g. Email, Connection pairs)</text>

      <rect x="0" y="92" width="30" height="18" rx="3" fill="#FFEDD5" stroke="#EA580C" stroke-width="1"/>
      <text x="15" y="105" font-size="8" font-weight="800" fill="#C2410C" text-anchor="middle">POLY</text>
      <text x="40" y="105" font-size="11" font-weight="500" fill="#334155">Polymorphic Dynamic Reference (via relatedModel and relatedId)</text>
    </g>

    <!-- Legend Section 2 -->
    <g transform="translate(24, 215)">
      <text x="0" y="0" font-size="12" font-weight="700" fill="#0F172A">2. CARDINALITY &amp; MAPPING RULES</text>
      
      <circle cx="10" cy="22" r="9" fill="#0F172A"/>
      <text x="10" y="25.5" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle">1</text>
      <line x1="26" y1="22" x2="65" y2="22" stroke="#475569" stroke-width="2"/>
      <circle cx="80" cy="22" r="9" fill="#0284C7"/>
      <text x="80" y="25.5" font-size="8.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">0..1</text>
      <text x="104" y="26" font-size="11" font-weight="500" fill="#334155">One-to-One (1:1): Strict unique reference (User &lt;--&gt; Student/Alumni Profile)</text>

      <circle cx="10" cy="52" r="9" fill="#0F172A"/>
      <text x="10" y="55.5" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle">1</text>
      <line x1="26" y1="52" x2="65" y2="52" stroke="#475569" stroke-width="2"/>
      <circle cx="80" cy="52" r="9" fill="#2563EB"/>
      <text x="80" y="55.5" font-size="8.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">0..N</text>
      <text x="104" y="56" font-size="11" font-weight="500" fill="#334155">One-to-Many (1:N): Institutional tenancy scoping &amp; creator ownership</text>

      <text x="0" y="90" font-size="11.5" font-weight="700" fill="#4338CA">Many-to-Many (M:N) Implementation:</text>
      <text x="0" y="108" font-size="10.5" font-weight="500" fill="#475569">• Student &lt;--&gt; Alumni Connections mediated via ConnectionRequest table.</text>
      <text x="0" y="125" font-size="10.5" font-weight="500" fill="#475569">• Student &lt;--&gt; Alumni Mentorship mediated via GuidanceRequest table.</text>
    </g>

    <!-- Legend Section 3 -->
    <g transform="translate(24, 385)">
      <text x="0" y="0" font-size="12" font-weight="700" fill="#0F172A">3. MULTI-TENANCY &amp; SECURITY ASSURANCES</text>
      <text x="0" y="22" font-size="10.5" font-weight="500" fill="#334155">• Data Isolation: Institute ObjectId embedded in all institutional data models.</text>
      <text x="0" y="40" font-size="10.5" font-weight="500" fill="#334155">• Role-Based Access Control: SUPER_ADMIN, INSTITUTE_ADMIN, STUDENT, ALUMNI.</text>
      <text x="0" y="58" font-size="10.5" font-weight="500" fill="#334155">• Verification Gate: AlumniProfile requires verifiedBy before student discovery.</text>
      <text x="0" y="76" font-size="10.5" font-weight="500" fill="#334155">• Security: Passwords salted (rounds: 10), select: false on all default queries.</text>
      <text x="0" y="94" font-size="10.5" font-weight="500" fill="#334155">• Compound Uniqueness: { student, alumni } &amp; { institute, rollNumber }.</text>
    </g>
  </g>

  <!-- ==================== FOOTER ==================== -->
  <g id="footer" transform="translate(100, 2240)">
    <text x="0" y="0" font-size="11.5" font-weight="500" fill="#64748B">AlumniConnect MERN Stack Architecture • Verified MongoDB/Mongoose Schemas in server/src/models/*.js • B.Tech Capstone Project Report</text>
  </g>
</svg>`;

  return svg;
}

// Generate the SVG file
const svgContent = generateSvg();
const svgPath = path.join(__dirname, 'alumniconnect_er_diagram.svg');
fs.writeFileSync(svgPath, svgContent, 'utf8');
console.log(`SVG successfully written to: ${svgPath}`);

// Also create an HTML wrapper to render high-resolution PNG using Edge headless
const htmlPath = path.join(__dirname, 'render_diagram.html');
const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Entity Relationship Diagram - AlumniConnect</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #FFFFFF; display: flex; justify-content: center; align-items: center; }
    svg { display: block; width: 2950px; height: 2280px; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log(`HTML wrapper successfully written to: ${htmlPath}`);
