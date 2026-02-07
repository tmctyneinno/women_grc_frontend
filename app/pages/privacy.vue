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
                        <h1 class="h2 fw-bold text-dark mb-2">Privacy Policy</h1>
                        <p class="text-muted mb-0">
                            Last Updated: {{ formatDate(lastUpdated) }}
                        </p>
                    </div>

                    <!-- Privacy Content -->
                    <div class="privacy-content">
                        <!-- Introduction -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">1. Introduction</h2>
                            <p>
                                Women in Governance, Risk, and Compliance ("WGRC", "we", "us", or "our") is 
                                committed to protecting your privacy. This Privacy Policy explains how we collect, 
                                use, disclose, and safeguard your information when you use our Service.
                            </p>
                            <p>
                                Please read this Privacy Policy carefully. If you do not agree with the terms of 
                                this Privacy Policy, please do not access the Service.
                            </p>
                        </section>

                        <!-- Information We Collect -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">2. Information We Collect</h2>
                            
                            <h5 class="fw-bold mt-4 mb-3">Personal Data</h5>
                            <p>We collect personal information that you voluntarily provide when you:</p>
                            <ul class="ps-4">
                                <li>Register for an account</li>
                                <li>Update your profile</li>
                                <li>Participate in discussions</li>
                                <li>Contact us for support</li>
                                <li>Subscribe to our newsletter</li>
                            </ul>
                            <p>This may include:</p>
                            <ul class="ps-4">
                                <li><strong>Identification Information:</strong> Name, email address, LinkedIn profile</li>
                                <li><strong>Account Information:</strong> Username, password, profile picture</li>
                                <li><strong>Professional Information:</strong> Job title, company, industry</li>
                                <li><strong>Communication Data:</strong> Messages, feedback, support queries</li>
                            </ul>

                            <h5 class="fw-bold mt-4 mb-3">Automatically Collected Information</h5>
                            <p>When you use our Service, we automatically collect:</p>
                            <ul class="ps-4">
                                <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
                                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                                <li><strong>Location Data:</strong> General geographic location (country, city)</li>
                                <li><strong>Cookies and Tracking:</strong> Session data, preferences, analytics</li>
                            </ul>
                        </section>

                        <!-- How We Use Your Information -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">3. How We Use Your Information</h2>
                            <p>We use the collected information for various purposes:</p>
                            <ul class="ps-4">
                                <li><strong>To provide and maintain our Service</strong></li>
                                <li><strong>To notify you about changes to our Service</strong></li>
                                <li><strong>To allow you to participate in interactive features</strong></li>
                                <li><strong>To provide customer support</strong></li>
                                <li><strong>To gather analysis or valuable information to improve our Service</strong></li>
                                <li><strong>To monitor the usage of our Service</strong></li>
                                <li><strong>To detect, prevent, and address technical issues</strong></li>
                                <li><strong>To send you newsletters, marketing materials, and other information</strong></li>
                                <li><strong>To comply with legal obligations</strong></li>
                            </ul>
                        </section>

                        <!-- Data Sharing and Disclosure -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">4. Data Sharing and Disclosure</h2>
                            <p>We may share your information in the following situations:</p>
                            
                            <h5 class="fw-bold mt-4 mb-3">With Service Providers</h5>
                            <p>We may share your information with third-party vendors to:</p>
                            <ul class="ps-4">
                                <li>Host our Service</li>
                                <li>Provide database management</li>
                                <li>Send email communications</li>
                                <li>Analyze Service usage</li>
                                <li>Process payments</li>
                            </ul>

                            <h5 class="fw-bold mt-4 mb-3">For Business Transfers</h5>
                            <p>If we are involved in a merger, acquisition, or asset sale, your Personal Data may be transferred.</p>

                            <h5 class="fw-bold mt-4 mb-3">With Your Consent</h5>
                            <p>We may disclose your personal information for any other purpose with your consent.</p>

                            <h5 class="fw-bold mt-4 mb-3">Legal Requirements</h5>
                            <p>We may disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.</p>
                        </section>

                        <!-- Data Security -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">5. Data Security</h2>
                            <p>The security of your data is important to us. We implement appropriate technical and 
                                organizational measures to protect your personal information against unauthorized 
                                access, alteration, disclosure, or destruction.</p>
                            <p>However, no method of transmission over the Internet or electronic storage is 100% 
                                secure. While we strive to use commercially acceptable means to protect your Personal 
                                Data, we cannot guarantee its absolute security.</p>
                        </section>

                        <!-- Data Retention -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">6. Data Retention</h2>
                            <p>We will retain your Personal Data only for as long as is necessary for the purposes 
                                set out in this Privacy Policy. We will retain and use your Personal Data to the 
                                extent necessary to comply with our legal obligations, resolve disputes, and enforce 
                                our legal agreements and policies.</p>
                        </section>

                        <!-- Your Data Protection Rights -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">7. Your Data Protection Rights</h2>
                            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                            <ul class="ps-4">
                                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                                <li><strong>Right to Restrict Processing:</strong> Request restriction of processing</li>
                                <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                                <li><strong>Right to Object:</strong> Object to our processing of your data</li>
                            </ul>
                            <p>To exercise these rights, please contact us using the information below.</p>
                        </section>

                        <!-- Cookies Policy -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">8. Cookies Policy</h2>
                            <p>We use cookies and similar tracking technologies to track activity on our Service 
                                and hold certain information.</p>
                            
                            <h5 class="fw-bold mt-4 mb-3">Types of Cookies We Use</h5>
                            <ul class="ps-4">
                                <li><strong>Essential Cookies:</strong> Required for the Service to function</li>
                                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact</li>
                                <li><strong>Marketing Cookies:</strong> Track visitors across websites</li>
                            </ul>

                            <h5 class="fw-bold mt-4 mb-3">Managing Cookies</h5>
                            <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is 
                                being sent. However, if you do not accept cookies, you may not be able to use some 
                                portions of our Service.</p>
                        </section>

                        <!-- Third-Party Services -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">9. Third-Party Services</h2>
                            <p>Our Service may contain links to other websites that are not operated by us. If you 
                                click on a third-party link, you will be directed to that third party's site. We 
                                strongly advise you to review the Privacy Policy of every site you visit.</p>
                            <p>We have no control over and assume no responsibility for the content, privacy 
                                policies, or practices of any third-party sites or services.</p>
                        </section>

                        <!-- Children's Privacy -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">10. Children's Privacy</h2>
                            <p>Our Service does not address anyone under the age of 18 ("Children"). We do not 
                                knowingly collect personally identifiable information from anyone under the age of 
                                18. If you are a parent or guardian and you are aware that your Child has provided 
                                us with Personal Data, please contact us. If we become aware that we have collected 
                                Personal Data from children without verification of parental consent, we take steps 
                                to remove that information from our servers.</p>
                        </section>

                        <!-- Changes to This Privacy Policy -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">11. Changes to This Privacy Policy</h2>
                            <p>We may update our Privacy Policy from time to time. We will notify you of any 
                                changes by posting the new Privacy Policy on this page and updating the "Last 
                                Updated" date.</p>
                            <p>You are advised to review this Privacy Policy periodically for any changes. Changes 
                                to this Privacy Policy are effective when they are posted on this page.</p>
                        </section>

                        <!-- Contact Us -->
                        <section class="mb-5">
                            <h2 class="h4 fw-bold text-dark mb-3">12. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us:</p>
                            <ul class="list-unstyled">
                                <li><i class="bi bi-envelope me-2"></i> Email: privacy@women-grc.org</li>
                                <li><i class="bi bi-geo-alt me-2"></i> Address: [Your Company Address]</li>
                                <li><i class="bi bi-telephone me-2"></i> Phone: [Your Phone Number]</li>
                                <li><i class="bi bi-clock me-2"></i> Response Time: Within 48 business hours</li>
                            </ul>
                            <p>For data protection inquiries, please contact our Data Protection Officer at: <strong>dpo@women-grc.org</strong></p>
                        </section>

                        <!-- Compliance Notice -->
                        <div class="alert alert-success">
                            <div class="d-flex">
                                <i class="bi bi-shield-check fs-5 me-3"></i>
                                <div>
                                    <p class="mb-0"><strong>We are committed to complying with applicable data 
                                        protection laws including GDPR, CCPA, and other privacy regulations.</strong></p>
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
                        <nuxt-link to="/terms" class="btn btn-outline-info ms-2">
                            <i class="bi bi-file-text me-2"></i>
                            View Terms of Service
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
.privacy-content {
    max-height: 600px;
    overflow-y: auto;
    padding-right: 1rem;
}

.privacy-content::-webkit-scrollbar {
    width: 8px;
}

.privacy-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.privacy-content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.privacy-content::-webkit-scrollbar-thumb:hover {
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

h5 {
    color: #495057;
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

.alert-success {
    border-left: 4px solid #28a745;
    border-radius: 8px;
}

.list-unstyled li {
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-body {
        padding: 2rem 1rem !important;
    }
    
    .privacy-content {
        max-height: none;
        overflow-y: visible;
    }
    
    .text-center .btn {
        display: block;
        width: 100%;
        margin-bottom: 0.5rem;
    }
    
    .text-center .btn:not(:first-child) {
        margin-left: 0 !important;
    }
}
</style>