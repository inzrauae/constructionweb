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
    const floorCountInput = document.getElementById('floorCount');
    const houseAreaInput = document.getElementById('houseArea');
    const landPerchInput = document.getElementById('landPerch');
    const calculateButton = document.getElementById('estimateCalculateBtn');

    const buildAreaSqftOutput = document.getElementById('buildAreaSqft');
    const landSqftOutput = document.getElementById('landSqft');
    const budgetCostOutput = document.getElementById('budgetCost');
    const standardCostOutput = document.getElementById('standardCost');
    const semiLuxuryCostOutput = document.getElementById('semiLuxuryCost');
    const luxuryCostOutput = document.getElementById('luxuryCost');
    const premiumCostOutput = document.getElementById('premiumCost');
    const estimateNote = document.getElementById('estimateNote');

    function formatLkr(amount) {
        return 'LKR ' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(amount);
    }

    function updateEstimate() {
        const houseType = (houseTypeInput.value || '').trim();
        const floorCount = Number.parseFloat(floorCountInput.value || '0');
        const houseArea = Number.parseFloat(houseAreaInput.value || '0');
        const landPerch = Number.parseFloat(landPerchInput.value || '0');

        const landSqft = landPerch > 0 ? landPerch * perchToSqft : 0;
        landSqftOutput.textContent = landSqft > 0 ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(landSqft) : '-';
        buildAreaSqftOutput.textContent = '-';

        if (!houseType || floorCount <= 0 || houseArea <= 0) {
            budgetCostOutput.textContent = 'LKR -';
            standardCostOutput.textContent = 'LKR -';
            semiLuxuryCostOutput.textContent = 'LKR -';
            luxuryCostOutput.textContent = 'LKR -';
            premiumCostOutput.textContent = 'LKR -';
            estimateNote.textContent = 'Enter house type, floors and area to calculate.';
            return;
        }

        const totalAreaSqft = houseArea * floorCount;
        const selectedRates = priceMatrix[houseType];

        if (!selectedRates) {
            budgetCostOutput.textContent = 'LKR -';
            standardCostOutput.textContent = 'LKR -';
            semiLuxuryCostOutput.textContent = 'LKR -';
            luxuryCostOutput.textContent = 'LKR -';
            premiumCostOutput.textContent = 'LKR -';
            estimateNote.textContent = 'Please select a valid house type.';
            return;
        }

        buildAreaSqftOutput.textContent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(totalAreaSqft);

        budgetCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.budget);
        standardCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.standard);
        semiLuxuryCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.semiLuxury);
        luxuryCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.luxury);
        premiumCostOutput.textContent = formatLkr(totalAreaSqft * selectedRates.premium);

        if (landSqft > 0 && landSqft < totalAreaSqft) {
            estimateNote.textContent = 'Warning: Land size is less than total house area.';
        } else {
            estimateNote.textContent = 'Estimated using selected type, floors and total area.';
        }
    }

    estimateToolForm.addEventListener('submit', function (event) {
        event.preventDefault();
        updateEstimate();
    });

    if (calculateButton) {
        calculateButton.addEventListener('click', updateEstimate);
    }

    estimateToolForm.addEventListener('input', updateEstimate);
    estimateToolForm.addEventListener('change', updateEstimate);

    updateEstimate();
});
