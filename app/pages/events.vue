/* assets/css/main.css */
/* Custom Bootstrap utilities */

/* Display responsive classes */
.display-md-3 {
    font-size: calc(1.3rem + 3.6vw);
}

@media (min-width: 768px) {
    .display-md-3 {
        font-size: 2.5rem;
    }
}

.display-lg-2 {
    font-size: calc(1.3rem + 3.6vw);
}

@media (min-width: 992px) {
    .display-lg-2 {
        font-size: 3rem;
    }
}

/* Width and height utilities */
.max-w-2xl {
    max-width: 42rem;
}

.max-w-3xl {
    max-width: 48rem;
}

.max-w-md {
    max-width: 28rem;
}

.w-64 {
    width: 16rem;
}

.h-64 {
    height: 16rem;
}

.w-5 {
    width: 3rem;
}

.h-5 {
    height: 3rem;
}

.w-3 {
    width: 2.5rem;
}

.h-3 {
    height: 2.5rem;
}

/* Background colors */
.bg-purple {
    background-color: #6f42c1 !important;
}

/* Text colors */
.text-white-50 {
    color: rgba(255, 255, 255, 0.5) !important;
}

/* Border colors */
.border-white {
    border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Opacity */
.border-opacity-20 {
    --bs-border-opacity: 0.2;
}

.bg-opacity-10 {
    --bs-bg-opacity: 0.1;
}

/* Custom border utilities */
.border-top-0 {
    border-top: 0 !important;
}

.border-end-0 {
    border-right: 0 !important;
}

.border-bottom-0 {
    border-bottom: 0 !important;
}

/* Placeholder colors */
.placeholder-white-50::placeholder {
    color: rgba(255, 255, 255, 0.5) !important;
}

/* Cursor */
.cursor-pointer {
    cursor: pointer;
}

.cursor-not-allowed {
    cursor: not-allowed;
}

/* Gradient text */
.text-gradient-cyan-purple {
    background: linear-gradient(to right, #0dcaf0, #6f42c1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Gradient backgrounds */
.bg-gradient-cyan-purple {
    background: linear-gradient(to right, #0dcaf0, #6f42c1) !important;
    border: none;
}

.bg-gradient-warning {
    background: linear-gradient(to right, #ffc107, #fd7e14) !important;
}

.bg-gradient-dark {
    background: linear-gradient(to right, #212529, #000) !important;
}

/* Focus styles */
.focus-outline-cyan:focus {
    outline: none;
    border-color: #0dcaf0 !important;
    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.25) !important;
}

/* Backdrop filter */
.backdrop-filter-blur {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

/* Blur effect */
.blur-3 {
    filter: blur(3rem);
}

/* Hover effects */
.hover-light:hover {
    background-color: rgba(248, 249, 250, 0.8) !important;
}

.hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(13, 202, 240, 0.25) !important;
}

/* Transitions */
.transition-all {
    transition: all 0.2s ease;
}

/* Hide scrollbar */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Smooth scrolling */
.scroll-smooth {
    scroll-behavior: smooth;
}

/* Animations */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.4;
    }
}

@keyframes ping {
    75%, 100% {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

/* Custom spinner border */
.spinner-border.text-primary {
    border-color: #0dcaf0;
    border-right-color: transparent;
}