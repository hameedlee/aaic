document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('applicationForm');
    const steps = document.querySelectorAll('.step-content');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const classCategoryBtns = document.querySelectorAll('.class-category-btn');
    const progressLine = document.getElementById('progress-line');
    const stepIndicators = [
        document.getElementById('step-1-indicator'),
        document.getElementById('step-2-indicator'),
        document.getElementById('step-3-indicator')
    ];

    let currentStep = 0;
    let selectedCategory = null;

    function updateProgressIndicator() {
        // Update progress bar
        const progress = (currentStep / (steps.length - 1)) * 100;
        progressLine.style.width = `${progress}%`;

        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            if (index <= currentStep) {
                indicator.classList.remove('border-gray-300', 'text-gray-400', 'bg-white');
                indicator.classList.add('border-emerald-500', 'bg-emerald-500', 'text-white');
            } else {
                indicator.classList.add('border-gray-300', 'text-gray-400', 'bg-white');
                indicator.classList.remove('border-emerald-500', 'bg-emerald-500', 'text-white');
            }
        });
    }

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });

        // Update button visibility
        prevBtn.style.display = stepIndex === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = stepIndex === steps.length - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = stepIndex === steps.length - 1 ? 'inline-block' : 'none';

        // Disable next button on step 1 until a category is selected
        if (stepIndex === 0) {
            nextBtn.disabled = !selectedCategory;
            nextBtn.classList.toggle('opacity-50', !selectedCategory);
        } else {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50');
        }
        updateProgressIndicator();
    }

    function validateStep(stepIndex) {
        let isValid = true;
        const currentStepInputs = steps[stepIndex].querySelectorAll('[required]');
        currentStepInputs.forEach(input => {
            if (!input.value) {
                isValid = false;
            }
        });
        return isValid;
    }

    classCategoryBtns.forEach(button => {
        button.addEventListener('click', () => {
            classCategoryBtns.forEach(btn => btn.classList.remove('step-active'));
            button.classList.add('step-active');
            selectedCategory = button.dataset.category;
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50');
        });
    });

    nextBtn.addEventListener('click', () => {
        if (currentStep === 0 && !selectedCategory) {
            alert('Please select a class category.');
            return;
        }

        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        } else {
            alert('Please fill in all required fields.');
        }
    });

    prevBtn.addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.classCategory = selectedCategory;

            console.log('Form Submitted!', data);
            alert('Application submitted successfully!');
            form.reset();
            currentStep = 0;
            selectedCategory = null;
            showStep(currentStep);
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Initialize the form
    showStep(currentStep);
});
