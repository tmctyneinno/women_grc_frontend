<template>
    <div class="main-page">
        <div class="container">
            <div data-aos="fade-up" class="row g-3 justify-content-center">
                <div class="col-lg-8 col-md-12">
                    <div class="text-center d-flex justify-content-center">
                        <div style="min-width: 300px;" class="text-after-line text-muted2 ms-lg-5 ">
                            FAQ
                        </div>
                    </div>
                    <div class="header">Frequently asked questions</div>
                    <div class="text-center text-muted">
                        Find fast answers to common questions regarding governance, risk management, and compliance.
                        Review our FAQs for helpful information.
                    </div>
                </div>

                <div class="col-12">
                    <div class="accordion accordion-flush" id="accordionFaqs">

                        <div v-for="({ question, answer }, index) in faqs" class="accordion-item bg-transparent">
                            <h2 class="accordion-header" :id="'flush-headingOne' + index">
                                <button class="accordion-button collapsed fw-bold py-4 bg-transparent" type="button"
                                    data-bs-toggle="collapse" :data-bs-target="'#flush-collapseOne' + index"
                                    aria-expanded="true" :aria-controls="'flush-collapseOne' + index">
                                    {{ question }}
                                </button>
                            </h2>
                            <div :id="'flush-collapseOne' + index" class="accordion-collapse collapse"
                                :aria-labelledby="'flush-headingOne' + index" data-bs-parent="#accordionFaqs">
                                <div class="accordion-body">
                                    {{ answer }}
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
            </div>

            <div style="min-height: 200px;" class="bg-light d-flex justify-content-center align-items-center">
                <div class="text-center">
                    <h4 class="fw-bold text-center">
                        Still have questions?
                    </h4>
                    <div>
                        Can’t find the answer you’re looking for? Please chat to our friendly team.
                    </div>
                    <nuxt-link to="/" class="btn btn-theme mt-4">Get in touch</nuxt-link>
                </div>
            </div>
        </div>


    </div>
</template>


<script lang="ts" setup>

interface AccordionInterface {
    question: string,
    answer: string,

}

const faqs = ref<AccordionInterface[]>([
    {
        question: 'How is privacy and data security handled?',
        answer: `We are committed to safeguarding your data with robust privacy and security measures. For details, refer to our Privacy Policy on the website.`,
    },
    {
        question: 'How are women leaders recognized on this platform?',
        answer: `The Recognition section features profiles of accomplished women, their achievements, and awards, including a link to the GRCFINCRIME Awards website.`,
    },
    {
        question: 'How can I contribute to the initiative?',
        answer: `You can contribute by volunteering, mentoring, sponsoring events, or making donations. You can send us an email to get started!`,
    },
    {
        question: 'Are the events virtual or in-person?',
        answer: `Our events include a mix of virtual webinars and in-person conferences, ensuring accessibility and global reach. Check the Events section for details on upcoming activities.`,
    },
    {
        question: 'How does the mentorship program work?',
        answer: `The mentorship program pairs experienced professionals with mentees based on their expertise, goals, and interests. Regular sessions, progress tracking, and feedback tools ensure meaningful connections.`,
    },
    {
        question: 'Who can become a member of the platform?',
        answer: `Any professional passionate about advancing women in GRC and financial crime prevention, including women leaders, aspiring professionals, and allies from all industries and sectors.`,
    },
    {
        question: 'Can I access the platform globally?',
        answer: `Yes, the platform is designed for global accessibility, welcoming members from all regions and industries.`,
    },
    {
        question: 'What resources are available in the Resource Library?',
        answer: `The Resource Library offers blogs, white papers, toolkits, case studies, and industry insights to help members stay informed and succeed in their fields.`,
    },
    {
        question: 'Are there any membership fees?',
        answer: `Membership details, will be specified during the registration process. We aim to keep it accessible to a wide audience.`,
    },
    {
        question: 'What is the purpose of the Diversity & Inclusion metrics?',
        answer: `The metrics showcase stories and initiatives promoting women’s advancement in GRC and financial crime prevention, highlighting the impact of diversity in leadership.`,
    },
    {
        question: 'How can I join the membership portal?',
        answer: `You can sign up through our user-friendly membership portal by creating an account, providing your professional details, and selecting your area of interest.`,
    },
    {
        question: 'What is the purpose of this initiative?',
        answer: `The initiative aims to empower women in Governance, Risk, Compliance (GRC), financial crime prevention, and fraud prevention, fostering leadership and creating opportunities for professional growth and collaboration.`,
    },
])


</script>




<style scoped>
.main-page {
    padding-block: 60px;
    min-height: 100vh;
}

.header {
    font-size: 36px;
    color: #333;
    text-align: center;
}

.accordion-button:not(.collapsed) {
    color: var(--theme-color) !important;
    background-color: var(--theme-bg-subtle) !important;
}
</style>