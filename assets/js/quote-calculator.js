document.addEventListener('DOMContentLoaded', function () {
    const estimateToolForm = document.getElementById('estimateToolForm');

    if (!estimateToolForm) {
        return;
    }

    const priceMatrix = {
        ROOFED: { budget: 6000, standard: 7000, semiLuxury: 10000, luxury: 15000, premium: 30000 },
        BOX: { budget: 7000, standard: 8000, semiLuxury: 12000, luxury: 17000, premium: 35000 },
        CABANA: { budget: 3500, standard: 5500, semiLuxury: 7500, luxury: 11000, premium: 25000 },
        VILLA: { budget: 10000, standard: 12000, semiLuxury: 16000, luxury: 15000, premium: 40000 },
        MANSION: { budget: 17000, standard: 25000, semiLuxury: 31000, luxury: 40000, premium: 75000 }
    };

    const perchToSqft = 271;

    const houseTypeInput = document.getElementById('houseType');
    const houseAreaInput = document.getElementById('houseArea');
    const landPerchInput = document.getElementById('landPerch');
    const estimateMobileInput = document.getElementById('estimateMobile');
    const estimateEmailInput = document.getElementById('estimateEmail');
    const calculateButton = document.getElementById('estimateCalculateBtn');
    const companyWhatsAppNumber = '94713720667';

    const buildAreaSqftOutput = document.getElementById('buildAreaSqft');
    const landSqftOutput = document.getElementById('landSqft');
    const budgetCostOutput = document.getElementById('budgetCost');
    const standardCostOutput = document.getElementById('standardCost');
    const semiLuxuryCostOutput = document.getElementById('semiLuxuryCost');
    const luxuryCostOutput = document.getElementById('luxuryCost');
    const premiumCostOutput = document.getElementById('premiumCost');
    const estimateNote = document.getElementById('estimateNote');

    function restoreNativeSelect(selectElement) {
        if (!selectElement) {
            return;
        }

        const nextNode = selectElement.nextElementSibling;
        if (nextNode && nextNode.classList && nextNode.classList.contains('nice-select')) {
            nextNode.remove();
        }

        selectElement.style.display = 'block';
        selectElement.style.position = 'static';
        selectElement.style.opacity = '1';
        selectElement.style.pointerEvents = 'auto';
        selectElement.removeAttribute('tabindex');
    }

    function formatLkr(amount) {
        return 'LKR ' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(amount);
    }

    function buildLeadMessage(lead) {
        return [
            'New Home Estimate Lead',
            '',
            'Mobile: ' + (lead.mobile || '-'),
            'Email: ' + (lead.email || '-'),
            'House Type: ' + lead.houseType,
            'Total Build Area (SQFT): ' + lead.totalArea,
            'Land Size (SQFT): ' + lead.landSqft,
            'Budget: ' + lead.budget,
            'Standard: ' + lead.standard,
            'Semi-Luxury: ' + lead.semiLuxury,
            'Luxury: ' + lead.luxury,
            'Premium: ' + lead.premium
        ].join('\n');
    }

    function resetCostOutputs() {
        budgetCostOutput.textContent = 'LKR -';
        standardCostOutput.textContent = 'LKR -';
        semiLuxuryCostOutput.textContent = 'LKR -';
        luxuryCostOutput.textContent = 'LKR -';
        premiumCostOutput.textContent = 'LKR -';
    }

    function hasContactDetails() {
        const mobileValue = estimateMobileInput ? estimateMobileInput.value : '';
        const emailValue = estimateEmailInput ? estimateEmailInput.value : '';
        return mobileValue.trim().length > 0 || emailValue.trim().length > 0;
    }

    function updateContactValidationState() {
        if (!estimateMobileInput || !estimateEmailInput) {
            return;
        }

        estimateMobileInput.classList.remove('input-error');
        estimateEmailInput.classList.remove('input-error');
    }

    function updateEstimate() {
        const houseType = (houseTypeInput.value || '').trim();
        const houseArea = Number.parseFloat(houseAreaInput.value || '0');
        const landPerch = Number.parseFloat(landPerchInput.value || '0');

        const landSqft = landPerch > 0 ? landPerch * perchToSqft : 0;
        landSqftOutput.textContent = landSqft > 0 ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(landSqft) : '-';
        buildAreaSqftOutput.textContent = '-';

        updateContactValidationState();

        if (!hasContactDetails()) {
            resetCostOutputs();
            estimateNote.textContent = 'Enter mobile number or email to view the estimate.';
            return;
        }

        const effectiveHouseType = houseType || 'ROOFED';
        let totalAreaSqft = 0;

        if (houseArea > 0) {
            totalAreaSqft = houseArea;
        } else if (landSqft > 0) {
            totalAreaSqft = landSqft;
        } else {
            resetCostOutputs();
            estimateNote.textContent = 'Enter area or land size to calculate.';
            return;
        }

        const selectedRates = priceMatrix[effectiveHouseType];

        if (!selectedRates) {
            resetCostOutputs();
            estimateNote.textContent = 'Please select a valid house type.';
            return;
        }

        buildAreaSqftOutput.textContent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(totalAreaSqft);

        budgetCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.budget);
        standardCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.standard);
        semiLuxuryCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.semiLuxury);
        luxuryCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.luxury);
        premiumCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.premium);

        if (houseArea <= 0 && landSqft > 0) {
            estimateNote.textContent = 'Estimated using land size as total build area (default type: Roofed).';
        } else if (landSqft > 0 && landSqft < totalAreaSqft) {
            estimateNote.textContent = 'Warning: Land size is less than total house area.';
        } else {
            estimateNote.textContent = 'Estimated using selected type and total area.';
        }
    }

    function sendLeadByEmail(lead) {
        var formData = new FormData();
        formData.append('mobile', lead.mobile);
        formData.append('email', lead.email);
        formData.append('houseType', lead.houseType);
        formData.append('totalArea', lead.totalArea);
        formData.append('landSqft', lead.landSqft);
        formData.append('budget', lead.budget);
        formData.append('standard', lead.standard);
        formData.append('semiLuxury', lead.semiLuxury);
        formData.append('luxury', lead.luxury);
        formData.append('premium', lead.premium);

        fetch('php/estimate-lead.php', {
            method: 'POST',
            body: formData
        }).catch(function () { /* fire and forget */ });
    }

    estimateToolForm.addEventListener('submit', function (event) {
        event.preventDefault();
        updateEstimate();
    });

    restoreNativeSelect(houseTypeInput);

    if (calculateButton) {
        calculateButton.addEventListener('click', function () {
            var mobileValue = estimateMobileInput ? estimateMobileInput.value.trim() : '';
            var emailValue = estimateEmailInput ? estimateEmailInput.value.trim() : '';

            if (!mobileValue && !emailValue) {
                if (estimateMobileInput) estimateMobileInput.classList.add('input-error');
                if (estimateEmailInput) estimateEmailInput.classList.add('input-error');
                if (estimateNote) estimateNote.textContent = 'Please enter your mobile number or email to get your estimate.';
                return;
            }

            var houseType = (houseTypeInput.value || '').trim();
            var houseArea = Number.parseFloat(houseAreaInput.value || '0');
            var landPerch = Number.parseFloat(landPerchInput.value || '0');
            var landSqft = landPerch > 0 ? landPerch * perchToSqft : 0;
            var effectiveHouseType = houseType || 'ROOFED';
            var totalAreaSqft = 0;

            if (houseArea > 0) {
                totalAreaSqft = houseArea;
            } else if (landSqft > 0) {
                totalAreaSqft = landSqft;
            } else {
                if (estimateNote) estimateNote.textContent = 'Enter area or land size to calculate.';
                return;
            }

            var selectedRates = priceMatrix[effectiveHouseType];
            if (!selectedRates) {
                if (estimateNote) estimateNote.textContent = 'Please select a valid house type.';
                return;
            }

            var lead = {
                mobile: mobileValue,
                email: emailValue,
                houseType: effectiveHouseType,
                totalArea: new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(totalAreaSqft),
                landSqft: landSqft > 0 ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(landSqft) : '-',
                budget: formatLkr(totalAreaSqft * selectedRates.budget),
                standard: formatLkr(totalAreaSqft * selectedRates.standard),
                semiLuxury: formatLkr(totalAreaSqft * selectedRates.semiLuxury),
                luxury: formatLkr(totalAreaSqft * selectedRates.luxury),
                premium: formatLkr(totalAreaSqft * selectedRates.premium)
            };

            sessionStorage.setItem('estimateResult', JSON.stringify(lead));

            sendLeadByEmail(lead);

            var whatsappMessage = buildLeadMessage(lead);
            window.open('https://wa.me/' + companyWhatsAppNumber + '?text=' + encodeURIComponent(whatsappMessage), '_blank');

            window.location.href = 'quote-result';
        });
    }

    estimateToolForm.addEventListener('input', updateEstimate);
    estimateToolForm.addEventListener('change', updateEstimate);

    updateEstimate();
});
