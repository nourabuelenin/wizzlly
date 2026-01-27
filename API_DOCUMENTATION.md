# Frontend API Endpoints Documentation

**Base URL**: `http://134.209.30.66`

**Note**: Authentication is currently disabled. All endpoints accept requests without authentication headers.

---

## Authentication APIs

### Register User
- **Endpoint**: `POST /api/auth/register/`
- **Function**: `register()`

**Request Format**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "password_confirm": "SecurePassword123",
  "first_name": "John",
  "last_name": "Doe",
  "knowledge_base": {
    "brand": {
      "name": "My Brand",
      "industry": "E-commerce",
      "brand_colors": ["#FF5733", "#3498DB"],
      "logo_url": "https://example.com/logo.png",
      "description": "Leading fashion brand"
    },
    "account": {
      "ad_account_id": "act_123456",
      "business_id": "biz_789",
      "currency": "USD",
      "timezone": "America/New_York",
      "country": "US"
    }
  }
}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "knowledge_base": {
      "brand_name": "My Brand",
      "industry": "E-commerce",
      "ad_account_id": "act_123456"
    }
  },
  "token": "a1b2c3d4e5f6g7h8i9j0"
}
```

---

### Login User
- **Endpoint**: `POST /api/auth/login/`
- **Function**: `login()`

**Request Format**:
```json
{
  "username": "john_doe",
  "password": "SecurePassword123"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "token": "a1b2c3d4e5f6g7h8i9j0"
}
```

**Response (Error - 401)**:
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### Get Profile
- **Endpoint**: `GET /api/auth/profile/`
- **Function**: `getProfile()`

**Request Format**: None (GET request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "knowledge_base": {
      "brand_name": "My Brand",
      "industry": "E-commerce",
      "brand_colors": ["#FF5733"],
      "logo_url": "https://example.com/logo.png",
      "ad_account_id": "act_123456",
      "currency": "USD",
      "timezone": "America/New_York"
    }
  }
}
```

---

### Update Profile
- **Endpoint**: `PUT /api/auth/profile/`
- **Function**: `updateProfile()`

**Request Format**:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "newemail@example.com",
  "knowledge_base": {
    "brand": {
      "name": "Updated Brand Name",
      "industry": "Fashion"
    },
    "account": {
      "ad_account_id": "act_999888",
      "currency": "EUR"
    }
  }
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "newemail@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "knowledge_base": {
      "brand_name": "Updated Brand Name",
      "industry": "Fashion",
      "ad_account_id": "act_999888",
      "currency": "EUR"
    }
  }
}
```

---

### Logout
- **Endpoint**: `POST /api/auth/logout/`
- **Function**: `logout()`

**Request Format**:
```json
{}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Knowledge Base APIs

### Get Knowledge Base
- **Endpoint**: `GET /api/auth/profile/`
- **Function**: `getKnowledgeBase()`

**Request Format**: None (GET request, returns user profile including knowledge_base)

**Response (Success - 200)**:
```json
{
  "success": true,
  "user": {
    "knowledge_base": {
      "brand_name": "My Brand",
      "industry": "E-commerce",
      "brand_colors": ["#FF5733", "#3498DB"],
      "logo_url": "https://example.com/logo.png",
      "brand_description": "Leading fashion brand",
      "ad_account_id": "act_123456",
      "business_id": "biz_789",
      "currency": "USD",
      "timezone": "America/New_York",
      "country": "US",
      "historical_insights": {},
      "target_audience": {},
      "preferred_platforms": ["facebook", "instagram"],
      "preferred_tone": "professional",
      "preferred_language": "en"
    }
  }
}
```

---

### Update Knowledge Base
- **Endpoint**: `PUT /api/auth/profile/`
- **Function**: `updateKnowledgeBase()`

**Request Format**:
```json
{
  "knowledge_base": {
    "brand": {
      "name": "Updated Brand",
      "industry": "Technology",
      "brand_colors": ["#FF0000", "#00FF00"],
      "description": "Innovative tech solutions"
    },
    "account": {
      "ad_account_id": "act_999888",
      "business_id": "biz_555",
      "currency": "EUR",
      "timezone": "Europe/London",
      "country": "UK"
    },
    "preferences": {
      "platforms": ["instagram", "tiktok"],
      "tone": "casual",
      "language": "en"
    }
  }
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "user": {
    "knowledge_base": {
      "brand_name": "Updated Brand",
      "industry": "Technology",
      "ad_account_id": "act_999888",
      "currency": "EUR"
    }
  }
}
```

---

## Chat APIs

### Start Chat Session
- **Endpoint**: `POST /api/chat/start/`
- **Function**: `startChatSession()`

**Request Format**:
```json
{}
```
Or with optional user context:
```json
{
  "user_context": {
    "username": "John Doe",
    "email": "john@example.com",
    "knowledge_base": {
      "brand": {
        "name": "My Brand",
        "industry": "E-commerce"
      },
      "preferred_tone": "professional"
    }
  }
}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "session_id": "2b02704c-4819-4b0b-b27e-694395241345",
  "message": {
    "id": "440e3a79-6909-4198-b231-aa8d73f87afc",
    "role": "assistant",
    "content": "Hello! I'm here to help you build a fantastic marketing campaign. To get started, could you please tell me:\n\n1. What would you like to name this campaign?\n2. What is the primary objective?",
    "created_at": "2026-01-27T05:58:34.730911+00:00"
  }
}
```

---

### Send Chat Message
- **Endpoint**: `POST /api/chat/{sessionId}/message/`
- **Function**: `sendChatMessage()`

**Request Format**:
```json
{
  "message": "I want to create a Summer Sale campaign for brand awareness",
  "collected_data": {
    "campaign": {
      "title": "Summer Sale 2026",
      "objective": "AWARENESS"
    }
  }
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": {
    "id": "550f4b8a-7a1a-4c09-c342-bb9e74c98bgd",
    "role": "assistant",
    "content": "Great! A 'Summer Sale' campaign for brand awareness. Let me ask:\n1. What is your target audience?\n2. What platforms?\n3. Budget range?",
    "created_at": "2026-01-27T06:00:15.123456+00:00"
  },
  "is_complete": false,
  "collected_data": {
    "campaign": {
      "title": "Summer Sale 2026",
      "objective": "AWARENESS",
      "filled_percentage": 30
    },
    "audience": {
      "filled_percentage": 0
    },
    "platforms": {
      "filled_percentage": 0
    }
  },
  "next_question": "What is your target audience age range and interests?",
  "missing_fields": ["audience", "platforms", "budget"],
  "progress": 25
}
```

**Response when complete with campaign plan**:
```json
{
  "success": true,
  "message": {
    "id": "abc123",
    "role": "assistant",
    "content": "Perfect! I have all the information. Here's your campaign plan...",
    "created_at": "2026-01-27T06:15:00.000000+00:00"
  },
  "is_complete": true,
  "collected_data": {
    "campaign": {
      "title": "Summer Sale 2026",
      "objective": "AWARENESS",
      "filled_percentage": 100
    }
  },
  "progress": 100,
  "campaign_plan": {
    "campaign": {
      "title": "Summer Sale 2026",
      "objective": "Brand Awareness",
      "duration": "30 days",
      "budget": {
        "total": 5000,
        "type": "LIFETIME"
      }
    },
    "posts": [
      {
        "platform": "instagram",
        "content": "☀️ Summer is here! Check out our amazing deals...",
        "hashtags": ["#SummerSale", "#Fashion"],
        "post_type": "image"
      }
    ],
    "audience": {
      "age_range": [25, 45],
      "interests": ["fashion", "shopping"]
    }
  }
}
```

---

### Get Chat Session
- **Endpoint**: `GET /api/chat/{sessionId}/`
- **Function**: `getChatSession()`

**Request Format**: None (GET request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "session": {
    "id": "2b02704c-4819-4b0b-b27e-694395241345",
    "status": "active",
    "user_context": {
      "username": "Guest",
      "email": ""
    },
    "collected_data": {
      "campaign": {
        "title": "Summer Sale",
        "objective": "AWARENESS"
      }
    },
    "created_at": "2026-01-27T05:58:33.370984+00:00",
    "updated_at": "2026-01-27T06:00:15.123456+00:00",
    "messages": [
      {
        "id": "440e3a79-6909-4198-b231-aa8d73f87afc",
        "role": "assistant",
        "content": "Hello! I'm here to help...",
        "created_at": "2026-01-27T05:58:34.730911+00:00"
      },
      {
        "id": "551e5c9b-8b2b-5d1a-d453-cc0f85da9che",
        "role": "user",
        "content": "I want to create a Summer Sale campaign",
        "created_at": "2026-01-27T06:00:10.987654+00:00"
      }
    ]
  }
}
```

---

### List Chat Sessions
- **Endpoint**: `GET /api/chat/sessions/`
- **Function**: `listChatSessions()`

**Request Format**: None (GET request)

**Query Parameters**:
- `status` (optional): Filter by status (active, completed, cancelled)

**Response (Success - 200)**:
```json
{
  "success": true,
  "sessions": [
    {
      "id": "2b02704c-4819-4b0b-b27e-694395241345",
      "status": "active",
      "created_at": "2026-01-27T05:58:33.370984+00:00",
      "updated_at": "2026-01-27T06:00:15.123456+00:00",
      "message_count": 5
    },
    {
      "id": "3c13815d-5920-5c1c-c38f-805506352456",
      "status": "completed",
      "created_at": "2026-01-26T10:30:00.000000+00:00",
      "completed_at": "2026-01-26T11:00:00.000000+00:00",
      "campaign_id": 5,
      "message_count": 12
    }
  ]
}
```

---

### Create Campaign from Chat
- **Endpoint**: `POST /api/chat/{sessionId}/create-campaign/`
- **Function**: `createCampaignFromChat()`

**Request Format**:
```json
{}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "message": "Campaign created successfully",
  "campaign": {
    "id": 20,
    "title": "Summer Sale 2026",
    "description": "Promote summer products with amazing discounts",
    "objective": "OUTCOME_AWARENESS",
    "status": "draft",
    "created_at": "2026-01-27T06:15:00.000000+00:00"
  },
  "session": {
    "id": "2b02704c-4819-4b0b-b27e-694395241345",
    "status": "completed",
    "completed_at": "2026-01-27T06:15:00.000000+00:00"
  }
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "error": "Insufficient data collected to create campaign. Please complete the chat conversation."
}
```

---

## Campaign & Image Generation APIs

### Generate Image
- **Endpoint**: `POST /api/generate-image/`
- **Function**: `generateImage()`
- **Content-Type**: `multipart/form-data` (with logo file) or `application/json`

**Request Format (with logo file)**:
```
Content-Type: multipart/form-data

campaign_title: "Summer Sale 2026"
campaign_description: "Amazing discounts on all products"
key_message: "50% OFF"
sub_message: "Limited Time Only"
brand_colors: ["#FF5733", "#3498DB"]
target_audience: "Young adults 25-35"
logo: [file upload]
decoration_style: "modern"
```

**Request Format (JSON without logo)**:
```json
{
  "campaign_title": "Summer Sale 2026",
  "campaign_description": "Amazing discounts",
  "key_message": "50% OFF",
  "sub_message": "Limited Time Only",
  "brand_colors": ["#FF5733", "#3498DB"],
  "target_audience": "Young adults 25-35",
  "decoration_style": "modern"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "image_url": "http://134.209.30.66/media/generated/image_12345.png",
  "id": 12345,
  "description": "Summer Sale 2026",
  "brand_colors": ["#FF5733", "#3498DB"],
  "key_message": "50% OFF",
  "sub_message": "Limited Time Only",
  "generated_key_message": "SUMMER SALE",
  "generated_sub_message": "Up to 50% OFF Everything"
}
```

---

### Get Campaigns
- **Endpoint**: `GET /api/get-campaigns/`
- **Function**: `getCampaigns()`

**Request Format**: None (GET request)

**Query Parameters**:
- `status` (optional): Filter by status (draft, active, completed, archived)

**Response (Success - 200)**:
```json
{
  "success": true,
  "campaigns": [
    {
      "id": 1,
      "title": "Summer Sale 2026",
      "description": "Promote summer products",
      "objective": "OUTCOME_SALES",
      "status": "active",
      "created_at": "2026-01-27T10:00:00Z",
      "social_posts": [
        {
          "id": 10,
          "platform": "instagram",
          "content": "☀️ Summer Sale is here!",
          "image_url": "http://134.209.30.66/media/posts/post_10.jpg",
          "status": "published"
        }
      ]
    }
  ]
}
```

---

### Generate Decorations
- **Endpoint**: `POST /api/decoration/generate/`
- **Function**: `generateDecorations()`
- **Content-Type**: `multipart/form-data`

**Request Format**:
```
Content-Type: multipart/form-data

base_image: [file upload - product image]
title: "SUMMER SALE"
subtitle: "50% OFF Everything"
brand_colors: ["#FF5733", "#3498DB"]
logo: [file upload - optional]
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "8 decoration variations generated successfully",
  "variations_count": 8,
  "decorated_images": [
    {
      "id": 1,
      "variation": "modern_minimal",
      "image_url": "http://134.209.30.66/media/decorations/decorated_1_modern.jpg",
      "style": "modern",
      "has_border": true,
      "text_position": "top"
    },
    {
      "id": 2,
      "variation": "bold_colorful",
      "image_url": "http://134.209.30.66/media/decorations/decorated_2_bold.jpg",
      "style": "bold",
      "has_border": false,
      "text_position": "center"
    }
  ]
}
```

---

### Enhance Prompt
- **Endpoint**: `POST /api/prompt/enhance/`
- **Function**: `enhancePrompt()`

**Request Format**:
```json
{
  "title": "summer sale",
  "description": "sell products",
  "target_audience": "young people",
  "decoration_style": "modern"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "original_title": "summer sale",
  "original_description": "sell products",
  "title": "SUMMER SALE 2026",
  "subtitle": "Up to 50% OFF on Selected Items",
  "enhanced_prompt": "Create a vibrant and energetic summer sale campaign targeting young adults aged 18-30. Focus on modern aesthetics with bright colors, emphasizing limited-time discounts and exclusive deals. Use trendy language and social media-friendly content.",
  "contributions": {
    "title_enhancement": "Capitalized and added year for urgency",
    "subtitle_generation": "Created compelling offer statement",
    "audience_targeting": "Refined to specific age group and preferences"
  },
  "detected_language": "en",
  "model": "gemini-2.5-flash"
}
```

---

## Social Post Generation APIs

### Generate Social Post
- **Endpoint**: `POST /api/social/posts/generate/`
- **Function**: `generateSocialPost()` or `generatePost()`

**Request Format**:
```json
{
  "campaign_id": 123,
  "platform": "instagram",
  "language": "auto",
  "tone": "energetic"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "post": {
    "id": 45,
    "campaign_id": 123,
    "campaign_title": "Summer Sale 2026",
    "post_content": "☀️ Summer Sale is HERE! Get up to 50% OFF on all summer essentials! 🏖️\n\nDon't miss out on these amazing deals!\n\n#SummerSale #Fashion #Shopping #Deals",
    "platform": "instagram",
    "language": "en",
    "tone": "energetic",
    "status": "draft",
    "image_url": "http://134.209.30.66/media/posts/post_45.jpg",
    "created_at": "2026-01-27T10:30:00Z"
  },
  "model": "gemini-2.5-flash-lite"
}
```

---

### Get Social Posts
- **Endpoint**: `GET /api/social/posts/`
- **Function**: `getSocialPosts()`

**Request Format**: None (GET request)

**Query Parameters**:
- `campaign_id` (optional): Filter posts by campaign ID

**Response (Success - 200)**:
```json
{
  "success": true,
  "posts": [
    {
      "id": 45,
      "campaign_id": 123,
      "post_content": "☀️ Summer Sale is HERE!...",
      "platform": "instagram",
      "status": "draft",
      "image_url": "http://134.209.30.66/media/posts/post_45.jpg",
      "created_at": "2026-01-27T10:30:00Z"
    },
    {
      "id": 44,
      "campaign_id": 123,
      "post_content": "New collection launching soon...",
      "platform": "facebook",
      "status": "published",
      "published_at": "2026-01-26T15:00:00Z"
    }
  ]
}
```

---

### Get Single Social Post
- **Endpoint**: `GET /api/social/posts/{postId}/`
- **Function**: `getSocialPost()`

**Request Format**: None (GET request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "post": {
    "id": 45,
    "campaign_id": 123,
    "campaign_title": "Summer Sale 2026",
    "post_content": "☀️ Summer Sale is HERE!...",
    "platform": "instagram",
    "language": "en",
    "tone": "energetic",
    "status": "draft",
    "image_url": "http://134.209.30.66/media/posts/post_45.jpg",
    "created_at": "2026-01-27T10:30:00Z",
    "updated_at": "2026-01-27T10:30:00Z"
  }
}
```

---

### Update Social Post
- **Endpoint**: `PATCH /api/social/posts/{postId}/`
- **Function**: `updateSocialPost()`

**Request Format**:
```json
{
  "post_content": "Updated post content with new hashtags #NewSale #Limited"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Post updated successfully",
  "post": {
    "id": 45,
    "post_content": "Updated post content with new hashtags #NewSale #Limited",
    "updated_at": "2026-01-27T11:00:00Z"
  }
}
```

---

### Delete Social Post
- **Endpoint**: `DELETE /api/social/posts/{postId}/`
- **Function**: `deleteSocialPost()`

**Request Format**: None (DELETE request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

### Publish Social Post
- **Endpoint**: `POST /api/social/posts/{postId}/publish/`
- **Function**: `publishSocialPost()`

**Request Format**:
```json
{
  "page_id": "123456789"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "post_id": "123456789_987654321",
  "facebook_post_id": "987654321",
  "page_id": "123456789",
  "message": "Post published successfully to Facebook"
}
```

---

### Get Post Insights
- **Endpoint**: `GET /api/social/posts/{postId}/insights/`
- **Function**: `getPostInsights()`

**Request Format**: None (GET request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "data": {
    "impressions": 5420,
    "reach": 3890,
    "engagement": 245,
    "likes": 180,
    "comments": 35,
    "shares": 30,
    "saves": 15,
    "clicks": 120
  }
}
```

---

## Facebook Integration APIs

### Get Facebook Auth URL
- **Endpoint**: `GET /api/social/facebook/auth/`
- **Function**: `getFacebookAuthUrl()`

**Request Format**: None (GET request)

**Query Parameters**:
- `redirect_uri` (optional): Custom redirect URI for callback

**Response (Success - 200)**:
```json
{
  "success": true,
  "auth_url": "https://www.facebook.com/v18.0/dialog/oauth?client_id=123456&redirect_uri=http://example.com/callback&state=abc123...",
  "state": "abc123def456ghi789"
}
```

---

### Handle Facebook Callback
- **Endpoint**: `GET /api/social/facebook/callback/`
- **Function**: `handleFacebookCallback()`

**Request Format**: None (GET request - Facebook redirects here)

**Query Parameters** (provided by Facebook):
- `code`: Authorization code
- `state`: State parameter for CSRF protection

**Response (Success - 200)**:
```json
{
  "success": true,
  "facebook_user_id": "123456789",
  "user_name": "John Doe",
  "pages_connected": [
    {
      "page_id": "111222333",
      "page_name": "My Business Page",
      "access_token": "[encrypted]",
      "is_active": true
    },
    {
      "page_id": "444555666",
      "page_name": "My Second Page",
      "access_token": "[encrypted]",
      "is_active": true
    }
  ]
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "error": "access_denied",
  "error_reason": "user_denied",
  "error_description": "The user denied the permission request"
}
```

---

### Get Facebook Pages
- **Endpoint**: `GET /api/social/facebook/pages/`
- **Function**: `getFacebookPages()`

**Request Format**: None (GET request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "pages": [
    {
      "id": 1,
      "page_id": "111222333",
      "page_name": "My Business Page",
      "facebook_user_id": "123456789",
      "is_active": true,
      "created_at": "2026-01-20T10:00:00Z",
      "last_used_at": "2026-01-27T08:30:00Z"
    },
    {
      "id": 2,
      "page_id": "444555666",
      "page_name": "My Second Page",
      "facebook_user_id": "123456789",
      "is_active": true,
      "created_at": "2026-01-20T10:00:00Z",
      "last_used_at": null
    }
  ]
}
```

---

### Check Facebook Status
- **Endpoint**: `GET /api/social/facebook/status/`
- **Function**: `checkFacebookStatus()`

**Request Format**: None (GET request)

**Response (Success - 200)**:
```json
{
  "connected": true,
  "user": {
    "facebook_user_id": "123456789",
    "user_name": "John Doe"
  },
  "pages": [
    {
      "page_id": "111222333",
      "page_name": "My Business Page",
      "is_active": true
    }
  ]
}
```

**Response (Not Connected - 200)**:
```json
{
  "connected": false,
  "user": null,
  "pages": []
}
```

---

### Publish to Facebook Page
- **Endpoint**: `POST /api/social/facebook/publish/`
- **Function**: `publishToFacebookPage()`

**Request Format**:
```json
{
  "page_id": "111222333",
  "message": "Check out our amazing summer sale! 🌞",
  "image_url": "http://example.com/image.jpg",
  "link": "http://example.com/sale"
}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "message": "Post published successfully",
  "post_id": "111222333_987654321",
  "post_url": "https://www.facebook.com/111222333/posts/987654321"
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "error": "Page not found or access token expired"
}
```

---

### Disconnect Facebook Page
- **Endpoint**: `DELETE /api/social/facebook/pages/{pageId}/`
- **Function**: `disconnectFacebookPage()`

**Request Format**: None (DELETE request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Facebook page disconnected successfully"
}
```

---

## Instagram Integration APIs

### Discover Instagram Accounts (from Pages)
- **Endpoint**: `POST /api/social/instagram/discover/`
- **Function**: `discoverInstagramAccounts()`

**Request Format**:
```json
{}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Instagram account discovery completed",
  "discovered_accounts": 3,
  "already_connected": 1,
  "accounts_found": 4,
  "accounts": [
    {
      "instagram_account_id": "17841400123456789",
      "username": "my_business",
      "profile_picture_url": "https://scontent.cdninstagram.com/...",
      "followers_count": 1500,
      "page_id": "111222333",
      "page_name": "My Business Page",
      "is_new": true
    },
    {
      "instagram_account_id": "17841400987654321",
      "username": "my_brand",
      "profile_picture_url": "https://scontent.cdninstagram.com/...",
      "followers_count": 3200,
      "page_id": "444555666",
      "page_name": "My Brand Page",
      "is_new": false
    }
  ]
}
```

---

### Discover Instagram Accounts (from User Token)
- **Endpoint**: `POST /api/social/instagram/discover-from-user/`
- **Function**: `discoverInstagramAccountsFromUser()`

**Request Format**:
```json
{}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Discovered Instagram accounts from user access token",
  "user_name": "John Doe",
  "facebook_user_id": "123456789",
  "pages_found": 2,
  "pages": [
    {
      "page_id": "111222333",
      "page_name": "My Business Page",
      "instagram_account": {
        "instagram_account_id": "17841400123456789",
        "username": "my_business",
        "profile_picture_url": "https://...",
        "followers_count": 1500
      }
    }
  ],
  "accounts": [
    {
      "instagram_account_id": "17841400123456789",
      "username": "my_business",
      "profile_picture_url": "https://...",
      "followers_count": 1500,
      "is_active": true
    }
  ]
}
```

---

### Get Instagram Accounts
- **Endpoint**: `GET /api/social/instagram/accounts/`
- **Function**: `getInstagramAccounts()`

**Request Format**: None (GET request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "accounts": [
    {
      "id": 1,
      "instagram_account_id": "17841400123456789",
      "username": "my_business",
      "page_id": "111222333",
      "page_name": "My Business Page",
      "facebook_user_id": "123456789",
      "is_active": true,
      "created_at": "2026-01-20T10:00:00Z",
      "last_used_at": "2026-01-27T09:15:00Z"
    }
  ]
}
```

---

### Disconnect Instagram Account
- **Endpoint**: `DELETE /api/social/instagram/accounts/{accountId}/`
- **Function**: `disconnectInstagramAccount()`

**Request Format**: None (DELETE request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Instagram account disconnected successfully"
}
```

---

### Publish to Instagram (Single Photo)
- **Endpoint**: `POST /api/social/instagram/publish/`
- **Function**: `publishToInstagram()`

**Request Format**:
```json
{
  "instagram_account_id": "17841400123456789",
  "image_url": "http://example.com/image.jpg",
  "caption": "Check out our summer collection! ☀️ #summer #fashion"
}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "message": "Post published successfully to Instagram",
  "media_id": "17841400123456789_12345",
  "permalink": "https://www.instagram.com/p/ABC123XYZ/"
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "error": "Instagram account not found or inactive"
}
```

---

### Publish Carousel to Instagram
- **Endpoint**: `POST /api/social/instagram/publish/carousel/`
- **Function**: `publishCarouselToInstagram()`

**Request Format**:
```json
{
  "instagram_account_id": "17841400123456789",
  "image_urls": [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg",
    "http://example.com/image3.jpg"
  ],
  "caption": "Swipe to see our latest collection! 👉 #fashion #style"
}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "message": "Carousel published successfully",
  "media_id": "17841400123456789_12346",
  "permalink": "https://www.instagram.com/p/ABC124XYZ/"
}
```

**Note**: Instagram carousel requires 2-10 images

---

## Scheduled Posts APIs

### Create Scheduled Post
- **Endpoint**: `POST /api/social/scheduled/`
- **Function**: `createScheduledPost()`

**Request Format**:
```json
{
  "platform": "instagram",
  "account_id": "17841400123456789",
  "caption": "Check out our new collection launching today! 🎉",
  "media_urls": [
    "http://example.com/image1.jpg"
  ],
  "scheduled_at": "2026-01-28T15:00:00Z",
  "timezone": "America/New_York"
}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "scheduled_post": {
    "id": 10,
    "platform": "instagram",
    "account_id": "17841400123456789",
    "caption": "Check out our new collection launching today! 🎉",
    "media_urls": ["http://example.com/image1.jpg"],
    "scheduled_at": "2026-01-28T15:00:00Z",
    "status": "scheduled",
    "created_at": "2026-01-27T12:00:00Z"
  }
}
```

**Note**: This endpoint currently returns 404 (not fully implemented)

---

### Get Scheduled Posts
- **Endpoint**: `GET /api/social/scheduled/`
- **Function**: `getScheduledPosts()`

**Request Format**: None (GET request)

**Query Parameters**:
- `status` (optional): Filter by status (scheduled, published, cancelled, failed)
- `platform` (optional): Filter by platform (facebook, instagram)

**Response (Success - 200)**:
```json
{
  "success": true,
  "scheduled_posts": [
    {
      "id": 10,
      "platform": "instagram",
      "account_id": "17841400123456789",
      "caption": "Check out our new collection!",
      "scheduled_at": "2026-01-28T15:00:00Z",
      "status": "scheduled",
      "created_at": "2026-01-27T12:00:00Z"
    },
    {
      "id": 9,
      "platform": "facebook",
      "account_id": "111222333",
      "caption": "Summer sale is live!",
      "scheduled_at": "2026-01-27T18:00:00Z",
      "status": "published",
      "published_at": "2026-01-27T18:00:05Z"
    }
  ]
}
```

**Response (Error/Empty - 200)**:
```json
{
  "success": true,
  "scheduled_posts": []
}
```

---

### Cancel Scheduled Post
- **Endpoint**: `POST /api/social/scheduled/{postId}/cancel/`
- **Function**: `cancelScheduledPost()`

**Request Format**:
```json
{}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Scheduled post cancelled successfully"
}
```

---

### Delete Scheduled Post
- **Endpoint**: `DELETE /api/social/scheduled/{postId}/`
- **Function**: `deleteScheduledPost()`

**Request Format**: None (DELETE request)

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Scheduled post deleted successfully"
}
```

---

## Meta Ads APIs

### Discover Ad Accounts
- **Endpoint**: `GET /api/social/meta-ads/businesses-and-accounts/`
- **Function**: `discoverAdAccounts()`

**Request Format**: None (GET request)

**Query Parameters**:
- `facebook_user_id`: User's Facebook ID (required)

**Response (Success - 200)**:
```json
{
  "success": true,
  "businesses": [
    {
      "id": "123456789",
      "name": "My Business",
      "ad_accounts": [
        {
          "id": "act_111222333",
          "account_id": "111222333",
          "name": "Main Ad Account",
          "currency": "USD",
          "timezone_name": "America/New_York",
          "account_status": 1
        },
        {
          "id": "act_444555666",
          "account_id": "444555666",
          "name": "Secondary Account",
          "currency": "EUR",
          "timezone_name": "Europe/London",
          "account_status": 1
        }
      ]
    }
  ]
}
```

---

### Connect Ad Account
- **Endpoint**: `POST /api/social/meta-ads/connect-account/`
- **Function**: `connectAdAccount()`

**Request Format**:
```json
{
  "ad_account_id": "act_111222333",
  "business_id": "123456789",
  "facebook_user_id": "987654321",
  "account_name": "Main Ad Account"
}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "message": "Ad account connected successfully",
  "account": {
    "id": 5,
    "ad_account_id": "act_111222333",
    "account_name": "Main Ad Account",
    "business_id": "123456789",
    "facebook_user_id": "987654321",
    "is_active": true,
    "created_at": "2026-01-27T14:00:00Z"
  }
}
```

---

### Get Connected Ad Accounts
- **Endpoint**: `GET /api/social/meta-ads/connected-accounts/`
- **Function**: `getConnectedAdAccounts()`

**Request Format**: None (GET request)

**Query Parameters**:
- `facebook_user_id`: User's Facebook ID (optional, filters by user)

**Response (Success - 200)**:
```json
{
  "success": true,
  "accounts": [
    {
      "id": 5,
      "ad_account_id": "act_111222333",
      "account_name": "Main Ad Account",
      "business_id": "123456789",
      "facebook_user_id": "987654321",
      "is_active": true,
      "created_at": "2026-01-27T14:00:00Z",
      "last_used_at": "2026-01-27T16:30:00Z"
    }
  ]
}
```

---

### Get Meta Ad Campaigns
- **Endpoint**: `GET /api/social/meta-ads/campaigns/`
- **Function**: `getMetaAdCampaigns()`

**Request Format**: None (GET request)

**Query Parameters**:
- `facebook_user_id`: User's Facebook ID (required)
- `ad_account_id`: Ad account ID (required)
- `limit`: Number of results (optional, default: 50)

**Response (Success - 200)**:
```json
{
  "success": true,
  "campaigns": [
    {
      "id": "23850123456789",
      "name": "Summer Sale Campaign 2026",
      "objective": "OUTCOME_SALES",
      "status": "ACTIVE",
      "daily_budget": "10000",
      "lifetime_budget": null,
      "created_time": "2026-01-15T10:00:00+0000",
      "start_time": "2026-01-20T00:00:00+0000",
      "stop_time": null,
      "insights": {
        "impressions": "45230",
        "reach": "32150",
        "clicks": "1280",
        "spend": "850.45"
      }
    },
    {
      "id": "23850987654321",
      "name": "Brand Awareness Q1",
      "objective": "OUTCOME_AWARENESS",
      "status": "PAUSED",
      "daily_budget": "5000",
      "created_time": "2026-01-10T08:00:00+0000"
    }
  ]
}
```

---

### Get Ad Sets
- **Endpoint**: `GET /api/social/meta-ads/adsets/`
- **Function**: `getMetaAdSets()`

**Request Format**: None (GET request)

**Query Parameters**:
- `facebook_user_id`: User's Facebook ID (required)
- `ad_account_id`: Ad account ID (required)
- `campaign_id`: Campaign ID (optional, filters by campaign)
- `limit`: Number of results (optional, default: 50)

**Response (Success - 200)**:
```json
{
  "success": true,
  "adsets": [
    {
      "id": "23850111222333",
      "name": "Summer Sale - Target Audience 1",
      "campaign_id": "23850123456789",
      "status": "ACTIVE",
      "daily_budget": "5000",
      "lifetime_budget": null,
      "optimization_goal": "IMPRESSIONS",
      "billing_event": "IMPRESSIONS",
      "targeting": {
        "age_min": 25,
        "age_max": 45,
        "genders": [0],
        "geo_locations": {
          "countries": ["US"]
        },
        "interests": [
          {"id": "6003139266461", "name": "Fashion"}
        ]
      },
      "created_time": "2026-01-15T10:30:00+0000",
      "start_time": "2026-01-20T00:00:00+0000"
    }
  ]
}
```

---

### Get Ads
- **Endpoint**: `GET /api/social/meta-ads/ads/`
- **Function**: `getMetaAds()`

**Request Format**: None (GET request)

**Query Parameters**:
- `facebook_user_id`: User's Facebook ID (required)
- `ad_account_id`: Ad account ID (required)
- `campaign_id`: Campaign ID (optional)
- `adset_id`: Ad set ID (optional)
- `limit`: Number of results (optional, default: 50)

**Response (Success - 200)**:
```json
{
  "success": true,
  "ads": [
    {
      "id": "23850444555666",
      "name": "Summer Sale Ad - Creative 1",
      "adset_id": "23850111222333",
      "campaign_id": "23850123456789",
      "status": "ACTIVE",
      "creative": {
        "id": "23850777888999",
        "title": "Summer Sale - Up to 50% OFF",
        "body": "Don't miss our biggest sale of the season!",
        "image_url": "https://scontent.xx.fbcdn.net/v/...",
        "link_url": "https://example.com/summer-sale",
        "call_to_action_type": "SHOP_NOW"
      },
      "insights": {
        "impressions": "12500",
        "clicks": "380",
        "ctr": "3.04",
        "spend": "285.50"
      },
      "created_time": "2026-01-15T11:00:00+0000"
    }
  ]
}
```

---

## Summary

**Total Endpoints**: 46 documented APIs

### By Category:
- **Authentication**: 5 endpoints (Register, Login, Logout, Get Profile, Update Profile)
- **Knowledge Base**: 2 endpoints (Get, Update - via Profile endpoint)
- **Chat**: 5 endpoints (Start, Send Message, Get Session, List Sessions, Create Campaign)
- **Campaign & Images**: 4 endpoints (Generate Image, Get Campaigns, Generate Decorations, Enhance Prompt)
- **Social Posts**: 9 endpoints (Generate, Get All, Get Single, Update, Delete, Publish, Insights)
- **Facebook**: 6 endpoints (Auth URL, Callback, Get Pages, Status, Publish, Disconnect)
- **Instagram**: 6 endpoints (Discover x2, Get Accounts, Publish, Carousel, Disconnect)
- **Scheduled Posts**: 4 endpoints (Create, Get, Cancel, Delete)
- **Meta Ads**: 6 endpoints (Discover, Connect, Get Connected, Campaigns, Ad Sets, Ads)

### Authentication Method:
- **Current Status**: Authentication is **disabled** (AllowAny permission)
- **Header Format** (when re-enabled): `Authorization: Token {token}`
- Tokens are returned from `/api/auth/login/` and `/api/auth/register/` endpoints

### Common Response Format:
Most endpoints follow this consistent pattern:
```json
{
  "success": true/false,
  "message": "Descriptive message",
  "data": { ...endpoint-specific data... }
}
```

### Error Responses:
All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error description",
  "details": { ...validation errors if applicable... }
}
```

### HTTP Status Codes:
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data/validation failed
- `401 Unauthorized` - Authentication required (when enabled)
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error

### Notes:
1. **Base URL**: All endpoints use `http://134.209.30.66` as the base URL
2. **Content-Type**: Use `application/json` for JSON requests, `multipart/form-data` for file uploads
3. **Date Format**: All timestamps use ISO 8601 format with timezone: `2026-01-27T10:30:00Z`
4. **UUIDs**: Chat sessions use UUID format: `2b02704c-4819-4b0b-b27e-694395241345`
5. **File Uploads**: Image endpoints accept either file uploads (multipart) or public URLs (JSON)
6. **CORS**: Configured to allow cross-origin requests from frontend
7. **Rate Limiting**: Not currently implemented

---

**Last Updated**: January 27, 2026  
**API Version**: 1.0.0  
**Server**: http://134.209.30.66
