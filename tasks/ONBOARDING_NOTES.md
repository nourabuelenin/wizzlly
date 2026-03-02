# Onboarding Flow Mismatches & Missing Items

## 1. Missing Inputs (UI mockups vs. `Active_flow.md` API)
These fields are required or expected by the `business/data/` API endpoint, but no UI elements currently exist for them in the provided onboarding flow screens:

*   `business_type` (`b2b`, `b2c`, `both`) - *Required by DB schema*
*   `business_description` - *Required by DB schema*
*   `primary_marketing_goal` 
*   `strengths` (Array of strings)
*   `weaknesses` (Array of strings)
*   `sales_channels` (Array of strings)
*   `delivery_regions` (Array of strings)
*   `return_policy`
*   `discount_policy`
*   `customer_needs` (Array of strings)

## 2. API Schema / Naming Mismatches
During the implementation, the following property names and formats sent from the UI did not match the API schema exactly (these were mapped/fixed in the data payload in `page.tsx` during submission):

*   **Fixed Names**: `offer_type` was sent instead of `product_or_service`. `business_start_date` was sent instead of `real_start_date`.
*   **Target Income Level Mismatch**: The API expects a singular string (`budget|middle|upper_mid|luxury`), but the UI allowed users to select multiple cards. Currently mapped to send only the *first* selected income level (`formData.target_income_level[0]`).
*   **Unmapped Data**: Fields like `city_region` and `communication_languages` exist in the UI but don't explicitly belong to the top-level payload schema. They have been bundled into the `constraints` JSON object for safekeeping during submission.
* **Target Regions:** Currently mapped to the `primary_market` field.

## 3. Missing Pages / Summaries
*   **Summary Page missing:** Based on `Active_flow.md`, there is an endpoint `GET stg2/brand-identity/summary/`. It appears the flow might be missing a final "Summary / Review" step right before the "Launch AI Workspace" where users can verify their answers before finalizing. 

## 4. Notes on Step 9 (Completion Screen)
*   Currently, Step 9 (the "Generating your business DNA" screen) is visually a loading state. 
*   It operates by showing the "Generating" spinner while the `PATCH stg2/business/data/` and `POST stg2/brand-identity/` requests execute asynchronously. Once they complete, it switches to "Generation Complete".
*   Regarding the `GET stg2/profile/complete/` endpoint: This is a `GET` endpoint that returns a full dump of all onboarding data. It is meant to be used *after* Step 9 to populate the frontend dashboard on initial load, not necessarily *during* the Step 9 submission phase (since Step 9's main job is patching/saving data, not retrieving it).
