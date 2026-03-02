/**
 * Dummy data for guest mode.
 * When a user continues as guest, all dashboard components
 * use this data instead of calling the API.
 */

export const dummyProfileData = {
  success: true,
  user: {
    id: 0,
    username: "guest",
    email: "guest@enablr.com",
    first_name: "Guest",
    last_name: "User",
  },
  business_data: {
    business_name: "Luma Fashion",
    industry: "Fashion & Apparel",
    business_model: "B2C",
    product_or_service: "Products",
  },
  brand_identity: {
    brand_name: "Luma Fashion",
    tone_style: "Modern & Elegant",
    core_value_proposition:
      "Premium sustainable fashion for the modern consumer",
    problem_statement: "Bridging the gap between luxury and sustainability",
  },
};

export const dummyKPIData = {
  totalCampaigns: 24,
  activeCampaigns: 8,
  totalReach: "1.2M",
  engagementRate: "4.8%",
  totalSpend: "$12,450",
  conversions: 1843,
};

export const dummyPerformanceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  reach: [45000, 52000, 48000, 61000, 55000, 67000, 72000],
  engagement: [1200, 1900, 1700, 2100, 1800, 2400, 2800],
  conversions: [150, 220, 180, 290, 250, 310, 380],
};

export const dummyLifecycleData = {
  awareness: 35,
  consideration: 28,
  conversion: 22,
  retention: 15,
};

export const dummySpendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  spend: [1500, 1800, 2200, 1900, 2400, 2600],
  revenue: [4500, 5200, 6800, 5700, 7200, 8100],
};

export const dummyEngagementByPlatform = {
  facebook: 42,
  instagram: 35,
  twitter: 15,
  linkedin: 8,
};

export const dummyEngagementByContentType = {
  video: 45,
  image: 30,
  carousel: 15,
  text: 10,
};

export const dummyHeatmapData = [
  // [dayOfWeek, hour, value] — 0=Sun, 6=Sat; hours 0-23
  [0, 9, 3],
  [0, 12, 5],
  [0, 15, 4],
  [0, 18, 7],
  [1, 8, 6],
  [1, 10, 8],
  [1, 12, 9],
  [1, 14, 7],
  [1, 17, 5],
  [1, 20, 4],
  [2, 9, 7],
  [2, 11, 9],
  [2, 13, 8],
  [2, 15, 6],
  [2, 18, 5],
  [2, 21, 3],
  [3, 8, 5],
  [3, 10, 7],
  [3, 12, 10],
  [3, 14, 8],
  [3, 16, 6],
  [3, 19, 4],
  [4, 9, 8],
  [4, 11, 9],
  [4, 13, 7],
  [4, 15, 5],
  [4, 18, 6],
  [4, 20, 3],
  [5, 10, 4],
  [5, 12, 6],
  [5, 14, 5],
  [5, 17, 3],
  [6, 11, 3],
  [6, 13, 4],
  [6, 15, 5],
  [6, 18, 6],
];

export const dummyCampaigns = [
  {
    id: 1,
    campaign_title: "Ramadan Collection",
    campaign_description:
      "Seasonal Ramadan campaign targeting fashion audience",
    status: "active" as const,
    connected_account_type: "instagram_account",
    connected_account_name: "Luma Fashion IG",
    is_external: false,
    external_source: "manual",
    meta_objective: "",
    has_ai_content: true,
    posts_count: 4,
    target_audience: "Women 25-40 interested in modest fashion",
    brand_colors: "#F8B695,#1C2C5F",
    created_at: "2026-03-10T00:00:00Z",
    updated_at: "2026-03-10T00:00:00Z",
    is_editable: false,
    _ui: {
      platforms: ["instagram"],
      metrics: [
        { label: "Scheduled posts", value: "4" },
        { label: "Estimated Reach", value: "90K" },
      ],
      dateRange: "Mar 10 – Apr 5, 2026",
      statusLabel: "Scheduled",
    },
  },
  {
    id: 2,
    campaign_title: "Spring Essentials Launch",
    campaign_description:
      "Launching spring essentials collection across FB & IG",
    status: "active" as const,
    connected_account_type: "facebook_page",
    connected_account_name: "Luma Fashion",
    is_external: false,
    external_source: "manual",
    meta_objective: "OUTCOME_SALES",
    has_ai_content: true,
    posts_count: 6,
    target_audience: "Fashion-forward women 22-38",
    brand_colors: "#F8B695,#1C2C5F",
    created_at: "2026-03-01T00:00:00Z",
    updated_at: "2026-03-01T00:00:00Z",
    is_editable: true,
    _ui: {
      platforms: ["facebook", "instagram"],
      metrics: [
        { label: "Reach", value: "124K" },
        { label: "Engagement Rate", value: "4.8%" },
      ],
      dateRange: "Mar 1 – Mar 31, 2026",
      statusLabel: "Live",
    },
  },
  {
    id: 3,
    campaign_title: "Summer Sale Kickoff",
    campaign_description: "Early summer sale campaign with exclusive discounts",
    status: "completed" as const,
    connected_account_type: "facebook_page",
    connected_account_name: "Luma Fashion",
    is_external: false,
    external_source: "manual",
    meta_objective: "",
    has_ai_content: true,
    posts_count: 5,
    target_audience: "Budget-conscious shoppers 20-45",
    brand_colors: "#F8B695,#1C2C5F",
    created_at: "2026-01-20T00:00:00Z",
    updated_at: "2026-02-10T00:00:00Z",
    is_editable: false,
    _ui: {
      platforms: ["facebook", "instagram"],
      metrics: [
        { label: "Engagement Rate", value: "5.6%" },
        { label: "Saves", value: "3.1K" },
      ],
      dateRange: "Jan 20 – Feb 10, 2026",
      statusLabel: "Completed",
    },
  },
  {
    id: 4,
    campaign_title: "Clean Luxury Awareness",
    campaign_description: "Brand awareness campaign for clean luxury line",
    status: "completed" as const,
    connected_account_type: "instagram_account",
    connected_account_name: "Luma Fashion IG",
    is_external: false,
    external_source: "manual",
    meta_objective: "",
    has_ai_content: true,
    posts_count: 8,
    target_audience: "Eco-conscious luxury consumers",
    brand_colors: "#F8B695,#1C2C5F",
    created_at: "2025-12-01T00:00:00Z",
    updated_at: "2025-12-31T00:00:00Z",
    is_editable: false,
    _ui: {
      platforms: ["instagram"],
      metrics: [
        { label: "Reach", value: "210K" },
        { label: "Profile visits", value: "12.4K" },
      ],
      dateRange: "Dec 1 – Dec 31, 2025",
      statusLabel: "Completed",
    },
  },
  {
    id: 5,
    campaign_title: "New Arrivals Drop",
    campaign_description: "Weekly drop campaign for new arrivals",
    status: "draft" as const,
    connected_account_type: "facebook_page",
    connected_account_name: "Luma Fashion",
    is_external: false,
    external_source: "manual",
    meta_objective: "",
    has_ai_content: true,
    posts_count: 3,
    target_audience: "Repeat customers and newsletter subscribers",
    brand_colors: "#F8B695,#1C2C5F",
    created_at: "2026-02-28T00:00:00Z",
    updated_at: "2026-02-28T00:00:00Z",
    is_editable: true,
    _ui: {
      platforms: ["facebook", "instagram"],
      metrics: [
        { label: "Draft posts", value: "3" },
        { label: "Missing approvals", value: "2" },
      ],
      dateRange: null,
      statusLabel: "Draft",
    },
  },
  {
    id: 6,
    campaign_title: "Valentine's Luxury Looks",
    campaign_description: "Valentine's Day luxury styling campaign",
    status: "completed" as const,
    connected_account_type: "instagram_account",
    connected_account_name: "Luma Fashion IG",
    is_external: false,
    external_source: "manual",
    meta_objective: "",
    has_ai_content: true,
    posts_count: 4,
    target_audience: "Couples and gift shoppers 25-40",
    brand_colors: "#F8B695,#1C2C5F",
    created_at: "2026-02-05T00:00:00Z",
    updated_at: "2026-02-14T00:00:00Z",
    is_editable: false,
    _ui: {
      platforms: ["instagram"],
      metrics: [
        { label: "Conversions", value: "320" },
        { label: "Revenue", value: "$9.8K" },
      ],
      dateRange: "Feb 5 – Feb 14, 2026",
      statusLabel: "Completed",
    },
  },
];

/**
 * Build a full-detail dummy campaign for the detail page.
 * Accepts a base campaign from dummyCampaigns and enriches it
 * with strategy, plan, posts, branding etc.
 */
export function buildDummyDetail(base: (typeof dummyCampaigns)[number]) {
  return {
    ...base,
    title: base.campaign_title,
    description: base.campaign_description,
    objective: "OUTCOME_SALES",

    /* ── Strategy ──────────────────────────────────────── */
    strategy: {
      campaign_overview: `This revised strategy operationalizes the $5000 budget and 30-day duration for the '${base.campaign_title}' campaign, focusing specifically on maximizing the vague 'Increase sales' objective by aggressively defining the missing variables. Since market, competition, and audience data are still absent, we must adopt an 'Audience Discovery Campaign' structure, prioritizing rapid learning and immediate conversion path testing on Facebook and Instagram.`,
      target_audience: {
        description:
          "Audience testing segment derived from initial assumptions based on typical e-commerce/B2B tech sales behaviors, segmented for immediate A/B testing efficiency.",
        demographics:
          "Age 25-55 (Broad Test Group). Locations: Primary testing in [ASSUMED CORE MARKET – Requires Input].",
        psychographics:
          "Value-driven consumers/SMB owners actively researching solutions related to [PRODUCT/SERVICE CATEGORY – Requires Input].",
        behaviors:
          "Engaged with competitor pages, high intent signals, frequent online shoppers/service purchasers",
      },
      key_messaging: [
        {
          title: "Message 1",
          text: "Unlock Performance Now: Limited-Time Summer Sale [Benefit Linked to Product/Service].",
          rationale:
            "Action-oriented message that directly addresses the sales objective while integrating brand colors (Blue/Orange) for visual impact. Placeholder for specific value prop.",
        },
        {
          title: "Message 2",
          text: "Innovation & Reliability: Discover [Product/Service Category] Built for Results.",
          rationale:
            "Message Testing Integrity: Ensure Message 1 focuses purely on the 'Summer Sale' urgency using CTA button in Orange (#FF6B35), and Message 2 focuses on the 'Innovation/Reliability' benefit using Blue (#0066CC) as the primary visual anchor.",
        },
      ],
    },

    /* ── Plan ───────────────────────────────────────────── */
    plan: {
      campaign_details: {
        campaign_name: base.campaign_title,
        brand: "Luma Skin",
        campaign_objective:
          "Validate the most cost-effective audience and creative combinations to achieve a break-even ROAS within 30 days.",
        content_type:
          "70% video (focus on rapid value demonstration), 30% high-contrast image (direct offer focus).",
        platforms: "Instagram & Facebook (Meta)",
        start_end_dates: "01/01/2026 – 01/02/2026",
      },
      budget: {
        total_budget: "$5000.00",
        daily_budget: "$166.67",
        duration: "30 Days",
        breakdown: [
          {
            label: "Creative Production (Asset Finalization & Copywriting)",
            amount: "$1000.00",
            percentage: "20%",
          },
          {
            label: "Audience/Creative Testing (Days 1-10)",
            amount: "$2000.00",
            percentage: "40%",
          },
          {
            label: "Performance Scaling (Days 11-30)",
            amount: "$2000.00",
            percentage: "40%",
          },
        ],
      },
      execution_phases: [
        {
          number: 1,
          title: "Contextualization & Enhanced Setup",
          duration: "7 Days",
          tasks: [
            {
              text: "Define Product/Service: Assume [Adwat sells a streamlined B2B automation tool for SMB marketing teams]. (This must be replaced with actual context).",
              priority: "Critical",
              owner: "Stakeholder Input Required",
            },
            {
              text: "Calculate Break-Even: Determine true target ROAS (e.g., 2.0x if margins are low, 1.2x if margins are high). Set CPA Target based on this.",
              priority: "Critical",
              owner: "Finance/Strategy",
            },
            {
              text: 'Finalize 7 unique ad creatives (4 Video, 3 Image). "Allocate $1000 to ensure professional video quality suitable for the assumed B2B audience.',
              priority: "Critical",
              owner: "Creative",
            },
            {
              text: "Define 4 Test Audiences: Must be anchored to the assumed product (e.g., 1. Lookalike of existing customer list; 2. Interest: Marketing Automation Software; 3. Interest: Specific Competitor X; 4. Broad interest group within Target Age 25-55).",
              priority: "High",
              owner: "Media Buyer",
            },
          ],
        },
        {
          number: 2,
          title: "Data Acquisition & Learning Threshold",
          duration: "10 Days (Day 1-Day 10)",
          tasks: [
            {
              text: "Launch all 8 Initial Ad Sets using CBO/Advantage+ setup. Focus optimization objective on Conversion (Purchase/Lead Form).",
              priority: "High",
              owner: "Media Buyer",
            },
            {
              text: "Daily Monitoring: Track initial CPA threshold violation. If initial CPA is 50% over target CPA by Day 5, pause the worst creative/audience pair.",
              priority: "High",
              owner: "Media Buyer",
            },
            {
              text: "Message Testing Integrity: Ensure Message 1 focuses purely on the 'Summer Sale' urgency using CTA button in Orange (#FF6B35), and Message 2 focuses on the 'Innovation/Reliability' benefit using Blue (#0066CC) as the primary visual anchor.",
              priority: "High",
              owner: "Media Buyer",
            },
          ],
        },
        {
          number: 3,
          title: "Optimization, Stabilization, and Scaling",
          duration: "20 Days (Day 11-Day 30)",
          tasks: [
            {
              text: 'Day 12 Critical Review: "Halt 50% of budget allocation to the bottom 4 performing Ad Sets." Reinvest all freed spend into the top 4 performers, prioritizing those demonstrating early signs of hitting the break-even ROAS target.',
              priority: "Critical",
              owner: "Media Buyer",
            },
            {
              text: "Scale Winners: Increase budget for top performers by a maximum of 30% daily, monitoring for ROAS decay. If ROAS degrades by more than 15% post-scale, reduce budget increase velocity.",
              priority: "High",
              owner: "Media Buyer",
            },
            {
              text: "Post-Week 3 Audience Expansion: Create 2 new lookalike audiences based on purchasers/converters from the winning segment identified in Phase 2.",
              priority: "Medium",
              owner: "Media Buyer",
            },
          ],
        },
      ],
      timeline_overview: [
        {
          title: "Preparation Phase",
          duration: "7 days (Pre-Launch)",
          description:
            "Extended prep time to define product context, finalize break-even metrics, increase creative budget, and rigorously vet audience assumptions.",
        },
        {
          title: "Launch Phase",
          duration: "Day 1",
          description:
            "Launch initial 8 Ad Sets focusing on rapid data acquisition across defined buyer personas.",
        },
        {
          title: "Optimization Phase",
          duration: "Days 2-29",
          description:
            "Daily metric review. Day 12: Critical budget reallocation based on CPA/ROAS performance metrics established during testing.",
        },
        {
          title: "Reporting Phase",
          duration: "Day 30+",
          description:
            "Final analysis focusing on the most efficient conversion path (Audience + Creative + Messaging) to inform future scaling strategies.",
        },
      ],
      deliverables: [
        "Defined Break-Even ROAS and Target CPA metrics.",
        "Performance Report after 10 days identifying the highest performing Audience/Message combination.",
        "Final 30-Day Report detailing Cost Per Acquisition achieved against the break-even threshold.",
        "Optimized Lookalike Audiences derived from high-converting users.",
      ],
      success_criteria: {
        minimum_requirements: [
          "Optimized Lookalike Audiences derived from high-converting users.",
          "Spend pacing within 95% of the $5000 budget.",
          "Creative fatigue minimized by ensuring creative quality (supported by increased budget).",
        ],
        optimal_outcomes: [
          "Achieving the pre-defined break-even ROAS or better by Day 20.",
          "Identifying a statistically viable Audience/Creative pairing capable of efficiently scaling media spend.",
          "Reducing the effective CPA by a minimum of 25% between the testing phase and the scaling phase.",
        ],
      },
    },

    /* ── Posts ──────────────────────────────────────────── */
    posts: [
      {
        id: "1",
        post_number: 1,
        type: "image",
        platform: "facebook",
        status: "published",
        title: "Summer Sale Kickoff",
        headline: "",
        caption: "",
        description: "",
        image: {
          description: "",
          generation_prompt: "",
          generated_image_url: "",
        },
        cta: { type: "LEARN_MORE", text: "", url: "" },
        targeting: {},
        scheduling: {
          publish_at: "2026-03-01T10:00:00Z",
          recommended_time: "",
          best_day: "Sunday",
          delay_after_previous: 0,
        },
        performance_goals: {},
        creative_notes: "",
        published_at: null,
        external_post_id: "",
        created_at: "",
        updated_at: "",
      },
      {
        id: "2",
        post_number: 2,
        type: "image",
        platform: "facebook",
        status: "scheduled",
        title: "Innovation & Reliability",
        headline: "",
        caption: "",
        description: "",
        image: {
          description: "",
          generation_prompt: "",
          generated_image_url: "",
        },
        cta: { type: "LEARN_MORE", text: "", url: "" },
        targeting: {},
        scheduling: {
          publish_at: "2026-03-03T15:00:00Z",
          recommended_time: "",
          best_day: "Tuesday",
          delay_after_previous: 0,
        },
        performance_goals: {},
        creative_notes: "",
        published_at: null,
        external_post_id: "",
        created_at: "",
        updated_at: "",
      },
      {
        id: "3",
        post_number: 3,
        type: "image",
        platform: "instagram",
        status: "scheduled",
        title: "Innovation & Reliability",
        headline: "",
        caption: "",
        description: "",
        image: {
          description: "",
          generation_prompt: "",
          generated_image_url: "",
        },
        cta: { type: "LEARN_MORE", text: "", url: "" },
        targeting: {},
        scheduling: {
          publish_at: "2026-03-22T10:00:00Z",
          recommended_time: "",
          best_day: "Sunday",
          delay_after_previous: 0,
        },
        performance_goals: {},
        creative_notes: "",
        published_at: null,
        external_post_id: "",
        created_at: "",
        updated_at: "",
      },
      {
        id: "4",
        post_number: 4,
        type: "image",
        platform: "instagram",
        status: "scheduled",
        title: "Summer Sale Kickoff",
        headline: "",
        caption: "",
        description: "",
        image: {
          description: "",
          generation_prompt: "",
          generated_image_url: "",
        },
        cta: { type: "LEARN_MORE", text: "", url: "" },
        targeting: {},
        scheduling: {
          publish_at: "2026-03-24T13:00:00Z",
          recommended_time: "",
          best_day: "Tuesday",
          delay_after_previous: 0,
        },
        performance_goals: {},
        creative_notes: "",
        published_at: null,
        external_post_id: "",
        created_at: "",
        updated_at: "",
      },
    ],
    posts_count: 4,

    /* ── Branding ───────────────────────────────────────── */
    branding: {
      brand_colors: "#F8B695,#1C2C5F",
      logo_url: "",
      logo_position: "top-right",
      key_message:
        "Unlock Performance Now: Limited-Time Summer Sale [Benefit Linked to Product/Service].",
      sub_message: "",
    },
    target_audience:
      "Audience testing segment derived from initial assumptions based on typical e-commerce/B2B tech sales behaviors, segmented for immediate A/B testing efficiency.",
    external: {
      is_external: false,
      connected_account_type: "facebook_page",
      connected_account_name: "Luma Fashion",
    },
  };
}
