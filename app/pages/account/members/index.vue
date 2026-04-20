<template>
    <NuxtLayout name="account-layout">
        <div class="container py-3 members-page">
            <div class="members-hero p-4 p-md-5 mb-4">
                <div class="d-lg-flex justify-content-between align-items-end gap-3">
                    <div>
                        <div class="small text-uppercase fw-semibold hero-kicker mb-1">Members Hub</div>
                        <h3 class="fw-bold mb-2">Connect with verified WGRCFP members</h3>
                        <p class="mb-0">Find peers, start private circles, and build meaningful professional connections.</p>
                    </div>
                    <div class="d-flex gap-2 mt-3 mt-lg-0 flex-wrap">
                        <button class="btn btn-light btn-sm border" @click="refreshAll">
                            <i class="bi bi-arrow-clockwise me-1"></i> Refresh
                        </button>
                        <NuxtLink v-if="hasActiveMembership" to="/account/forum" class="btn btn-outline-theme btn-sm">
                            Visit Forum Hub
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div class="card border-0 mb-4 mentorship-shell">
                <div class="card-body p-4 p-md-5">
                    <div class="d-flex flex-wrap justify-content-between gap-3">
                        <div>
                            <div class="text-uppercase small fw-semibold mentorship-kicker">Mentorship Hub</div>
                            <h4 class="fw-bold mb-2">Find trusted mentors and accelerate your growth</h4>
                            <p class="text-muted mb-0">
                                Browse verified WGRCFP mentors, request a mentorship, and track your progress with confidence.
                            </p>
                        </div>
                        <div class="mentorship-badge">
                            <i class="bi bi-stars"></i> Premium Access
                        </div>
                    </div>

                    <div v-if="membershipStatusLoading" class="d-flex align-items-center justify-content-center py-4 text-muted">
                        Checking membership status...
                    </div>

                    <div v-else-if="membershipApprovalStatus === 'pending'" class="mentorship-locked mt-4">
                        <div class="d-flex flex-column flex-lg-row align-items-start gap-3">
                            <div class="wait-icon">
                                <i class="bi bi-hourglass-split"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="fw-semibold fs-5 mb-1">Membership approval in progress</div>
                                <div class="text-muted">
                                    Your payment is confirmed. An admin is reviewing your membership before mentor access is unlocked.
                                </div>
                                <div class="d-flex flex-wrap gap-2 mt-3">
                                    <button class="btn btn-outline-theme btn-sm" @click="fetchMembershipStatus(true)">
                                        <i class="bi bi-arrow-clockwise me-1"></i> Refresh Status
                                    </button>
                                    <NuxtLink to="/membership" class="btn btn-theme btn-sm">
                                        Explore Membership Benefits
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div class="wait-steps mt-4">
                            <div class="step-item">
                                <span class="step-dot"></span>
                                Payment received
                            </div>
                            <div class="step-item active">
                                <span class="step-dot"></span>
                                Admin approval in progress
                            </div>
                            <div class="step-item">
                                <span class="step-dot"></span>
                                Mentor access unlocked
                            </div>
                        </div>
                    </div>

                    <div v-else-if="!hasActiveMembership" class="mentorship-locked mt-4">
                        <div class="d-flex flex-column flex-lg-row align-items-start gap-3">
                            <div class="lock-icon"><i class="bi bi-lock-fill"></i></div>
                            <div class="flex-grow-1">
                                <div class="fw-semibold fs-5 mb-1">Active membership required</div>
                                <div class="text-muted">
                                    Unlock mentor discovery and direct mentorship requests by activating your membership.
                                </div>
                                <div class="d-flex flex-wrap gap-2 mt-3">
                                    <a href="#membership-options" class="btn btn-theme btn-sm">
                                        <i class="bi bi-person-check me-1"></i>
                                        Activate Membership
                                    </a>
                                    <NuxtLink to="/membership" class="btn btn-outline-theme btn-sm">
                                        View Membership Benefits
                                    </NuxtLink>
                                </div>
                            </div>
                            <div class="mentorship-perks">
                                <div class="perk-line"><i class="bi bi-check2-circle"></i> Curated mentor pool</div>
                                <div class="perk-line"><i class="bi bi-check2-circle"></i> Application tracking</div>
                                <div class="perk-line"><i class="bi bi-check2-circle"></i> Structured milestones</div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="mt-4">
                        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
                            <div class="fw-semibold">Mentor Discovery</div>
                            <div class="text-muted small">Membership active</div>
                        </div>

                        <div class="mentorship-filters mt-3">
                            <input v-model="mentorSearch" class="form-control form-control-sm" placeholder="Search mentors, domains, skills">
                            <input v-model="mentorDomain" class="form-control form-control-sm" placeholder="Domain (AML, ESG, Privacy)">
                            <input v-model="mentorRegion" class="form-control form-control-sm" placeholder="Region or Country">
                            <select v-model="mentorAvailability" class="form-select form-select-sm">
                                <option value="">Availability</option>
                                <option value="available">Available</option>
                                <option value="busy">Busy</option>
                                <option value="not_taking">Not Taking</option>
                            </select>
                            <select v-model="mentorSort" class="form-select form-select-sm">
                                <option value="highest_rating">Highest Rating</option>
                                <option value="most_active">Most Active</option>
                                <option value="newest">Newest</option>
                            </select>
                            <button class="btn btn-sm btn-theme" @click="fetchMentors(true)">
                                <i class="bi bi-search"></i> Search
                            </button>
                        </div>

                        <div v-if="mentorsLoading" class="text-center py-4">
                            <div class="spinner-border text-theme"></div>
                        </div>
                        <div v-else-if="mentors.length === 0" class="text-muted py-4">
                            No mentors found. Try adjusting your search.
                        </div>
                        <div v-else class="row g-3 mt-1">
                            <div v-for="mentor in mentors" :key="mentor.id" class="col-md-6 col-xl-4">
                                <div class="mentor-card h-100">
                                    <div class="d-flex justify-content-between align-items-start gap-2">
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="mentor-avatar">
                                                {{ mentorInitials(mentor) }}
                                            </div>
                                            <div>
                                                <div class="fw-semibold">{{ mentorName(mentor) }}</div>
                                                <div class="small text-muted">{{ mentor.title || mentor.user?.job_title || 'Mentor' }}</div>
                                            </div>
                                        </div>
                                        <span class="badge mentor-status" :class="mentorStatusClass(mentor.availability_status)">
                                            {{ formatAvailability(mentor.availability_status) }}
                                        </span>
                                    </div>

                                    <div class="small text-muted mt-3">
                                        <span class="me-2"><i class="bi bi-geo-alt"></i> {{ mentorLocation(mentor) }}</span>
                                    </div>

                                    <div class="mentor-domain mt-2">{{ mentor.domain || 'General Mentorship' }}</div>
                                    <p class="small text-muted mt-2 line-clamp-3">
                                        {{ mentor.expertise_summary || mentor.bio || 'Experienced mentor ready to help you grow.' }}
                                    </p>

                                    <div class="mentor-meta mt-3">
                                        <div><i class="bi bi-award"></i> {{ mentor.mentorships_completed || 0 }} mentorships</div>
                                        <div><i class="bi bi-star-fill text-warning"></i> {{ mentor.rating_avg || '0.0' }} rating</div>
                                    </div>

                                    <div class="d-flex gap-2 mt-3">
                                        <button class="btn btn-outline-theme btn-sm w-100" @click="openApplyModal(mentor)">
                                            Request Mentorship
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="membershipStatusLoading" class="card border-0">
                <div class="card-body d-flex align-items-center justify-content-center text-muted">
                    Checking membership status...
                </div>
            </div>

            <div v-else-if="hasActiveMembership" class="d-grid gap-3">
                <div class="card border-0 upgrade-shell">
                    <div class="card-body">
                        <div class="d-flex flex-column flex-lg-row align-items-start gap-3">
                            <div class="upgrade-icon">
                                <i class="bi bi-arrow-up-right-circle"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="fw-semibold fs-5 mb-1">Upgrade your membership</div>
                                <div class="text-muted">
                                    Unlock higher-tier benefits, deeper community access, and priority opportunities.
                                </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2">
                                <button class="btn btn-theme btn-sm" @click="openUpgradeModal">
                                    View Upgrade Options
                                </button>
                                <NuxtLink to="/membership" class="btn btn-outline-theme btn-sm">
                                    Compare Benefits
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="canApplyAsMentor" class="card border-0 mentor-apply-shell">
                    <div class="card-body">
                        <div class="d-flex flex-column flex-lg-row align-items-start gap-3">
                            <div class="mentor-apply-icon">
                                <i class="bi bi-person-plus"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="fw-semibold fs-5 mb-1">Apply to become a mentor</div>
                                <div class="text-muted">
                                    You’re eligible for mentor membership. Complete the mentor profile and submit your application.
                                </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2">
                                <button class="btn btn-theme btn-sm" @click="openMentorApplyModal">
                                    Start Application
                                </button>
                                <button class="btn btn-outline-theme btn-sm" @click="openMentorApplyModal">
                                    View Requirements
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">My Forums</div>
                            <div class="metric-value">{{ joinedForums.length }}</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Total Members</div>
                            <div class="metric-value">{{ totalMembersCount }}</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Unread Alerts</div>
                            <div class="metric-value">{{ unreadCount }}</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Members Listed</div>
                            <div class="metric-value">{{ forumMembers.length }}</div>
                        </div>
                    </div>
                </div>

                <div class="card border-0">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                            <div>
                                <div class="fw-semibold">Member Directory</div>
                                <div class="small text-muted">Browse members inside your forums.</div>
                            </div>
                            <div class="d-flex gap-2 flex-wrap">
                                <select v-model="selectedForumId" class="form-select form-select-sm forum-select">
                                    <option disabled value="">Select a forum</option>
                                    <option v-for="forum in joinedForums" :key="forum.id" :value="Number(forum.id)">
                                        {{ forum.title }}
                                    </option>
                                </select>
                                <input v-model="memberSearch" class="form-control form-control-sm search-input" placeholder="Search members">
                            </div>
                        </div>

                        <div v-if="membersLoading" class="text-center py-4">
                            <div class="spinner-border text-theme"></div>
                        </div>
                        <div v-else-if="!selectedForumId" class="small text-muted py-4">
                            Select a forum to view members.
                        </div>
                        <div v-else-if="filteredMembers.length === 0" class="small text-muted py-4">
                            No members found for this forum.
                        </div>
                        <div v-else class="row g-3 mt-1">
                            <div v-for="member in filteredMembers" :key="member.id" class="col-md-6 col-xl-4">
                                <div class="member-card h-100">
                                    <div class="d-flex justify-content-between align-items-start gap-3">
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="avatar-circle">{{ initials(member) }}</div>
                                            <div>
                                                <div class="fw-semibold">{{ member.first_name }} {{ member.last_name }}</div>
                                                <div class="small text-muted">{{ member.roleLabel }}</div>
                                            </div>
                                        </div>
                                        <span class="badge rounded-pill text-bg-light border">{{ member.forumRole }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border-0">
                    <div class="card-body">
                    <div class="fw-semibold mb-2">My Forums</div>
                    <div v-if="joinedForums.length === 0" class="small text-muted">
                        You are not part of any forum yet. Request access from the Forum Hub to join.
                    </div>
                        <div v-else class="row g-3">
                            <div v-for="forum in joinedForums" :key="forum.id" class="col-md-6 col-xl-4">
                                <div class="forum-card h-100">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span class="badge bg-theme-subtle text-theme">{{ forum.category || 'General' }}</span>
                                        <span class="badge" :class="forum.type === 'public' ? 'text-bg-success' : 'text-bg-warning'">{{ forum.type }}</span>
                                    </div>
                                    <div class="fw-semibold mb-1">{{ forum.title }}</div>
                                    <p class="small text-muted line-clamp-3 mb-2">{{ forum.description || 'No description provided.' }}</p>
                                    <div class="small d-flex flex-wrap gap-2 mb-3">
                                        <span class="tiny-pill">{{ forum.members_count || 0 }} members</span>
                                        <span class="tiny-pill">{{ forum.threads_count || 0 }} threads</span>
                                        <span class="tiny-pill text-capitalize">{{ forum.status }}</span>
                                    </div>
                                    <div class="d-flex gap-2 mt-auto">
                                        <NuxtLink :to="`/account/forum/${forum.id}`" class="btn btn-theme btn-sm">Open</NuxtLink>
                                        <button class="btn btn-outline-theme btn-sm" @click="leaveForum(forum.id)">Leave</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="membershipApprovalStatus === 'pending'" class="card border-0">
                <div class="card-header bg-transparent border-0 fw-semibold">
                    Membership Approval In Progress
                </div>
                <div class="card-body">
                    <div class="membership-wait p-4">
                        <div class="d-flex flex-column flex-lg-row align-items-start gap-3">
                            <div class="wait-icon">
                                <i class="bi bi-hourglass-split"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="fw-semibold fs-5 mb-2">Thanks for subscribing — we’re activating your membership</div>
                                <div class="text-muted">
                                    Your payment is confirmed. An admin is currently reviewing your membership.
                                    You’ll get full access once it’s approved.
                                </div>
                                <div class="d-flex flex-wrap gap-2 mt-3">
                                    <button class="btn btn-outline-theme btn-sm" @click="fetchMembershipStatus(true)">
                                        <i class="bi bi-arrow-clockwise me-1"></i> Refresh Status
                                    </button>
                                    <NuxtLink to="/membership" class="btn btn-theme btn-sm">
                                        Explore Membership Benefits
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div class="wait-steps mt-4">
                            <div class="step-item">
                                <span class="step-dot"></span>
                                Payment received
                            </div>
                            <div class="step-item active">
                                <span class="step-dot"></span>
                                Admin approval in progress
                            </div>
                            <div class="step-item">
                                <span class="step-dot"></span>
                                Membership fully activated
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else id="membership-options" class="card border-0">
                <div class="card-header bg-transparent border-0 fw-semibold">
                    Unlock the Members Community
                </div>
                <div class="card-body">
                    <div class="row g-3 align-items-center mb-3">
                        <div class="col-lg-7">
                            <div class="membership-banner p-4">
                                <div class="fw-semibold fs-5 mb-2">Choose the membership tier that fits your goals</div>
                                <div class="small text-muted">
                                    Get access to member-only forums, curated networking, leadership opportunities, and more.
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="membership-stats p-4">
                                <div class="stat-line">
                                    <span class="small text-muted">Status</span>
                                    <span class="fw-semibold text-danger">Not a member</span>
                                </div>
                                <div class="stat-line">
                                    <span class="small text-muted">Access</span>
                                    <span class="fw-semibold">Member directory locked</span>
                                </div>
                                <div class="stat-line">
                                    <span class="small text-muted">Next step</span>
                                    <span class="fw-semibold">Pick a tier below</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="isMembershipsLoading" class="text-center py-4 text-muted">
                        Loading memberships...
                    </div>
                    <div v-else class="membership-shell p-3 p-md-4">
                        <div class="small text-muted mb-3">Pick a membership type, then select a tier.</div>
                        <div class="row g-3">
                            <div v-for="category in membershipCategories" :key="category.id" class="col-12 col-md-6">
                                <div class="membership-pop h-100">
                                    <div class="membership-pop-index">{{ category.id }}</div>
                                    <div class="fw-semibold">{{ category.title }}</div>
                                    <div class="small text-muted mt-1">{{ category.summary }}</div>
                                    <button class="btn btn-sm membership-ghost-btn mt-3" @click="openCategory(category)">
                                        View Tiers
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="card border-0 mt-4">
                <div class="card-body">
                    <div class="fw-semibold text-uppercase text-muted small">Membership Eligibility</div>
                    <h4 class="fw-bold mb-2">WGRCFP General Eligibility Criteria</h4>
                    <p class="text-muted mb-4">Applicant must meet at least one of these criteria.</p>

                    <div class="row g-3">
                        <div class="col-md-6 col-xl-4">
                            <div class="criteria-card">
                                <div class="criteria-title">Professional Experience</div>
                                <div class="criteria-text">
                                    Currently employed or previously worked in roles related to: Governance, Risk Management,
                                    Internal Audit, or Regulatory Affairs; Compliance, Ethics, Legal Advisory, ESG or Sustainability
                                    Governance; Financial Crime Prevention, AML, Sanctions, Fraud, or Cybersecurity; Data Privacy,
                                    Digital Risk, FinTech Regulation, or Policy and Oversight.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-4">
                            <div class="criteria-card">
                                <div class="criteria-title">Academic/Student Affiliation</div>
                                <div class="criteria-text">
                                    Enrolled in or recently graduated from a degree, certification, or training program in GRC, Law,
                                    Finance, Criminology, Cybersecurity, ESG, Business Management, or a closely aligned field.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-4">
                            <div class="criteria-card">
                                <div class="criteria-title">Entrepreneurial or Advisory Roles</div>
                                <div class="criteria-text">
                                    Founder or senior leader of a business, consultancy, NGO, or initiative operating in the risk,
                                    compliance, legal, financial, ESG, or anti-fraud sectors.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-4">
                            <div class="criteria-card">
                                <div class="criteria-title">Advocacy and Research</div>
                                <div class="criteria-text">
                                    Active contributor in academia, policy, journalism, or advocacy working on risk, ethical
                                    leadership, regulatory frameworks, or financial transparency.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-4">
                            <div class="criteria-card">
                                <div class="criteria-title">Types of Membership</div>
                                <div class="criteria-text">
                                    Professional women with 2+ years experience in any GRC or Financial Crime Prevention field.
                                    Student or emerging women currently in or recently completed formal training in related disciplines.
                                    Executive or leader: Senior professionals, board members, and founders across relevant industries.
                                    Ally or supporter: Male allies or professionals who support gender equity and ethical governance.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeCategory" class="membership-modal-backdrop" @click.self="closeCategory">
            <div class="membership-modal">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <div class="small text-uppercase text-muted">Membership {{ activeCategory.id }}</div>
                        <div class="fw-semibold fs-5">{{ activeCategory.title }}</div>
                        <div class="small text-muted">{{ activeCategory.summary }}</div>
                    </div>
                    <button class="btn btn-sm btn-light border" @click="closeCategory">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <div class="membership-tier-list">
                    <div v-for="tier in activeCategory.tiers" :key="tier.tier" class="tier-card">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="fw-semibold">{{ tier.tier }}</div>
                            <span class="badge rounded-pill text-bg-light border">&pound;{{ tier.fee }}/yr</span>
                        </div>
                        <div class="small text-muted mt-1">{{ tier.targetAudience }}</div>
                        <div class="small mt-2">{{ tier.benefits }}</div>
                        <button class="btn btn-sm btn-theme mt-3" @click="addMembershipToCart(activeCategory, tier)">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showUpgradeModal" class="membership-modal-backdrop" @click.self="closeUpgradeModal">
            <div class="membership-modal">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <div class="small text-uppercase text-muted">Upgrade Membership</div>
                        <div class="fw-semibold fs-5">Choose a new membership tier</div>
                        <div class="small text-muted">Pick a category to view available tiers.</div>
                    </div>
                    <button class="btn btn-sm btn-light border" @click="closeUpgradeModal">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <div v-if="isMembershipsLoading" class="text-center py-4 text-muted">
                    Loading membership options...
                </div>
                <div v-else class="membership-shell p-3">
                    <div class="row g-3">
                        <div v-for="category in membershipCategories" :key="category.id" class="col-12 col-md-6">
                            <div class="membership-pop h-100">
                                <div class="membership-pop-index">{{ category.id }}</div>
                                <div class="fw-semibold">{{ category.title }}</div>
                                <div class="small text-muted mt-1">{{ category.summary }}</div>
                                <button class="btn btn-sm membership-ghost-btn mt-3" @click="openCategoryFromUpgrade(category)">
                                    View Tiers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showApplyModal" class="mentorship-modal-backdrop" @click.self="closeApplyModal">
            <div class="mentorship-modal">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <div class="small text-uppercase text-muted">Mentorship Request</div>
                        <div class="fw-semibold fs-5">{{ mentorName(selectedMentor) }}</div>
                        <div class="small text-muted">{{ selectedMentor?.title || selectedMentor?.user?.job_title }}</div>
                    </div>
                    <button class="btn btn-sm btn-light border" @click="closeApplyModal">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <form @submit.prevent="submitMentorApplication">
                    <div class="mb-3">
                        <label class="form-label">Mentorship Goals</label>
                        <textarea v-model="applyForm.goals" class="form-control" rows="3" required placeholder="Share your goals for this mentorship"></textarea>
                    </div>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Preferred Duration</label>
                            <input v-model="applyForm.preferred_duration" class="form-control" placeholder="e.g. 3 months">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Preferred Communication</label>
                            <input v-model="applyForm.communication_method" class="form-control" placeholder="Video, chat, call">
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Availability</label>
                            <input v-model="applyForm.availability" class="form-control" placeholder="Days and times you are available">
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Notes or Expectations</label>
                            <textarea v-model="applyForm.notes" class="form-control" rows="2" placeholder="Optional"></textarea>
                        </div>
                    </div>

                    <div class="mt-4 d-flex gap-2 flex-wrap">
                        <button type="submit" class="btn btn-theme" :disabled="applyLoading">
                            {{ applyLoading ? 'Submitting...' : 'Submit Request' }}
                        </button>
                        <button type="button" class="btn btn-outline-theme" @click="closeApplyModal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="showMentorApplyModal" class="mentorship-modal-backdrop" @click.self="closeMentorApplyModal">
            <div class="mentorship-modal">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <div class="small text-uppercase text-muted">Mentor Application</div>
                        <div class="fw-semibold fs-5">Complete your mentor profile</div>
                        <div class="small text-muted">All fields are required.</div>
                    </div>
                    <button class="btn btn-sm btn-light border" @click="closeMentorApplyModal">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <form @submit.prevent="submitMentorProfileApplication">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Professional Title</label>
                            <input v-model="mentorApplyForm.title" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Domain / Specialization</label>
                            <input v-model="mentorApplyForm.domain" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Region (Timezone)</label>
                            <select v-model="mentorApplyForm.region" class="form-select" required>
                                <option value="">Select a timezone</option>
                                <option v-for="tz in timezones" :key="tz.id" :value="tz.timezone">
                                    {{ tz.timezone }}
                                </option>
                            </select>
                            <div v-if="timezonesLoading" class="small text-muted mt-1">Loading timezones...</div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Country</label>
                            <input v-model="mentorApplyForm.country" class="form-control" required>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Short Bio</label>
                            <textarea v-model="mentorApplyForm.bio" class="form-control" rows="3" required></textarea>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Expertise Summary</label>
                            <textarea v-model="mentorApplyForm.expertise_summary" class="form-control" rows="3" required></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Availability Status</label>
                            <select v-model="mentorApplyForm.availability_status" class="form-select" required>
                                <option value="available">Available</option>
                                <option value="busy">Busy</option>
                                <option value="not_taking">Not Taking New Mentees</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Max Mentees (optional)</label>
                            <input v-model="mentorApplyForm.max_mentees" type="number" min="1" class="form-control">
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Languages (comma-separated)</label>
                            <input v-model="mentorApplyForm.languages" class="form-control" required>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Skills (comma-separated)</label>
                            <input v-model="mentorApplyForm.skills" class="form-control" required>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Certifications (comma-separated)</label>
                            <input v-model="mentorApplyForm.certifications" class="form-control" required>
                        </div>
                    </div>

                    <div class="mt-4 d-flex gap-2 flex-wrap">
                        <button type="submit" class="btn btn-theme" :disabled="mentorApplyLoading">
                            {{ mentorApplyLoading ? 'Submitting...' : 'Submit Application' }}
                        </button>
                        <button type="button" class="btn btn-outline-theme" @click="closeMentorApplyModal">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import api from '~/api'
import { useCartStore } from '~/stores/cart-store'
import { useAccountCache } from '~/composables/useAccountCache'

definePageMeta({
    middleware: 'account-route-middleware',
})

type MembershipTier = {
    id: number
    tier: string
    fee: number
    targetAudience: string
    benefits: string
}

type MembershipCategory = {
    id: number
    title: string
    summary: string
    tiers: MembershipTier[]
}

const cartStore = useCartStore()
const { getCached, setCached } = useAccountCache()

const membershipStatusLoading = ref(false)
const hasActiveMembership = ref<boolean | null>(null)
const membershipCategories = ref<MembershipCategory[]>([])
const isMembershipsLoading = ref(false)
const activeCategory = ref<MembershipCategory | null>(null)
const showUpgradeModal = ref(false)
const membershipInfo = ref<any>(null)
const showMentorApplyModal = ref(false)
const mentorApplyLoading = ref(false)
const timezonesLoading = ref(false)
const timezones = ref<any[]>([])
const mentorApplyForm = reactive({
    title: '',
    domain: '',
    region: '',
    country: '',
    bio: '',
    expertise_summary: '',
    availability_status: 'available',
    languages: '',
    skills: '',
    certifications: '',
    max_mentees: '',
})
const membershipApprovalStatus = ref<'approved' | 'pending' | 'none'>('none')

const joinedForums = ref<any[]>([])
const unreadCount = ref(0)
const membersLoading = ref(false)
const selectedForumId = ref<number | ''>('')
const forumMembers = ref<any[]>([])
const memberSearch = ref('')
const mentorsLoading = ref(false)
const mentors = ref<any[]>([])
const mentorSearch = ref('')
const mentorDomain = ref('')
const mentorRegion = ref('')
const mentorAvailability = ref('')
const mentorSort = ref('highest_rating')
const showApplyModal = ref(false)
const selectedMentor = ref<any>(null)
const applyLoading = ref(false)
const applyForm = reactive({
    goals: '',
    preferred_duration: '',
    availability: '',
    communication_method: '',
    notes: '',
})

const totalMembersCount = computed(() => {
    return joinedForums.value.reduce((sum, forum) => sum + Number(forum.members_count || 0), 0)
})

const filteredMembers = computed(() => {
    const query = memberSearch.value.trim().toLowerCase()
    if (!query) return forumMembers.value
    return forumMembers.value.filter((member: any) => {
        const fullName = `${member.first_name || ''} ${member.last_name || ''}`.toLowerCase()
        return fullName.includes(query)
    })
})

const initials = (member: any) => {
    const first = String(member?.first_name || '').trim().charAt(0)
    const last = String(member?.last_name || '').trim().charAt(0)
    return `${first}${last}`.toUpperCase() || 'WG'
}

const fetchMembershipStatus = async (force = false) => {
    try {
        membershipStatusLoading.value = true
        if (!force) {
            const cached = getCached<boolean>('account-membership-status')
            if (cached !== null) {
                hasActiveMembership.value = cached
                return
            }
        }
        const response = await api.myMembershipStatus()
        const data = response?.data?.data || {}
        hasActiveMembership.value = Boolean(data?.is_active)
        membershipInfo.value = data?.membership || null
        membershipApprovalStatus.value = data?.has_membership
            ? (data?.is_approved ? 'approved' : 'pending')
            : 'none'
        setCached('account-membership-status', hasActiveMembership.value, 180000)
    } catch (error) {
        hasActiveMembership.value = false
        membershipApprovalStatus.value = 'none'
        membershipInfo.value = null
    } finally {
        membershipStatusLoading.value = false
    }
}

const fetchTimezones = async () => {
    try {
        timezonesLoading.value = true
        const response = await api.timezone()
        const data = response?.data?.data || []
        timezones.value = Array.isArray(data) ? data : []
    } catch (error) {
        timezones.value = []
    } finally {
        timezonesLoading.value = false
    }
}

const ensureTimezonesLoaded = async () => {
    if (timezones.value.length) return
    await fetchTimezones()
}

const canApplyAsMentor = computed(() => {
    if (!hasActiveMembership.value) return false
    if (membershipApprovalStatus.value !== 'approved') return false
    return Number(membershipInfo.value?.membership_id || 0) === 3
})


const fetchMemberships = async (force = false) => {
    try {
        isMembershipsLoading.value = true
        if (!force) {
            const cached = getCached<MembershipCategory[]>('account-memberships')
            if (cached) {
                membershipCategories.value = cached
                return
            }
        }
        const response = await api.membership()
        if (response.data.success) {
            membershipCategories.value = response.data.data.map((m: any) => ({
                id: m.id,
                title: m.name,
                summary: m.description,
                tiers: m.tiers.map((t: any) => ({
                    id: t.id,
                    tier: t.name,
                    fee: Number(t.annual_fee),
                    targetAudience: t.target_audience,
                    benefits: Array.isArray(t.benefits) ? t.benefits.join(', ') : t.benefits
                }))
            }))
            setCached('account-memberships', membershipCategories.value, 300000)
        }
    } catch (error) {
        console.error('Failed to fetch memberships:', error)
    } finally {
        isMembershipsLoading.value = false
    }
}

const ensureMembershipsLoaded = async () => {
    if (membershipCategories.value.length) return
    await fetchMemberships(true)
}

const openCategory = (category: MembershipCategory) => {
    activeCategory.value = category
}

const openUpgradeModal = async () => {
    await ensureMembershipsLoaded()
    showUpgradeModal.value = true
}

const closeUpgradeModal = () => {
    showUpgradeModal.value = false
}

const openCategoryFromUpgrade = (category: MembershipCategory) => {
    showUpgradeModal.value = false
    openCategory(category)
}

const fetchMentors = async (force = false) => {
    if (!hasActiveMembership.value) return
    mentorsLoading.value = true
    try {
        const params: any = {
            q: mentorSearch.value || undefined,
            domain: mentorDomain.value || undefined,
            region: mentorRegion.value || undefined,
            availability: mentorAvailability.value || undefined,
            sort: mentorSort.value || undefined,
        }
        const response = await api.mentors(params)
        const payload = response?.data?.data || {}
        mentors.value = payload?.data || []
    } catch (error) {
        mentors.value = []
    } finally {
        mentorsLoading.value = false
    }
}

const mentorName = (mentor: any) => {
    if (!mentor) return 'Mentor'
    return `${mentor.user?.first_name || ''} ${mentor.user?.last_name || ''}`.trim() || 'Mentor'
}

const mentorInitials = (mentor: any) => {
    const first = String(mentor?.user?.first_name || '').trim().charAt(0)
    const last = String(mentor?.user?.last_name || '').trim().charAt(0)
    return `${first}${last}`.toUpperCase() || 'WG'
}

const mentorLocation = (mentor: any) => {
    const parts = [mentor?.region, mentor?.country].filter(Boolean)
    return parts.join(' ') || 'Location TBD'
}

const formatAvailability = (status: string) => {
    if (!status) return 'Unknown'
    return status.replace('_', ' ')
}

const mentorStatusClass = (status: string) => {
    if (status === 'available') return 'bg-success-subtle text-success'
    if (status === 'busy') return 'bg-warning-subtle text-warning'
    return 'bg-secondary-subtle text-secondary'
}

const openApplyModal = (mentor: any) => {
    selectedMentor.value = mentor
    showApplyModal.value = true
}

const closeApplyModal = () => {
    showApplyModal.value = false
    selectedMentor.value = null
    applyForm.goals = ''
    applyForm.preferred_duration = ''
    applyForm.availability = ''
    applyForm.communication_method = ''
    applyForm.notes = ''
}

const submitMentorApplication = async () => {
    if (!selectedMentor.value) return
    applyLoading.value = true
    try {
        await api.applyForMentor(selectedMentor.value.id, { ...applyForm })
        await Swal.fire({
            icon: 'success',
            title: 'Application sent',
            text: 'Your mentorship request has been submitted.',
            confirmButtonColor: '#293567'
        })
        closeApplyModal()
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Submission failed',
            text: error?.response?.data?.message || 'Unable to submit request.',
            confirmButtonColor: '#293567'
        })
    } finally {
        applyLoading.value = false
    }
}


const closeCategory = () => {
    activeCategory.value = null
}

const openMentorApplyModal = () => {
    ensureTimezonesLoaded()
    showMentorApplyModal.value = true
}

const closeMentorApplyModal = () => {
    showMentorApplyModal.value = false
    mentorApplyForm.title = ''
    mentorApplyForm.domain = ''
    mentorApplyForm.region = ''
    mentorApplyForm.country = ''
    mentorApplyForm.bio = ''
    mentorApplyForm.expertise_summary = ''
    mentorApplyForm.availability_status = 'available'
    mentorApplyForm.languages = ''
    mentorApplyForm.skills = ''
    mentorApplyForm.certifications = ''
    mentorApplyForm.max_mentees = ''
}

const submitMentorProfileApplication = async () => {
    mentorApplyLoading.value = true
    try {
        await api.applyAsMentor({
            title: mentorApplyForm.title,
            domain: mentorApplyForm.domain,
            region: mentorApplyForm.region,
            country: mentorApplyForm.country,
            bio: mentorApplyForm.bio,
            expertise_summary: mentorApplyForm.expertise_summary,
            availability_status: mentorApplyForm.availability_status,
            languages: mentorApplyForm.languages,
            skills: mentorApplyForm.skills,
            certifications: mentorApplyForm.certifications,
            max_mentees: mentorApplyForm.max_mentees ? Number(mentorApplyForm.max_mentees) : null,
        })
        await Swal.fire({
            icon: 'success',
            title: 'Application submitted',
            text: 'Your mentor application has been sent for review.',
            confirmButtonColor: '#293567'
        })
        closeMentorApplyModal()
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Submission failed',
            text: error?.response?.data?.message || 'Unable to submit mentor application.',
            confirmButtonColor: '#293567'
        })
    } finally {
        mentorApplyLoading.value = false
    }
}

const addMembershipToCart = async (category: MembershipCategory, tier: MembershipTier) => {
    const cartId = tier.id
    const exists = cartStore.items.some(item => item.source === 'membership' && Number(item.id) === cartId)

    if (exists) {
        await Swal.fire({
            icon: 'info',
            title: 'Already in cart',
            text: `${tier.tier} (${category.title}) is already in your cart.`,
            confirmButtonColor: '#293567'
        })
        return
    }

    try {
        await cartStore.addToCart({
            id: cartId,
            image: '/images/WGRC-logo.png',
            level: tier.tier,
            category: category.title,
            title: `${category.title} - ${tier.tier}`,
            text: tier.targetAudience,
            duration: '1 year membership',
            no_of_lectures: 0,
            price: tier.fee,
            source: 'membership',
            stars: 5,
            rating: 5,
            total_rating: 100,
        })

        await Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            text: `${tier.tier} was added to your cart.`,
            confirmButtonColor: '#293567'
        })
    } catch (error: any) {
        const status = Number(error?.response?.status || 0)
        const message = error?.response?.data?.message || 'Unable to add membership to cart.'
        await Swal.fire({
            icon: status === 409 ? 'info' : 'warning',
            title: status === 409 ? 'Already in cart' : 'Add to cart failed',
            text: message,
            confirmButtonColor: '#293567'
        })
    }
}

const loadForums = async () => {
    try {
        const mineRes = await api.forumList({ mine: 1 })
        const mine = mineRes?.data?.data?.data || []
        joinedForums.value = mine
        if (!selectedForumId.value && joinedForums.value.length) {
            selectedForumId.value = Number(joinedForums.value[0].id)
        }
    } catch (error) {
        joinedForums.value = []
    }
}

const loadNotifications = async () => {
    try {
        const res = await api.forumNotifications()
        unreadCount.value = Number(res?.data?.data?.unread_count || 0)
    } catch (error) {
        unreadCount.value = 0
    }
}

const loadForumMembers = async (forumId: number | '') => {
    if (!forumId) {
        forumMembers.value = []
        return
    }
    membersLoading.value = true
    try {
        const res = await api.forumDetails(forumId)
        const forum = res?.data?.data || {}
        const memberships = forum?.memberships || []
        forumMembers.value = memberships.map((row: any) => ({
            id: row.user?.id || row.id,
            first_name: row.user?.first_name || '',
            last_name: row.user?.last_name || '',
            forumRole: row.role || 'member',
            roleLabel: row.role === 'creator' ? 'Forum Creator' : row.role === 'moderator' ? 'Moderator' : 'Member',
        }))
    } catch (error) {
        forumMembers.value = []
    } finally {
        membersLoading.value = false
    }
}

const leaveForum = async (forumId: number) => {
    try {
        await api.forumLeave(forumId)
        await loadForums()
        await Swal.fire({
            icon: 'success',
            title: 'Left forum',
            text: 'You have left this forum.',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Leave failed',
            text: error?.response?.data?.message || 'Unable to leave forum.',
            confirmButtonColor: '#293567',
        })
    }
}

const refreshAll = async () => {
    await fetchMembershipStatus(true)
    if (hasActiveMembership.value === false) {
        await fetchMemberships(true)
        return
    }
    await Promise.all([loadForums(), loadNotifications()])
}

watch(selectedForumId, (value) => {
    loadForumMembers(value)
})

onMounted(async () => {
    await fetchMembershipStatus()
    if (hasActiveMembership.value) {
        await fetchMentors()
    }
    if (hasActiveMembership.value === false) {
        await fetchMemberships()
        return
    }
    await Promise.all([loadForums(), loadNotifications()])
})
</script>

<style scoped>
.members-page {
    --members-primary: #293567;
    --members-accent: #b03436;
}

.members-hero {
    border-radius: 18px;
    color: #f4f7ff;
    background:
        radial-gradient(circle at top right, rgba(176, 52, 54, 0.38) 0%, transparent 45%),
        linear-gradient(145deg, #293567 0%, #394a87 55%, #24315f 100%);
}

.hero-kicker {
    color: #ffd8d8;
    letter-spacing: 0.05em;
}

.metric-card {
    background: #fff;
    border: 1px solid #e5eaf8;
    border-radius: 14px;
    padding: 14px;
}

.metric-title {
    color: #6d7695;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.metric-value {
    font-size: 26px;
    line-height: 1.1;
    font-weight: 700;
    color: var(--members-primary);
    margin-top: 8px;
}

.search-input {
    width: 220px;
}

.forum-select {
    min-width: 220px;
}

.member-card {
    border-radius: 14px;
    border: 1px solid #e3e9fb;
    background: #fff;
    padding: 14px;
}

.avatar-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2f3f83 0%, #b03436 100%);
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.forum-card {
    display: flex;
    flex-direction: column;
    border-radius: 14px;
    border: 1px solid #e5eaf8;
    background: #ffffff;
    padding: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.forum-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(31, 48, 108, 0.1);
}

.tiny-pill {
    border-radius: 999px;
    border: 1px solid #e1e8fb;
    background: #f8faff;
    padding: 2px 9px;
    font-size: 11px;
    color: #56608a;
}

.membership-banner {
    border-radius: 16px;
    border: 1px solid #f1dcdc;
    background: linear-gradient(135deg, rgba(176, 52, 54, 0.08), rgba(41, 53, 103, 0.06));
}

.membership-stats {
    border-radius: 16px;
    border: 1px solid #e2e9fb;
    background: #fff;
}

.stat-line {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
}

.membership-shell {
    border-radius: 16px;
    border: 1px solid #dfe8ff;
    background:
        radial-gradient(circle at top right, #ecf5ff 0%, transparent 40%),
        linear-gradient(140deg, #f8fbff 0%, #f0f5ff 100%);
}

.upgrade-shell {
    border-radius: 18px;
    border: 1px solid #e3e9fb;
    background:
        radial-gradient(circle at top right, rgba(41, 53, 103, 0.18) 0%, transparent 45%),
        linear-gradient(140deg, #ffffff 0%, #f6f9ff 100%);
}

.upgrade-icon {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: linear-gradient(135deg, #293567 0%, #b03436 100%);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
}

.mentor-apply-shell {
    border-radius: 18px;
    border: 1px solid #efe2e6;
    background:
        radial-gradient(circle at top right, rgba(176, 52, 54, 0.16) 0%, transparent 45%),
        linear-gradient(140deg, #ffffff 0%, #fff6f7 100%);
}

.mentor-apply-icon {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: linear-gradient(135deg, #b03436 0%, #293567 100%);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
}

.membership-pop {
    position: relative;
    border-radius: 14px;
    border: 1px solid #d9e4ff;
    background: #fff;
    padding: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.membership-pop:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(53, 83, 164, 0.12);
}

.membership-pop-index {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 8px;
    color: #174ea6;
    background-color: #e7f0ff;
}

.membership-ghost-btn {
    background-color: #f1f6ff;
    color: #1f56b8;
    border: 1px solid #cfe0ff;
}

.membership-ghost-btn:hover {
    background-color: #e4efff;
    color: #19489c;
}

.membership-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(17, 29, 59, 0.45);
    z-index: 1040;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.membership-modal {
    width: min(860px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 16px;
    border: 1px solid #d7e3ff;
    background: #fff;
    padding: 18px;
    box-shadow: 0 20px 40px rgba(17, 29, 59, 0.22);
}

.mentorship-shell {
    border-radius: 20px;
    border: 1px solid #d9e3ff;
    background:
        radial-gradient(circle at top right, rgba(176, 52, 54, 0.22) 0%, transparent 40%),
        linear-gradient(145deg, #f8f9ff 0%, #eef2ff 100%);
}

.mentorship-kicker {
    color: #b03436;
    letter-spacing: 0.08em;
}

.mentorship-badge {
    border-radius: 999px;
    border: 1px solid rgba(176, 52, 54, 0.4);
    background: #fff5f5;
    color: #b03436;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    height: fit-content;
}

.mentorship-locked {
    border-radius: 16px;
    border: 1px dashed #d0d9f6;
    background: #ffffff;
    padding: 20px;
}

.lock-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: #f0f3ff;
    color: #293567;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.membership-wait {
    border-radius: 18px;
    border: 1px dashed #d4def7;
    background:
        radial-gradient(circle at top right, rgba(176, 52, 54, 0.16) 0%, transparent 45%),
        linear-gradient(140deg, #ffffff 0%, #f7f9ff 100%);
}

.wait-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, #293567 0%, #b03436 100%);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.wait-steps {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #5b647b;
    font-size: 13px;
}

.step-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.step-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d2dbf4;
}

.step-item.active .step-dot {
    background: #b03436;
}

.mentorship-perks {
    border-radius: 12px;
    background: #f6f8ff;
    padding: 12px;
    min-width: 180px;
}

.perk-line {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #48507a;
    margin-bottom: 6px;
}

.mentor-card {
    border-radius: 16px;
    border: 1px solid #e3e9fb;
    background: #fff;
    padding: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mentor-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 32px rgba(31, 48, 108, 0.12);
}

.mentor-avatar {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #2f3f83 0%, #b03436 100%);
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mentor-domain {
    font-weight: 600;
    color: #293567;
}

.mentor-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #5d678a;
}

.mentor-status {
    font-size: 11px;
    border-radius: 999px;
}

.mentorship-filters {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
}

.mentorship-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(17, 29, 59, 0.45);
    z-index: 1040;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.mentorship-modal {
    width: min(720px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 16px;
    border: 1px solid #d7e3ff;
    background: #fff;
    padding: 18px;
    box-shadow: 0 20px 40px rgba(17, 29, 59, 0.22);
}

@media (min-width: 768px) {
    .mentorship-filters {
        grid-template-columns: repeat(6, minmax(0, 1fr));
        align-items: center;
    }
}

.membership-tier-list {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 10px;
}

.tier-card {
    border-radius: 12px;
    border: 1px solid #deebff;
    background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
    padding: 12px;
}

.criteria-card {
    border-radius: 14px;
    border: 1px solid #e3e9fb;
    background: #fff;
    padding: 16px;
    height: 100%;
}

.criteria-title {
    font-weight: 700;
    margin-bottom: 8px;
    color: #293567;
}

.criteria-text {
    color: #5b647b;
    font-size: 14px;
    line-height: 1.6;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.bg-theme-subtle {
    background-color: #e9efff;
}

.btn-outline-theme {
    border: 1px solid #c4d2ff;
    color: #2f4384;
}

.btn-outline-theme:hover {
    background: #edf2ff;
    color: #24386f;
}

@media (min-width: 768px) {
    .membership-tier-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 576px) {
    .search-input,
    .forum-select {
        width: 100%;
    }
}
</style>
