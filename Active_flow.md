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

### `GET stg2/auth/facebook/url/`

**Auth:** None (public)

**Query Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `redirect_uri` | string | Yes | Frontend callback URL |

**Response `200`:**
```json
{
  "success": true,
  "auth_url": "https://www.facebook.com/v18.0/dialog/oauth?...",
  "state": "abc123..."
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "redirect_uri is required"}` |

---

### `GET stg2/auth/facebook/callback/`

**Auth:** None (public)

**Query Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string | Yes | Authorization code from Facebook |
| `state` | string | Yes | State parameter for CSRF protection |
| `error` | string | No | Error returned by Facebook (if user denied) |
| `error_description` | string | No | Description of the Facebook error |

**Response `200`:**
```json
{
  "success": true,
  "user": {
    "facebook_user_id": "123456",
    "name": "John Doe",
    "email": "john@example.com",
    "profile_picture_url": "https://..."
  },
  "auth_token": "...",
  "message": "Login successful"
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "<facebook error>", "error_description": "..."}` |
| `400` | `{"success": false, "error": "Missing required parameters: code and state"}` |
| `400` | `{"success": false, "error": "Invalid or expired state parameter. Please try again."}` |

---

### `POST stg2/auth/guest/`

**Auth:** None (public)

**Request Body (optional):**
```json
{
  "name": "Guest User"
}
```

**Response `201`:**
```json
{
  "success": true,
  "user": {
    "facebook_user_id": "guest_<hex16>",
    "name": "Guest User",
    "email": null,
    "profile_picture_url": null,
    "is_active": true,
    "created_at": "2026-02-24T...",
    "last_login_at": "2026-02-24T..."
  },
  "auth_token": "...",
  "is_guest": true,
  "facebook_page_id": "guest_page_<hex16>",
  "message": "Guest login successful. You can now fill onboarding data and start chat sessions."
}
```

---

### `GET stg2/auth/me/`

**Auth:** Bearer token

**Response `200`:**
```json
{
  "success": true,
  "user": {
    "facebook_user_id": "123456",
    "name": "John Doe",
    "email": "john@example.com",
    "profile_picture_url": "https://...",
    "is_active": true,
    "created_at": "2026-02-24T...",
    "last_login_at": "2026-02-24T..."
  }
}
```

**Errors:**
| Status | Body |
|--------|------|
| `401` | `{"success": false, "error": "Authentication required"}` |

---

## ── STAGE 1: Onboarding

> Fill in the business profile and brand identity that the AI will use as context.

| Method | URL | Purpose |
|--------|-----|---------|
| `GET/PATCH` | `stg2/business/data/` | Get or fill business profile (industry, product, audience, pricing…) |
| `GET/POST` | `stg2/brand-identity/` | Get or fill existing brand identity (colors, tone, logo…) |
| `GET` | `stg2/brand-identity/summary/` | Short summary of saved brand identity |
| `GET` | `stg2/profile/complete/` | Full dump of all onboarding data for one user |

### `GET stg2/business/data/`

**Auth:** Bearer token  
**Query Params (optional):** `facebook_page_id`

**Response `200`:**
```json
{
  "success": true,
  "business_data": {
    "product_or_service": "product|service|both",
    "business_type": "b2c|b2b|both",
    "business_model": "online|offline|hybrid",
    "real_start_date": "YYYY-MM-DD",
    "primary_market": "",
    "business_description": "",
    "unique_value_proposition": "",
    "primary_marketing_goal": "awareness|consideration|conversion|sales|leads",
    "strengths": [],
    "weaknesses": [],
    "sales_channels": [],
    "has_shipping": null,
    "delivery_regions": [],
    "return_policy": "",
    "average_price": "0.00",
    "offers_discounts": null,
    "discount_policy": "",
    "ideal_customer_description": "",
    "target_age_ranges": [],
    "target_gender": "male|female|all",
    "geographic_reach": "local|national|regional|global",
    "target_income_level": "budget|middle|upper_mid|luxury",
    "customer_needs": [],
    "customer_pain_points": [],
    "buying_motivations": [],
    "has_website": null,
    "social_platforms": [],
    "has_previous_ads": null,
    "completion_percentage": 0,
    "missing_fields": [],
    "updated_at": "ISO-8601"
  }
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "No active Facebook page selected. Please select a page first."}` |
| `404` | `{"success": false, "error": "Facebook page not found or does not belong to you"}` |

---

### `PATCH stg2/business/data/`

**Auth:** Bearer token  
**Query Params (optional):** `facebook_page_id`

**Request Body (all fields optional — partial update):**
```json
{
  "product_or_service": "product|service|both",
  "business_type": "b2c|b2b|both",
  "business_model": "online|offline|hybrid",
  "real_start_date": "YYYY-MM-DD",
  "primary_market": "string",
  "business_description": "string",
  "unique_value_proposition": "string",
  "primary_marketing_goal": "awareness|consideration|conversion|sales|leads",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "sales_channels": ["string"],
  "has_shipping": true,
  "delivery_regions": ["string"],
  "return_policy": "string",
  "average_price": "99.99",
  "offers_discounts": true,
  "discount_policy": "string",
  "ideal_customer_description": "string",
  "target_age_ranges": ["18-24", "25-34"],
  "target_gender": "male|female|all",
  "geographic_reach": "local|national|regional|global",
  "target_income_level": "budget|middle|upper_mid|luxury",
  "customer_needs": ["string"],
  "customer_pain_points": ["string"],
  "buying_motivations": ["string"],
  "has_website": true,
  "social_platforms": ["Instagram", "Facebook"],
  "has_previous_ads": false
}
```

**Response `200`:**
```json
{
  "success": true,
  "business_data": { "...same shape as GET..." },
  "message": "Business data updated successfully"
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "errors": {"<field>": ["..."]}}` |

---

### `GET stg2/brand-identity/`

**Auth:** Bearer token

**Response `200`:**
```json
{
  "success": true,
  "brand_identity": {
    "id": 1,
    "problem_statement": "",
    "core_value_proposition": "",
    "brand_purpose": "",
    "main_problem_solved": "",
    "core_value_offered": "",
    "target_audience_description": "",
    "market_category": "",
    "key_differentiation": "",
    "competitive_advantage": "",
    "brand_slogan": "",
    "tone_style": "formal|casual|friendly|bold|professional|conversational",
    "emotional_tone": "trustworthy|inspiring|playful|serious|empowering|warm",
    "language_level": "simple|professional|conversational|technical",
    "brand_personality": [],
    "primary_personality_traits": [],
    "secondary_personality_traits": [],
    "brand_vision": null,
    "brand_mission": null,
    "brand_values": [],
    "core_brand_values": [],
    "priority_values": [],
    "logo": "url|null",
    "primary_color": "#RRGGBB",
    "secondary_colors": [],
    "accent_color": "#RRGGBB",
    "fonts": [],
    "primary_font": null,
    "secondary_font": null,
    "font_style_preference": "modern|classic|tech|playful|elegant|bold|null",
    "design_style": "minimal|premium|bold|modern|vintage|corporate|creative",
    "design_inspiration_keywords": [],
    "brand_mood": "clean|energetic|serious|creative|luxurious|approachable",
    "shapes": [],
    "shape_style": "rounded|sharp|geometric|organic|null",
    "layout_preference": "grid-based|free-flow|asymmetric|structured|null",
    "patterns": [],
    "pattern_usage": false,
    "pattern_style": "abstract|geometric|organic|illustrative|null",
    "pattern_purpose": [],
    "is_complete": false,
    "completion_percentage": 0,
    "created_at": "ISO-8601",
    "updated_at": "ISO-8601"
  },
  "facebook_page": {
    "id": "page_id_string",
    "name": "Page Name"
  },
  "is_new": false
}
```

> A new `BrandIdentityStg2` is auto-created (via `get_or_create`) if none exists; `is_new` will be `true`.

---

### `POST stg2/brand-identity/`

**Auth:** Bearer token  
Supports `application/json` and `multipart/form-data` (for `logo` file upload). All fields optional (partial update via `partial=True`).

**Request Body:**
```json
{
  "problem_statement": "string",
  "core_value_proposition": "string",
  "brand_purpose": "string",
  "main_problem_solved": "string",
  "core_value_offered": "string",
  "target_audience_description": "string",
  "market_category": "string (max 255)",
  "key_differentiation": "string",
  "competitive_advantage": "string",
  "brand_slogan": "string (max 255)",
  "tone_style": "formal|casual|friendly|bold|professional|conversational",
  "emotional_tone": "trustworthy|inspiring|playful|serious|empowering|warm",
  "language_level": "simple|professional|conversational|technical",
  "brand_personality": ["bold", "friendly"],
  "primary_personality_traits": ["innovative"],
  "secondary_personality_traits": ["reliable"],
  "brand_vision": "string",
  "brand_mission": "string",
  "brand_values": ["quality", "trust"],
  "core_brand_values": ["integrity"],
  "priority_values": ["innovation"],
  "logo": "<file upload>",
  "primary_color": "#FF5733",
  "secondary_colors": ["#333333"],
  "accent_color": "#00FF00",
  "fonts": ["Roboto", "Open Sans"],
  "primary_font": "Roboto",
  "secondary_font": "Open Sans",
  "font_style_preference": "modern|classic|tech|playful|elegant|bold",
  "design_style": "minimal|premium|bold|modern|vintage|corporate|creative",
  "design_inspiration_keywords": ["clean", "tech"],
  "brand_mood": "clean|energetic|serious|creative|luxurious|approachable",
  "shapes": ["rounded", "geometric"],
  "shape_style": "rounded|sharp|geometric|organic",
  "layout_preference": "grid-based|free-flow|asymmetric|structured",
  "patterns": ["dots", "stripes"],
  "pattern_usage": true,
  "pattern_style": "abstract|geometric|organic|illustrative",
  "pattern_purpose": ["backgrounds"]
}
```

**Response `200`:**
```json
{
  "success": true,
  "brand_identity": { "...same shape as GET..." },
  "message": "Brand identity updated successfully"
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "errors": {"<field>": ["..."]}}` |

---

### `GET stg2/brand-identity/summary/`

**Auth:** Bearer token

**Response `200` (exists):**
```json
{
  "success": true,
  "brand_identity": {
    "id": 1,
    "problem_statement": "",
    "core_value_proposition": "",
    "logo": "url|null",
    "brand_slogan": "",
    "tone_style": "",
    "primary_color": "",
    "design_style": "",
    "is_complete": false,
    "completion_percentage": 0,
    "updated_at": "ISO-8601"
  },
  "facebook_page": { "id": "...", "name": "..." },
  "exists": true
}
```

**Response `200` (does not exist):**
```json
{
  "success": true,
  "brand_identity": null,
  "facebook_page": { "id": "...", "name": "..." },
  "exists": false
}
```

---

### `GET stg2/profile/complete/`

**Auth:** Bearer token

**Response `200`:**
```json
{
  "success": true,
  "user": {
    "facebook_user_id": "string",
    "name": "string",
    "email": "string|null",
    "profile_picture_url": "url|null",
    "is_active": true,
    "created_at": "ISO-8601",
    "last_login_at": "ISO-8601|null"
  },
  "business_data": {
    "...same shape as GET stg2/business/data/ response..."
  },
  "meta_connection": {
    "is_connected": true,
    "granted_scopes": "email,pages_show_list,...",
    "granted_scopes_list": ["email", "pages_show_list"],
    "token_expires_at": "ISO-8601|null",
    "sync_status": "pending|syncing|completed|failed",
    "sync_error_message": "",
    "last_synced_at": "ISO-8601|null",
    "connected_at": "ISO-8601",
    "disconnected_at": "ISO-8601|null"
  },
  "meta_data": {
    "business_data": {
      "business_id": "", "business_name": "", "business_verification_status": "",
      "user_role_in_business": "", "ad_account_id": "", "ad_account_name": "",
      "ad_account_currency": "", "ad_account_timezone": "", "ad_account_status": "",
      "ad_account_spend_cap": null, "fetched_at": "ISO-8601"
    },
    "facebook_pages": [
      {
        "page_id": "", "page_name": "", "page_category": "", "page_description": "",
        "page_website": "", "page_phone": "", "page_location": {},
        "page_followers_count": 0, "page_profile_picture_url": "", "fetched_at": "ISO-8601"
      }
    ],
    "instagram_accounts": [
      {
        "ig_business_account_id": "", "ig_username": "", "ig_profile_picture_url": "",
        "ig_bio": "", "ig_website": "", "ig_followers_count": 0,
        "linked_page_name": "", "fetched_at": "ISO-8601"
      }
    ],
    "campaign_history": [
      {
        "campaign_id": "", "campaign_name": "", "campaign_objective": "",
        "campaign_status": "", "start_time": null, "end_time": null,
        "insights": {}, "fetched_at": "ISO-8601"
      }
    ],
    "audience_signals": {
      "age_ranges": {}, "gender_distribution": {}, "top_locations": [],
      "languages": [], "interests": [], "behaviors": [],
      "platform_distribution": {}, "fetched_at": "ISO-8601"
    }
  }
}
```

> `business_data`, `meta_connection`, `meta_data` can each be `null` if not yet created/connected. `campaign_history` capped at 20.

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

### `GET stg2/meta/connect/url/`

**Auth:** Bearer token

**Query Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `redirect_uri` | string | Yes | Frontend callback URL for OAuth redirect |

**Response `200`:**
```json
{
  "success": true,
  "auth_url": "https://www.facebook.com/v18.0/dialog/oauth?...",
  "state": "abc123..."
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "redirect_uri is required"}` |

---

### `GET stg2/meta/connect/callback/`

**Auth:** Bearer token

**Query Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string | Yes | Authorization code from Facebook |
| `state` | string | Yes | CSRF state parameter |
| `error` | string | No | Error code if Facebook returned an error |

**Response `200`:**
```json
{
  "success": true,
  "message": "Meta connected successfully",
  "granted_scopes": ["pages_show_list", "ads_management", "..."],
  "sync_status": "completed"
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "<facebook error>", "error_description": "..."}` |
| `400` | `{"success": false, "error": "Missing required parameters: code and state"}` |

---

### `GET stg2/meta/status/`

**Auth:** Bearer token

**Response `200` (connected):**
```json
{
  "success": true,
  "is_connected": true,
  "connection": {
    "is_connected": true,
    "granted_scopes": "pages_show_list,ads_management,...",
    "granted_scopes_list": ["pages_show_list", "ads_management"],
    "token_expires_at": "2026-04-25T12:00:00Z",
    "sync_status": "completed",
    "sync_error_message": "",
    "last_synced_at": "2026-02-24T10:00:00Z",
    "connected_at": "2026-02-20T08:00:00Z",
    "disconnected_at": null
  }
}
```

**Response `200` (not connected):**
```json
{
  "success": true,
  "is_connected": false,
  "connection": null
}
```

---

### `GET stg2/facebook-pages/`

**Auth:** Bearer token

**Response `200`:**
```json
{
  "success": true,
  "pages": [
    {
      "id": 1,
      "page_id": "123456789",
      "page_name": "My Business Page",
      "page_category": "Local Business",
      "page_followers_count": 5200,
      "page_profile_picture_url": "https://...",
      "is_active": true,
      "has_brand_identity": false,
      "has_business_data": true
    }
  ],
  "active_page_id": 1,
  "count": 1
}
```

---

### `POST stg2/facebook-pages/select/`

**Auth:** Bearer token

**Request Body:**
```json
{
  "page_id": 123
}
```

> `page_id` is the **internal DB id** (not the Facebook page_id string).

**Response `200`:**
```json
{
  "success": true,
  "message": "Active Facebook page updated",
  "active_page": {
    "id": 123,
    "page_id": "123456789",
    "page_name": "My Business Page",
    "page_category": "Local Business",
    "page_followers_count": 5200
  }
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "page_id is required"}` |
| `404` | `{"success": false, "error": "Facebook page not found or does not belong to you"}` |

---

### `GET stg2/facebook-pages/active/`

**Auth:** Bearer token

**Response `200` (active page exists):**
```json
{
  "success": true,
  "active_page": {
    "id": 1,
    "page_id": "123456789",
    "page_name": "My Business Page",
    "page_category": "Local Business",
    "page_description": "We sell amazing things",
    "page_followers_count": 5200,
    "page_profile_picture_url": "https://...",
    "has_brand_identity": false,
    "has_business_data": true
  }
}
```

**Response `200` (no active page):**
```json
{
  "success": true,
  "active_page": null,
  "message": "No active Facebook page selected"
}
```

---

## ── STAGE 3: Business Analysis  *(optional — enriches AI context)*

> Run analyses before starting the chat. Results are auto-loaded into `CampaignState` by `StartChatView`.

### Business Profiles

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `analysis/profiles/` | List all business profiles for the user |
| `POST` | `analysis/profiles/` | Create a new business profile |
| `GET` | `analysis/profiles/<id>/` | Retrieve a specific business profile |
| `PUT/PATCH` | `analysis/profiles/<id>/` | Update a business profile |
| `DELETE` | `analysis/profiles/<id>/` | Delete a business profile |

#### `POST analysis/profiles/` — Create Profile

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `company_name` | string(255) | **Yes** | |
| `offering_type` | string | **Yes** | `product`, `service`, `both` |
| `business_type` | string | **Yes** | `b2c`, `b2b`, `b2b2c` |
| `business_model` | string | **Yes** | `online`, `offline`, `hybrid` |
| `business_description` | string | **Yes** | |
| `primary_market` | string(255) | **Yes** | |
| `unique_value_proposition` | string | No | |
| `real_start_date` | date | No | `YYYY-MM-DD` |
| `primary_marketing_goal` | string(50) | No | |
| `target_age_groups` | array | No | default `[]` |
| `target_gender` | string(50) | No | |
| `geographic_reach` | string(50) | No | |
| `target_income_level` | string(50) | No | |
| `customer_priorities` | array | No | default `[]` |
| `customer_pain_points` | array | No | default `[]` |
| `ideal_customer_description` | string | No | |
| `average_price` | decimal(10,2) | No | |
| `currency` | string(10) | No | default `"USD"` |
| `has_shipping` | bool | No | default `false` |
| `offers_discounts` | bool | No | default `false` |
| `discount_policy` | string | No | |
| `return_policy` | string | No | |
| `has_website` | bool | No | default `false` |
| `website_url` | URL(500) | No | |
| `social_platforms` | array | No | default `[]` |
| `has_previous_ads` | bool | No | default `false` |
| `known_competitors` | array | No | default `[]` |
| `do_not_compare` | array | No | default `[]` |
| `constraints` | object | No | default `{}` |

**Response `201`:**
```json
{
  "id": 1,
  "user": 5,
  "company_name": "Acme Corp",
  "offering_type": "product",
  "business_type": "b2c",
  "business_model": "online",
  "business_description": "...",
  "primary_market": "...",
  "unique_value_proposition": null,
  "real_start_date": null,
  "primary_marketing_goal": null,
  "target_age_groups": [],
  "target_gender": null,
  "geographic_reach": null,
  "target_income_level": null,
  "customer_priorities": [],
  "customer_pain_points": [],
  "ideal_customer_description": null,
  "average_price": null,
  "currency": "USD",
  "has_shipping": false,
  "offers_discounts": false,
  "discount_policy": null,
  "return_policy": null,
  "has_website": false,
  "website_url": null,
  "social_platforms": [],
  "has_previous_ads": false,
  "known_competitors": [],
  "do_not_compare": [],
  "constraints": {},
  "is_active": true,
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601"
}
```

> `GET` list returns array of these objects. `PUT` requires all required fields. `PATCH` accepts any subset. `DELETE` returns `204 No Content`.

---

### SWOT Analysis

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `analysis/swot/` | List all SWOT analyses for the user |
| `GET` | `analysis/swot/<id>/` | Retrieve a specific SWOT analysis |
| `POST` | `analysis/swot/run_analysis/` | **Run a new SWOT analysis** |
| `GET` | `analysis/swot/latest/` | Get the most recent SWOT analysis (optionally filtered by `business_profile_id`) |

#### `POST analysis/swot/run_analysis/`

**Request Body:**
```json
{
  "request_id": "swot-custom-id",
  "business_profile": {
    "company_name": "string",
    "offering_type": "product|service|both",
    "business_type": "b2c|b2b|b2b2c",
    "business_model": "online|offline|hybrid",
    "business_description": "string",
    "primary_market": "string",
    "unique_value_proposition": "string",
    "target_age_groups": ["18-24"],
    "customer_priorities": ["string"],
    "customer_pain_points": ["string"],
    "known_competitors": ["string"],
    "...all profile fields accepted..."
  },
  "options": {
    "temperature": 0.2,
    "focus_areas": ["string"],
    "include_recommendations": true
  }
}
```

> `request_id` and `options` are optional. `business_profile` is **required**.

**Response `201`:**
```json
{
  "id": 1,
  "business_profile_name": "Acme Corp",
  "user": 5,
  "business_profile": 1,
  "request_id": "swot-a1b2c3d4",
  "status": "completed",
  "business_type": "string|null",
  "industry_niche": "string|null",
  "value_proposition": "string|null",
  "target_customer_segment": "string|null",
  "key_differentiators": ["string"],
  "awareness_channels": ["string"],
  "consideration_factors": ["string"],
  "conversion_triggers": ["string"],
  "retention_drivers": ["string"],
  "drop_off_points": ["string"],
  "strengths": ["string"],
  "weaknesses": ["string"],
  "opportunities": ["string"],
  "threats": ["string"],
  "summary": "string|null",
  "recommendations": ["string"],
  "raw_data": {},
  "processing_time_ms": 1234,
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601"
}
```

#### `GET analysis/swot/latest/`

**Query Params:** `business_profile_id` (optional, int)

Returns single SWOT object or `404`: `{"message": "No SWOT analysis found"}`

---

### Competitor Analysis

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `analysis/competitor/` | List all competitor analyses for the user |
| `GET` | `analysis/competitor/<id>/` | Retrieve a specific competitor analysis |
| `POST` | `analysis/competitor/run_analysis/` | **Run a new competitor analysis** |
| `GET` | `analysis/competitor/latest/` | Get the most recent competitor analysis |

#### `POST analysis/competitor/run_analysis/`

**Request Body:** Same structure as SWOT `run_analysis/` (uses `AnalysisRequestSerializer`).

**Response `201`:**
```json
{
  "id": 1,
  "business_profile_name": "Acme Corp",
  "user": 5,
  "business_profile": 1,
  "request_id": "competitor-a1b2c3d4",
  "status": "completed",
  "direct_competitors": ["...AI-generated..."],
  "alternative_solutions": ["...AI-generated..."],
  "comparison_matrix": {},
  "your_advantages": ["string"],
  "your_gaps": ["string"],
  "summary": "string|null",
  "recommendations": ["string"],
  "raw_data": {},
  "processing_time_ms": 1234,
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601"
}
```

---

### Market Analysis

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `analysis/market/` | List all market analyses for the user |
| `GET` | `analysis/market/<id>/` | Retrieve a specific market analysis |
| `POST` | `analysis/market/run_analysis/` | **Run a new market analysis** |
| `GET` | `analysis/market/latest/` | Get the most recent market analysis |

#### `POST analysis/market/run_analysis/`

**Request Body:** Same structure as SWOT `run_analysis/` (uses `AnalysisRequestSerializer`).

**Response `201`:**
```json
{
  "id": 1,
  "business_profile_name": "Acme Corp",
  "user": 5,
  "business_profile": 1,
  "request_id": "market-a1b2c3d4",
  "status": "completed",
  "tam_value": "string|null",
  "tam_description": "string|null",
  "tam_source": "string|null",
  "sam_value": "string|null",
  "sam_description": "string|null",
  "sam_source": "string|null",
  "som_value": "string|null",
  "som_description": "string|null",
  "som_source": "string|null",
  "growth_rate": {},
  "demand_data": {},
  "audience_behavior": {},
  "market_trends": ["string"],
  "opportunities": ["string"],
  "challenges": ["string"],
  "summary": "string|null",
  "recommendations": ["string"],
  "raw_data": {},
  "processing_time_ms": 1234,
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601"
}
```

---

### Analysis Chat Sessions

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `analysis/chat/` | List all analysis chat sessions for the user |
| `POST` | `analysis/chat/` | Create a new analysis chat session |
| `GET` | `analysis/chat/<id>/` | Retrieve a specific chat session with message history |
| `PUT/PATCH` | `analysis/chat/<id>/` | Update a chat session |
| `DELETE` | `analysis/chat/<id>/` | Delete a chat session |
| `POST` | `analysis/chat/send_message/` | Send a message in an analysis chat (separate from campaign chat) |

#### `POST analysis/chat/` — Create Session

**Request Body:**
```json
{
  "business_profile": 1,
  "conversation_id": "string",
  "messages": []
}
```

**Response `201`:**
```json
{
  "id": 1,
  "business_profile_name": "Acme Corp",
  "user": 5,
  "business_profile": 1,
  "conversation_id": "uuid-string",
  "messages": [],
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601"
}
```

#### `POST analysis/chat/send_message/`

**Request Body:**
```json
{
  "business_profile_id": 1,
  "conversation_id": "uuid-string|null",
  "message": "string",
  "run_analysis": "swot|competitor|market|null",
  "stream": false,
  "temperature": 0.7
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `business_profile_id` | int | **Yes** | FK to BusinessProfile |
| `message` | string | **Yes** | User's message text |
| `conversation_id` | string | No | Omit to start a new session |
| `run_analysis` | string | No | Triggers in-chat analysis |
| `stream` | bool | No | Default `false` |
| `temperature` | float | No | Default `0.7`, range 0.0–1.0 |

**Response `200`:**
```json
{
  "conversation_id": "uuid-string",
  "message": "AI assistant response text",
  "analysis_result": {
    "analysis_type": "swot|competitor|market",
    "data": {},
    "processing_time_ms": 1234
  },
  "status": "string"
}
```

> `analysis_result` is `null` when `run_analysis` was not set.

---

## ── STAGE 4: Load Previous Campaigns

> Shown on the dashboard before starting a new campaign.

| Method | URL | Purpose |
|--------|-----|---------|
| `GET` | `campaigns/` | List all campaigns for the authenticated user |
| `GET` | `campaigns/<id>/full/` | Full campaign detail (strategy + plan + all posts) |
| `GET` | `social/posts/` | List previously saved/published posts |
| `GET` | `social/scheduled/list/` | List scheduled posts |

### `GET campaigns/`

**Auth:** Bearer token

**Query Parameters (all optional):**

| Param | Type | Description |
|-------|------|-------------|
| `status` | string | `draft`, `active`, `completed`, `archived` |
| `is_external` | string | `"true"` / `"false"` |
| `connected_account_type` | string | `none`, `facebook_page`, `instagram_account`, `ad_account` |
| `has_ai_content` | string | `"true"` / `"false"` |
| `limit` | int | Max results |
| `offset` | int | Skip first N |

**Response `200`:**
```json
{
  "success": true,
  "total": 10,
  "count": 5,
  "campaigns": [
    {
      "id": 1,
      "campaign_title": "...",
      "campaign_description": "...",
      "status": "draft",
      "connected_account_type": "facebook_page",
      "connected_account_name": "My Page",
      "is_external": false,
      "external_source": "manual",
      "meta_objective": "",
      "has_ai_content": true,
      "posts_count": 3,
      "target_audience": "...",
      "brand_colors": "#F8B695,#1C2C5F",
      "created_at": "ISO-8601",
      "updated_at": "ISO-8601",
      "is_editable": true
    }
  ]
}
```

---

### `GET campaigns/<id>/full/`

**Auth:** Bearer token (owner check)

**Response `200`:**
```json
{
  "success": true,
  "campaign": {
    "id": 123,
    "title": "...",
    "description": "...",
    "status": "draft",
    "objective": "OUTCOME_SALES",
    "strategy": {},
    "plan": {},
    "posts": [
      {
        "id": "uuid",
        "post_number": 1,
        "type": "image",
        "platform": "facebook",
        "status": "draft",
        "title": "...",
        "headline": "...",
        "caption": "...",
        "description": "...",
        "image": {
          "description": "...",
          "generation_prompt": "...",
          "generated_image_url": "/media/..."
        },
        "cta": {
          "type": "LEARN_MORE",
          "text": "...",
          "url": "https://..."
        },
        "targeting": {},
        "scheduling": {
          "publish_at": "2026-06-01T10:00:00",
          "recommended_time": "...",
          "best_day": "Monday",
          "delay_after_previous": 0
        },
        "performance_goals": {},
        "creative_notes": "...",
        "published_at": null,
        "external_post_id": "",
        "created_at": "...",
        "updated_at": "..."
      }
    ],
    "posts_count": 3,
    "generation_context": {},
    "generation_metadata": {},
    "branding": {
      "brand_colors": "#F8B695,#1C2C5F",
      "logo_url": "/media/logos/...",
      "logo_position": "top-right",
      "key_message": "...",
      "sub_message": "..."
    },
    "target_audience": "...",
    "external": {
      "is_external": false,
      "external_source": "manual",
      "external_campaign_id": "",
      "connected_account_type": "none",
      "connected_account_id": "",
      "connected_account_name": "",
      "meta_ad_campaign_id": null,
      "meta_status": ""
    },
    "meta_insights": {},
    "last_insights_sync": null,
    "source_session_id": "uuid-or-null",
    "created_at": "ISO-8601",
    "updated_at": "ISO-8601"
  }
}
```

**Errors:**
| Status | Body |
|--------|------|
| `403` | `{"success": false, "error": "You do not have permission to view this campaign"}` |
| `404` | `{"success": false, "error": "Campaign not found"}` |

---

### `GET social/posts/`

**Auth:** Bearer token

**Query Parameters:**

| Param | Type | Notes |
|-------|------|-------|
| `campaign_id` | int | Filter by campaign |
| `page` | int | Default `1` |
| `page_size` | int | Default `20`, max `100` |

**Response `200`:**
```json
{
  "success": true,
  "count": 42,
  "page": 1,
  "page_size": 20,
  "total_pages": 3,
  "posts": [
    {
      "id": 1,
      "campaign_id": 123,
      "campaign_title": "Summer Sale",
      "campaign_image": "/media/generated_xxx.png",
      "post_content": "Post text...",
      "platform": "instagram",
      "language": "en",
      "tone": "energetic",
      "ai_model": "gemini-2.5-flash-lite",
      "status": "draft",
      "facebook_post_id": null,
      "facebook_page_id": null,
      "published_at": null,
      "error_message": null,
      "created_at": "ISO-8601",
      "updated_at": "ISO-8601"
    }
  ]
}
```

---

### `GET social/scheduled/list/`

**Auth:** Bearer token

**Query Parameters:**

| Param | Type | Notes |
|-------|------|-------|
| `platform` | string | `facebook`, `instagram` |
| `status` | string | `scheduled`, `published`, `failed`, `cancelled` |
| `account_id` | string | Filter by account |
| `page` | int | Default `1` |
| `page_size` | int | Default `20`, max `100` |

**Response `200`:**
```json
{
  "success": true,
  "count": 5,
  "page": 1,
  "page_size": 20,
  "total_pages": 1,
  "posts": [
    {
      "id": 1,
      "platform": "facebook",
      "account_id": "123456",
      "account_name": "My Business Page",
      "caption": "Post content...",
      "media_urls": ["https://..."],
      "scheduled_at": "2026-03-01T14:00:00Z",
      "status": "scheduled",
      "facebook_post_id": null,
      "created_at": "ISO-8601"
    }
  ]
}
```

---

## ── STAGE 5: Start Chat Session

> Opens a LangGraph session. `StartChatView` loads all context (business profile, brand identity,
> SWOT, competitor, market, Meta pages) into `CampaignState` automatically.

| Method | URL | Purpose |
|--------|-----|---------|
| `POST` | `campaigns/chat/start/` | Start a new session, receive first AI message |
| `GET` | `campaigns/chat/<session_id>/` | Get session details + full message history |
| `GET` | `campaigns/chat/sessions/` | List all sessions for this user |

### `POST campaigns/chat/start/`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `initial_message` | string | No | Optional first message from user |
| `language` | string | No | `"en"` or `"ar"`. Default `"en"`, auto-detects if not set |
| `facebook_page_id` | string | No | Explicit page ID; falls back to user's `active_facebook_page` |

**Response `201`:**
```json
{
  "success": true,
  "session_id": "uuid-string",
  "message": {
    "role": "assistant",
    "content": "AI greeting text..."
  },
  "phase": "collect",
  "status": {
    "action": "collecting",
    "step": "collect",
    "label": "Collecting campaign data",
    "next_step": null,
    "next_action": "send_message"
  },
  "collected_data": {},
  "missing_fields": ["campaign.title", "campaign.objective", "..."],
  "token_usage": {}
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "No Facebook page selected..."}` |
| `404` | `{"success": false, "error": "Facebook page ... not found..."}` |
| `500` | `{"success": false, "error": "Failed to start chat: ..."}` |

---

### `GET campaigns/chat/<session_id>/`

**Response `200`:**
```json
{
  "success": true,
  "session": {
    "id": "uuid",
    "user": {
      "id": 1,
      "username": "...",
      "email": "...",
      "first_name": "...",
      "last_name": "...",
      "knowledge_base": {},
      "date_joined": "..."
    },
    "status": "active",
    "user_context": {},
    "collected_data": {},
    "campaign": null,
    "messages": [
      {
        "id": "uuid",
        "role": "user",
        "content": "...",
        "metadata": {},
        "created_at": "ISO-8601"
      }
    ],
    "created_at": "...",
    "updated_at": "...",
    "completed_at": null
  }
}
```

**Errors:**
| Status | Body |
|--------|------|
| `404` | `{"success": false, "error": "Chat session not found"}` |

---

### `GET campaigns/chat/sessions/`

**Response `200`:**
```json
{
  "success": true,
  "sessions": [
    { "...same ChatSession shape as above..." }
  ]
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

### Standard Response Envelope

All LangGraph endpoints share this response structure:

```json
{
  "success": true,
  "message": "AI response text...",
  "model": "deepseek-chat",
  "phase": "collect",
  "status": {
    "action": "collecting",
    "step": "collect",
    "label": "Human-readable label",
    "next_step": null,
    "next_action": "send_message"
  },
  "collected_data": {},
  "missing_fields": [],
  "is_complete": false,
  "auto_mode": false,
  "generation_pending": "branding",
  "awaiting_continue": true,
  "current_display": "branding",
  "branding": {},
  "strategy": {},
  "plan": {},
  "posts": [],
  "campaign_id": 123,
  "token_usage": {},
  "detected_language": "en",
  "language_name": "English"
}
```

> Fields like `branding`, `strategy`, `plan`, `posts`, `campaign_id`, `generation_pending`, `awaiting_continue`, `current_display` are only present when relevant.

#### `status.action` values:

| Value | Meaning | Frontend should… |
|-------|---------|-------------------|
| `collecting` | Still gathering data | Show chat input, use `lg-message/` |
| `generation_pending` | Generation queued | Show loading spinner, call `continue/` |
| `generating` | AI is generating | Show loading spinner |
| `review` | Content ready for review | Display content, let user approve or give feedback via `continue/` |
| `complete` | Campaign saved | Show success, navigate to campaign |
| `error` | Something failed | Show error message |

---

### `POST campaigns/chat/<session_id>/lg-message/`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | **Yes** | User's chat message |
| `form_data` | object | No | Pre-filled UI form fields |

`form_data` shape:
```json
{
  "campaign_title": "...",
  "campaign_objective": "...",
  "age_range": [25, 45],
  "gender": "all",
  "locations": ["USA", "Canada"],
  "purpose_distribution": { "awareness": 40, "engagement": 30, "conversion": 30 },
  "languages": ["English"]
}
```

**Response `200`:** Standard envelope.

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "Message is required"}` |

---

### `POST campaigns/chat/<session_id>/continue/`

**Request Body (all optional):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `feedback` | string | No | Feedback to adjust current output without advancing |

> **With `feedback`:** applies feedback to current output (branding/strategy/plan/posts), returns updated content, stays at same checkpoint.  
> **Without `feedback`:** advances to next generation phase.

**Response `200`:** Standard envelope.

---

### `GET campaigns/chat/<session_id>/lg-state/`

**Response `200`:**
```json
{
  "session_id": "uuid",
  "phase": "collect",
  "status": {},
  "collected_data": {},
  "missing_fields": [],
  "branding_output": null,
  "strategy_output": null,
  "plan_output": null,
  "posts_output": null,
  "campaign_id": null,
  "is_complete": false,
  "awaiting_continue": false,
  "current_display": null,
  "generation_pending": null,
  "auto_mode": false,
  "token_usage": {},
  "detected_language": "en",
  "language_name": "English"
}
```

**Errors:**
| Status | Body |
|--------|------|
| `404` | `{"error": "Session not found"}` |

---

### `POST campaigns/chat/<session_id>/lg-save-campaign/`

**Request Body (all optional — omit to use session state):**

| Field | Type | Description |
|-------|------|-------------|
| `branding` | object | Override `branding_output` from session state |
| `strategy` | object | Override `strategy_output` |
| `plan` | object | Override `plan_output` |
| `posts` | array | Override `posts_output` |

**Response `200`:**
```json
{
  "success": true,
  "campaign_id": 123,
  "message": "Campaign saved successfully with frontend data"
}
```

---

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
| `GET/DELETE` | `social/scheduled/<post_id>/` | Manage a specific scheduled post |
| `POST` | `social/scheduled/<post_id>/cancel/` | Cancel a scheduled post |
| `POST` | `social/scheduled/<post_id>/reschedule/` | Reschedule a post to a new time |
| `POST` | `social/facebook/publish/` | Publish directly to Facebook |
| `POST` | `social/instagram/publish/` | Publish directly to Instagram |

### `POST social/facebook/publish/`

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `page_id` | string | **Yes** | Facebook Page ID |
| `message` | string(5000) | **Yes** | Post message content |
| `link` | URL | No | Link to include |
| `image_url` | URL | No | Image URL to include |

**Response `201`:**
```json
{
  "success": true,
  "post_id": "123456789_987654321",
  "page_id": "123456789"
}
```

---

### `POST social/instagram/publish/`

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `instagram_account_id` | string | **Yes** | IG Business Account ID |
| `image_url` | URL | **Yes** | Must be publicly accessible |
| `caption` | string(2200) | **Yes** | Instagram caption |

**Response `200`:**
```json
{
  "success": true,
  "media_id": "17841400...",
  "instagram_account_id": "17841400..."
}
```

---

### `POST social/instagram/publish/carousel/`

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `instagram_account_id` | string | **Yes** | IG Business Account ID |
| `image_urls` | array of URLs | **Yes** | 2–10 publicly accessible image URLs |
| `caption` | string(2200) | **Yes** | Carousel caption |

**Response `200`:**
```json
{
  "success": true,
  "media_id": "17841400...",
  "instagram_account_id": "17841400...",
  "image_count": 3
}
```

---

### `POST social/scheduled/`

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `platform` | string | **Yes** | `facebook` or `instagram` |
| `account_id` | string | **Yes** | Page ID (FB) or IG Account ID |
| `caption` | string(5000) | **Yes** | Post content |
| `media_urls` | array of URLs | No | Required for Instagram |
| `scheduled_at` | datetime | **Yes** | ISO 8601, must be in the future |
| `timezone` | string | No | Default `UTC` |

**Response `201`:**
```json
{
  "success": true,
  "scheduled_post": {
    "id": 1,
    "platform": "instagram",
    "account_id": "17841400...",
    "account_name": "mybusiness",
    "caption": "Check out our new product!",
    "media_urls": ["https://example.com/img.jpg"],
    "scheduled_at": "2026-03-01T14:00:00Z",
    "status": "scheduled",
    "facebook_post_id": null,
    "created_at": "ISO-8601"
  },
  "message": "Post scheduled for backend publishing (Instagram does not support native scheduling)"
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "Scheduled time must be in the future..."}` |
| `400` | `{"success": false, "error": "Facebook requires scheduled posts to be at least 10 minutes in the future"}` |
| `400` | `{"success": false, "error": "Instagram posts require at least one image URL"}` |
| `404` | `{"success": false, "error": "Facebook page X not found or not connected"}` |

---

### `GET/DELETE social/scheduled/<post_id>/`

**GET Response `200`:**
```json
{
  "success": true,
  "post": { "...ScheduledPost object..." }
}
```

**DELETE:** Can only delete posts with status `scheduled` or `failed`. Returns `204 No Content`.

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "Cannot delete post with status: published"}` |
| `404` | `{"success": false, "error": "Scheduled post not found"}` |

---

### `POST social/scheduled/<post_id>/cancel/`

**Request Body:** None

**Response `200`:**
```json
{
  "success": true,
  "message": "Scheduled post cancelled",
  "post": { "...ScheduledPost object with status 'cancelled'..." }
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "Can only cancel posts with status \"scheduled\". Current status: X"}` |

---

### `POST social/scheduled/<post_id>/reschedule/`

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `scheduled_at` | datetime | **Yes** | ISO 8601, must be in the future |
| `timezone` | string | No | Default `UTC` |

**Response `200`:**
```json
{
  "success": true,
  "message": "Post rescheduled successfully",
  "post": { "...ScheduledPost object with updated scheduled_at..." }
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "Can only reschedule posts with status \"scheduled\". Current status: X"}` |
| `400` | `{"success": false, "error": "New scheduled time must be in the future"}` |

---

## ── DEV TOOLS  *(testing only — skip collect phase)*

> Bypass the LLM conversation and inject synthetic data directly into state.
> All endpoints use `AllowAny` auth and return the standard LangGraph envelope.

| Method | URL | Purpose |
|--------|-----|---------|
| `POST` | `campaigns/dev/chat/<session_id>/fill-campaign/` | Inject campaign details (title, objective, budget…) |
| `POST` | `campaigns/dev/chat/<session_id>/fill-audience/` | Inject target audience data |
| `POST` | `campaigns/dev/chat/<session_id>/fill-branding/` | Inject branding data |
| `POST` | `campaigns/dev/chat/<session_id>/generate-content/` | Trigger strategy → plan → posts generation |
| `POST` | `campaigns/dev/chat/<session_id>/set-auto-mode/` | Enable auto mode on a live session |
| `POST` | `campaigns/dev/chat/<session_id>/fill-all/` | Fill all data + generate in one call |

### `POST .../fill-campaign/`

**Request Body:** None required (uses hardcoded sample data).

Injects:
```json
{
  "campaign.title": "Summer Sale 2026",
  "campaign.objective": "SALES",
  "campaign.primary_goal": "Drive sales and increase revenue through summer promotions",
  "campaign.budget.total": 5000,
  "campaign.budget.type": "LIFETIME",
  "campaign.budget.currency": "USD",
  "campaign.start_date": "2026-06-01",
  "campaign.end_date": "2026-08-31",
  "platforms.primary": "instagram"
}
```

**Response `200`:** `{"success": true, "phase": "...", ...}`

---

### `POST .../fill-audience/`

**Request Body:** None required.

Injects:
```json
{
  "audience.age_range": [25, 45],
  "audience.gender": "all",
  "audience.locations": ["United States", "Canada"],
  "audience.languages": ["English"],
  "audience.interests": ["fashion", "lifestyle", "shopping"],
  "audience.behaviors": ["online_shopping", "social_media_active"],
  "content_strategy.posts_count": 3,
  "content_strategy.posting_frequency": "daily",
  "content_strategy.purpose_distribution": { "awareness": 40, "engagement": 30, "conversion": 30 }
}
```

**Response `200`:** `{"success": true, "phase": "...", ...}`

---

### `POST .../fill-branding/`

**Request Body:** None required. Triggers AI branding generation using session's collected data + user context.

**Response `200`:**
```json
{
  "success": true,
  "phase": "...",
  "branding": { "...generated branding object..." }
}
```

---

### `POST .../generate-content/`

**Request Body:** None required. Generates strategy + plan + posts using session state.

**Response `200`:**
```json
{
  "success": true,
  "message": "Content generation complete (LangGraph-integrated)",
  "phase": "...",
  "auto_mode": false,
  "data": {
    "strategy_generated": true,
    "plan_generated": true,
    "posts_generated": true,
    "posts_count": 3
  },
  "strategy": {},
  "plan": {},
  "posts": []
}
```

---

### `POST .../set-auto-mode/`

**Request Body:**

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `auto_mode` | bool | No | `true` |

**Response `200`:** `{"success": true, ...}`

---

### `POST .../fill-all/`

**Request Body:** None required. Fills all phases and generates all content in one call with `auto_mode` enabled.

**Response `200`:**
```json
{
  "success": true,
  "message": "All phases filled and content generated (LangGraph-integrated)",
  "auto_mode": true,
  "phases_completed": {
    "phase1_campaign_details": true,
    "phase2_target_audience": true,
    "phase3_branding": true,
    "phase4_strategy": true,
    "phase4_plan": true,
    "phase4_posts": true,
    "posts_count": 3
  },
  "branding": {},
  "strategy": {},
  "plan": {},
  "posts": []
}
```

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
| `POST` | `generate-image/` | Generates one image per campaign using Gemini 2.5 Flash Image. |
| `POST` | `social/generate/` | Generates an AI-written post caption (text only, not saved). |
| `POST` | `social/posts/generate/` | Generates a caption and saves it as a `GeneratedSocialPost` record linked to a Campaign. |
| `POST` | `prompt/enhance/` | Enhances a raw description into a structured image-generation prompt. |

#### `POST generate-image/`

**Auth:** Bearer token  
Supports `multipart/form-data` and `application/json`.

**Request Body:**

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `campaign_title` | **Yes** | string | Also accepts `campaignTitle` |
| `campaign_description` | **Yes** | string | Also accepts `campaignDescription` |
| `key_message` | No | string | Auto-generated by AI if omitted |
| `sub_message` | No | string | Auto-generated by AI if omitted |
| `target_audience` | No | string | |
| `brand_colors` | No | string | |
| `logo_position` | No | string | `top-left`, `top-right`, `bottom-left`, `bottom-right`, `center`. Default `top-right` |
| `logo` / `file` | No | file | Logo image file upload |

**Response `201`:**
```json
{
  "id": 1,
  "campaign_title": "Summer Sale 2025",
  "campaign_description": "Amazing discounts",
  "key_message": "Up to 50% Off",
  "sub_message": "Limited time only",
  "brand_colors": "#FF0000",
  "logo": "/media/logos/logo.png",
  "logo_position": "top-right",
  "target_audience": "Young professionals",
  "color_scheme": "",
  "decoration_style": "",
  "generated_image": "/media/generated_ab12cd34.png",
  "created_at": "ISO-8601",
  "social_posts": [],
  "ai_available": true,
  "ai_used": true,
  "image_data": "data:image/png;base64,iVBOR...",
  "generated_key_message": "Up to 50% Off",
  "generated_sub_message": "Limited time only",
  "messages_auto_generated": true
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"detail": "campaign_title is required"}` |
| `400` | `{"detail": "campaign_description is required"}` |
| `500` | `{"detail": "Image generation failed", "ai_available": false}` |

---

#### `POST social/generate/`

**Auth:** Bearer token

**Request Body:**

| Field | Required | Type | Choices |
|-------|----------|------|---------|
| `campaign_title` | **Yes** | string(200) | |
| `campaign_description` | No | string(1000) | |
| `key_message` | No | string(200) | |
| `sub_message` | No | string(300) | |
| `brand_name` | No | string(100) | |
| `platform` | No | string | `general` (default), `facebook`, `instagram`, `twitter`, `linkedin` |
| `language` | No | string | `auto` (default), `en`, `ar` |
| `tone` | No | string | `professional` (default), `casual`, `energetic`, `friendly` |

**Response `200`:**
```json
{
  "success": true,
  "post": "🔥 Summer Sale 2025 is here! Get amazing discounts...",
  "campaign_title": "Summer Sale 2025",
  "platform": "instagram",
  "language": "en",
  "tone": "energetic",
  "model": "gemini-2.5-flash-lite"
}
```

---

#### `POST social/posts/generate/`

**Auth:** Bearer token

**Request Body:** Must provide **either** `campaign_id` or `campaign_title`.

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `campaign_id` | Conditional | int | ID of existing campaign |
| `campaign_title` | Conditional | string | Used to find campaign if `campaign_id` not given |
| `campaign_description` | No | string | For context |
| `key_message` | No | string | |
| `sub_message` | No | string | |
| `brand_name` | No | string | |
| `platform` | No | string | `general`, `facebook`, `instagram`, `twitter`, `linkedin` |
| `language` | No | string | `auto`, `en`, `ar` |
| `tone` | No | string | `professional`, `casual`, `energetic`, `friendly` |

**Response `201`:**
```json
{
  "success": true,
  "post": {
    "id": 1,
    "campaign_id": 123,
    "campaign_title": "Summer Sale",
    "campaign_image": "/media/generated_xxx.png",
    "post_content": "🔥 Summer Sale is here!...",
    "platform": "instagram",
    "language": "en",
    "tone": "energetic",
    "ai_model": "gemini-2.5-flash-lite",
    "status": "draft",
    "facebook_post_id": null,
    "facebook_page_id": null,
    "published_at": null,
    "error_message": null,
    "created_at": "ISO-8601",
    "updated_at": "ISO-8601"
  }
}
```

**Errors:**
| Status | Body |
|--------|------|
| `404` | `{"success": false, "error": "Campaign with id X not found"}` |
| `404` | `{"success": false, "error": "No campaign found with title '...'. Please create a campaign first or provide campaign_id."}` |

---

#### `POST prompt/enhance/`

**Auth:** Bearer token

**Request Body:**

| Field | Required | Type | Choices |
|-------|----------|------|---------|
| `description` | **Yes** | string(1000) | Campaign description |
| `title` | No | string(200) | Default `""` |
| `target_audience` | No | string(500) | Default `""` |
| `decoration_style` | No | string | `""`, `dots`, `grid`, `rings` |
| `language` | No | string | `auto` (default), `en`, `ar` |

**Response `200`:**
```json
{
  "success": true,
  "original_title": "Fresh Juice Campaign",
  "original_description": "منتج عصير برتقال طبيعي",
  "target_audience": "Health-conscious millennials",
  "decoration_style": "Modern minimalist",
  "title": "Fresh Orange Juice",
  "subtitle": "Pure Natural Goodness in Every Bottle",
  "enhanced_prompt": "Professional product photography of natural orange juice...",
  "detected_language": "ar",
  "model": "gemini-2.5-flash-image"
}
```

---

### Publishing

| Method | URL | What it does |
|--------|-----|--------------|
| `POST` | `social/facebook/publish/` | Publishes text + optional image to a Facebook page via Meta Graph API. Returns `post_id`. |
| `POST` | `social/instagram/publish/` | Publishes single photo + caption to Instagram via two-step Meta container flow. |
| `POST` | `social/instagram/publish/carousel/` | Publishes a carousel of 2–10 images + caption to Instagram. |
| `POST` | `social/posts/<post_id>/publish/` | Publishes a saved `GeneratedSocialPost` to Facebook. |

#### `POST social/posts/<post_id>/publish/`

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `page_id` | string | **Yes** |

**Response `200`:**
```json
{
  "success": true,
  "post_id": 1,
  "facebook_post_id": "123456789_987654321",
  "page_id": "123456789",
  "message": "Post published successfully"
}
```

> Request/response details for `social/facebook/publish/`, `social/instagram/publish/`, and `social/instagram/publish/carousel/` are in Stage 7 above.

---

### Scheduling

| Method | URL | What it does |
|--------|-----|--------------|
| `POST` | `social/scheduled/` | Schedules a post. **Facebook:** native Meta scheduling. **Instagram:** backend-side scheduling. |
| `GET` | `social/scheduled/list/` | Lists scheduled posts with filters by platform / status / account. |
| `GET/DELETE` | `social/scheduled/<post_id>/` | Get detail or delete a scheduled post. |
| `POST` | `social/scheduled/<post_id>/cancel/` | Cancel a scheduled post. |
| `POST` | `social/scheduled/<post_id>/reschedule/` | Move a scheduled post to a new time. |

> Request/response details for all scheduling endpoints are in Stage 7 above.

---

### Insights & Analytics

| Method | URL | What it does |
|--------|-----|--------------|
| `GET` | `social/posts/<post_id>/insights/` | Fetches live insights from Meta Graph API for a saved post. |
| `GET` | `social/insights/<platform>/<platform_post_id>/` | Same as above but by platform post ID directly. |
| `GET` | `social/analytics/facebook/<page_id>/overview/` | Facebook Page aggregated metrics + period comparison. |
| `GET` | `social/analytics/facebook/<page_id>/trends/` | Time-series trend data for charts. |
| `GET` | `social/analytics/facebook/<page_id>/posts/` | All tracked posts for a page with stats. |
| `GET` | `social/analytics/instagram/<account_id>/overview/` | Instagram account aggregated metrics. |
| `GET` | `social/analytics/instagram/<account_id>/trends/` | Instagram time-series data. |
| `GET` | `social/analytics/instagram/<account_id>/reels/` | Reel insights snapshots. |
| `GET` | `social/analytics/ad-campaigns/<account_id>/overview/` | Meta Ads account overview with campaign breakdown. |

#### `GET social/posts/<post_id>/insights/`

**Auth:** Bearer token

**Response `200` (Facebook post):**
```json
{
  "success": true,
  "post_id": "123456789_987654321",
  "page_id": "123456789",
  "platform": "facebook",
  "insights": {
    "impressions": 1500,
    "reach": 1200,
    "engaged_users": 150,
    "clicks": 75,
    "total_engagement": 200,
    "reactions": { "total": 120, "like": 100, "love": 15, "wow": 3, "haha": 2, "sad": 0, "angry": 0 },
    "comments": 30,
    "shares": 20
  },
  "fetched_at": "ISO-8601",
  "local_post_id": 1,
  "campaign_id": 123,
  "campaign_title": "Summer Sale"
}
```

**Response `200` (Instagram post):**
```json
{
  "success": true,
  "media_id": "17895695668004550",
  "instagram_account_id": "17841405822304914",
  "platform": "instagram",
  "media_type": "IMAGE",
  "insights": {
    "impressions": 2500,
    "reach": 2000,
    "likes": 300,
    "comments": 45,
    "saved": 25,
    "total_engagement": 370,
    "engagement_rate": 18.5
  },
  "fetched_at": "ISO-8601",
  "local_post_id": 1,
  "campaign_id": 123,
  "campaign_title": "Summer Sale"
}
```

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "Post is not published. Only published posts have insights."}` |
| `404` | `{"success": false, "error": "Post with ID X not found"}` |

---

#### `GET social/insights/<platform>/<platform_post_id>/`

**Auth:** Bearer token

**Query Parameters:**

| Param | Required | Platform | Notes |
|-------|----------|----------|-------|
| `page_id` | Recommended | facebook | Facebook Page ID |
| `account_id` | Recommended | instagram | Instagram Account ID |

**Response `200`:** Same insights structure as above (platform-dependent).

**Errors:**
| Status | Body |
|--------|------|
| `400` | `{"success": false, "error": "Invalid platform: X. Use \"facebook\" or \"instagram\"."}` |

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
