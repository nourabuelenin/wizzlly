# Wizlly Application - Complete UI/UX Plan

## Overview
This document outlines the complete UI/UX structure for the Wizlly application, mapping all 46 API endpoints to user-facing features and components.

---

## Application Architecture

### Current Routes
```
/[lang]/                    → Homepage (marketing)
/[lang]/auth               → Authentication page
/[lang]/onboarding         → Onboarding flow (4 steps)
/[lang]/chat               → Chat interface
/[lang]/profile            → User profile
```

### Proposed New Routes
```
/[lang]/dashboard          → Main dashboard (NEW)
/[lang]/campaigns          → Campaigns list (NEW)
/[lang]/campaigns/[id]     → Campaign details (NEW)
/[lang]/campaigns/new      → Create campaign (NEW)
/[lang]/posts              → Social posts library (NEW)
/[lang]/posts/[id]         → Post details (NEW)
/[lang]/calendar           → Content calendar (NEW)
/[lang]/integrations       → Social media connections (NEW)
/[lang]/ads                → Meta Ads manager (NEW)
/[lang]/settings           → Account settings (NEW)
```

---

## Page-by-Page Breakdown

## 1. Authentication Flow (Existing - Update)

### Sign Up Page `/[lang]/auth`
**Current:** Basic signup with email/password
**Enhanced:**
- ✅ First name, Last name, Username, Email, Password fields
- ✅ Registration creates user WITHOUT knowledge_base
- ✅ Redirect to onboarding after successful signup

**APIs Used:**
- `POST /api/auth/register/` - Create user account
- `POST /api/auth/login/` - Login user

### Onboarding Flow `/[lang]/onboarding`
**Current:** 4-step onboarding for business profile
**Enhanced:**
- Step 1: Business Info (name, industry, website)
- Step 2: Target Audience (demographics, interests, pain points)
- Step 3: Goals & Tone (business goals, brand voice, keywords)
- Step 4: Finish & Review

**On Completion:**
- Call `PUT /api/auth/profile/` to update knowledge_base
- Redirect to `/[lang]/dashboard`

**APIs Used:**
- `PUT /api/auth/profile/` - Update knowledge_base with onboarding data

---

## 2. Main Dashboard (NEW) `/[lang]/dashboard`

### Layout
```
┌─────────────────────────────────────────────┐
│ Sidebar │ Header                            │
├─────────┼───────────────────────────────────┤
│         │ Welcome Back, [Name]!             │
│ Nav     │                                   │
│ Menu    │ ┌─────────┬─────────┬─────────┐  │
│         │ │ Campaigns│ Posts   │ Reach   │  │
│         │ │   12     │   45    │  25.4K  │  │
│         │ └─────────┴─────────┴─────────┘  │
│         │                                   │
│         │ Recent Campaigns                  │
│         │ ┌───────────────────────────────┐ │
│         │ │ Campaign Card 1               │ │
│         │ └───────────────────────────────┘ │
│         │                                   │
│         │ Quick Actions                     │
│         │ [+ New Campaign] [+ New Post]    │
└─────────┴───────────────────────────────────┘
```

### Components
1. **Stats Overview Cards**
   - Total Campaigns
   - Total Posts
   - Total Reach
   - Scheduled Posts

2. **Recent Activity**
   - Recent campaigns (with status)
   - Recent posts (with platform icons)
   - Recent chat sessions

3. **Quick Actions**
   - Start new chat
   - Create campaign manually
   - Generate post
   - Schedule post

**APIs Used:**
- `GET /api/get-campaigns/` - Get recent campaigns
- `GET /api/social/posts/` - Get recent posts
- `GET /api/chat/sessions/` - Get recent chat sessions
- `GET /api/auth/profile/` - Get user data

---

## 3. Chat Interface (Update Existing) `/[lang]/chat`

### Current State
- Sidebar with chat history
- Main chat area
- Message input

### Enhanced Features

#### A. Chat Session Management
1. **Start New Chat**
   - Button to start new session
   - Send user context from knowledge_base
   
2. **Chat History in Sidebar**
   - List all sessions (today, yesterday, older)
   - Show session status (active, completed)
   - Click to load session

3. **Active Chat Area**
   - Show messages with role (user/assistant)
   - Display progress indicator (0-100%)
   - Show collected data in sidebar panel
   - Show missing fields indicator

4. **Campaign Plan Preview**
   - When `is_complete: true`, show campaign plan
   - Display posts, audience, budget
   - [Create Campaign] button

**APIs Used:**
- `POST /api/chat/start/` - Start new chat with user context
- `POST /api/chat/{sessionId}/message/` - Send messages
- `GET /api/chat/{sessionId}/` - Load chat session
- `GET /api/chat/sessions/` - List all sessions
- `POST /api/chat/{sessionId}/create-campaign/` - Create campaign from chat

### UI Components
```
┌─────────────────────────────────────────────┐
│ Sidebar │ Chat Header                       │
├─────────┼───────────────────────────────────┤
│ [New]   │ Progress: ████░░░░░░ 40%         │
│         │                                   │
│ Today   │ Messages Area                     │
│ • Chat1 │ ┌───────────────────────────────┐ │
│ • Chat2 │ │ User: I want summer campaign  │ │
│         │ │ AI: Great! Let me ask...      │ │
│ Yesterday│ └───────────────────────────────┘ │
│ • Chat3 │                                   │
│         │ [Collected Data Panel] [Side]    │
│         │ Campaign: 60% ■■■□               │
│         │ Audience: 20% ■□□□               │
│         │                                   │
│         │ [Input Area]                      │
└─────────┴───────────────────────────────────┘
```

---

## 4. Campaigns Section (NEW)

### A. Campaigns List `/[lang]/campaigns`

#### Layout
```
┌─────────────────────────────────────────────┐
│ Header: Campaigns                           │
│ [+ New Campaign] [Filter ▼] [Search]       │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ Summer Sale 2026        [Active]        │ │
│ │ OUTCOME_SALES                           │ │
│ │ 5 Posts • $5,000 Budget                 │ │
│ │ [View] [Edit] [•••]                     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Brand Awareness Q1      [Draft]         │ │
│ │ OUTCOME_AWARENESS                       │ │
│ │ 3 Posts • $3,000 Budget                 │ │
│ │ [View] [Edit] [•••]                     │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

#### Features
- List all campaigns with filters (status: draft, active, completed, archived)
- Campaign cards showing: title, objective, status, post count, budget
- Quick actions: View, Edit, Delete
- Create new campaign button

**APIs Used:**
- `GET /api/get-campaigns/?status={status}` - Get campaigns list

---

### B. Campaign Details `/[lang]/campaigns/[id]`

#### Layout
```
┌─────────────────────────────────────────────┐
│ ← Back to Campaigns                         │
├─────────────────────────────────────────────┤
│ Summer Sale 2026              [Active ▼]    │
│ OUTCOME_SALES • Created Jan 27, 2026        │
│                                             │
│ [Edit] [Delete] [+ Generate Post]           │
├─────────────────────────────────────────────┤
│ Campaign Details              │ Images      │
│ ┌───────────────────────────┐ │ ┌─────────┐│
│ │ Description:              │ │ │ [IMG 1] ││
│ │ Summer sale campaign...   │ │ │ [IMG 2] ││
│ │                           │ │ └─────────┘│
│ │ Budget: $5,000            │ │ [+ Add]    │
│ │ Duration: 30 days         │ │            │
│ │ Platforms: FB, IG         │ │            │
│ └───────────────────────────┘ │            │
│                                             │
│ Associated Posts (5)                        │
│ ┌─────────────────────────────────────────┐ │
│ │ [IG] ☀️ Summer Sale is HERE!  [Published]││
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

#### Sections
1. **Campaign Header**
   - Title, objective, status
   - Edit/Delete actions

2. **Campaign Details Card**
   - Description
   - Budget (total, type)
   - Duration
   - Target platforms
   - Target audience

3. **Images/Creatives**
   - Generated images for campaign
   - Upload new images
   - Generate variations with decorations

4. **Associated Posts**
   - List of social posts linked to campaign
   - Generate new post button

**APIs Used:**
- Campaign data loaded from campaigns list or stored state
- `POST /api/generate-image/` - Generate campaign image
- `POST /api/decoration/generate/` - Generate image variations
- `POST /api/social/posts/generate/` - Generate post for campaign
- `GET /api/social/posts/?campaign_id={id}` - Get campaign posts

---

### C. Create Campaign `/[lang]/campaigns/new`

#### Two Creation Methods

**Method 1: Via Chat**
- Redirect to `/[lang]/chat` with "create campaign" context
- AI guides through campaign creation
- Creates campaign at end

**Method 2: Manual Form**
```
┌─────────────────────────────────────────────┐
│ Create New Campaign                         │
├─────────────────────────────────────────────┤
│ Basic Information                           │
│ ┌─────────────────────────────────────────┐ │
│ │ Campaign Title *                        │ │
│ │ [________________________]              │ │
│ │                                         │ │
│ │ Description                             │ │
│ │ [________________________]              │ │
│ │                                         │ │
│ │ Objective *                             │ │
│ │ [OUTCOME_SALES ▼]                       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Budget & Duration                           │
│ ┌─────────────────────────────────────────┐ │
│ │ Budget Amount: [$______]                │ │
│ │ Budget Type: ◉ Lifetime  ○ Daily        │ │
│ │ Duration: [__] days                     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Target Audience                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Age Range: [25] to [45]                 │ │
│ │ Interests: [fashion, shopping]          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Cancel] [Save as Draft] [Create & Publish]│
└─────────────────────────────────────────────┘
```

**Form Fields:**
- Campaign Title *
- Description
- Objective (dropdown: AWARENESS, SALES, etc.)
- Budget Amount & Type
- Duration
- Target Audience (age range, interests)
- Platforms (checkboxes: Facebook, Instagram, etc.)

**APIs Used:**
- Form creates campaign data object
- After creation, stored locally or via backend endpoint (not explicitly documented but implied)

---

## 5. Social Posts Library (NEW) `/[lang]/posts`

### Posts List View

#### Layout
```
┌─────────────────────────────────────────────┐
│ Posts Library                               │
│ [+ Generate Post] [Filter ▼] [Search]      │
├─────────────────────────────────────────────┤
│ ┌─────────────┬─────────────┬─────────────┐ │
│ │ All Posts   │ Scheduled   │ Published   │ │
│ └─────────────┴─────────────┴─────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ [IG] ☀️ Summer Sale is HERE!            │ │
│ │ Campaign: Summer Sale 2026              │ │
│ │ Status: Published • Jan 27, 2026        │ │
│ │ 👁 5.4K  ❤ 180  💬 35                   │ │
│ │ [View] [Edit] [Insights] [•••]          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ [FB] New collection launching...        │ │
│ │ Campaign: Spring Collection             │ │
│ │ Status: Draft                           │ │
│ │ [View] [Edit] [Publish] [•••]           │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

#### Features
- Tab filters: All, Draft, Scheduled, Published
- Platform filter: All, Facebook, Instagram
- Campaign filter
- Post cards showing:
  - Platform icon
  - Content preview
  - Campaign name
  - Status & date
  - Engagement metrics (if published)
  - Quick actions

**APIs Used:**
- `GET /api/social/posts/` - Get all posts
- `GET /api/social/posts/?campaign_id={id}` - Filter by campaign
- `DELETE /api/social/posts/{postId}/` - Delete post

---

### Post Details `/[lang]/posts/[id]`

#### Layout
```
┌─────────────────────────────────────────────┐
│ ← Back to Posts                             │
├─────────────────────────────────────────────┤
│ [Instagram] Post                [Draft ▼]   │
│ Campaign: Summer Sale 2026                  │
│                                             │
│ [Edit] [Delete] [Publish Now] [Schedule]    │
├─────────────────────────────────────────────┤
│ ┌─────────────────┐  Content               │
│ │                 │  ┌───────────────────┐ │
│ │  [Image]        │  │ ☀️ Summer Sale    │ │
│ │                 │  │ is HERE!          │ │
│ │                 │  │                   │ │
│ │                 │  │ Get up to 50% OFF │ │
│ │                 │  │ on all summer     │ │
│ │                 │  │ essentials! 🏖️   │ │
│ └─────────────────┘  │                   │ │
│                      │ #SummerSale       │ │
│ Metadata             │ #Fashion          │ │
│ • Platform: Instagram│ #Shopping         │ │
│ • Language: English  └───────────────────┘ │
│ • Tone: Energetic                          │
│ • Created: Jan 27                          │
│                                             │
│ Insights (if published)                     │
│ ┌─────────┬─────────┬─────────┬─────────┐  │
│ │ Reach   │ Impress │ Engage  │ Clicks  │  │
│ │ 3,890   │ 5,420   │ 245     │ 120     │  │
│ └─────────┴─────────┴─────────┴─────────┘  │
└─────────────────────────────────────────────┘
```

#### Sections
1. **Post Header**
   - Platform badge
   - Campaign link
   - Status dropdown
   - Actions: Edit, Delete, Publish, Schedule

2. **Visual Preview**
   - Image (if attached)
   - Content text

3. **Metadata**
   - Platform, language, tone
   - Creation date
   - Campaign association

4. **Insights** (if published)
   - Reach, Impressions, Engagement
   - Likes, Comments, Shares, Saves, Clicks
   - Click rate, engagement rate

5. **Edit Mode**
   - Textarea to edit content
   - Save/Cancel buttons

**APIs Used:**
- `GET /api/social/posts/{postId}/` - Get post details
- `PATCH /api/social/posts/{postId}/` - Update post content
- `POST /api/social/posts/{postId}/publish/` - Publish to platform
- `GET /api/social/posts/{postId}/insights/` - Get performance metrics

---

### Generate Post Modal

```
┌─────────────────────────────────────────────┐
│ Generate Social Post                    [×] │
├─────────────────────────────────────────────┤
│ Select Campaign *                           │
│ [Summer Sale 2026 ▼]                        │
│                                             │
│ Platform *                                  │
│ ◉ Instagram  ○ Facebook                     │
│                                             │
│ Tone                                        │
│ [Energetic ▼]                               │
│                                             │
│ Language                                    │
│ ◉ Auto  ○ English  ○ Arabic                 │
│                                             │
│ [Cancel] [Generate Post]                    │
└─────────────────────────────────────────────┘
```

**APIs Used:**
- `POST /api/social/posts/generate/` - Generate post content

---

## 6. Content Calendar (NEW) `/[lang]/calendar`

### Calendar View

#### Layout
```
┌─────────────────────────────────────────────┐
│ Content Calendar                            │
│ [+ Schedule Post]  January 2026  [← →]      │
├─────────────────────────────────────────────┤
│  Mon    Tue    Wed    Thu    Fri    Sat  Sun│
│   20     21     22     23     24     25    26│
│          [IG]   [FB]                         │
│          3pm    10am                         │
│                                             │
│   27     28     29     30     31      1     2│
│  [FB]   [IG]                                │
│  9am    [IG]                                │
│         6pm                                 │
└─────────────────────────────────────────────┘
```

#### Features
- Monthly calendar view
- Show scheduled posts as colored blocks
- Platform icons (FB, IG)
- Click post to view/edit
- Drag-and-drop to reschedule (future enhancement)
- [+ Schedule Post] button opens modal

**APIs Used:**
- `GET /api/social/scheduled/` - Get all scheduled posts
- `POST /api/social/scheduled/` - Create scheduled post
- `POST /api/social/scheduled/{postId}/cancel/` - Cancel scheduled post
- `DELETE /api/social/scheduled/{postId}/` - Delete scheduled post

### Schedule Post Modal

```
┌─────────────────────────────────────────────┐
│ Schedule Post                           [×] │
├─────────────────────────────────────────────┤
│ Select Post *                               │
│ [Choose from library ▼]                     │
│ or [+ Create New Post]                      │
│                                             │
│ Platform *                                  │
│ ◉ Instagram  ○ Facebook                     │
│                                             │
│ Account                                     │
│ [@my_business ▼]                            │
│                                             │
│ Schedule Date & Time *                      │
│ [Jan 28, 2026] [3:00 PM]                    │
│ Timezone: America/New_York                  │
│                                             │
│ [Cancel] [Schedule Post]                    │
└─────────────────────────────────────────────┘
```

---

## 7. Integrations (NEW) `/[lang]/integrations`

### Social Media Connections

#### Layout
```
┌─────────────────────────────────────────────┐
│ Social Media Integrations                   │
├─────────────────────────────────────────────┤
│ Facebook                                    │
│ ┌─────────────────────────────────────────┐ │
│ │ Status: ● Connected                     │ │
│ │ User: John Doe                          │ │
│ │                                         │ │
│ │ Connected Pages (2)                     │ │
│ │ • My Business Page                      │ │
│ │ • My Second Page                        │ │
│ │                                         │ │
│ │ [Manage Pages] [Disconnect]             │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Instagram                                   │
│ ┌─────────────────────────────────────────┐ │
│ │ Status: ● Connected                     │ │
│ │                                         │ │
│ │ Connected Accounts (1)                  │ │
│ │ • @my_business (1.5K followers)         │ │
│ │                                         │ │
│ │ [Discover More] [Manage]                │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Meta Ads                                    │
│ ┌─────────────────────────────────────────┐ │
│ │ Status: ○ Not Connected                 │ │
│ │                                         │ │
│ │ [Connect Ad Account]                    │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Facebook Connection Flow

1. **Connect Facebook**
   - Click [Connect Facebook] button
   - Calls `GET /api/social/facebook/auth/` to get OAuth URL
   - Redirect user to Facebook OAuth
   - Facebook redirects back to callback
   - `GET /api/social/facebook/callback/` handles the callback
   - Display connected pages

2. **Manage Pages**
   - Shows list of pages from `GET /api/social/facebook/pages/`
   - Toggle active/inactive status
   - Disconnect individual page with `DELETE /api/social/facebook/pages/{pageId}/`

### Instagram Connection Flow

1. **Auto-Discovery**
   - After Facebook connection, show [Discover Instagram Accounts]
   - Call `POST /api/social/instagram/discover/` to find IG accounts linked to FB pages
   - Display found accounts with option to activate

2. **Manage Accounts**
   - List from `GET /api/social/instagram/accounts/`
   - Show username, follower count, linked page
   - Disconnect with `DELETE /api/social/instagram/accounts/{accountId}/`

**APIs Used:**
- `GET /api/social/facebook/auth/` - Get Facebook OAuth URL
- `GET /api/social/facebook/callback/` - Handle OAuth callback
- `GET /api/social/facebook/status/` - Check connection status
- `GET /api/social/facebook/pages/` - Get connected pages
- `DELETE /api/social/facebook/pages/{pageId}/` - Disconnect page
- `POST /api/social/instagram/discover/` - Discover Instagram accounts
- `POST /api/social/instagram/discover-from-user/` - Alt discovery method
- `GET /api/social/instagram/accounts/` - Get connected accounts
- `DELETE /api/social/instagram/accounts/{accountId}/` - Disconnect account

---

## 8. Meta Ads Manager (NEW) `/[lang]/ads`

### Overview Page

#### Layout
```
┌─────────────────────────────────────────────┐
│ Meta Ads Manager                            │
│                                             │
│ Connected Ad Accounts (1)                   │
│ [+ Connect New Account]                     │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ Main Ad Account                         │ │
│ │ Account ID: act_111222333               │ │
│ │ Currency: USD                           │ │
│ │                                         │ │
│ │ [View Campaigns]                        │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Connect Ad Account Flow

1. **Discover Accounts**
   - Call `GET /api/social/meta-ads/businesses-and-accounts/` with facebook_user_id
   - Display list of available ad accounts from all businesses

2. **Connect Account Modal**
```
┌─────────────────────────────────────────────┐
│ Connect Ad Account                      [×] │
├─────────────────────────────────────────────┤
│ Select Business                             │
│ [My Business ▼]                             │
│                                             │
│ Select Ad Account                           │
│ ○ Main Ad Account (act_111222333) - USD    │
│ ○ Secondary Account (act_444555666) - EUR  │
│                                             │
│ [Cancel] [Connect Account]                  │
└─────────────────────────────────────────────┘
```

3. **Connect**
   - Call `POST /api/social/meta-ads/connect-account/` with selected account details

### Ad Campaigns View `/[lang]/ads/campaigns`

#### Layout
```
┌─────────────────────────────────────────────┐
│ ← Ad Accounts                               │
│                                             │
│ Main Ad Account - Campaigns                 │
│ [Refresh Data]                              │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ Summer Sale Campaign 2026    [ACTIVE]   │ │
│ │ OUTCOME_SALES                           │ │
│ │ Daily Budget: $100.00                   │ │
│ │                                         │ │
│ │ Performance:                            │ │
│ │ • Impressions: 45,230                   │ │
│ │ • Reach: 32,150                         │ │
│ │ • Clicks: 1,280                         │ │
│ │ • Spend: $850.45                        │ │
│ │                                         │ │
│ │ [View Ad Sets] [View Ads]               │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Ad Sets View

Shows ad sets for selected campaign with:
- Name, status, budget
- Targeting details (age, gender, location, interests)
- Performance metrics

### Ads View

Shows individual ads with:
- Ad name, status
- Creative (image, title, body, CTA)
- Performance metrics (impressions, clicks, CTR, spend)

**APIs Used:**
- `GET /api/social/meta-ads/businesses-and-accounts/` - Discover ad accounts
- `POST /api/social/meta-ads/connect-account/` - Connect ad account
- `GET /api/social/meta-ads/connected-accounts/` - Get connected accounts
- `GET /api/social/meta-ads/campaigns/` - Get campaigns for account
- `GET /api/social/meta-ads/adsets/` - Get ad sets
- `GET /api/social/meta-ads/ads/` - Get individual ads

---

## 9. Profile & Settings (Update Existing) `/[lang]/profile`

### Current State
- Mock profile data display
- Edit button (non-functional)

### Enhanced Profile Page

#### Tabs Layout
```
┌─────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────┐ │
│ │ [Avatar] John Doe                       │ │
│ │ john@example.com                        │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Profile] [Knowledge Base] [Account]        │
├─────────────────────────────────────────────┤
│ Personal Information                        │
│ ┌─────────────────────────────────────────┐ │
│ │ First Name: [John]                      │ │
│ │ Last Name: [Doe]                        │ │
│ │ Email: [john@example.com]               │ │
│ │ Username: john_doe (read-only)          │ │
│ │                                         │ │
│ │ [Cancel] [Save Changes]                 │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Tab 1: Profile
- First name, last name, email
- Change password
- Save changes button

### Tab 2: Knowledge Base
- All business profile information (from onboarding)
- Editable fields for:
  - Business name, industry, website
  - Brand colors (color pickers)
  - Target audience
  - Preferred platforms
  - Tone of voice
- [Re-run Onboarding] button
- [Save Changes] button

### Tab 3: Account Settings
- Ad account ID, Business ID
- Currency, Timezone, Country
- Delete account option

**APIs Used:**
- `GET /api/auth/profile/` - Load profile data (on page load)
- `PUT /api/auth/profile/` - Update profile & knowledge_base
- `POST /api/auth/logout/` - Logout

---

## 10. Settings Page (NEW) `/[lang]/settings`

### Navigation Sidebar
```
┌─────────────────────────────────────────────┐
│ Settings                                    │
├──────────┬──────────────────────────────────┤
│ Account  │ Account Settings                 │
│ Profile  │ ┌────────────────────────────┐   │
│ Security │ │ Email: john@example.com    │   │
│ Billing  │ │ [Change Email]             │   │
│ Team     │ │                            │   │
│ API      │ │ Language: English          │   │
│          │ │ [Change ▼]                 │   │
│          │ │                            │   │
│          │ │ Timezone: America/New_York │   │
│          │ │ [Change ▼]                 │   │
│          │ └────────────────────────────┘   │
│          │                                  │
│          │ Danger Zone                      │
│          │ ┌────────────────────────────┐   │
│          │ │ [Delete Account]           │   │
│          │ └────────────────────────────┘   │
└──────────┴──────────────────────────────────┘
```

Sections to add (future):
- Billing (for paid plans)
- Team management (for agencies)
- API keys (for developers)

---

## Component Architecture

### Shared Components

1. **Layout Components**
   - `<AppLayout>` - Main app wrapper with sidebar + header
   - `<Sidebar>` - Navigation sidebar
   - `<Header>` - Top header with user menu
   - `<EmptyLayout>` - For auth pages

2. **Navigation**
   - `<NavItem>` - Single navigation item
   - `<UserMenu>` - Dropdown menu in header
   - `<Breadcrumbs>` - Page navigation

3. **Cards & Lists**
   - `<CampaignCard>` - Campaign preview card
   - `<PostCard>` - Social post card
   - `<StatCard>` - Dashboard stat card
   - `<SessionCard>` - Chat session card
   - `<EmptyState>` - When no data exists

4. **Forms**
   - `<FormInput>` - Text input (already exists)
   - `<FormTextarea>` - Multiline input
   - `<FormSelect>` - Dropdown select
   - `<FormCheckbox>` - Checkbox
   - `<FormRadio>` - Radio button
   - `<ColorPicker>` - Color selection
   - `<DateTimePicker>` - Date/time selection

5. **Modals**
   - `<Modal>` - Base modal (already exists)
   - `<ConfirmModal>` - Confirmation dialog
   - `<GeneratePostModal>` - Post generation
   - `<SchedulePostModal>` - Schedule post
   - `<ConnectAccountModal>` - Connect social account

6. **Chat Components**
   - `<ChatMessage>` - Single message
   - `<ChatInput>` - Message input area
   - `<ProgressBar>` - Campaign progress
   - `<CollectedDataPanel>` - Show collected data
   - `<CampaignPlanPreview>` - Final plan preview

7. **Campaign Components**
   - `<CampaignHeader>` - Campaign details header
   - `<ImageGallery>` - Campaign images
   - `<ImageDecorationPicker>` - Choose decoration style
   - `<AudienceCard>` - Audience details
   - `<BudgetCard>` - Budget info

8. **Post Components**
   - `<PostPreview>` - Visual post preview
   - `<PostEditor>` - Edit post content
   - `<InsightsCard>` - Performance metrics
   - `<PlatformBadge>` - Platform icon/label

9. **Calendar Components**
   - `<Calendar>` - Monthly calendar grid
   - `<CalendarEvent>` - Scheduled post on calendar
   - `<ScheduleTimeline>` - Timeline view (alternative)

10. **Integration Components**
    - `<ConnectionCard>` - Social media connection status
    - `<PagesList>` - Connected Facebook pages
    - `<AccountsList>` - Connected Instagram accounts
    - `<AdAccountCard>` - Connected ad account

11. **Utility Components**
    - `<LoadingSpinner>` - Loading state
    - `<ErrorMessage>` - Error display
    - `<Toast>` - Notification (already using react-hot-toast)
    - `<Badge>` - Status badge
    - `<Dropdown>` - Dropdown menu (already exists)
    - `<Tabs>` - Tab navigation

---

## API Integration Layer

### Create API Client Structure

```typescript
// lib/api/client.ts
export const apiClient = {
  baseURL: process.env.NEXT_PUBLIC_API_GAD_BASE_URL,
  
  async request(endpoint, options) {
    const token = getAuthToken();
    // Add auth header, handle errors, etc.
  }
}

// lib/api/auth.ts (already exists - enhance)
export const auth = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
}

// lib/api/chat.ts (NEW)
export const chat = {
  startSession,
  sendMessage,
  getSession,
  listSessions,
  createCampaign,
}

// lib/api/campaigns.ts (NEW)
export const campaigns = {
  getCampaigns,
  generateImage,
  generateDecorations,
  enhancePrompt,
}

// lib/api/posts.ts (NEW)
export const posts = {
  generatePost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  publishPost,
  getInsights,
}

// lib/api/facebook.ts (NEW)
export const facebook = {
  getAuthUrl,
  handleCallback,
  getPages,
  checkStatus,
  publish,
  disconnectPage,
}

// lib/api/instagram.ts (NEW)
export const instagram = {
  discoverAccounts,
  getAccounts,
  publishPhoto,
  publishCarousel,
  disconnect,
}

// lib/api/scheduled.ts (NEW)
export const scheduled = {
  create,
  getAll,
  cancel,
  delete: deleteScheduled,
}

// lib/api/metaAds.ts (NEW)
export const metaAds = {
  discoverAccounts,
  connectAccount,
  getConnectedAccounts,
  getCampaigns,
  getAdSets,
  getAds,
}
```

---

## Data Flow & State Management

### Options for State Management

1. **React Context + Hooks** (Recommended for MVP)
   - Simple, built-in
   - Create contexts for:
     - `AuthContext` - User, token, login/logout
     - `ProfileContext` - User profile & knowledge_base
     - `CampaignsContext` - Campaigns list
     - `PostsContext` - Posts list
     - `ChatContext` - Current chat session

2. **Zustand** (Alternative - Lightweight)
   - Simple global store
   - Better for complex state

3. **TanStack Query (React Query)** (Recommended for data fetching)
   - Automatic caching, refetching
   - Loading/error states
   - Optimistic updates

### Example Context Structure

```typescript
// contexts/AuthContext.tsx
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {},
  logout: async () => {},
  updateUser: (userData) => {},
});

// contexts/ProfileContext.tsx
export const ProfileContext = createContext({
  profile: null,
  knowledgeBase: null,
  isLoading: false,
  updateKnowledgeBase: async (data) => {},
  refreshProfile: async () => {},
});

// contexts/ChatContext.tsx
export const ChatContext = createContext({
  sessionId: null,
  messages: [],
  isLoading: false,
  progress: 0,
  collectedData: {},
  startSession: async () => {},
  sendMessage: async (content) => {},
  loadSession: async (sessionId) => {},
});
```

---

## User Flows

### Flow 1: Complete Onboarding & Create First Campaign

1. User signs up → `/[lang]/auth`
2. Redirected to onboarding → `/[lang]/onboarding`
3. Complete 4 steps, submit knowledge_base
4. Redirected to dashboard → `/[lang]/dashboard`
5. Click "Start New Chat" or "+ New Campaign"
6. If Chat: AI guides through campaign creation
7. Campaign complete, shown on dashboard
8. Generate posts for campaign
9. Connect Facebook/Instagram
10. Publish posts

### Flow 2: Create & Schedule Social Post

1. From dashboard, click "+ New Post"
2. Opens Generate Post Modal
3. Select campaign, platform, tone
4. Post generated and saved as draft
5. Navigate to `/[lang]/posts/[id]`
6. Review and edit content
7. Click "Schedule"
8. Select date/time → Calendar view
9. Post scheduled, appears on calendar

### Flow 3: Connect Social Media & Publish

1. Navigate to `/[lang]/integrations`
2. Click "Connect Facebook"
3. OAuth flow → Facebook login → Grant permissions
4. Callback redirects back, pages connected
5. Click "Discover Instagram"
6. Instagram accounts found and connected
7. Navigate to `/[lang]/posts`
8. Select a draft post → "Publish Now"
9. Select Instagram account
10. Post published to Instagram
11. View insights after 24 hours

### Flow 4: View Ad Performance

1. Navigate to `/[lang]/integrations`
2. Connect Meta Ads account
3. Select ad account from discovered accounts
4. Navigate to `/[lang]/ads`
5. View list of ad campaigns
6. Click campaign → View ad sets
7. Click ad set → View individual ads
8. See performance metrics (impressions, clicks, spend)

---

## Mobile Responsiveness

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Layout Adjustments

1. **Navigation**
   - Sidebar becomes drawer (hamburger menu)
   - Header simplified (logo + menu button)

2. **Dashboard**
   - Stats stack vertically
   - Cards full width

3. **Campaigns/Posts Lists**
   - Single column
   - Simplified cards

4. **Campaign/Post Details**
   - Single column layout
   - Sections stack vertically

5. **Calendar**
   - Week view instead of month
   - Swipe to change weeks

6. **Chat**
   - Sidebar hidden by default
   - Swipe to show sidebar
   - Full-width chat area

---

## Development Phases

### Phase 1: Foundation (Week 1-2)
- ✅ Auth flow (sign up, login, logout) - DONE
- ✅ Onboarding flow - DONE
- ✅ Profile page with mock data - DONE
- ✅ Update profile API integration
- ✅ Chat interface with session management
- ✅ Create chat API integration

### Phase 2: Campaigns & Posts (Week 3-4)
- Dashboard page
- Campaigns list page
- Campaign details page
- Generate campaign images
- Posts library page
- Post details page
- Generate posts
- Edit/update posts

### Phase 3: Social Integrations (Week 5-6)
- Integrations page
- Facebook connection flow
- Instagram discovery & connection
- Publish to Facebook/Instagram
- Content calendar page
- Schedule posts

### Phase 4: Advanced Features (Week 7-8)
- Post insights & analytics
- Meta Ads integration
- Ad campaigns viewer
- Settings page enhancements
- Mobile responsive polish

### Phase 5: Polish & Launch (Week 9-10)
- UI/UX improvements
- Loading states, error handling
- Empty states
- Onboarding tooltips
- Performance optimization
- Testing & bug fixes
- Documentation

---

## Design System Reference

### Color Palette
```
Primary: #000000 (black)
Secondary: #FFFFFF (white)
Gray Scale:
  - bg-gray-50 (backgrounds)
  - bg-gray-100 (hover states)
  - bg-gray-200 (borders, disabled)
  - text-gray-500 (secondary text)
  - text-gray-600 (labels)
  - text-gray-700 (icons)
  - text-gray-900 (primary text)

Accent Colors:
  - Blue: #3498DB (info, links)
  - Green: #2ECC71 (success)
  - Red: #E74C3C (error, danger)
  - Yellow: #F39C12 (warning)
  - Purple: #9B59B6 (premium features)

Platform Colors:
  - Facebook: #1877F2
  - Instagram: #E4405F
  - LinkedIn: #0A66C2
```

### Typography
```
Headings:
  - text-3xl font-bold (page titles)
  - text-2xl font-bold (section titles)
  - text-lg font-semibold (card titles)

Body:
  - text-base (regular text)
  - text-sm (secondary text, labels)
  - text-xs (captions, metadata)

Font Weight:
  - font-normal (400)
  - font-medium (500)
  - font-semibold (600)
  - font-bold (700)
```

### Spacing
```
Consistent spacing scale:
  - gap-2 (8px) - tight elements
  - gap-4 (16px) - related elements
  - gap-6 (24px) - sections
  - gap-8 (32px) - major sections

Padding:
  - p-4 (16px) - small cards
  - p-6 (24px) - standard cards
  - p-8 (32px) - large containers

Margin:
  - mt-4, mb-4 (16px)
  - mt-6, mb-6 (24px)
  - mt-8, mb-8 (32px)
```

### Border Radius
```
- rounded (4px) - small elements
- rounded-lg (8px) - cards, buttons
- rounded-full - pills, avatars
```

### Shadows
```
- shadow-sm - subtle elevation
- shadow - standard cards
- shadow-lg - modals, dropdowns
```

---

## Next Steps

1. **Review this plan** with the team
2. **Prioritize features** based on business goals
3. **Set up development environment**
   - API routes structure
   - Component library
   - State management
4. **Start Phase 1** implementation
5. **Iterate** based on feedback

---

## API Coverage Checklist

### Authentication ✅ (Partially Implemented)
- [x] POST /api/auth/register/ - Implemented
- [x] POST /api/auth/login/ - Implemented
- [x] POST /api/auth/logout/ - Implemented
- [ ] GET /api/auth/profile/ - TO DO
- [ ] PUT /api/auth/profile/ - TO DO

### Knowledge Base
- [ ] GET /api/auth/profile/ (knowledge_base)
- [ ] PUT /api/auth/profile/ (knowledge_base)

### Chat
- [ ] POST /api/chat/start/
- [ ] POST /api/chat/{sessionId}/message/
- [ ] GET /api/chat/{sessionId}/
- [ ] GET /api/chat/sessions/
- [ ] POST /api/chat/{sessionId}/create-campaign/

### Campaigns & Images
- [ ] POST /api/generate-image/
- [ ] GET /api/get-campaigns/
- [ ] POST /api/decoration/generate/
- [ ] POST /api/prompt/enhance/

### Social Posts
- [ ] POST /api/social/posts/generate/
- [ ] GET /api/social/posts/
- [ ] GET /api/social/posts/{postId}/
- [ ] PATCH /api/social/posts/{postId}/
- [ ] DELETE /api/social/posts/{postId}/
- [ ] POST /api/social/posts/{postId}/publish/
- [ ] GET /api/social/posts/{postId}/insights/

### Facebook Integration
- [ ] GET /api/social/facebook/auth/
- [ ] GET /api/social/facebook/callback/
- [ ] GET /api/social/facebook/pages/
- [ ] GET /api/social/facebook/status/
- [ ] POST /api/social/facebook/publish/
- [ ] DELETE /api/social/facebook/pages/{pageId}/

### Instagram Integration
- [ ] POST /api/social/instagram/discover/
- [ ] POST /api/social/instagram/discover-from-user/
- [ ] GET /api/social/instagram/accounts/
- [ ] POST /api/social/instagram/publish/
- [ ] POST /api/social/instagram/publish/carousel/
- [ ] DELETE /api/social/instagram/accounts/{accountId}/

### Scheduled Posts
- [ ] POST /api/social/scheduled/
- [ ] GET /api/social/scheduled/
- [ ] POST /api/social/scheduled/{postId}/cancel/
- [ ] DELETE /api/social/scheduled/{postId}/

### Meta Ads
- [ ] GET /api/social/meta-ads/businesses-and-accounts/
- [ ] POST /api/social/meta-ads/connect-account/
- [ ] GET /api/social/meta-ads/connected-accounts/
- [ ] GET /api/social/meta-ads/campaigns/
- [ ] GET /api/social/meta-ads/adsets/
- [ ] GET /api/social/meta-ads/ads/

**Total APIs: 46**
**Implemented: 3**
**To Implement: 43**

---

*End of UI/UX Plan*
