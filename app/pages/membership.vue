<template>
    <nuxt-layout name="landing-layout">
        <div class="container">
            <div class="hero animate__animated animate__fadeIn row g-3 justify-content-center align-items-center">
                <div class="col-lg-6 order-2 order-lg-1">
                    <div style="font-size: 24px; font-weight: 500;">
                        WGRCFP membership is designed to foster professional growth, visibility, and impact for women
                        working in or aspiring to lead within the fields of governance, risk management, compliance
                        (GRC), financial crime prevention, fraud, cyber risk, and ESG.
                    </div>
                    <div>
                        Our plans are tailored to meet the needs of individuals at different stages of their career and
                        organisations committed to gender equity in risk and compliance leadership.
                    </div>
                </div>
                <div class="col-lg-6 order-1 order-lg-2">
                    <div class="text-center heroImage">
                        <img class="float-lg-end " src="/images/membership/header.png" style="width: 80%;" alt=""></img>
                    </div>
                </div>
            </div>
        </div>

        <section data-aos="fade-up" class="py-5 container">
            <div class="row">
                <div class="col-md-4">
                    <div class="text-after-line">
                        Enrollment
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="header1 text-theme">
                        Who We Are Attracting?
                    </div>
                </div>
            </div>
            <div class="mt-2 row g-3">
                <div class="col-md-4" v-for="val in whoWeAreAttracting" :key="val.id">
                    <div class="card bg-theme text-white border-0">
                        <div class="card-body">
                            <i class="bi bi-box-seam fs-4"></i>
                            <div class="card-text">
                                {{ val.text }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section data-aos="fade-up" class="py-5 container">
            <div class="row">
                <div class="col-md-4">
                    <div class="text-after-line">
                        Become Our Membership
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="header1 text-theme">
                        Our Membership Categories
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <!-- SKIPPED -->
            </div>
        </section>


        <section class="py-5 container">
            <div class="row">
                <div class="col-md-4">
                    <div class="text-after-line">
                        Requirements
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="header1 text-theme">
                        WGRCFP General Eligibility Criteria
                    </div>
                </div>
            </div>


            <div class="text-center">
                <img src="/images/membership/people.png" style="width: 30%;" alt="">
            </div>



            <div class="header1 text-theme">
                Applicant must at least must one of these criterias
            </div>

            <ul>
                <li>
                    <strong>Professional Experience</strong>
                    <div>Currently employed or previously worked in roles related to: Governance, Risk Management,
                        Internal Audit, or Regulatory Affairs Compliance, Ethics, Legal Advisory, ESG or Sustainability
                        Governance Financial Crime Prevention, AML, Sanctions, Fraud, or Cybersecurity Data Privacy,
                        Digital Risk, FinTech Regulation, or Policy & Oversight
                    </div>
                </li>
                <li>
                    <strong>Academic/Student Affiliation</strong>
                    <div>
                        Enrolled in or recently graduated from a degree, certification, or training program in GRC, Law,
                        Finance, Criminology, Cybersecurity, ESG, Business Management, or a closely aligned field
                    </div>
                </li>
                <li>
                    <strong>Entrepreneurial or Advisory Roles</strong>
                    <div>
                        Founder or senior leader of a business, consultancy, NGO, or initiative operating in the risk,
                        compliance, legal, financial, ESG, or anti-fraud sectors.
                    </div>
                </li>
                <li>
                    <strong>Advocacy & Research</strong>
                    <div>Active contributor in academia, policy, journalism, or advocacy working on risk, ethical
                        leadership, regulatory frameworks, or financial transparency.
                    </div>
                </li>
                <li>
                    <strong>Types of Membership</strong>
                    <div>
                        Professional Women with 2+ years’ experience in any GRC or Financial Crime Prevention field
                        Student/Emerging Women currently in or recently completed formal training in related
                        disciplines,Executive/Leader: Senior professionals, board members, and founders across relevant
                        industries,Ally/Supporter Male allies or professionals who support gender equity and ethical
                        governance
                    </div>
                </li>
            </ul>

        </section>




        <section data-aos="fade-up" class="py-5 container">
            <div class="header1 text-theme">
                Application Requirement
            </div>

            <div class="row mt-3">
                <div v-for="(appReq, index) in pageContents.applicationRequirement" :key="index" class="col">
                    <div class="card border-0 ">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <i class="condom-circle bi fs-4" :class="`bi-${index + 1}-circle`"></i>
                            </div>
                            <div class="text-center small">
                                {{ appReq }}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>



        <div class="container py-5">
            <landing-subscribe-component />
        </div>


    </nuxt-layout>

    <landing-modal-profile-info />

</template>

<script setup lang="ts">
import pageContents from '~/stores/pageContents/membership.json'


const whoWeAreAttracting: { id: number, text: string }[] = [
    { id: 1, text: "Women in all industries or sectors, public sector, startups, academia, NGOs, and international institutions" },
    { id: 2, text: "Leaders and early-career professionals passionate about building risk-aware, compliant, and ethical organizations" },
    { id: 3, text: "Changemakers who are committed to transforming GRC culture through diversity and collaboration" },
]




</script>

<style scoped>
.hero {
    min-height: 100vh;
}

@media (max-width: 767px) {
    .heroImage {
        padding-top: 100px;
    }
}

.header1 {
    font-size: 24px;
    /* color: #333; */
}


.condom-circle {
    background-color: var(--bs-light);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
</style>
