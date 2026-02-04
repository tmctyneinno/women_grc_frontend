<template>
    <nuxt-layout name="landing-layout">
       

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
