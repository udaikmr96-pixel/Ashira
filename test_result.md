#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Build Ashira Inn — a production-ready boutique hotel website + management system (Greater Noida). Includes marketing site, direct booking engine, room availability, and admin dashboard. Spec asked for Google Sheets + Apps Script backend; MVP built on Next.js + MongoDB with an API layer designed to be swappable to Sheets later."

backend:
  - task: "Rooms & Availability API"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "GET /api/rooms lists 3 room types with pricing/highlights. GET /api/availability?checkIn=&checkOut= computes rooms remaining per type by subtracting overlapping active bookings (pending/confirmed/checked-in) from inventory (15 rooms total: 6 deluxe, 5 premium, 4 premium-bathtub). Verified via curl."
  - task: "Bookings CRUD"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "POST /api/bookings validates required fields, re-checks availability atomically, computes rate (price*nights) + 12% GST, assigns bookingId ASH-YYYYMMDD-XXXX, upserts customer. GET /api/bookings (with ?status= filter) and GET /api/bookings/:bookingId. PATCH /api/bookings/:bookingId supports status, paymentStatus, notes, roomNumber, paid (auto-computes balance). Verified end-to-end with curl."
  - task: "Dashboard aggregation"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "GET /api/dashboard returns totals (bookings, pending/confirmed/cancelled/checked-in counts, revenue, paid, occupancy%, room count), today arrivals/departures, and 10 most recent bookings."
  - task: "Contact & Reviews"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "POST /api/contact stores contact messages. GET/POST /api/reviews with fallback to seed testimonials when collection is empty."
  - task: "Admin auth"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "POST /api/admin/login accepts { password } and returns a token if it matches process.env.ADMIN_PASSWORD (default ashira@2025). Token is stored in localStorage on the client."
  - task: "Calendar endpoint"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "GET /api/calendar?month=YYYY-MM returns active bookings that intersect the requested month."
  - task: "MongoDB seed & indexes"
    implemented: true
    working: true
    file: "/app/lib/mongo.js and /app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "ensureSeed() seeds 15 physical rooms on first call. Creates unique index on bookingId and compound index on { status, checkIn }."

frontend:
  - task: "Marketing site (Home, Rooms, Room detail, Restaurant, Gallery, Attractions, Amenities, About, Contact, FAQ, Offers, Policies)"
    implemented: true
    working: true
    file: "/app/components/hotel/AshiraApp.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Luxe design system (deep forest #0f2222 + antique gold #c9a961 on cream, Playfair Display + Inter). Full-bleed rotating hero with real Ashira Inn photos. Glass booking widget on hero. All pages implemented via hash-router. Verified via screenshots."
  - task: "Booking flow (4-step wizard)"
    implemented: true
    working: true
    file: "/app/components/hotel/AshiraApp.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Step 1 dates + guests, Step 2 room selection with real-time availability + pricing summary, Step 3 guest info form (name/phone/email/address/id/vehicle/GST/special requests), Step 4 confirmation with WhatsApp/Call CTAs. Booking totals computed with 12% GST. URL query params pre-populate the flow (e.g., #/book?roomType=premium-bathtub). Verified end-to-end via UI + backend."
  - task: "Admin dashboard (login, overview, bookings table, monthly calendar)"
    implemented: true
    working: true
    file: "/app/components/hotel/AshiraApp.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Password login (localStorage token). Stat cards for totals, pending, confirmed, checked-in, revenue, occupancy. Bookings table with search (name/phone/email/booking ID) + status filter + row detail dialog with Approve / Reject / Check-In / Check-Out / Cancel actions and WhatsApp shortcut. Custom calendar grid painting bookings by status color."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 0
  run_ui: false

test_plan:
  current_focus:
    - "Rooms & Availability API"
    - "Bookings CRUD"
    - "Dashboard aggregation"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "Ashira Inn MVP is complete. Backend on Next.js + MongoDB with a clean service/API layer that mirrors the eventual Google Apps Script contract (so it can be swapped without touching the UI). Admin password: ashira@2025. Verified: booking creation (ASH-20260704-8124 for Test Guest, ₹5,598 total), dashboard counts, admin login, room selection with pre-selection from URL. Ready for optional automated backend testing on the endpoints listed under test_plan."
