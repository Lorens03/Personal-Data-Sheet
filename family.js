document.addEventListener('DOMContentLoaded', function () {
    const noSpouse = document.getElementById('noSpouse');
    const spouseFields = document.querySelectorAll('.spouse-field');
    const noChildren = document.getElementById('noChildren');
    const childrenContainer = document.getElementById('childrenContainer');
    const addChildBtn = document.getElementById('addChildBtn');

    function toggleFields(checkbox, fields) {
        fields.forEach(field => {
            if (!field) return;
            field.disabled = checkbox.checked;
            if (checkbox.checked) field.value = '';
        });
    }

    if (noSpouse) {
        noSpouse.addEventListener('change', function () {
            toggleFields(noSpouse, spouseFields);
        });
    }

    function refreshChildrenState() {
        const childFields = document.querySelectorAll('.child-field');
        toggleFields(noChildren, childFields);
    }

    if (noChildren) {
        noChildren.addEventListener('change', function () {
            refreshChildrenState();
        });
    }

    if (addChildBtn && childrenContainer) {
        addChildBtn.addEventListener('click', function () {
            const childEntries = childrenContainer.querySelectorAll('.child-entry');
            const index = childEntries.length + 1;

            const newEntry = document.createElement('div');
            newEntry.className = 'child-entry row mb-3';
            newEntry.innerHTML = `
                <div class="col-md-5">
                    <div class="mb-3">
                        <label for="childFullName_${index}" class="form-label">FULL NAME OF CHILDREN</label>
                        <input type="text" class="form-control child-field" id="childFullName_${index}">
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="mb-3">
                        <label for="childDateOfBirth_${index}" class="form-label">DATE OF BIRTH</label>
                        <input type="date" class="form-control child-field" id="childDateOfBirth_${index}">
                    </div>
                </div>
                <div class="col-md-2 d-flex align-items-end justify-content-end">
                    <button type="button" class="btn btn-outline-danger btn-sm remove-child" aria-label="Remove child">×</button>
                </div>
            `;

            if (noChildren && noChildren.checked) {
                newEntry.querySelectorAll('.child-field').forEach(field => {
                    field.disabled = true;
                });
            }

            childrenContainer.appendChild(newEntry);
        });
    }

    document.addEventListener('click', function (event) {
        const removeBtn = event.target.closest('.remove-child');
        if (removeBtn) {
            const entry = removeBtn.closest('.child-entry');
            if (entry && !entry.dataset.base) {
                entry.remove();
            }
        }
    });
});
