# Active Generation Flow — Endpoint Reference

All endpoints below are grouped by their stage in the end-to-end campaign creation flow.
Endpoints **not listed here** are support, admin, analytics, or legacy and are outside
the active generation pipeline.

Base URL: `https://<domain>/api/`

---

## ── STAGE 0: Authentication

> Get a Bearer token. Every subsequent request requires `Authorization: Bearer <token>`.

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `stg2/auth/facebook/url/` | Get Facebook OAuth redirect URL |
| `GET` | `stg2/auth/facebook/callback/` | Exchange OAuth code → create/login user, return token |
| `POST` | `stg2/auth/guest/` | Create guest session, return token (no Facebook required) |
| `GET` | `stg2/auth/me/` | Confirm token is valid, return current user |

---

## ── STAGE 1: Onboarding

> Fill in the business profile and brand identity that the AI will use as context.

| Method | URL | Purpose |
|--------|-----|---------|
| `GET/PATCH` | `stg2/business/data/` | Get or fill business profile (industry, product, audience, pricing…) |
| `GET/PATCH` | `stg2/brand-identity/` | Get or fill existing brand identity (colors, tone, logo…) |
| `GET` | `stg2/brand-identity/summary/` | Short summary of saved brand identity |
| `GET` | `stg2/profile/complete/` | Full dump of all onboarding data for one user |

---

## ── STAGE 2: Meta Connection & Page Selection

> Connect Meta assets and select which Facebook page the campaign is for.

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `stg2/meta/connect/url/` | Get Meta OAuth URL for connecting ad assets |
| `GET` | `stg2/meta/connect/callback/` | Complete Meta OAuth, store page/ad-account tokens |
| `GET` | `stg2/meta/status/` | Check if Meta account is connected |
| `GET` | `stg2/facebook-pages/` | List all Facebook pages for this user |
| `POST` | `stg2/facebook-pages/select/` | Set active Facebook page |
| `GET` | `stg2/facebook-pages/active/` | Confirm which page is currently active |

---

## ── STAGE 3: Business Analysis  *(optional — enriches AI context)*

> Run analyses before starting the chat. Results are auto-loaded into `CampaignState` by `StartChatView`.

| Method | URL | Purpose |
|--------|-----|---------|
| `POST/GET` | `analysis/profiles/` | Business profile for analysis |
| `POST/GET` | `analysis/swot/` | SWOT analysis (auto-loaded into chat context) |
| `POST/GET` | `analysis/competitor/` | Competitor analysis (auto-loaded into chat context) |
| `POST/GET` | `analysis/market/` | Market size analysis (auto-loaded into chat context) |

---

## ── STAGE 4: Load Previous Campaigns

> Shown on the dashboard before starting a new campaign.

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `campaigns/` | List all campaigns for the authenticated user |
| `GET` | `campaigns/<id>/full/` | Full campaign detail (strategy + plan + all posts) |
| `GET` | `social/posts/` | List previously saved/published posts |
| `GET` | `social/scheduled/list/` | List scheduled posts |

---

## ── STAGE 5: Start Chat Session

> Opens a LangGraph session. `StartChatView` loads all context (business profile, brand identity,
> SWOT, competitor, market, Meta pages) into `CampaignState` automatically.

| Method | URL | Purpose |
|--------|-----|---------|
| `POST` | `campaigns/chat/start/` | Start a new session, receive first AI message |
| `GET` | `campaigns/chat/<session_id>/` | Get session details + full message history |
| `GET` | `campaigns/chat/sessions/` | List all sessions for this user |

Request body for `chat/start/`:
```json
{
  "facebook_page_id": "optional — defaults to active page",
  "language": "optional — 'en' or 'ar', auto-detected if omitted",
  "initial_message": "optional — send a first message immediately"
}
```

---

## ── STAGE 6: LangGraph Campaign Creation  *(the core flow)*

> The state machine:
> `collect → branding_checkpoint → branding → strategy → plan → posts → save`

| Method | URL | Purpose |
|--------|-----|---------|
| `POST` | `campaigns/chat/<session_id>/lg-message/` | Send a user message during the `collect` phase |
| `POST` | `campaigns/chat/<session_id>/continue/` | Advance the graph to the next phase |
| `GET` | `campaigns/chat/<session_id>/lg-state/` | Poll current phase, generated content, and status |
| `POST` | `campaigns/chat/<session_id>/lg-save-campaign/` | Finalize and persist the campaign to the DB |

### Phase-by-Phase Flow

```
POST chat/start/
    │
    ▼  (user replies via lg-message/)
[COLLECT]          LLM gathers: title, objective, budget, duration,
                   target audience, platforms, content types, language
    │
    ▼  (POST continue/)
[BRANDING CHECKPOINT]  User chooses: generate / use saved / provide custom
    │
    ▼  (POST continue/)
[BRANDING]         BrandingEngine: Decomposer → 3 parallel paths → Judge merge
                   Writes result to BrandIdentityStg2 DB
    │
    ▼  (POST continue/)
[STRATEGY]         StrategyEngine: Decomposer → 4 expert paths → Judge merge
    │
    ▼  (POST continue/)
[PLAN]             PlanEngine: Decomposer → 3 expert paths → Judge merge
    │
    ▼  (POST continue/)
[POSTS]            PostsEngine: Decomposer → 4 creative paths → Judge merge
                   Creates CampaignPost records in DB
    │
    ▼  (POST continue/ or lg-save-campaign/)
[SAVE]             Campaign persisted — accessible via campaigns/<id>/full/
```

> **Auto mode:** Pass `"auto_mode": true` with `continue/` to run
> strategy → plan → posts → save back-to-back without manual review.

---

## ── STAGE 7: Post-Creation

> Use the generated campaign content.

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `campaigns/<id>/full/` | Retrieve the completed campaign with all content |
| `POST` | `social/scheduled/` | Schedule a post from the campaign |
| `GET` | `social/scheduled/list/` | View all scheduled posts |
| `GET/PATCH/DELETE` | `social/scheduled/<post_id>/` | Manage a specific scheduled post |
| `POST` | `social/scheduled/<post_id>/cancel/` | Cancel a scheduled post |
| `POST` | `social/facebook/publish/` | Publish directly to Facebook |
| `POST` | `social/instagram/publish/` | Publish directly to Instagram |

---

## ── DEV TOOLS  *(testing only — skip collect phase)*

> Bypass the LLM conversation and inject synthetic data directly into state.

| Method | URL | Purpose |
|--------|-----|---------|
| `POST` | `campaigns/dev/chat/<session_id>/fill-campaign/` | Inject campaign details (title, objective, budget…) |
| `POST` | `campaigns/dev/chat/<session_id>/fill-audience/` | Inject target audience data |
| `POST` | `campaigns/dev/chat/<session_id>/fill-branding/` | Inject branding data |
| `POST` | `campaigns/dev/chat/<session_id>/generate-content/` | Trigger strategy → plan → posts generation |
| `POST` | `campaigns/dev/chat/<session_id>/set-auto-mode/` | Enable auto mode on a live session |
| `POST` | `campaigns/dev/chat/<session_id>/fill-all/` | Fill all data + generate in one call |

---

## NOT IN THE FLOW

The following are fully functional but outside the campaign creation pipeline:

| Group | URL Prefix | What it is |
|-------|-----------|------------|
| Admin dashboard | `stg2/admin/*` | Internal monitoring — list users, view sessions, inspect conversations |
| Analytics — Facebook | `social/analytics/facebook/*` | Page Insights, post performance, demographics, trends |
| Analytics — Instagram | `social/analytics/instagram/*` | IG Insights, reels, stories, demographics |
| Analytics — Ads | `social/analytics/ad-campaigns/*` | Meta Ads campaign/adset/ad level insights |
| Meta Ads read | `social/meta-ads/*` | Browse ad accounts, campaigns, adsets, ads |
| Legacy social auth | `social/facebook/auth/`, `social/facebook/callback/` | Old Facebook OAuth (predates stg2 auth) |
| Legacy Facebook pages | `social/facebook/pages/` | Old page management (use `stg2/facebook-pages/` instead) |
| Instagram discovery | `social/instagram/discover/` | Discover linked IG accounts |
| Saved posts (standalone) | `social/posts/*` | Post save/publish not linked to a campaign |
| Business analysis chat | `analysis/chat/` | Separate chat for analysis only — not campaign creation |
| Legacy auth | `auth/*` | Old Django session auth (predates stg2) |
| Prompt enhancement | `prompt/` | Standalone prompt refinement utility |
| Decorations | `decoration/` | Standalone text decoration utility |
| Image generation | `generate-image/` | Standalone image generation (one image per campaign) |
| API docs | `schema/`, `docs/`, `redoc/` | OpenAPI / Swagger UI |
| Meta mgmt | `stg2/meta/disconnect/`, `stg2/meta/sync/`, `stg2/meta/data/summary/` | Meta account management |
| User account mgmt | `stg2/auth/update/`, `stg2/auth/delete/` | Profile update / account deletion |

---

## ── EXECUTION PHASE: Already Built

After `lg-save-campaign/` the following execution capabilities already exist in the codebase
and can be used immediately without any new development:

### Image & Caption Generation

| Method | URL | What it does |
|--------|-----|--------------|
| `POST` | `generate-image/` | Generates one image per campaign using Gemini 2.5 Flash Image. Input: `campaign_title`, `campaign_description`, `brand_colors`, logo file, etc. Returns image URL saved on the Campaign. |
| `POST` | `social/generate/` | Generates an AI-written post caption (text only, not saved). Input: `platform`, `campaign_title`, `brand_name`, `tone`, `language`. Returns caption string. |
| `POST` | `social/posts/generate/` | Generates a caption and saves it as a `GeneratedSocialPost` record linked to a Campaign. |
| `POST` | `prompt/enhance/` | Enhances a raw description into a structured image-generation prompt (title + subtitle + `enhanced_prompt`). Supports Arabic and English. |

### Publishing

| Method | URL | What it does |
|--------|-----|--------------|
| `POST` | `social/facebook/publish/` | Publishes text + optional image to a Facebook page via Meta Graph API. Returns `post_id`. |
| `POST` | `social/instagram/publish/` | Publishes single photo + caption to Instagram via two-step Meta container flow. |
| `POST` | `social/instagram/publish/carousel/` | Publishes a carousel of 2–10 images + caption to Instagram. |
| `POST` | `social/posts/<post_id>/publish/` | Publishes a saved `GeneratedSocialPost` to Facebook. Stores `facebook_post_id` back on the record and sets `status=published`. |

### Scheduling

| Method | URL | What it does |
|--------|-----|--------------|
| `POST` | `social/scheduled/` | Schedules a post. **Facebook:** native Meta scheduling via `scheduled_publish_time` (min 10 min in future). **Instagram:** backend-side scheduling (published by a worker at the specified time). |
| `GET` | `social/scheduled/list/` | Lists scheduled posts with filters by platform / status / account. |
| `GET/DELETE` | `social/scheduled/<post_id>/` | Get detail or delete a scheduled post. |
| `POST` | `social/scheduled/<post_id>/cancel/` | Cancel a scheduled post. |
| `POST` | `social/scheduled/<post_id>/reschedule/` | Move a scheduled post to a new time. |

### Insights & Analytics

| Method | URL | What it does |
|--------|-----|--------------|
| `GET` | `social/posts/<post_id>/insights/` | Fetches live insights from Meta Graph API for a saved post. **Facebook:** impressions, reach, engaged_users, clicks, reactions, comments, shares. **Instagram:** impressions, reach, likes, comments, saved, total_engagement, engagement_rate. |
| `GET` | `social/insights/<platform>/<platform_post_id>/` | Same as above but by platform post ID directly (no DB lookup needed). |
| `GET` | `social/analytics/facebook/<page_id>/overview/` | Facebook Page aggregated metrics + period comparison. |
| `GET` | `social/analytics/facebook/<page_id>/trends/` | Time-series trend data for charts. |
| `GET` | `social/analytics/facebook/<page_id>/posts/` | All tracked posts for a page with stats. |
| `GET` | `social/analytics/instagram/<account_id>/overview/` | Instagram account aggregated metrics. |
| `GET` | `social/analytics/instagram/<account_id>/trends/` | Instagram time-series data. |
| `GET` | `social/analytics/instagram/<account_id>/reels/` | Reel insights snapshots. |
| `GET` | `social/analytics/ad-campaigns/<account_id>/overview/` | Meta Ads account overview with campaign breakdown. |

---

## ── EXECUTION PHASE: Need to Build (WILL BUILD)

The following gaps must be implemented to complete the execution phase.
The existing publishing and scheduling services are already built — these endpoints
just need to wire `CampaignPost` records into them.

---

### 🔴 GAP 1 — CampaignPost → Publish Bridge  *(Critical)*

**Problem:** LangGraph saves posts as `CampaignPost` records. The publishing layer only
accepts `GeneratedSocialPost` records (a different model in `social_media`). There is
currently no way to take a LangGraph-generated post and publish it.

| Method | URL | What it should do |
|--------|-----|-------------------|
| `POST` | `campaigns/<campaign_id>/posts/<post_id>/publish/` | Read a `CampaignPost`, call the existing Facebook or Instagram publish service based on `CampaignPost.platform`, store the returned platform post ID back on `CampaignPost.external_post_id`, set `status=published`. |

---

### 🔴 GAP 2 — Per-Post Image Generation  *(Critical)*

**Problem:** `generate-image/` generates one image per campaign. Each `CampaignPost`
already has an `image_generation_prompt` field populated by LangGraph, but there is no
endpoint to generate an image from it.

| Method | URL | What it should do |
|--------|-----|-------------------|
| `POST` | `campaigns/<campaign_id>/posts/<post_id>/generate-image/` | Call the Gemini image service using `CampaignPost.image_generation_prompt` + brand colors. Save result to `CampaignPost.generated_image`. Return the image URL. |

---

### 🔴 GAP 3 — Bulk Schedule All Posts in a Campaign  *(Critical)*

**Problem:** `social/scheduled/` handles one post at a time. A campaign can have 7–14
posts — there is no way to schedule them all at once.

| Method | URL | What it should do |
|--------|-----|-------------------|
| `POST` | `campaigns/<campaign_id>/schedule-all/` | Accept `[{post_id, platform, publish_time}]`. Call the existing scheduling service for each entry. Return a summary of successes and failures. |

---

### 🟡 GAP 4 — Campaign Publish Status Tracker  *(Important)*

**Problem:** No endpoint shows which posts in a campaign are `draft / scheduled /
published / failed` at a glance.

| Method | URL | What it should do |
|--------|-----|-------------------|
| `GET` | `campaigns/<campaign_id>/posts/status/` | Return all `CampaignPost` records for the campaign with their `status`, `platform`, `scheduled_publish_at`, and `external_post_id`. Include a summary count: `{total, draft, scheduled, published, failed}`. |

---

### 🟡 GAP 5 — Campaign-Level Aggregate Analytics  *(Important)*

**Problem:** Insights exist per-page or per-post but nothing aggregates across all posts
in one campaign (total reach, total impressions, best-performing post).

| Method | URL | What it should do |
|--------|-----|-------------------|
| `GET` | `campaigns/<campaign_id>/analytics/` | For all `CampaignPost` records where `external_post_id` is set, fetch insights from Meta Graph API for each, aggregate the results, and return: total reach, total impressions, total engagement, per-post breakdown sorted by performance. |

---

### 🟢 GAP 6 — Batch Image Generation  *(Nice to Have)*

**Problem:** No way to generate images for all posts in a campaign in one call.

| Method | URL | What it should do |
|--------|-----|-------------------|
| `POST` | `campaigns/<campaign_id>/generate-all-images/` | Call the image service for every `CampaignPost` that has `image_generation_prompt` set but no `generated_image` yet. Returns `[{post_id, image_url, status}]`. |

---

### 🟢 GAP 7 — Instagram Reels Publishing  *(Nice to Have)*

**Problem:** No Reels publishing endpoint exists. Meta Graph API supports it.

| Method | URL | What it should do |
|--------|-----|-------------------|
| `POST` | `social/instagram/publish/reel/` | Publish a Reel via Meta Graph API. Input: `instagram_account_id`, `video_url`, `caption`, `cover_image_url` (optional). |
