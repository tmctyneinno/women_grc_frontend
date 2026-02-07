<template>
    <nuxt-layout name="login-and-register">
        <div class="col-12 py-5 py-lg-0">
            <div class="card border-0 shadow-sm">
                <div class="card-body py-5 px-4 px-md-5">
                    <!-- Header -->
                    <div class="text-center mb-5">
                        <NuxtImg 
                            src="/images/WGRC-logo.png" 
                            width="60" 
                            height="60"
                            alt="Company Logo"
                            class="img-fluid mb-3"
                        />
                        <h1 class="h2 fw-bold text-dark mb-2">Terms of Service</h1>
                        <p class="text-muted mb-0">
                            Last Updated: {{ formatDate(lastUpdated) }}
                        </p>
                    </div>

                    <!-- Terms Content -->
                    <div class="terms-content">
                        <!-- Introduction -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">1. Introduction</h2>
                            <p>
                                Welcome to Women in Governance, Risk, and Compliance (WGRC). These Terms of Service 
                                ("Terms") govern your use of our website, services, and applications (collectively, 
                                the "Service"). By accessing or using our Service, you agree to be bound by these 
                                Terms. If you disagree with any part of the terms, you may not access the Service.
                            </p>
                        </section>

                        <!-- Account Registration -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">2. Account Registration</h2>
                            <p>When you create an account with us, you must provide accurate, complete, and current 
                                information. You are responsible for:</p>
                            <ul class="ps-4">
                                <li>Maintaining the confidentiality of your account and password</li>
                                <li>All activities that occur under your account</li>
                                <li>Immediately notifying us of any unauthorized use of your account</li>
                                <li>Ensuring that you exit from your account at the end of each session</li>
                            </ul>
                            <p>We reserve the right to refuse service, terminate accounts, or remove/edit content 
                                at our sole discretion.</p>
                        </section>

                        <!-- User Responsibilities -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">3. User Responsibilities</h2>
                            <p>You agree not to:</p>
                            <ul class="ps-4">
                                <li>Use the Service for any illegal purpose</li>
                                <li>Violate any laws in your jurisdiction</li>
                                <li>Infringe upon intellectual property rights</li>
                                <li>Harass, abuse, or harm another person</li>
                                <li>Submit false or misleading information</li>
                                <li>Upload viruses or malicious code</li>
                                <li>Interfere with the proper working of the Service</li>
                                <li>Bypass measures we may use to prevent unauthorized access</li>
                            </ul>
                        </section>

                        <!-- Content Ownership -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">4. Content Ownership</h2>
                            <p><strong>Our Content:</strong> The Service and its original content, features, and 
                                functionality are owned by WGRC and are protected by international copyright, 
                                trademark, patent, trade secret, and other intellectual property laws.</p>
                            <p><strong>Your Content:</strong> You retain ownership of any content you submit, post, 
                                or display on or through the Service. By submitting content, you grant us a 
                                worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, 
                                publish, translate, and distribute it.</p>
                        </section>

                        <!-- Termination -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">5. Termination</h2>
                            <p>We may terminate or suspend your account immediately, without prior notice or 
                                liability, for any reason whatsoever, including without limitation if you breach 
                                the Terms. Upon termination, your right to use the Service will immediately cease.</p>
                        </section>

                        <!-- Limitation of Liability -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">6. Limitation of Liability</h2>
                            <p>In no event shall WGRC, nor its directors, employees, partners, agents, suppliers, 
                                or affiliates, be liable for any indirect, incidental, special, consequential, or 
                                punitive damages, including without limitation, loss of profits, data, use, 
                                goodwill, or other intangible losses, resulting from:</p>
                            <ul class="ps-4">
                                <li>Your access to or use of or inability to access or use the Service</li>
                                <li>Any conduct or content of any third party on the Service</li>
                                <li>Any content obtained from the Service</li>
                                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                            </ul>
                        </section>

                        <!-- Disclaimer -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">7. Disclaimer</h2>
                            <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" 
                                and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, 
                                whether express or implied, including, but not limited to, implied warranties of 
                                merchantability, fitness for a particular purpose, non-infringement, or course of 
                                performance.</p>
                        </section>

                        <!-- Governing Law -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">8. Governing Law</h2>
                            <p>These Terms shall be governed and construed in accordance with the laws of 
                                [Your Country/State], without regard to its conflict of law provisions. Our failure 
                                to enforce any right or provision of these Terms will not be considered a waiver of 
                                those rights.</p>
                        </section>

                        <!-- Changes to Terms -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">9. Changes to Terms</h2>
                            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at 
                                any time. If a revision is material, we will provide at least 30 days' notice prior 
                                to any new terms taking effect. What constitutes a material change will be 
                                determined at our sole discretion.</p>
                        </section>

                        <!-- Contact Information -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">10. Contact Us</h2>
                            <p>If you have any questions about these Terms, please contact us:</p>
                            <ul class="list-unstyled">
                                <li><i class="bi bi-envelope me-2"></i> Email: legal@women-grc.org</li>
                                <li><i class="bi bi-geo-alt me-2"></i> Address: [Your Company Address]</li>
                                <li><i class="bi bi-telephone me-2"></i> Phone: [Your Phone Number]</li>
                            </ul>
                        </section>

                        <!-- Acceptance -->
                        <div class="alert alert-info">
                            <div class="d-flex">
                                <i class="bi bi-info-circle-fill fs-5 me-3"></i>
                                <div>
                                    <p class="mb-0"><strong>By using our Service, you acknowledge that you have 
                                        read, understood, and agree to be bound by these Terms of Service.</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Back Button -->
                    <div class="text-center mt-5">
                        <nuxt-link to="/auth/register" class="btn btn-primary">
                            <i class="bi bi-arrow-left me-2"></i>
                            Back to Registration
                        </nuxt-link>
                        <nuxt-link to="/" class="btn btn-outline-secondary ms-2">
                            <i class="bi bi-house me-2"></i>
                            Back to Home
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-layout>
</template>

<script setup>
import { ref } from 'vue';

const lastUpdated = ref(new Date('2024-01-01'));

const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>

<style scoped>
.terms-content {
    max-height: 600px;
    overflow-y: auto;
    padding-right: 1rem;
}

.terms-content::-webkit-scrollbar {
    width: 8px;
}

.terms-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.terms-content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.terms-content::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.card {
    border-radius: 12px;
}

h2 {
    color: #2c3e50;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e9ecef;
}

ul li {
    margin-bottom: 0.5rem;
    position: relative;
}

ul li:before {
    content: "•";
    color: #4dabf7;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
}

.alert {
    border-left: 4px solid #4dabf7;
    border-radius: 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-body {
        padding: 2rem 1rem !important;
    }
    
    .terms-content {
        max-height: none;
        overflow-y: visible;
    }
}
</style>