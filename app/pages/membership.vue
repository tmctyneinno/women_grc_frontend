<template>
    <nuxt-layout name="landing-layout">
        <div class="container">
            <div class="hero  row g-3 justify-content-center align-items-center">
                <div class="col-lg-6 order-2 order-lg-1 animate__animated animate__slideInLeft">
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
                    <div class="text-center heroImage ">
                        <img class="float-lg-end animate__animated animate__slideInRight"
                            src="/images/membership/header.png" style="width: 80%;" alt=""></img>
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
            <div class="row g-3">
                <div class="col-md-4">
                    <div class="text-after-line">
                        Become Our Membership
                    </div>
                </div>
                <div class="col-md-12">
                    <span class="header1 text-theme">
                        Our Membership Categories
                    </span>
                    <span class="float-md-end">
                        <button class="btn btn-theme">Become a Member</button>
                    </span>


                </div>

                <div class="col-md-12">
                    <div class="accordion accordion-flush" id="accordionFlushExample">

                        <div class="accordion-item border-0 ">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="true"
                                    aria-controls="flush-collapseOne">
                                    1. Individual Membership
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">

                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <td class="text-theme "
                                                        v-for="header in membershipCategories.individualMembership.headers">
                                                        {{ header.text }}
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in membershipCategories.individualMembership.items">
                                                    <td>{{ item.tier }}</td>
                                                    <td>{{ item.annual_fee }}</td>
                                                    <td>{{ item.target_audience }}</td>
                                                    <td>{{ item.benefits }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>


                        <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="flush-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo" aria-expanded="true"
                                    aria-controls="flush-collapseTwo">
                                    2. Cooperate & Institutional Membership
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">


                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <td class="text-theme "
                                                        v-for="header in membershipCategories.coporateAndIndividual.headers">
                                                        {{ header.text }}
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in membershipCategories.coporateAndIndividual.items">
                                                    <td>{{ item.tier }}</td>
                                                    <td>{{ item.annual_fee }}</td>
                                                    <td>{{ item.target_audience }}</td>
                                                    <td>{{ item.benefits }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>


                        <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="flush-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree" aria-expanded="true"
                                    aria-controls="flush-collapseThree">
                                    3. Mentor Membership
                                </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    For experienced professionals committed to guiding and mentoring others.
                                </div>
                            </div>
                        </div>



                        <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="flush-headingFour">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseFour" aria-expanded="true"
                                    aria-controls="flush-collapseFour">
                                    4. Affiliate Membership
                                </button>
                            </h2>
                            <div id="flush-collapseFour" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    For those in related industries who support the objectives of the initiative.
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
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


            <div class="text-center " data-aos="zoom-in">
                <img src="/images/membership/people.png" style="width: 30%;" alt="">
            </div>



            <div class="header1 text-theme mb-3">
                Applicant must at least must one of these criterias
            </div>

            <ul data-aos="fade-up">
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



        <section class="py-5 container">
            <h5 class="fw-bold text-center fs-5 mb-4">What You Will Gain</h5>
            <div class="row g-3">
                <div v-for="(gain, index) in pageContents.whatYouWillGain" :key="index" class="col-lg-3">
                    <div class="card border-0 bg-light h-10">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <i class="theme-circle bi bi-laptop fs-4"></i>
                            </div>
                            <div class="text-center small my-3 fw-bold">
                                {{ gain.title }}
                            </div>

                            <div class="text-center small my-2">
                                {{ gain.text }}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>




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



const headers = ref([
    { text: "Tier", value: "tier" },
    { text: "Annual Fee", value: "annual_fee" },
    { text: "Target Audience", value: "target_audience" },
    { text: "Benefits", value: "benefits" },
])


const membershipCategories = {
    individualMembership: {
        headers: [
            { text: "Tier", value: "tier" },
            { text: "Annual Fee", value: "annual_fee" },
            { text: "Target Audience", value: "target_audience" },
            { text: "Benefits", value: "benefits" },
        ],
        items: [
            {
                tier: "Student Member", annual_fee: "$50",
                target_audience: "University students or recent graduates",
                benefits: "Access to entry-level GRC and Financial Crime Prevention resources, internships/job board, career support"
            },
            {
                tier: "Associate Member", annual_fee: "$75",
                target_audience: "Early career professionals (0–5 years’ experience)",
                benefits: "Monthly webinars, WGRCFP newsletter, member badge, discounted events"
            },
            {
                tier: "Associate Member", annual_fee: "$150",
                target_audience: "Mid-career professionals & specialists.",
                benefits: "Full event access, member directory listing, speaker opportunities"
            },
            {
                tier: "Associate Member", annual_fee: "$250",
                target_audience: "Senior executives, directors, partners",
                benefits: "Priority speaking roles, leadership roundtables, mentor opportunities"
            },
            {
                tier: "Associate Member", annual_fee: "$300 (by invitation or assessment)",
                target_audience: "Accredited senior experts & contributors",
                benefits: "Voting rights, governance roles, advisory participation, advanced credentials"
            }
        ]
    },
    coporateAndIndividual: {
        headers: [
            { text: "Tier", value: "tier" },
            { text: "Annual Fee", value: "annual_fee" },
            { text: "Ideal For", value: "target_audience" },
            { text: "Benefits", value: "benefits" },
        ],
        items: [
            {
                tier: "SME Partner", annual_fee: "$750",
                target_audience: "Small–medium enterprises (up to 250 employees)",
                benefits: "2 staff accounts, company logo on partner page, discounted training bundles"
            },
            {
                tier: "Corporate Member", annual_fee: "$2,000",
                target_audience: "Large organisations or regional offices",
                benefits: "5 staff accounts, free event passes, internal workshop session, DEI support tools"
            },
            {
                tier: "Strategic Partner", annual_fee: "$5,000+",
                target_audience: "Multinationals, government, academic or regulatory institutions",
                benefits: "Co-branded initiatives, 10 accounts, policy roundtable access, joint publications"
            },

        ]
    }
}


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


.theme-circle {
    background-color: var(--theme-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
}

.accordion-button {
    background-color: transparent;
}

.accordion-button:hover {
    background-color: var(--bs-secondary-bg-subtle);
}

@media (max-width: 767px) {
    .header1 {
        font-size: 24px;
    }
}
</style>
