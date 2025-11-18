<template>
    <div class="dropdown cursor-pointer">
        <span class="position-relative dropdown-toggle" id="triggerId" data-bs-toggle="dropdown">
            <i class="bi bi-bell "></i>
            <span
                class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            </span>
        </span>

        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="triggerId">
            <div class=" dropdown-item disabled text-dark fw-medium">
                Notifications
            </div>
            <a class="dropdown-item xsmall fw-medium " href="#">
                <div class="text-ellipsis">
                    <strong>Reminder:</strong> “Women in Leadership” event starts tomorrow at 10 AM.
                </div>
                <i class="xsmall bi bi-circle-fill text-theme float-end"></i>
                <div class="xsmal text-muted">5 mins ago.</div>
            </a>

            <a class="dropdown-item xsmall fw-medium " href="#">
                <div class="text-ellipsis">
                    You’re 80% done with “Introduction to GRC.” Keep going!
                </div>
                <i class="xsmall bi bi-circle-fill text-theme float-end"></i>
                <div class="xsmal text-muted">10 mins ago.</div>
            </a>


            <a class="dropdown-item xsmall text-muted" href="#">
                <div class="text-ellipsis">
                    Start by exploring your dashboard — join your first event or enroll in a learning module.
                </div>
                <div class="xsmal text-muted">15 mins ago.</div>
            </a>

            <a class="dropdown-item xsmall text-muted " href="#">
                <div class="text-ellipsis">
                    Your account is under review. You’ll receive an email once verification is complete.
                </div>
                <div class="xsmal text-muted">20 mins ago.</div>
            </a>

        </div>
    </div>

</template>

<style scoped>
.dropdown-menu {
    width: 350px;
}

.text-ellipsis {
    /* width: 300px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-item:active {
    background: transparent !important;
}
</style>